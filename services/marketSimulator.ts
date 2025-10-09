import type { CandleData } from '../types';

/**
 * A deterministic, seeded pseudo-random walk market simulator.
 * This has been simplified to be a pure 1-second tick generator. It provides a realistic 
 * and unpredictable price action that is perfectly reproducible for a given day, 
 * simulating a persistent 24/7 market without a server. All aggregation logic is
 * now handled by the consumer of this service to prevent bugs.
 */
export class MarketSimulator {
    private subscribers: Set<(tick: CandleData) => void> = new Set();
    private readonly INTERNAL_TICK_MS = 1000;
    private tickIntervalId: ReturnType<typeof setInterval> | null = null;

    private history: CandleData[] = [];
    private lastPrice: number = 65000;
    
    private seed: number = 0;
    private prng: () => number;

    constructor(seedString: string) {
        // Create a numeric seed from the string
        for (let i = 0; i < seedString.length; i++) {
            this.seed = (this.seed << 5) - this.seed + seedString.charCodeAt(i);
            this.seed |= 0; // Convert to 32bit integer
        }
        this.prng = this.mulberry32(this.seed);

        this.generateInitialHistory();
    }
    
    // Mulberry32: a simple, effective pseudo-random number generator
    private mulberry32(a: number) {
        return () => {
          let t = a += 0x6D2B79F5;
          t = Math.imul(t ^ t >>> 15, t | 1);
          t ^= t + Math.imul(t ^ t >>> 7, t | 61);
          return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }

    private generateNextPrice(price: number): number {
        const volatility = 0.0005; 
        const trend = 0.00001; 
        const rand = this.prng() - 0.5 + trend;
        let change = rand * price * volatility;
        
        const maxChange = price * 0.001;
        change = Math.max(-maxChange, Math.min(maxChange, change));

        return parseFloat((price + change).toFixed(2));
    }

    private generateInitialHistory(): void {
        const history: CandleData[] = [];
        let price = this.lastPrice;
        const now = Math.floor(Date.now() / 1000);
        // Generate a deep history of 12 hours
        const startTime = now - (12 * 60 * 60); 

        for (let t = startTime; t < now; t++) {
            const open = price;
            price = this.generateNextPrice(price);
            const high = Math.max(open, price, this.generateNextPrice(price));
            const low = Math.min(open, price, this.generateNextPrice(price));
            history.push({ time: t, open, high, low, close: price });
        }
        this.history = history;
        this.lastPrice = history.length > 0 ? history[history.length - 1].close : this.lastPrice;
    }

    public start(): void {
        if (this.tickIntervalId) this.stop();
        this.tickIntervalId = setInterval(() => this.tick(), this.INTERNAL_TICK_MS);
    }

    public stop(): void {
        if (this.tickIntervalId) {
            clearInterval(this.tickIntervalId);
            this.tickIntervalId = null;
        }
    }

    public subscribe(callback: (tick: CandleData) => void): () => void {
        this.subscribers.add(callback);
        return () => {
            this.subscribers.delete(callback);
        };
    }
    
    public tick(): void {
        const open = this.lastPrice;
        const newPrice = this.generateNextPrice(open);
        const high = Math.max(open, newPrice);
        const low = Math.min(open, newPrice);
        const now = Math.floor(Date.now() / 1000);
        
        const newTick: CandleData = { time: now, open, high, low, close: newPrice };
        this.history.push(newTick);
        if (this.history.length > 50000) { // Keep ~14 hours of 1s data
            this.history.shift();
        }
        this.lastPrice = newPrice;

        this.notifySubscribers(newTick);
    }

    private notifySubscribers(tick: CandleData): void {
        this.subscribers.forEach(callback => callback(tick));
    }
    
    public getFullHistory(): CandleData[] {
        return this.history;
    }
}
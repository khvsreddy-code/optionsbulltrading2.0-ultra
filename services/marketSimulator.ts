import type { CandleData } from '../types';

/**
 * A hyper-realistic, deterministic, seeded pseudo-random market simulator.
 * This engine emulates the effects of an agent-based model by simulating
 * volatility clustering and correlating price movement with volume. It generates
 * high-fidelity 1-second OHLCV data that is perfectly reproducible for a given day.
 */
export class MarketSimulator {
    private subscribers: Set<(tick: CandleData) => void> = new Set();
    private readonly INTERNAL_TICK_MS = 1000;
    private tickIntervalId: ReturnType<typeof setInterval> | null = null;

    private history: CandleData[] = [];
    private lastTick: CandleData;
    
    private seed: number = 0;
    private prng: () => number;

    // State for volatility clustering
    private volatilityRegime: 'LOW' | 'NORMAL' | 'HIGH' = 'NORMAL';
    private regimeCounter: number = 0;

    constructor(seedString: string) {
        // Create a numeric seed from the string for reproducibility
        for (let i = 0; i < seedString.length; i++) {
            this.seed = (this.seed << 5) - this.seed + seedString.charCodeAt(i);
            this.seed |= 0; // Convert to 32bit integer
        }
        this.prng = this.mulberry32(this.seed);

        this.lastTick = { time: 0, open: 65000, high: 65000, low: 65000, close: 65000, volume: 0 };
        this.generateInitialHistory();
    }
    
    private mulberry32(a: number) {
        return () => {
          let t = a += 0x6D2B79F5;
          t = Math.imul(t ^ t >>> 15, t | 1);
          t ^= t + Math.imul(t ^ t >>> 7, t | 61);
          return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }

    private updateVolatilityRegime() {
        this.regimeCounter--;
        if (this.regimeCounter <= 0) {
            const rand = this.prng();
            if (this.volatilityRegime !== 'HIGH' && rand < 0.05) { // 5% chance to switch to HIGH
                this.volatilityRegime = 'HIGH';
                this.regimeCounter = Math.floor(this.prng() * 120) + 60; // Lasts 1-3 minutes
            } else if (this.volatilityRegime !== 'LOW' && rand < 0.15) { // 10% chance to switch to LOW
                this.volatilityRegime = 'LOW';
                this.regimeCounter = Math.floor(this.prng() * 300) + 120; // Lasts 2-7 minutes
            } else { // 85% chance to stay/switch to NORMAL
                this.volatilityRegime = 'NORMAL';
                this.regimeCounter = Math.floor(this.prng() * 600) + 300; // Lasts 5-15 minutes
            }
        }
    }

    private generateNextTick(lastTick: CandleData): CandleData {
        this.updateVolatilityRegime();

        const baseVolatility = { LOW: 0.0002, NORMAL: 0.0005, HIGH: 0.0015 };
        const volatility = baseVolatility[this.volatilityRegime];
        
        // GARCH-like effect: volatility is influenced by the previous move's magnitude
        const lastChange = Math.abs(lastTick.close - lastTick.open) / lastTick.open;
        const effectiveVolatility = volatility * (1 + lastChange * 5);

        const trend = (this.prng() - 0.49) * 0.00005; // Tiny random trend component
        const rand = this.prng() - 0.5;
        const change = rand * lastTick.close * effectiveVolatility + trend;
        const newPrice = parseFloat((lastTick.close + change).toFixed(2));

        // Simulate realistic intra-tick wicks based on volatility
        const open = lastTick.close;
        const high = Math.max(open, newPrice) + this.prng() * lastTick.close * effectiveVolatility * 0.5;
        const low = Math.min(open, newPrice) - this.prng() * lastTick.close * effectiveVolatility * 0.5;

        // Generate volume correlated with volatility and magnitude of price change, scaled to billions
        const baseVolume = { LOW: 5e7, NORMAL: 2e8, HIGH: 8e8 };
        const priceMoveMagnitude = Math.abs(newPrice - open);
        let volume = (baseVolume[this.volatilityRegime] * (1 + priceMoveMagnitude * 20)) + (this.prng() * baseVolume[this.volatilityRegime]);
        volume = Math.floor(volume * 1000); // Scale to billions

        return {
            time: lastTick.time + 1,
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: newPrice,
            volume
        };
    }

    private generateInitialHistory(): void {
        const history: CandleData[] = [];
        const now = Math.floor(Date.now() / 1000);
        const startTime = now - (12 * 60 * 60); // 12 hours of history

        let currentTick: CandleData = { 
            time: startTime - 1,
            open: this.lastTick.open, high: this.lastTick.open, 
            low: this.lastTick.open, close: this.lastTick.open, 
            volume: 0 
        };

        for (let t = startTime; t < now; t++) {
            currentTick = this.generateNextTick(currentTick);
            history.push(currentTick);
        }
        this.history = history;
        this.lastTick = history.length > 0 ? history[history.length - 1] : this.lastTick;
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
        return () => this.subscribers.delete(callback);
    }
    
    public tick(): void {
        const now = Math.floor(Date.now() / 1000);
        // Ensure time is always current to avoid drift
        const currentTickWithCorrectTime = { ...this.lastTick, time: now - 1 };
        const newTick = this.generateNextTick(currentTickWithCorrectTime);
        
        this.history.push(newTick);
        if (this.history.length > 50000) { // Keep ~14 hours of 1s data
            this.history.shift();
        }
        this.lastTick = newTick;

        this.notifySubscribers(newTick);
    }

    private notifySubscribers(tick: CandleData): void {
        this.subscribers.forEach(callback => callback(tick));
    }
    
    public getFullHistory(): CandleData[] {
        return [...this.history];
    }
}

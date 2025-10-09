import type { CandleData } from '../types';

export type Timeframe = '1s' | '1m' | '5m' | '15m' | '30m' | '45m';

/**
 * A deterministic, seeded pseudo-random walk market simulator.
 * This provides a realistic and unpredictable price action that is perfectly
 * reproducible for a given day, simulating a persistent 24/7 market without a server.
 */
export class MarketSimulator {
    private subscribers: Map<Timeframe, Set<(candle: CandleData, isUpdate: boolean) => void>> = new Map();
    private readonly allTimeframes: Timeframe[] = ['1s', '1m', '5m', '15m', '30m', '45m'];
    private timeframeSecondsMap: Map<Timeframe, number> = new Map();
    
    private readonly INTERNAL_TICK_MS = 1000;
    private tickIntervalId: ReturnType<typeof setInterval> | null = null;

    private history: CandleData[] = [];
    private liveCandles: Map<Timeframe, CandleData> = new Map();
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

        this.allTimeframes.forEach(tf => {
            const seconds = this.parseTimeframe(tf);
            this.timeframeSecondsMap.set(tf, seconds);
            this.subscribers.set(tf, new Set());
        });

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

    private parseTimeframe(tf: Timeframe): number {
        return { '1s': 1, '1m': 60, '5m': 300, '15m': 900, '30m': 1800, '45m': 2700 }[tf];
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

    public subscribe(timeframe: Timeframe, callback: (candle: CandleData, isUpdate: boolean) => void): () => void {
        this.subscribers.get(timeframe)?.add(callback);
        const latest = this.getLatestCandle(timeframe);
        if(latest) callback(latest, true);
        return () => {
            this.subscribers.get(timeframe)?.delete(callback);
        };
    }

    public getHistoricalData(timeframe: Timeframe): CandleData[] {
        if (this.history.length === 0) return [];
        
        if (timeframe === '1s') {
            return [...this.history];
        }

        const aggregated: CandleData[] = [];
        const periodInSeconds = this.timeframeSecondsMap.get(timeframe)!;
        
        let currentCandle: CandleData | null = null;
        for(const tick of this.history) {
            const candleStartTime = tick.time - (tick.time % periodInSeconds);
            if (!currentCandle || currentCandle.time !== candleStartTime) {
                if (currentCandle) aggregated.push(currentCandle);
                currentCandle = {
                    time: candleStartTime,
                    open: tick.open,
                    high: tick.high,
                    low: tick.low,
                    close: tick.close,
                };
            } else {
                currentCandle.high = Math.max(currentCandle.high, tick.high);
                currentCandle.low = Math.min(currentCandle.low, tick.low);
                currentCandle.close = tick.close;
            }
        }
        if (currentCandle) aggregated.push(currentCandle);

        return aggregated;
    }
    
    public getLatestCandle(timeframe: Timeframe): CandleData | undefined {
        const history = this.getHistoricalData(timeframe);
        return history.length > 0 ? history[history.length - 1] : undefined;
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

        this.allTimeframes.forEach(tf => {
            const periodInSeconds = this.timeframeSecondsMap.get(tf)!;
            const candleStartTime = now - (now % periodInSeconds);

            let liveCandle = this.liveCandles.get(tf);
            const isNewCandle = !liveCandle || liveCandle.time !== candleStartTime;

            if (isNewCandle) {
                liveCandle = { time: candleStartTime, open: newTick.open, high: newTick.high, low: newTick.low, close: newTick.close };
            } else {
                liveCandle.high = Math.max(liveCandle.high, newTick.high);
                liveCandle.low = Math.min(liveCandle.low, newTick.low);
                liveCandle.close = newTick.close;
            }
            this.liveCandles.set(tf, liveCandle);
            this.notifySubscribers(tf, liveCandle, !isNewCandle);
        });
    }

    private notifySubscribers(timeframe: Timeframe, candle: CandleData, isUpdate: boolean): void {
        this.subscribers.get(timeframe)?.forEach(callback => callback(candle, isUpdate));
    }
    
    public getFullHistory(): CandleData[] {
        return this.history;
    }
}
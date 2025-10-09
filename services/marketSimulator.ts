import type { CandleData } from '../types';

export type Timeframe = '1s' | '1m' | '5m' | '15m' | '30m' | '45m';

/**
 * A self-contained Perlin noise generator for creating realistic, deterministic randomness.
 */
class PerlinNoise {
    private p: number[];

    constructor(seed: number) {
        // Seeded permutation table generation using a simple PRNG
        const sfc32 = (a:number, b:number, c:number, d:number) => {
            return () => {
              a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
              var t = (a + b) | 0;
              a = b ^ (b >>> 9);
              b = c + (c << 3) | 0;
              c = (c << 21 | c >>> 11);
              d = d + 1 | 0;
              t = t + d | 0;
              c = c + t | 0;
              return (t >>> 0) / 4294967296;
            }
        }
        
        const rand = sfc32(seed, seed * 2, seed * 3, seed * 4);
        this.p = Array.from({length: 256}, (_, i) => i);
        
        for (let i = this.p.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
        }
        // Double the permutation table to avoid buffer overflows
        this.p = this.p.concat(this.p);
    }

    private fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    private lerp(t: number, a: number, b: number): number {
        return a + t * (b - a);
    }

    private grad(hash: number, x: number): number {
        // Simple 1D gradient function
        return (hash & 1) === 0 ? x : -x;
    }

    public noise(x: number): number {
        const X = Math.floor(x) & 255;
        x -= Math.floor(x);
        const u = this.fade(x);
        const grad1 = this.grad(this.p[X], x);
        const grad2 = this.grad(this.p[X + 1], x - 1);
        return this.lerp(u, grad1, grad2) * 2;
    }
}


/**
 * A deterministic, time-based market simulator using Perlin noise for realistic price action.
 * The price path is procedurally generated but is identical for any given day,
 * solving the refresh "catch-up" problem while feeling like a live, persistent market.
 */
export class MarketSimulator {
    private subscribers: Map<Timeframe, Set<(candle: CandleData, isUpdate: boolean) => void>> = new Map();
    private readonly allTimeframes: Timeframe[] = ['1s', '1m', '5m', '15m', '30m', '45m'];
    private timeframeSecondsMap: Map<Timeframe, number> = new Map();
    
    private readonly INTERNAL_TICK_MS = 250;
    private tickIntervalId: ReturnType<typeof setInterval> | null = null;

    private historicalDataCache: Map<Timeframe, CandleData[]> = new Map();
    private liveCandles: Map<Timeframe, CandleData> = new Map();
    private isHistoryReady = false;

    private noiseGen: PerlinNoise;
    private dailySeed: number;

    constructor() {
        this.allTimeframes.forEach(tf => {
            const seconds = this.parseTimeframe(tf);
            this.timeframeSecondsMap.set(tf, seconds);
            this.subscribers.set(tf, new Set());
        });
        
        // Create a deterministic seed for the day
        const today = new Date();
        const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        this.dailySeed = this.hashCode(dateString);
        this.noiseGen = new PerlinNoise(this.dailySeed);
    }

    private hashCode(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    private parseTimeframe(tf: Timeframe): number {
        return { '1s': 1, '1m': 60, '5m': 300, '15m': 900, '30m': 1800, '45m': 2700 }[tf];
    }
    
    private getPriceAtTime(timestamp: number): number {
        const basePrice = 65000;
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const secondsIntoDay = timestamp - (startOfDay.getTime() / 1000);

        // Combine multiple octaves of Perlin noise for a realistic price path
        let totalNoise = 0;
        let amplitude = 400;
        let frequency = 0.0005;
        const persistence = 0.5;
        const numOctaves = 5;

        for (let i = 0; i < numOctaves; i++) {
            totalNoise += this.noiseGen.noise(secondsIntoDay * frequency) * amplitude;
            amplitude *= persistence;
            frequency *= 2;
        }

        // Add a slow sine wave for a general daily trend
        const dailyTrend = Math.sin(secondsIntoDay / (86400 / 2)) * 600;
        
        const finalPrice = basePrice + dailyTrend + totalNoise;
        
        return parseFloat(finalPrice.toFixed(2));
    }

    private getCandleForPeriod(startTime: number, periodInSeconds: number): CandleData {
        const open = this.getPriceAtTime(startTime);
        const close = this.getPriceAtTime(startTime + periodInSeconds);
        let high = Math.max(open, close);
        let low = Math.min(open, close);

        const samples = Math.min(periodInSeconds, 10);
        for (let i = 1; i <= samples; i++) {
            const sampleTime = startTime + (i * periodInSeconds / (samples + 1));
            const samplePrice = this.getPriceAtTime(sampleTime);
            high = Math.max(high, samplePrice);
            low = Math.min(low, samplePrice);
        }
        
        return { time: startTime, open, high, low, close };
    }

    public async start(): Promise<void> {
        if (this.tickIntervalId) this.stop();

        if (!this.isHistoryReady) {
            const nowSeconds = Math.floor(Date.now() / 1000);
            
            this.allTimeframes.forEach(tf => {
                const periodInSeconds = this.timeframeSecondsMap.get(tf)!;
                const history: CandleData[] = [];
                const numCandles = 500;
                const startTime = nowSeconds - (nowSeconds % periodInSeconds) - (numCandles * periodInSeconds);

                for (let i = 0; i < numCandles; i++) {
                    const candleStartTime = startTime + (i * periodInSeconds);
                    history.push(this.getCandleForPeriod(candleStartTime, periodInSeconds));
                }
                this.historicalDataCache.set(tf, history);
            });
            this.isHistoryReady = true;
        }
        
        this.tick(); 
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
        return [...(this.historicalDataCache.get(timeframe) || [])];
    }
    
    public getLatestCandle(timeframe: Timeframe): CandleData | undefined {
        return this.liveCandles.get(timeframe);
    }
    
    private tick(): void {
        const nowMs = Date.now();
        const nowSeconds = Math.floor(nowMs / 1000);
        
        this.allTimeframes.forEach(tf => {
            const periodInSeconds = this.timeframeSecondsMap.get(tf)!;
            const candleStartTime = nowSeconds - (nowSeconds % periodInSeconds);
            
            const oldCandle = this.liveCandles.get(tf);
            const isNewCandle = !oldCandle || oldCandle.time !== candleStartTime;
            
            if(isNewCandle && oldCandle) {
                const finalOldCandle = this.getCandleForPeriod(oldCandle.time, periodInSeconds);
                const history = this.historicalDataCache.get(tf);
                if(history) {
                    history.push(finalOldCandle);
                    if(history.length > 1000) history.shift();
                }
            }
            
            const open = isNewCandle ? this.getPriceAtTime(candleStartTime) : oldCandle.open;
            const close = this.getPriceAtTime(nowSeconds + (nowMs % 1000) / 1000);
            
            let high = open > close ? open : close;
            let low = open < close ? open : close;
            
            if(!isNewCandle && oldCandle) {
                high = Math.max(oldCandle.high, close);
                low = Math.min(oldCandle.low, close);
            } else {
                for (let t = candleStartTime; t <= nowSeconds; t++) {
                   const price = this.getPriceAtTime(t);
                   high = Math.max(high, price);
                   low = Math.min(low, price);
                }
            }

            const currentCandle = { time: candleStartTime, open, high, low, close };
            this.liveCandles.set(tf, currentCandle);
            this.notifySubscribers(tf, currentCandle, !isNewCandle);
        });
    }

    private notifySubscribers(timeframe: Timeframe, candle: CandleData, isUpdate: boolean): void {
        this.subscribers.get(timeframe)?.forEach(callback => callback(candle, isUpdate));
    }
}

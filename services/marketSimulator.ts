import type { CandleData } from '../types';

export type Timeframe = '1s' | '1m' | '5m' | '15m' | '30m' | '45m';

// Simple seeded PRNG (sfc32) to generate deterministic noise
function sfc32(a: number, b: number, c: number, d: number) {
    return function() {
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

/**
 * A deterministic, time-based market simulator.
 * Price is generated using a combination of sine waves, making it predictable
 * and consistent across page refreshes, solving the "catch-up" problem by
 * syncing the simulation to real-world time.
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

    constructor() {
        this.allTimeframes.forEach(tf => {
            const seconds = this.parseTimeframe(tf);
            this.timeframeSecondsMap.set(tf, seconds);
            this.subscribers.set(tf, new Set());
        });
    }

    private parseTimeframe(tf: Timeframe): number {
        return { '1s': 1, '1m': 60, '5m': 300, '15m': 900, '30m': 1800, '45m': 2700 }[tf];
    }

    private getRngForTimestamp(timestamp: number): () => number {
        const timeBlock = Math.floor(timestamp / 300); // New seed every 5 minutes
        return sfc32(0x9E3779B9, timeBlock, 0x243F6A88, 0x85A308D3);
    }
    
    private getPriceAtTime(timestamp: number): number {
        const basePrice = 65000;
        
        // Combine multiple sine waves for a more organic, yet deterministic, price path
        const price = basePrice
            + Math.sin(timestamp / 60) * 50    // 1-minute cycle
            + Math.sin(timestamp / 300) * 150   // 5-minute cycle
            + Math.sin(timestamp / 1800) * 400  // 30-minute cycle
            + Math.sin(timestamp / 7200) * 800; // 2-hour cycle

        const rng = this.getRngForTimestamp(timestamp);
        const noise = (rng() - 0.5) * 2 * 25; // Add +/- $25 of deterministic noise
        
        return parseFloat((price + noise).toFixed(2));
    }

    private getCandleForPeriod(startTime: number, periodInSeconds: number): CandleData {
        const open = this.getPriceAtTime(startTime);
        const close = this.getPriceAtTime(startTime + periodInSeconds);
        let high = open > close ? open : close;
        let low = open < close ? open : close;

        // Sample points within the period to find an approximate high/low
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
        
        this.tick(); // Initial tick to set live candles before interval starts
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
        // Immediately provide the latest candle on subscription
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
                // Finalize the last candle of the previous period and add to history
                const finalOldCandle = this.getCandleForPeriod(oldCandle.time, periodInSeconds);
                const history = this.historicalDataCache.get(tf);
                if(history) {
                    history.push(finalOldCandle);
                    if(history.length > 1000) history.shift();
                }
            }
            
            // Generate the current, updating candle
            const open = this.getPriceAtTime(candleStartTime);
            const close = this.getPriceAtTime(nowSeconds + (nowMs % 1000) / 1000); // Use ms for live price feel
            
            let high = open > close ? open : close;
            let low = open < close ? open : close;
            
            // If updating an existing candle, preserve its high/low
            if(!isNewCandle && oldCandle) {
                high = Math.max(oldCandle.high, close);
                low = Math.min(oldCandle.low, close);
            } else { // For a new candle, find the high/low of the elapsed time in this period
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

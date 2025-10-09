import type { CandleData } from '../types';

export type Timeframe = '1s' | '1m' | '5m' | '15m' | '30m' | '45m';

/**
 * A non-deterministic, random-walk market simulator. This version provides a more
 * "realistic" and unpredictable price action that the user preferred. State must be
 * managed and persisted externally to ensure consistency across sessions.
 */
export class MarketSimulator {
    private subscribers: Map<Timeframe, Set<(candle: CandleData, isUpdate: boolean) => void>> = new Map();
    private readonly allTimeframes: Timeframe[] = ['1s', '1m', '5m', '15m', '30m', '45m'];
    private timeframeSecondsMap: Map<Timeframe, number> = new Map();
    
    private readonly INTERNAL_TICK_MS = 1000; // Run on a 1s internal tick
    private tickIntervalId: ReturnType<typeof setInterval> | null = null;

    private history: CandleData[] = [];
    private liveCandles: Map<Timeframe, CandleData> = new Map();
    private lastPrice: number = 65000;

    constructor(initialPrice: number = 65000, initialHistory?: CandleData[]) {
        this.allTimeframes.forEach(tf => {
            const seconds = this.parseTimeframe(tf);
            this.timeframeSecondsMap.set(tf, seconds);
            this.subscribers.set(tf, new Set());
        });

        if (initialHistory && initialHistory.length > 0) {
            this.history = [...initialHistory];
            this.lastPrice = this.history[this.history.length - 1].close;
        } else {
            this.lastPrice = initialPrice;
            this.generateInitialHistory();
        }
    }

    private parseTimeframe(tf: Timeframe): number {
        return { '1s': 1, '1m': 60, '5m': 300, '15m': 900, '30m': 1800, '45m': 2700 }[tf];
    }
    
    private generateNextPrice(price: number): number {
        const volatility = 0.0005; 
        const trend = 0.00001; 
        const rand = Math.random() - 0.5 + trend;
        let change = rand * price * volatility;
        
        const maxChange = price * 0.001;
        change = Math.max(-maxChange, Math.min(maxChange, change));

        return parseFloat((price + change).toFixed(2));
    }

    private generateInitialHistory(): void {
        const history: CandleData[] = [];
        let price = this.lastPrice;
        const now = Math.floor(Date.now() / 1000);
        const startTime = now - 500; 

        for (let i = 0; i < 500; i++) {
            const open = price;
            price = this.generateNextPrice(price);
            const high = Math.max(open, price);
            const low = Math.min(open, price);
            history.push({ time: startTime + i, open, high, low, close: price });
        }
        this.history = history;
        this.lastPrice = history[history.length - 1].close;
    }

    public async start(): Promise<void> {
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
        if (timeframe === '1s') {
            return [...this.history];
        }

        const aggregated: CandleData[] = [];
        const periodInSeconds = this.timeframeSecondsMap.get(timeframe)!;
        if (this.history.length === 0) return [];
        
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
    
    public tick(isCatchUp = false): void {
        const open = this.lastPrice;
        const newPrice = this.generateNextPrice(open);
        const high = Math.max(open, newPrice);
        const low = Math.min(open, newPrice);
        const now = Math.floor(Date.now() / 1000);
        
        const newTick: CandleData = { time: now, open, high, low, close: newPrice };
        this.history.push(newTick);
        if (this.history.length > 2000) { // Limit history size
            this.history.shift();
        }
        this.lastPrice = newPrice;

        if (isCatchUp) return;

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
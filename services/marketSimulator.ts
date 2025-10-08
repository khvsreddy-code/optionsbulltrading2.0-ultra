import type { CandleData } from '../types';

export type Timeframe = '1s' | '1m' | '5m' | '15m' | '30m' | '45m';

/**
 * An ultra-realistic market simulator re-architected to run as a continuous background service.
 * This engine ensures all timeframes are always in sync and updated in real-time,
 * providing a seamless and correlated experience, just like a real market feed.
 *
 * Key Architectural Changes:
 * 1.  **Continuous Background Processing:** A single `tick()` interval runs non-stop,
 *     generating the underlying price data regardless of the currently viewed chart.
 * 2.  **Concurrent Timeframe Aggregation:** The state for ALL timeframes (1s, 1m, 5m, etc.)
 *     is maintained and updated simultaneously on every tick.
 * 3.  **Subscription Model:** The UI subscribes to the specific timeframe it needs,
 *     allowing it to switch views without interrupting the underlying simulation.
 */
export class MarketSimulator {
    private subscribers: Map<Timeframe, Set<(candle: CandleData, isUpdate: boolean) => void>> = new Map();
    private readonly allTimeframes: Timeframe[] = ['1s', '1m', '5m', '15m', '30m', '45m'];
    private timeframeSecondsMap: Map<Timeframe, number> = new Map();
    
    private lastPrice: number = 65000;
    private drift: number = 0;
    private volatility: number = 0.4;
    private meanVolatility: number = 0.4;
    private volatilityOfVolatility: number = 2.0;
    private volatilityReversionSpeed: number = 5.0;

    private readonly INTERNAL_TICK_MS = 50;
    private internalTickCounter: number = 0;
    private currentSecondCandle: CandleData | null = null;
    
    private liveTimeframeCandles: Map<Timeframe, CandleData> = new Map();
    private secondsWithinTimeframe: Map<Timeframe, number> = new Map();

    private tickIntervalId: ReturnType<typeof setInterval> | null = null;

    private base1sHistoricalData: CandleData[] | null = null;
    private historicalDataCache: Map<Timeframe, CandleData[]> = new Map();
    private isHistoryReady = false;

    constructor() {
        this.allTimeframes.forEach(tf => {
            const seconds = this.parseTimeframe(tf);
            this.timeframeSecondsMap.set(tf, seconds);
            this.subscribers.set(tf, new Set());
            this.historicalDataCache.set(tf, []);
        });
    }

    private parseTimeframe(tf: Timeframe): number {
        return { '1s': 1, '1m': 60, '5m': 300, '15m': 900, '30m': 1800, '45m': 2700 }[tf];
    }

    public async start(): Promise<void> {
        if (this.tickIntervalId) this.stop();

        if (!this.isHistoryReady) {
            this.base1sHistoricalData = this.generateBase1sHistoricalData(10800);
            this.allTimeframes.forEach(tf => {
                const aggregated = this.aggregateHistoricalData(this.base1sHistoricalData!, this.timeframeSecondsMap.get(tf)!);
                this.historicalDataCache.set(tf, aggregated);
            });
            this.isHistoryReady = true;
        }
        
        this.lastPrice = this.base1sHistoricalData![this.base1sHistoricalData!.length - 1].close;
        const lastTime = this.base1sHistoricalData![this.base1sHistoricalData!.length - 1].time;
        this.initializeLiveCandles(lastTime);

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
        return () => {
            this.subscribers.get(timeframe)?.delete(callback);
        };
    }

    public getHistoricalData(timeframe: Timeframe): CandleData[] {
        // Return a copy to prevent the UI from accidentally mutating the simulator's state
        return [...(this.historicalDataCache.get(timeframe) || [])];
    }
    
    public getLatestCandle(timeframe: Timeframe): CandleData | undefined {
        const history = this.getHistoricalData(timeframe);
        return this.liveTimeframeCandles.get(timeframe) ?? history[history.length - 1];
    }

    private initializeLiveCandles(lastTime: number): void {
        this.currentSecondCandle = {
            time: lastTime + 1,
            open: this.lastPrice, high: this.lastPrice, low: this.lastPrice, close: this.lastPrice,
        };
        this.internalTickCounter = 0;

        this.allTimeframes.forEach(tf => {
            const timeframeInSeconds = this.timeframeSecondsMap.get(tf)!;
            const history = this.getHistoricalData(tf);
            const lastHistoricalCandle = history.length > 0 ? history[history.length - 1] : null;
            const nextTimeframeStartTime = lastHistoricalCandle ? lastHistoricalCandle.time + timeframeInSeconds : (Math.floor(Date.now() / 1000 / timeframeInSeconds) * timeframeInSeconds);

            this.liveTimeframeCandles.set(tf, {
                time: nextTimeframeStartTime,
                open: this.lastPrice, high: this.lastPrice, low: this.lastPrice, close: this.lastPrice,
            });
            this.secondsWithinTimeframe.set(tf, 0);
        });
    }

    private tick(): void {
        if (!this.currentSecondCandle) return;

        const currentVolatility = this.calculateCurrentVolatility();
        this.lastPrice = this.generateNextPriceTick(this.lastPrice, currentVolatility);
        
        this.currentSecondCandle.high = Math.max(this.currentSecondCandle.high, this.lastPrice);
        this.currentSecondCandle.low = Math.min(this.currentSecondCandle.low, this.lastPrice);
        this.currentSecondCandle.close = this.lastPrice;
        this.internalTickCounter++;

        const ticksPerSecond = 1000 / this.INTERNAL_TICK_MS;
        if (this.internalTickCounter >= ticksPerSecond) {
            this.processSecondCompletion();
        }
    }

    private processSecondCompletion(): void {
        const finalizedSecondCandle = { ...this.currentSecondCandle! };

        // Update all timeframes with the completed 1s candle
        this.allTimeframes.forEach(tf => {
            this.updateTimeframeCandle(tf, finalizedSecondCandle);
        });

        // Reset for the next second
        this.currentSecondCandle = {
            time: this.currentSecondCandle!.time + 1,
            open: this.lastPrice, high: this.lastPrice, low: this.lastPrice, close: this.lastPrice,
        };
        this.internalTickCounter = 0;
    }

    private updateTimeframeCandle(timeframe: Timeframe, secondCandle: CandleData): void {
        const timeframeInSeconds = this.timeframeSecondsMap.get(timeframe)!;
        
        // Special handling for 1s timeframe, which completes every second
        if (timeframe === '1s') {
            const history = this.historicalDataCache.get('1s');
            if (history) {
                history.push(secondCandle);
                if (history.length > 1000) history.shift();
            }
            this.liveTimeframeCandles.set('1s', secondCandle);
            this.notifySubscribers('1s', secondCandle, false);
            return;
        }

        // Logic for aggregating into larger timeframes (1m, 5m, etc.)
        const tfCandle = this.liveTimeframeCandles.get(timeframe)!;
        let currentSeconds = this.secondsWithinTimeframe.get(timeframe)!;
        
        tfCandle.high = Math.max(tfCandle.high, secondCandle.high);
        tfCandle.low = Math.min(tfCandle.low, secondCandle.low);
        tfCandle.close = secondCandle.close;
        currentSeconds++;
        this.secondsWithinTimeframe.set(timeframe, currentSeconds);

        const isTimeframeComplete = currentSeconds >= timeframeInSeconds;
        this.notifySubscribers(timeframe, { ...tfCandle }, !isTimeframeComplete);

        if (isTimeframeComplete) {
            // The candle for this timeframe is now complete. Add it to the history.
            const history = this.historicalDataCache.get(timeframe);
            if (history) {
                history.push({ ...tfCandle });
                if (history.length > 1000) history.shift();
            }

            // Start a new live candle for the next period.
            this.liveTimeframeCandles.set(timeframe, {
                time: tfCandle.time + timeframeInSeconds,
                open: this.lastPrice, high: this.lastPrice, low: this.lastPrice, close: this.lastPrice,
            });
            this.secondsWithinTimeframe.set(timeframe, 0);
        }
    }

    private notifySubscribers(timeframe: Timeframe, candle: CandleData, isUpdate: boolean): void {
        this.subscribers.get(timeframe)?.forEach(callback => callback(candle, isUpdate));
    }
    
    private calculateCurrentVolatility(): number {
        let tempVolatility = this.volatility;
        // Check for end-of-period auction effect for all relevant timeframes
        this.allTimeframes.forEach(tf => {
            const timeframeInSeconds = this.timeframeSecondsMap.get(tf)!;
            if (timeframeInSeconds >= 60) { // Only for 1m and above
                const secondsRemaining = timeframeInSeconds - (this.secondsWithinTimeframe.get(tf)! % timeframeInSeconds);
                if (secondsRemaining <= 5 && secondsRemaining > 0) {
                    tempVolatility *= 1.5; // Use a slightly smaller multiplier to avoid excessive spikes when combined
                }
            }
        });
        return tempVolatility;
    }

    private generateBase1sHistoricalData(count: number): CandleData[] {
        const data: CandleData[] = [];
        let lastClose = 65000;
        const now = Math.floor(Date.now() / 1000);
        const alignedNow = now - (now % 3600);
        const startTime = alignedNow - count;

        for (let i = 0; i < count; i++) {
            const open = lastClose;
            let high = open;
            let low = open;
            let close = open;
            const ticksPerCandle = 1000 / this.INTERNAL_TICK_MS;

            for (let j = 0; j < ticksPerCandle; j++) {
                const tickPrice = this.generateNextPriceTick(close, this.volatility);
                high = Math.max(high, tickPrice);
                low = Math.min(low, tickPrice);
                close = tickPrice;
            }
            data.push({ time: startTime + i, open, high, low, close });
            lastClose = close;
        }
        return data;
    }

    private aggregateHistoricalData(baseData: CandleData[], timeframeInSeconds: number): CandleData[] {
        const desiredPoints = 500;
        if (timeframeInSeconds === 1) {
            return baseData.slice(-desiredPoints);
        }

        const aggregatedData: CandleData[] = [];
        if (!baseData || baseData.length === 0) return aggregatedData;

        let currentAggregatedCandle: CandleData | null = null;

        for (const secondCandle of baseData) {
            const timeframeStartTime = secondCandle.time - (secondCandle.time % timeframeInSeconds);

            if (!currentAggregatedCandle || currentAggregatedCandle.time !== timeframeStartTime) {
                if (currentAggregatedCandle) {
                    aggregatedData.push(currentAggregatedCandle);
                }
                currentAggregatedCandle = {
                    time: timeframeStartTime,
                    open: secondCandle.open,
                    high: secondCandle.high,
                    low: secondCandle.low,
                    close: secondCandle.close,
                };
            } else {
                currentAggregatedCandle.high = Math.max(currentAggregatedCandle.high, secondCandle.high);
                currentAggregatedCandle.low = Math.min(currentAggregatedCandle.low, secondCandle.low);
                currentAggregatedCandle.close = secondCandle.close;
            }
        }

        if (currentAggregatedCandle) {
            aggregatedData.push(currentAggregatedCandle);
        }

        return aggregatedData.slice(-desiredPoints);
    }

    private generateNextPriceTick(lastPrice: number, currentVolatility: number): number {
        const dt_price = (1 / (365 * 24 * 60 * 60)) / (1000 / this.INTERNAL_TICK_MS);
        
        const mean = 65000;
        const reversionSpeed = 0.01;
        this.drift = reversionSpeed * (mean - lastPrice) * dt_price;

        const dt_vol = (1 / 252) / (1000 / this.INTERNAL_TICK_MS);
        const dV = this.volatilityReversionSpeed * (this.meanVolatility - this.volatility) * dt_vol +
                   this.volatilityOfVolatility * this.volatility * this.generateStandardNormal() * Math.sqrt(dt_vol);
        this.volatility = Math.max(0.1, this.volatility + dV);

        const Z = this.generateStandardNormal();
        const volatilityComponent = currentVolatility * Z * Math.sqrt(dt_price);
        
        let newPrice = lastPrice * Math.exp(this.drift + volatilityComponent);

        if (Math.random() < 0.0001) {
            newPrice *= (1 + (Math.random() - 0.5) * 0.01);
        }

        return isFinite(newPrice) && newPrice > 0 ? newPrice : lastPrice;
    }

    private generateStandardNormal(): number {
        let u1 = 0, u2 = 0;
        while (u1 === 0) u1 = Math.random();
        while (u2 === 0) u2 = Math.random();
        return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    }
}

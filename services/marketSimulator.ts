import type { CandleData } from '../types';

export type Timeframe = '1s' | '1m' | '5m' | '15m' | '30m' | '45m';

/**
 * An ultra-realistic market simulator based on a sophisticated stochastic model.
 * This engine now ensures a CONSISTENT historical view across all timeframes
 * by generating a single, high-resolution base history and aggregating it on demand.
 *
 * Key features inspired by the hyper-realistic plan:
 * 1.  **Single Source of Truth:** Generates a base 1-second historical dataset ONCE and caches it.
 *     All other timeframes (1m, 5m, etc.) are aggregated from this consistent base data,
 *     fixing the data desynchronization bug.
 * 2.  **Dynamic Volatility Core:** Implements a GARCH-like process to create realistic
 *     volatility clustering.
 * 3.  **End-of-Period Auction Simulation:** Volatility is spiked in the final 5 seconds of
 *     minute-based timeframes to mimic closing auction effects.
 * 4.  **Realistic Candle Aggregation:**
 *     - Minute timeframes: Provides real-time, streaming updates every second.
 *     - 1-second timeframe: Provides a finalized candle only after the interval is complete.
 */
export class MarketSimulator {
    private onTickCallback: (candle: CandleData, isUpdate: boolean) => void;
    private timeframe: Timeframe;
    private timeframeInSeconds: number;
    private tickIntervalId: ReturnType<typeof setInterval> | null = null;

    // --- Core Simulation State ---
    private lastPrice: number = 65000;
    private drift: number = 0;
    
    // --- Dynamic Volatility State (emulates GARCH/volatility clustering) ---
    private volatility: number = 0.4;
    private meanVolatility: number = 0.4;
    private volatilityOfVolatility: number = 2.0;
    private volatilityReversionSpeed: number = 5.0;

    // --- High-Frequency Internal State ---
    private readonly INTERNAL_TICK_MS = 50;
    private internalTickCounter: number = 0;
    private currentSecondCandle: CandleData | null = null;

    // --- Timeframe-Specific State ---
    private currentTimeframeCandle: CandleData | null = null;
    private secondsWithinCurrentTimeframe: number = 0;

    // --- STATIC CACHE FOR CONSISTENT HISTORY ---
    private static base1sHistoricalData: CandleData[] | null = null;
    private static isGeneratingHistory = false;

    constructor(onTick: (candle: CandleData, isUpdate: boolean) => void, timeframe: Timeframe) {
        this.onTickCallback = onTick;
        this.timeframe = timeframe;
        this.timeframeInSeconds = this.parseTimeframe(timeframe);
    }

    private parseTimeframe(tf: Timeframe): number {
        switch (tf) {
            case '1s': return 1;
            case '1m': return 60;
            case '5m': return 300;
            case '15m': return 900;
            case '30m': return 1800;
            case '45m': return 2700;
            default: return 1;
        }
    }

    public async start(): Promise<CandleData[]> {
        if (this.tickIntervalId) this.stop();

        // Generate base history ONLY ONCE and cache it statically.
        if (!MarketSimulator.base1sHistoricalData && !MarketSimulator.isGeneratingHistory) {
            MarketSimulator.isGeneratingHistory = true;
            // Generate a deep history (e.g., 3 hours) to ensure enough data for all timeframes
            MarketSimulator.base1sHistoricalData = this.generateBase1sHistoricalData(10800); 
            MarketSimulator.isGeneratingHistory = false;
        } else if (MarketSimulator.isGeneratingHistory) {
            // If another instance is generating, wait for it to finish.
            await new Promise(resolve => {
                const interval = setInterval(() => {
                    if (!MarketSimulator.isGeneratingHistory) {
                        clearInterval(interval);
                        resolve(null);
                    }
                }, 100);
            });
        }

        const aggregatedHistoricalData = this.aggregateHistoricalData(
            MarketSimulator.base1sHistoricalData!,
            this.timeframeInSeconds
        );

        if (aggregatedHistoricalData.length === 0) {
            return [];
        }

        const lastHistoricalCandle = aggregatedHistoricalData[aggregatedHistoricalData.length - 1];
        // The *true* last price must come from the non-aggregated 1s data for a smooth start.
        this.lastPrice = MarketSimulator.base1sHistoricalData![MarketSimulator.base1sHistoricalData!.length - 1].close;

        this.initializeLiveCandles(lastHistoricalCandle.time);
        this.tickIntervalId = setInterval(() => this.tick(), this.INTERNAL_TICK_MS);

        return aggregatedHistoricalData;
    }

    public stop(): void {
        if (this.tickIntervalId) {
            clearInterval(this.tickIntervalId);
            this.tickIntervalId = null;
        }
    }

    private initializeLiveCandles(lastTime: number) {
        const nextTimeframeStartTime = lastTime + this.timeframeInSeconds;

        this.currentSecondCandle = {
            time: lastTime + 1,
            open: this.lastPrice, high: this.lastPrice, low: this.lastPrice, close: this.lastPrice,
        };
        this.internalTickCounter = 0;

        this.currentTimeframeCandle = {
            time: nextTimeframeStartTime,
            open: this.lastPrice, high: this.lastPrice, low: this.lastPrice, close: this.lastPrice,
        };
        this.secondsWithinCurrentTimeframe = 0;
    }

    private tick(): void {
        if (!this.currentSecondCandle || !this.currentTimeframeCandle) return;

        let temporaryVolatility = this.volatility;
        if (this.timeframeInSeconds >= 60) {
            const secondsRemaining = this.timeframeInSeconds - (this.secondsWithinCurrentTimeframe % this.timeframeInSeconds);
            if (secondsRemaining <= 5 && secondsRemaining > 0) {
                temporaryVolatility *= 2.5;
            }
        }
        
        this.lastPrice = this.generateNextPriceTick(this.lastPrice, temporaryVolatility);
        
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
        
        if (this.timeframe === '1s') {
            this.onTickCallback(finalizedSecondCandle, false);
        }

        if (this.timeframeInSeconds > 1) {
            this.updateTimeframeCandle(finalizedSecondCandle);
        }

        this.currentSecondCandle = {
            time: this.currentSecondCandle!.time + 1,
            open: this.lastPrice, high: this.lastPrice, low: this.lastPrice, close: this.lastPrice,
        };
        this.internalTickCounter = 0;
    }
    
    private updateTimeframeCandle(secondCandle: CandleData): void {
        const tfCandle = this.currentTimeframeCandle!;
        tfCandle.high = Math.max(tfCandle.high, secondCandle.high);
        tfCandle.low = Math.min(tfCandle.low, secondCandle.low);
        tfCandle.close = secondCandle.close;
        this.secondsWithinCurrentTimeframe++;

        const isTimeframeComplete = this.secondsWithinCurrentTimeframe >= this.timeframeInSeconds;
        this.onTickCallback({ ...tfCandle }, !isTimeframeComplete);

        if (isTimeframeComplete) {
            this.currentTimeframeCandle = {
                time: tfCandle.time + this.timeframeInSeconds,
                open: this.lastPrice, high: this.lastPrice, low: this.lastPrice, close: this.lastPrice,
            };
            this.secondsWithinCurrentTimeframe = 0;
        }
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

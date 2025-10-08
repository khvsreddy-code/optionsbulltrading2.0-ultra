import type { CandleData } from '../types';

export type Timeframe = '1s' | '1m' | '5m';

/**
 * A sophisticated market simulator that provides throttled, realistic candle updates
 * to fix rendering bugs and enhance user experience. It generates data internally
 * at a high frequency but only emits updates to the UI at specified intervals.
 */
export class MarketSimulator {
    private onTickCallback: (candle: CandleData, isUpdate: boolean) => void;
    private timeframeInSeconds: number;
    private tickIntervalId: ReturnType<typeof setInterval> | null = null;
    
    // Core simulation state
    private lastPrice: number = 65000; // Realistic start for BTC
    private currentCandle: CandleData | null = null;
    private tickCounter: number = 0;
    
    // Constants for timing control
    private readonly TICKS_PER_SECOND = 20; // 50ms internal tick interval
    private readonly TICKS_PER_TIMEFRAME: number;
    private readonly TICKS_PER_10_SECONDS: number;

    // Simplified state for a more stable financial model
    private drift: number = 0;

    constructor(onTick: (candle: CandleData, isUpdate: boolean) => void, timeframe: Timeframe) {
        this.onTickCallback = onTick;
        this.timeframeInSeconds = this.parseTimeframe(timeframe);
        
        this.TICKS_PER_TIMEFRAME = this.timeframeInSeconds * this.TICKS_PER_SECOND;
        this.TICKS_PER_10_SECONDS = 10 * this.TICKS_PER_SECOND; // 200 ticks for 10s
    }
    
    private parseTimeframe(tf: Timeframe): number {
        switch (tf) {
            case '1s': return 1;
            case '1m': return 60;
            case '5m': return 300;
            default: return 1;
        }
    }

    public async start(initialDataPoints = 300): Promise<CandleData[]> {
        return new Promise(resolve => {
            // Yield to event loop to allow UI to update (e.g., show spinner) before heavy calculation
            setTimeout(() => {
                const historicalData = this.generateHistoricalData(initialDataPoints);
                
                if (this.tickIntervalId) clearInterval(this.tickIntervalId);

                const lastHistoricalCandle = historicalData[historicalData.length - 1];
                this.lastPrice = lastHistoricalCandle.close;
                
                this.currentCandle = {
                    time: lastHistoricalCandle.time + this.timeframeInSeconds,
                    open: lastHistoricalCandle.close,
                    high: lastHistoricalCandle.close,
                    low: lastHistoricalCandle.close,
                    close: lastHistoricalCandle.close,
                };
                this.tickCounter = 0;
                
                // Start the internal generation loop
                this.tickIntervalId = setInterval(() => this.tick(), 1000 / this.TICKS_PER_SECOND);

                resolve(historicalData);
            }, 0);
        });
    }

    public stop(): void {
        if (this.tickIntervalId) {
            clearInterval(this.tickIntervalId);
            this.tickIntervalId = null;
        }
    }
    
    private generateHistoricalData(count: number): CandleData[] {
        const data: CandleData[] = [];
        let lastClose = this.lastPrice;
        const now = Math.floor(Date.now() / 1000);
        const alignedNow = now - (now % this.timeframeInSeconds);
        const startTime = alignedNow - (count * this.timeframeInSeconds);

        for (let i = 0; i < count; i++) {
            const open = lastClose;
            
            // Simplified, fast generation for historical data
            const change = (Math.random() - 0.5) * (open * 0.02); // Max 2% change per candle
            const close = open + change;
            const high = Math.max(open, close) + (Math.random() * open * 0.01); // Add some wick
            const low = Math.min(open, close) - (Math.random() * open * 0.01); // Add some wick
            
            data.push({
                time: startTime + (i * this.timeframeInSeconds),
                open,
                high,
                low,
                close,
            });
            lastClose = close;
        }
        this.lastPrice = lastClose;
        return data;
    }
    
    private tick() {
        if (!this.currentCandle) return;
        
        // Generate new price and update the current candle's state internally
        const newPrice = this.generateNextPriceTick(this.currentCandle.close);
        this.currentCandle.high = Math.max(this.currentCandle.high, newPrice);
        this.currentCandle.low = Math.min(this.currentCandle.low, newPrice);
        this.currentCandle.close = newPrice;
        this.tickCounter++;

        // --- Finalization Check (applies to all timeframes) ---
        if (this.tickCounter >= this.TICKS_PER_TIMEFRAME) {
            // Send a copy of the completed candle
            this.onTickCallback({ ...this.currentCandle }, false); 
            
            // Start a new candle for the next period
            this.currentCandle = {
                time: this.currentCandle.time + this.timeframeInSeconds,
                open: this.currentCandle.close,
                high: this.currentCandle.close,
                low: this.currentCandle.close,
                close: this.currentCandle.close,
            };
            this.tickCounter = 0;
            return; // Exit after finalizing
        }

        // --- Interim Update Check (only for timeframes > 1s) ---
        // Implements the user's request for realistic 10-second updates.
        if (this.timeframeInSeconds > 1) {
            if (this.tickCounter > 0 && this.tickCounter % this.TICKS_PER_10_SECONDS === 0) {
                // Send a copy of the in-progress candle for display
                this.onTickCallback({ ...this.currentCandle }, true);
            }
        }
        // For the 1s timeframe, this block is skipped, and only the finalization check runs,
        // which fulfills the "no update needed" requirement.
    }
    
    private generateNextPriceTick(lastPrice: number): number {
        // Use a constant base volatility to prevent feedback loops.
        const volatility = 0.4;
        
        // The drift component is now a simple mean-reverting random walk.
        this.drift = this.drift * 0.995 + (Math.random() - 0.5) * 0.005;

        // Core Geometric Brownian Motion (GBM)
        const dt = (1 / (365 * 24 * 60 * 60)) / this.TICKS_PER_SECOND;
        const Z = this.generateStandardNormal();
        const driftComponent = (this.drift - 0.5 * volatility ** 2) * dt;
        const volatilityComponent = volatility * Math.sqrt(dt) * Z;
        
        const newPrice = lastPrice * Math.exp(driftComponent + volatilityComponent);

        return isFinite(newPrice) && newPrice > 0 ? newPrice : lastPrice;
    }

    // Box-Muller transform to get a standard normal distribution
    private generateStandardNormal(): number {
        let u1 = 0, u2 = 0;
        while (u1 === 0) u1 = Math.random();
        while (u2 === 0) u2 = Math.random();
        return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    }
}
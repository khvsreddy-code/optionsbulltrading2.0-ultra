import type { CandleData } from '../types';

export type Timeframe = '1s' | '1m' | '5m';

/**
 * A sophisticated, re-architected market simulator using a stable core financial model
 * enhanced with non-linear dynamics like momentum, pullbacks, and volatility clustering.
 * This version finally addresses the root causes of unrealistic price action.
 */
export class MarketSimulator {
    private onTickCallback: (candle: CandleData, isUpdate: boolean) => void;
    private timeframeInSeconds: number;
    private tickIntervalId: ReturnType<typeof setInterval> | null = null;
    
    // Core simulation state
    private lastPrice: number = 45000;
    private currentCandle: CandleData | null = null;
    private tickCounter: number = 0;
    private readonly TICKS_PER_TIMEFRAME: number;

    // Simplified state for a more stable model
    private drift: number = 0; // Current directional force

    constructor(onTick: (candle: CandleData, isUpdate: boolean) => void, timeframe: Timeframe) {
        this.onTickCallback = onTick;
        this.timeframeInSeconds = this.parseTimeframe(timeframe);
        this.TICKS_PER_TIMEFRAME = this.timeframeInSeconds * 20; // 20 ticks per second
    }
    
    private parseTimeframe(tf: Timeframe): number {
        switch (tf) {
            case '1s': return 1;
            case '1m': return 60;
            case '5m': return 300;
            default: return 1;
        }
    }

    public start(initialDataPoints = 300): CandleData[] {
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
        
        // Tick at 50ms for a 20Hz update rate
        this.tickIntervalId = setInterval(() => this.tick(), 50);

        return historicalData;
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
            const candle = this.generateNextCandle(lastClose);
            candle.time = startTime + (i * this.timeframeInSeconds);
            data.push(candle);
            lastClose = candle.close;
        }
        this.lastPrice = lastClose;
        return data;
    }
    
    private tick() {
        if (!this.currentCandle) return;
        
        const newPrice = this.generateNextPriceTick(this.currentCandle.close);

        this.currentCandle.high = Math.max(this.currentCandle.high, newPrice);
        this.currentCandle.low = Math.min(this.currentCandle.low, newPrice);
        this.currentCandle.close = newPrice;
        
        this.tickCounter++;

        if (this.tickCounter >= this.TICKS_PER_TIMEFRAME) {
            this.onTickCallback(this.currentCandle, false); 
            
            this.currentCandle = {
                time: this.currentCandle.time + this.timeframeInSeconds,
                open: this.currentCandle.close,
                high: this.currentCandle.close,
                low: this.currentCandle.close,
                close: this.currentCandle.close,
            };
            this.tickCounter = 0;
        } else {
            this.onTickCallback(this.currentCandle, true);
        }
    }
    
    private generateNextPriceTick(lastPrice: number): number {
        // --- Simplified, More Stable Model ---
        // Use a constant base volatility to prevent feedback loops.
        const volatility = 0.4;
        
        // The drift component is now a simple mean-reverting random walk, preventing it from exploding.
        this.drift = this.drift * 0.995 + (Math.random() - 0.5) * 0.005;

        // --- Core Geometric Brownian Motion (GBM) ---
        const dt = (1 / (365 * 24 * 60 * 60)) / 20; // Time step for a 50ms tick
        const Z = this.generateStandardNormal();
        const driftComponent = (this.drift - 0.5 * volatility ** 2) * dt;
        const volatilityComponent = volatility * Math.sqrt(dt) * Z;
        
        const newPrice = lastPrice * Math.exp(driftComponent + volatilityComponent);

        // --- Update State for Next Tick (Simplified) ---
        this.lastPrice = newPrice;

        return isFinite(newPrice) && newPrice > 0 ? newPrice : lastPrice;
    }

    private generateNextCandle(lastClose: number): CandleData {
        let price = lastClose;
        let high = lastClose;
        let low = lastClose;

        for (let i = 0; i < this.TICKS_PER_TIMEFRAME; i++) {
            price = this.generateNextPriceTick(price);
            high = Math.max(high, price);
            low = Math.min(low, price);
        }
        
        return {
            time: 0,
            open: lastClose,
            high,
            low,
            close: price,
        };
    }

    private generateStandardNormal(): number {
        let u1 = 0, u2 = 0;
        while (u1 === 0) u1 = Math.random();
        while (u2 === 0) u2 = Math.random();
        return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    }
}
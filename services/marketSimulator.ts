import type { CandleData, Instrument } from '../types';
import * as animejs from 'animejs';
const anime = (animejs as any).default;

// --- A stateful, more advanced generator for Crypto (BTC) based on user's plan ---
class CryptoPriceGenerator {
    private lastPrice: number;
    private volatility: number;
    private lastReturnSq: number;
    private readonly omega = 0.00000001; // Constant variance
    private readonly alpha = 0.08;     // Reaction to shocks
    private readonly beta = 0.9;     // Persistence of volatility
    private readonly drift = 0.0000005; // Slight upward bias

    constructor(initialPrice: number) {
        this.lastPrice = initialPrice;
        this.volatility = 0.0002; // Initial volatility
        this.lastReturnSq = 0;
    }

    getNextTick(): { price: number, volume: number } {
        // 1. Update volatility (GARCH-like behavior)
        this.volatility = Math.sqrt(this.omega + this.alpha * this.lastReturnSq + this.beta * (this.volatility ** 2));
        const shock = (Math.random() - 0.5) + (Math.random() - 0.5) + (Math.random() - 0.5);
        let jump = 0;
        if (Math.random() < 0.0005) {
            const jumpMagnitude = (Math.random() * 0.015) - 0.0075;
            jump = jumpMagnitude;
        }
        const return_t = this.drift + shock * this.volatility + jump;
        const newPrice = this.lastPrice * (1 + return_t);
        this.lastReturnSq = return_t ** 2;
        this.lastPrice = newPrice;
        const baseVolume = 0.05;
        const volumeMultiplier = 1 + (Math.abs(return_t) / (this.volatility + 0.00001)) * 10;
        const volume = baseVolume * volumeMultiplier * (Math.random() + 0.5);
        return { price: Math.max(newPrice, 0.01), volume };
    }
}

export class MarketSimulator {
    private tickIntervalId: number | null = null;
    private candleEmitIntervalId: number | null = null;
    private readonly instrument: Instrument;
    private priceGenerator: CryptoPriceGenerator;
    private lastPrice: number;

    constructor(instrument: Instrument) {
        this.instrument = instrument;
        this.lastPrice = instrument.last_price;
        this.priceGenerator = new CryptoPriceGenerator(this.lastPrice);
    }
    
    // This function ONLY generates 1-minute bars now.
    public generateHistoricalData(count: number): CandleData[] {
        const data: CandleData[] = [];
        let lastClose = this.instrument.last_price * (1 - (Math.random() * 0.05));
        const periodInSeconds = 60; // Hardcoded to 1 minute
        let currentTime = Math.floor(Date.now() / 1000) - count * periodInSeconds;
        
        const localGenerator = new CryptoPriceGenerator(lastClose);

        for (let i = 0; i < count; i++) {
            const open = lastClose;
            let high = open;
            let low = open;
            let close = open;
            let volume = 0;

            const ticksPerCandle = 30; // Simulate 30 ticks per minute
            for (let j = 0; j < ticksPerCandle; j++) {
                const tick = localGenerator.getNextTick();
                high = Math.max(high, tick.price);
                low = Math.min(low, tick.price);
                close = tick.price;
                volume += tick.volume;
            }
            
            if (low > open) low = open * 0.999;
            if (high < open) high = open * 1.001;
            if (close > high) high = close;
            if (close < low) low = low;

            const candle: CandleData = { time: currentTime, open, high, low, close, volume };
            data.push(candle);
            lastClose = close;
            currentTime += periodInSeconds;
        }
        
        this.lastPrice = lastClose;
        this.priceGenerator = new CryptoPriceGenerator(lastClose);
        return data;
    }

    // This function provides a continuous stream of updating 1-minute candles.
    public start(callback: (candle: CandleData) => void): void {
        this.stop();
        let currentCandle: CandleData | null = null;

        // High-frequency internal loop to generate ticks and update the candle state
        this.tickIntervalId = window.setInterval(() => {
            const now = Date.now();
            const currentTimeSeconds = Math.floor(now / 1000);
            const candleStartTime = currentTimeSeconds - (currentTimeSeconds % 60);

            const tick = this.priceGenerator.getNextTick();
            
            if (!currentCandle || currentCandle.time !== candleStartTime) {
                // Start a new 1-minute candle
                currentCandle = {
                    time: candleStartTime,
                    open: tick.price,
                    high: tick.price,
                    low: tick.price,
                    close: tick.price,
                    volume: tick.volume,
                };
            } else {
                // Update the existing candle with the new tick
                currentCandle.high = Math.max(currentCandle.high, tick.price);
                currentCandle.low = Math.min(currentCandle.low, tick.price);
                currentCandle.close = tick.price;
                currentCandle.volume = (currentCandle.volume || 0) + tick.volume;
            }
        }, 200); // Generate a tick every 200ms

        // Lower-frequency emitter that sends the latest candle state to the UI
        this.candleEmitIntervalId = window.setInterval(() => {
            if (currentCandle) {
                // Send a copy to the callback to prevent mutation issues
                callback({ ...currentCandle });
            }
        }, 5000); // Emit update every 5 seconds as requested
    }

    public stop(): void {
        if (this.tickIntervalId) {
            clearInterval(this.tickIntervalId);
            this.tickIntervalId = null;
        }
        if (this.candleEmitIntervalId) {
            clearInterval(this.candleEmitIntervalId);
            this.candleEmitIntervalId = null;
        }
    }
}
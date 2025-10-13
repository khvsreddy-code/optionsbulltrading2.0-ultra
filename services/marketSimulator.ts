import type { CandleData, Instrument } from '../types';
import * as animejs from 'animejs';
const anime = (animejs as any).default;

// --- A standard price movement generator for Equities ---
function generateNextEquityPrice(lastPrice: number): number {
    const volatility = 0.0015;
    const trend = (Math.random() - 0.495) * 0.05;
    const randomFactor = (Math.random() - 0.5) * 2;
    const changePercent = trend + randomFactor * volatility;
    let newPrice = lastPrice * (1 + changePercent);
    return Math.max(newPrice, 0.01);
}

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

        // 2. Generate random shock (approximating normal distribution)
        const shock = (Math.random() - 0.5) + (Math.random() - 0.5) + (Math.random() - 0.5);

        // 3. Generate jump (Levy-like behavior for black swans)
        let jump = 0;
        if (Math.random() < 0.0005) { // Low probability of a jump per tick
            const jumpMagnitude = (Math.random() * 0.015) - 0.0075; // Jump between -0.75% and +0.75%
            jump = jumpMagnitude;
        }

        // 4. Calculate return and new price
        const return_t = this.drift + shock * this.volatility + jump;
        const newPrice = this.lastPrice * (1 + return_t);

        // 5. Update state for the next tick
        this.lastReturnSq = return_t ** 2;
        this.lastPrice = newPrice;
        
        // 6. Generate synthetic volume correlated with volatility
        const baseVolume = 0.05;
        const volumeMultiplier = 1 + (Math.abs(return_t) / (this.volatility + 0.00001)) * 10;
        const volume = baseVolume * volumeMultiplier * (Math.random() + 0.5);

        return {
            price: Math.max(newPrice, 0.01),
            volume: volume,
        };
    }
}

export class MarketSimulator {
    private intervalId: number | null = null;
    private readonly instrument: Instrument;
    private cryptoGenerator: CryptoPriceGenerator | null = null;
    private lastPrice: number;

    constructor(instrument: Instrument) {
        this.instrument = instrument;
        this.lastPrice = instrument.last_price;
        if (this.instrument.instrument_type === 'CRYPTO') {
            this.cryptoGenerator = new CryptoPriceGenerator(this.lastPrice);
        }
    }

    public generateHistoricalData(count: number, periodInSeconds: number): CandleData[] {
        const data: CandleData[] = [];
        let lastClose = this.instrument.last_price * (1 - (Math.random() * 0.1));
        let currentTime = Math.floor(Date.now() / 1000) - count * periodInSeconds;
        
        const localGenerator = this.instrument.instrument_type === 'CRYPTO'
            ? new CryptoPriceGenerator(lastClose)
            : null;

        for (let i = 0; i < count; i++) {
            const open = lastClose;
            let high = open;
            let low = open;
            let close = open;
            let volume = 0;

            const ticksPerCandle = periodInSeconds > 60 ? 60 : periodInSeconds;
            for (let j = 0; j < ticksPerCandle; j++) {
                let tick;
                if(localGenerator) {
                    const cryptoTick = localGenerator.getNextTick();
                    tick = { price: cryptoTick.price, volume: cryptoTick.volume };
                } else {
                    tick = { price: generateNextEquityPrice(close), volume: Math.random() * 100 + 10 };
                }
                
                high = Math.max(high, tick.price);
                low = Math.min(low, tick.price);
                close = tick.price;
                volume += tick.volume;
            }
            
            if (low > open) low = open * 0.999;
            if (high < open) high = open * 1.001;
            if (close > high) high = close;
            if (close < low) close = low;

            const candle: CandleData = { time: currentTime, open, high, low, close, volume };
            data.push(candle);
            lastClose = close;
            currentTime += periodInSeconds;
        }
        
        this.lastPrice = lastClose;
        if(this.cryptoGenerator) {
            this.cryptoGenerator = new CryptoPriceGenerator(lastClose);
        }

        return data;
    }

    public start(callback: (tick: { price: number, volume: number, time: number }) => void): void {
        this.stop();
        const tickLoop = () => {
            let tick;
            if (this.cryptoGenerator) {
                tick = this.cryptoGenerator.getNextTick();
            } else {
                this.lastPrice = generateNextEquityPrice(this.lastPrice);
                tick = { price: this.lastPrice, volume: Math.random() * 10 + 1 };
            }

            callback({ ...tick, time: Date.now() });
            this.intervalId = window.setTimeout(tickLoop, anime.random(100, 400));
        };
        tickLoop();
    }

    public stop(): void {
        if (this.intervalId) {
            clearTimeout(this.intervalId);
            this.intervalId = null;
        }
    }
}

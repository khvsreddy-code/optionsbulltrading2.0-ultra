import type { CandleData, Instrument } from '../types';

// A more realistic price movement generator
function generateNextPrice(lastPrice: number): number {
    const volatility = 0.005; // Base volatility
    const trend = (Math.random() - 0.49) * 0.1; // Small trend bias
    const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
    const changePercent = trend + randomFactor * volatility;
    let newPrice = lastPrice * (1 + changePercent);
    return Math.max(newPrice, 0.01); // Ensure price doesn't go below zero
}

export class MarketSimulator {
    private lastCandle: CandleData;
    private intervalId: number | null = null;
    private readonly symbol: string;

    constructor(instrument: Instrument) {
        this.symbol = instrument.instrument_key;
        this.lastCandle = {
            time: Math.floor(Date.now() / 1000),
            open: instrument.last_price,
            high: instrument.last_price,
            low: instrument.last_price,
            close: instrument.last_price,
            volume: 100,
        };
    }

    public generateHistoricalData(count: number, periodInSeconds: number): CandleData[] {
        const data: CandleData[] = [];
        let lastClose = this.lastCandle.close;
        let currentTime = Math.floor(Date.now() / 1000) - count * periodInSeconds;

        for (let i = 0; i < count; i++) {
            const open = lastClose;
            let high = open;
            let low = open;
            let close = open;

            // Simulate some intraday volatility
            for (let j = 0; j < 10; j++) {
                const price = generateNextPrice(lastClose);
                high = Math.max(high, price);
                low = Math.min(low, price);
                close = price;
            }
            // Ensure OHLC makes sense
            if (low > open) low = open;
            if (high < open) high = open;
            if (close > high) high = close;
            if (close < low) low = close;

            const candle: CandleData = {
                time: currentTime,
                open: open,
                high: high,
                low: low,
                close: close,
                volume: Math.random() * 1000 + 100,
            };
            data.push(candle);
            lastClose = close;
            currentTime += periodInSeconds;
        }
        this.lastCandle = data[data.length > 0 ? data.length - 1 : 0];
        return data;
    }

    public start(callback: (tick: { price: number, volume: number, time: number }) => void): void {
        this.stop();
        this.intervalId = window.setInterval(() => {
            const newPrice = generateNextPrice(this.lastCandle.close);
            this.lastCandle.close = newPrice; // update for next tick
            callback({
                price: newPrice,
                volume: Math.random() * 10 + 1,
                time: Date.now(),
            });
        }, 1000); // Generate a new tick every second
    }

    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
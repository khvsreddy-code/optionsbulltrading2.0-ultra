import type { CandleData } from '../types';

export type Timeframe = '1s' | '1m' | '5m' | '15m' | '30m' | '45m';

/**
 * An ultra-realistic market simulator based on a sophisticated stochastic model.
 * This engine is designed to emulate the emergent statistical properties of a
 * Multi-Asset Agent-Based Model (MA-ABM) as specified by the user.
 *
 * Key features inspired by the hyper-realistic plan:
 * 1.  **Dynamic Volatility Core:** Implements a GARCH-like process to create realistic
 *     volatility clustering, where periods of high and low activity are grouped together.
 * 2.  **End-of-Period Auction Simulation:** In the final 5 seconds of minute-based
 *     timeframes, volatility is temporarily spiked to mimic close auction effects.
 * 3.  **High-Frequency Tick Generation:** Runs on a 50ms internal clock to generate
 *     a high-fidelity stream of tick data, which is the single source of truth.
 * 4.  **Realistic Candle Aggregation:**
 *     - Minute timeframes (1m, 5m, etc.): Provides real-time, streaming updates every second.
 *     - 1-second timeframe: Provides a finalized candle only after the interval is complete.
 */
export class MarketSimulator {
    private onTickCallback: (candle: CandleData, isUpdate: boolean) => void;
    private timeframe: Timeframe;
    private timeframeInSeconds: number;
    private tickIntervalId: ReturnType<typeof setInterval> | null = null;

    // --- Core Simulation State ---
    private lastPrice: number = 65000; // Realistic start for BTC/USDT
    private drift: number = 0;
    
    // --- Dynamic Volatility State (emulates GARCH/volatility clustering) ---
    private volatility: number = 0.4; // Current volatility
    private meanVolatility: number = 0.4; // Long-term average volatility
    private volatilityOfVolatility: number = 2.0; // How wildly volatility fluctuates
    private volatilityReversionSpeed: number = 5.0; // How fast it returns to the mean

    // --- High-Frequency Internal State ---
    private readonly INTERNAL_TICK_MS = 50; // 20 ticks per second
    private internalTickCounter: number = 0;
    private currentSecondCandle: CandleData | null = null;

    // --- Timeframe-Specific State ---
    private currentTimeframeCandle: CandleData | null = null;
    private secondsWithinCurrentTimeframe: number = 0;

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

    public async start(initialDataPoints = 300): Promise<CandleData[]> {
        if (this.tickIntervalId) this.stop();

        const historicalData = await this.generateHistoricalData(initialDataPoints);
        const lastHistoricalCandle = historicalData[historicalData.length - 1];
        this.lastPrice = lastHistoricalCandle.close;

        this.initializeLiveCandles(lastHistoricalCandle.time);
        this.tickIntervalId = setInterval(() => this.tick(), this.INTERNAL_TICK_MS);

        return historicalData;
    }

    public stop(): void {
        if (this.tickIntervalId) {
            clearInterval(this.tickIntervalId);
            this.tickIntervalId = null;
        }
    }

    private initializeLiveCandles(lastTime: number) {
        // The new live candle starts right after the last historical one ends.
        const nextTimeframeStartTime = lastTime + this.timeframeInSeconds;

        this.currentSecondCandle = {
            time: nextTimeframeStartTime, // The first second starts at the same time as the timeframe.
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

        // 1. Check for end-of-period auction effect
        let temporaryVolatility = this.volatility;
        if (this.timeframeInSeconds >= 60) {
            const secondsRemaining = this.timeframeInSeconds - (this.secondsWithinCurrentTimeframe % this.timeframeInSeconds);
            if (secondsRemaining <= 5 && secondsRemaining > 1) { // In the final 5 seconds
                temporaryVolatility *= 2.5; // Spike volatility for closing auction effect
            }
        }
        
        // 2. Generate new price based on the hyper-realistic model
        this.lastPrice = this.generateNextPriceTick(this.lastPrice, temporaryVolatility);
        
        // 3. Update the internal state of the current 1-second "micro-candle"
        this.currentSecondCandle.high = Math.max(this.currentSecondCandle.high, this.lastPrice);
        this.currentSecondCandle.low = Math.min(this.currentSecondCandle.low, this.lastPrice);
        this.currentSecondCandle.close = this.lastPrice;
        this.internalTickCounter++;

        // 4. Check if a full second has passed
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

    private generateHistoricalData(count: number): Promise<CandleData[]> {
        return new Promise(resolve => {
            const data: CandleData[] = [];
            let lastClose = this.lastPrice;
            const now = Math.floor(Date.now() / 1000);
            const alignedNow = now - (now % this.timeframeInSeconds);
            const startTime = alignedNow - (count * this.timeframeInSeconds);
            
            // Define a fixed number of ticks to generate for each historical candle.
            // This ensures consistent and fast performance regardless of the timeframe,
            // fixing the "stuck loading" bug on longer timeframes.
            const HISTORICAL_TICKS_PER_CANDLE = 100;
            
            for (let i = 0; i < count; i++) {
                const open = lastClose;
                let high = open;
                let low = open;
                let close = open;

                // The inner loop now has a fixed, smaller number of iterations.
                for (let j = 0; j < HISTORICAL_TICKS_PER_CANDLE; j++) {
                    // We still use the complex tick generator to get realistic candle shapes.
                    const tickPrice = this.generateNextPriceTick(close, this.volatility);
                    high = Math.max(high, tickPrice);
                    low = Math.min(low, tickPrice);
                    close = tickPrice;
                }
                data.push({ time: startTime + (i * this.timeframeInSeconds), open, high, low, close });
                lastClose = close;
            }
            this.lastPrice = lastClose;
            resolve(data);
        });
    }

    private generateNextPriceTick(lastPrice: number, currentVolatility: number): number {
        const dt_price = (1 / (365 * 24 * 60 * 60)) / (1000 / this.INTERNAL_TICK_MS);
        
        const mean = 65000;
        const reversionSpeed = 0.01;
        this.drift = reversionSpeed * (mean - lastPrice) * dt_price;

        // --- DYNAMIC VOLATILITY UPDATE (emulates GARCH/volatility clustering) ---
        const dt_vol = (1 / 252) / (1000 / this.INTERNAL_TICK_MS); // Update vol on a slower timescale
        const dV = this.volatilityReversionSpeed * (this.meanVolatility - this.volatility) * dt_vol +
                   this.volatilityOfVolatility * this.volatility * this.generateStandardNormal() * Math.sqrt(dt_vol);
        this.volatility = Math.max(0.1, this.volatility + dV); // Prevent negative vol

        const Z = this.generateStandardNormal();
        const volatilityComponent = currentVolatility * Z * Math.sqrt(dt_price);
        
        let newPrice = lastPrice * Math.exp(this.drift + volatilityComponent);

        if (Math.random() < 0.0001) { // Fat-tail event (news, liquidation cascade)
            newPrice *= (1 + (Math.random() - 0.5) * 0.01);
        }

        return isFinite(newPrice) && newPrice > 0 ? newPrice : lastPrice;
    }

    private generateStandardNormal(): number {
        // Box-Muller transform
        let u1 = 0, u2 = 0;
        while (u1 === 0) u1 = Math.random();
        while (u2 === 0) u2 = Math.random();
        return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    }
}
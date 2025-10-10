import type { CandleData } from '../types';

/**
 * A hyper-realistic, deterministic, seeded pseudo-random market simulator.
 * This engine now generates high-fidelity 1-MINUTE OHLCV bars, providing a vast
 * historical dataset. It also simulates a live, in-progress 1-minute bar that
 * updates every second for a real-time experience.
 */
export class MarketSimulator {
    private subscribers: Set<(tick: CandleData) => void> = new Set();
    private readonly INTERNAL_TICK_MS = 1000;
    private tickIntervalId: ReturnType<typeof setInterval> | null = null;

    private history: CandleData[] = [];
    private lastFinalizedBar: CandleData;
    private liveBar: CandleData | null = null;
    
    private seed: number = 0;
    private prng: () => number;

    // State for volatility clustering
    private volatilityRegime: 'LOW' | 'NORMAL' | 'HIGH' = 'NORMAL';
    private regimeCounter: number = 0;

    constructor(seedString: string) {
        // Create a numeric seed from the string for reproducibility
        for (let i = 0; i < seedString.length; i++) {
            this.seed = (this.seed << 5) - this.seed + seedString.charCodeAt(i);
            this.seed |= 0; // Convert to 32bit integer
        }
        this.prng = this.mulberry32(this.seed);

        // This property now represents the initial price before history generation
        this.lastFinalizedBar = { time: 0, open: 65000, high: 65000, low: 65000, close: 65000, volume: 0 };
        this.generateInitialHistory();
    }
    
    private mulberry32(a: number) {
        return () => {
          let t = a += 0x6D2B79F5;
          t = Math.imul(t ^ t >>> 15, t | 1);
          t ^= t + Math.imul(t ^ t >>> 7, t | 61);
          return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }

    private updateVolatilityRegime() {
        this.regimeCounter--;
        if (this.regimeCounter <= 0) {
            const rand = this.prng();
            if (this.volatilityRegime !== 'HIGH' && rand < 0.05) {
                this.volatilityRegime = 'HIGH';
                this.regimeCounter = Math.floor(this.prng() * 120) + 60; 
            } else if (this.volatilityRegime !== 'LOW' && rand < 0.15) {
                this.volatilityRegime = 'LOW';
                this.regimeCounter = Math.floor(this.prng() * 300) + 120;
            } else { 
                this.volatilityRegime = 'NORMAL';
                this.regimeCounter = Math.floor(this.prng() * 600) + 300;
            }
        }
    }

    private generateNextMinuteBar(lastBar: CandleData): CandleData {
        const open = lastBar.close;
        let high = open;
        let low = open;
        let volume = 0;
        let currentPrice = open;

        // Simulate 60 seconds of ticks to build a realistic 1-minute bar
        for (let i = 0; i < 60; i++) {
            this.updateVolatilityRegime();
            const baseVolatility = { LOW: 0.0001, NORMAL: 0.0003, HIGH: 0.0009 };
            const effectiveVolatility = baseVolatility[this.volatilityRegime];
            const change = (this.prng() - 0.5) * currentPrice * effectiveVolatility * 2;
            currentPrice += change;
            high = Math.max(high, currentPrice);
            low = Math.min(low, currentPrice);
            volume += Math.floor(this.prng() * 1e8);
        }
        
        return {
            time: lastBar.time + 60,
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(currentPrice.toFixed(2)),
            volume
        };
    }

    private generateInitialHistory(): void {
        const history: CandleData[] = [];
        // Generate 100,000 minutes of data. This provides ~6,666 bars on a 15m chart.
        const numMinutes = 100000;
        const now = Math.floor(Date.now() / 1000);
        // Align start time to the beginning of a minute
        const startTime = (now - (now % 60)) - (numMinutes * 60);

        let currentBar: CandleData = { 
            time: startTime - 60,
            open: this.lastFinalizedBar.open, high: this.lastFinalizedBar.open, 
            low: this.lastFinalizedBar.open, close: this.lastFinalizedBar.close, 
            volume: 0 
        };

        for (let i = 0; i < numMinutes; i++) {
            currentBar = this.generateNextMinuteBar(currentBar);
            history.push(currentBar);
        }
        this.history = history;
        this.lastFinalizedBar = history.length > 0 ? history[history.length - 1] : this.lastFinalizedBar;
    }

    public start(): void {
        if (this.tickIntervalId) this.stop();
        this.tickIntervalId = setInterval(() => this.tick(), this.INTERNAL_TICK_MS);
    }

    public stop(): void {
        if (this.tickIntervalId) {
            clearInterval(this.tickIntervalId);
            this.tickIntervalId = null;
        }
    }

    public subscribe(callback: (tick: CandleData) => void): () => void {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }
    
    public tick(): void {
        const nowSeconds = Math.floor(Date.now() / 1000);
        const barStartTime = nowSeconds - (nowSeconds % 60);

        if (!this.liveBar || this.liveBar.time !== barStartTime) {
            // Finalize the old bar if it exists
            if (this.liveBar) {
                this.history.push(this.liveBar);
                if (this.history.length > 110000) this.history.shift(); // Keep buffer
                this.lastFinalizedBar = this.liveBar;
            }
            // Start a new live bar
            this.liveBar = {
                time: barStartTime,
                open: this.lastFinalizedBar.close,
                high: this.lastFinalizedBar.close,
                low: this.lastFinalizedBar.close,
                close: this.lastFinalizedBar.close,
                volume: 0,
            };
        }

        // Simulate an intra-minute price update
        this.updateVolatilityRegime(); // Update volatility every second
        const baseVolatility = { LOW: 0.00005, NORMAL: 0.0001, HIGH: 0.0003 };
        const rand = this.prng() - 0.5;
        const change = rand * this.liveBar.close * baseVolatility[this.volatilityRegime];
        
        const newPrice = parseFloat((this.liveBar.close + change).toFixed(2));
        
        this.liveBar.close = newPrice;
        this.liveBar.high = Math.max(this.liveBar.high, newPrice);
        this.liveBar.low = Math.min(this.liveBar.low, newPrice);
        
        const volumeThisSecond = Math.floor(this.prng() * 1e7);
        this.liveBar.volume = (this.liveBar.volume || 0) + volumeThisSecond;
        
        this.notifySubscribers(this.liveBar);
    }

    private notifySubscribers(tick: CandleData): void {
        this.subscribers.forEach(callback => callback(tick));
    }
    
    public getFullHistory(): CandleData[] {
        return [...this.history];
    }
}
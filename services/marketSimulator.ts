import type { CandleData } from '../types';

/**
 * A hyper-realistic, state-based market simulator.
 * This engine models market phases, volatility clustering, and rare events to
 * generate authentic-looking price action. It produces high-fidelity 1-MINUTE OHLCV
 * bars as its base, which are then aggregated by the view layer.
 */
export class MarketSimulator {
    private subscribers: Set<(tick: CandleData) => void> = new Set();
    private readonly INTERNAL_TICK_MS = 1000;
    private tickIntervalId: ReturnType<typeof setInterval> | null = null;
    private history: CandleData[] = [];
    private liveBar: CandleData | null = null;
    
    // --- State Machine & Behavioral Modeling ---
    private marketPhase: 'BULL' | 'BEAR' | 'CONSOLIDATION' = 'CONSOLIDATION';
    private phaseCounter: number = 0;
    private volatility: number = 0.0003;
    private fearAndGreed: number = 50; // 0 (extreme fear) to 100 (extreme greed)
    private prng: () => number;

    constructor(seedString: string) {
        let seed = 0;
        for (let i = 0; i < seedString.length; i++) {
            seed = (seed << 5) - seed + seedString.charCodeAt(i);
            seed |= 0;
        }
        this.prng = this.mulberry32(seed);

        this.generateInitialHistory();
    }
    
    private mulberry32(a: number): () => number {
        return () => {
          let t = a += 0x6D2B79F5;
          t = Math.imul(t ^ t >>> 15, t | 1);
          t ^= t + Math.imul(t ^ t >>> 7, t | 61);
          return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }

    private updateMarketState(lastClose: number): void {
        this.phaseCounter--;

        // Update Fear & Greed Index
        if (this.marketPhase === 'BULL') this.fearAndGreed = Math.min(100, this.fearAndGreed + this.prng() * 0.5);
        else if (this.marketPhase === 'BEAR') this.fearAndGreed = Math.max(0, this.fearAndGreed - this.prng() * 0.5);
        else this.fearAndGreed += (50 - this.fearAndGreed) * 0.05; // Mean revert

        if (this.phaseCounter <= 0) {
            const rand = this.prng();
            if (this.marketPhase === 'CONSOLIDATION') {
                this.marketPhase = rand > 0.5 ? 'BULL' : 'BEAR';
                this.phaseCounter = 240 + Math.floor(this.prng() * 480); // 4-12 hours trend
                this.volatility = 0.0004 + this.prng() * 0.0005; // Higher volatility in trends
            } else { // Was in a trend
                if ((this.marketPhase === 'BULL' && this.fearAndGreed > 90 && rand < 0.6) || (this.marketPhase === 'BEAR' && this.fearAndGreed < 10 && rand < 0.6)) {
                     // High chance of reversal after extreme sentiment
                    this.marketPhase = this.marketPhase === 'BULL' ? 'BEAR' : 'BULL';
                    this.phaseCounter = 120 + Math.floor(this.prng() * 360);
                    this.volatility = 0.0006 + this.prng() * 0.0006; // Reversals are volatile
                } else {
                    this.marketPhase = 'CONSOLIDATION';
                    this.phaseCounter = 180 + Math.floor(this.prng() * 600); // 3-10 hours consolidation
                    this.volatility = 0.0002 + this.prng() * 0.0002; // Lower volatility in consolidation
                }
            }
        }
    }

    private generateNextMinuteBar(lastBar: CandleData): CandleData {
        this.updateMarketState(lastBar.close);
        
        let drift: number;
        switch (this.marketPhase) {
            case 'BULL': drift = this.volatility * 0.1; break;
            case 'BEAR': drift = -this.volatility * 0.1; break;
            default: drift = 0;
        }

        let open = lastBar.close;
        let high = open;
        let low = open;
        let currentPrice = open;
        
        // Simulate ticks within the minute for realistic OHLC
        for (let i = 0; i < 60; i++) {
            let tickVolatility = this.volatility;
            // Probabilistic events for "fat tails"
            if (this.prng() < 0.001) tickVolatility *= 5; // Flash crash/spike event
            
            const change = drift / 60 + (this.prng() - 0.5) * currentPrice * tickVolatility;
            currentPrice += change;
            high = Math.max(high, currentPrice);
            low = Math.min(low, currentPrice);
        }

        // Session-based volume simulation
        const hour = new Date((lastBar.time + 60) * 1000).getUTCHours();
        let volumeMultiplier = 0.5; // Off-hours
        if (hour >= 1 && hour < 7) volumeMultiplier = 1.0; // Asian session
        if (hour >= 7 && hour < 13) volumeMultiplier = 1.5; // European session
        if (hour >= 13 && hour < 21) volumeMultiplier = 2.0; // US session

        const volume = (5e6 + this.prng() * 1e8) * volumeMultiplier;

        return {
            time: lastBar.time + 60,
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(currentPrice.toFixed(2)),
            volume,
        };
    }

    private generateInitialHistory(): void {
        const numMinutes = 150000; // ~104 days of 1-minute data
        const now = Math.floor(Date.now() / 1000);
        const startTime = (now - (now % 60)) - (numMinutes * 60);

        let currentBar: CandleData = { 
            time: startTime - 60, open: 65000, high: 65000, low: 65000, close: 65000, volume: 0 
        };

        for (let i = 0; i < numMinutes; i++) {
            currentBar = this.generateNextMinuteBar(currentBar);
            this.history.push(currentBar);
        }
    }

    public start(): void {
        if (this.tickIntervalId) this.stop();
        // Start the live tick simulation
        const lastHistoricalBar = this.history.length > 0 ? this.history[this.history.length - 1] : { time: 0, close: 65000 };
        this.liveBar = {
            time: (lastHistoricalBar.time - (lastHistoricalBar.time % 60)) + 60,
            open: lastHistoricalBar.close, high: lastHistoricalBar.close, low: lastHistoricalBar.close, close: lastHistoricalBar.close, volume: 0,
        };
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
        if (!this.liveBar) return;
        
        const nowSeconds = Math.floor(Date.now() / 1000);
        const barStartTime = nowSeconds - (nowSeconds % 60);

        if (this.liveBar.time !== barStartTime) {
            this.history.push(this.liveBar);
            if (this.history.length > 160000) this.history.shift();
            
            this.liveBar = {
                time: barStartTime, open: this.liveBar.close, high: this.liveBar.close, low: this.liveBar.close, close: this.liveBar.close, volume: 0,
            };
        }

        // Simulate an intra-minute price update
        this.updateMarketState(this.liveBar.close);
        let drift: number;
        switch (this.marketPhase) {
            case 'BULL': drift = this.volatility * 0.1; break;
            case 'BEAR': drift = -this.volatility * 0.1; break;
            default: drift = 0;
        }
        
        const change = drift / 60 + (this.prng() - 0.5) * this.liveBar.close * this.volatility;
        const newPrice = parseFloat((this.liveBar.close + change).toFixed(2));
        
        this.liveBar.close = newPrice;
        this.liveBar.high = Math.max(this.liveBar.high, newPrice);
        this.liveBar.low = Math.min(this.liveBar.low, newPrice);
        this.liveBar.volume = (this.liveBar.volume || 0) + (Math.floor(this.prng() * 1e7));
        
        this.subscribers.forEach(cb => cb(this.liveBar!));
    }
    
    public getFullHistory(): CandleData[] {
        return [...this.history];
    }
}

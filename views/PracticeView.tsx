import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import type { CandleData, Instrument, Order, OrderSide, Portfolio, Position, Trade, Timeframe } from '../types';
import { curatedStocks } from '../data/curatedStocks';
import { MarketSimulator } from '../services/marketSimulator';
import { createInitialPortfolio, executeOrder, updatePortfolioValue } from '../services/simulationService';
import { loadPortfolio, savePortfolio } from '../services/portfolioService';

// Components
import SimulatorHeader from '../components/practice/SimulatorHeader';
import ChartHeader from '../components/practice/ChartHeader';
import ChartComponent from '../components/practice/ChartComponent';
import PositionManagerDialog from '../components/practice/PositionManagerDialog';
import OrderDialog from '../components/practice/OrderDialog';
import BottomPanel from '../components/practice/BottomPanel';
import WelcomeDialog from '../components/practice/WelcomeDialog';


interface PracticeViewProps {
  onNavigate: (path: string) => void;
  theme: 'light' | 'dark';
}

interface ChartComponentHandle {
    updateCandle: (candle: CandleData) => void;
}

const TIMEFRAME_SECONDS_MAP: Record<Timeframe, number> = { '1s': 1, '1m': 60, '5m': 300, '15m': 900, '30m': 1800, '45m': 2700 };

// Centralized aggregation logic to handle new volume data.
const aggregateHistory = (ticks: CandleData[], timeframe: Timeframe): CandleData[] => {
    if (timeframe === '1s') return [...ticks];
    if (ticks.length === 0) return [];
    
    const aggregated: CandleData[] = [];
    const periodInSeconds = TIMEFRAME_SECONDS_MAP[timeframe];
    
    let currentCandle: CandleData | null = null;
    for (const tick of ticks) {
        const candleStartTime = tick.time - (tick.time % periodInSeconds);
        if (!currentCandle || currentCandle.time !== candleStartTime) {
            if (currentCandle) aggregated.push(currentCandle);
            currentCandle = {
                time: candleStartTime,
                open: tick.open,
                high: tick.high,
                low: tick.low,
                close: tick.close,
                volume: tick.volume || 0,
            };
        } else {
            currentCandle.high = Math.max(currentCandle.high, tick.high);
            currentCandle.low = Math.min(currentCandle.low, tick.low);
            currentCandle.close = tick.close;
            currentCandle.volume = (currentCandle.volume || 0) + (tick.volume || 0);
        }
    }
    if (currentCandle) aggregated.push(currentCandle);

    return aggregated;
};


const PracticeView: React.FC<PracticeViewProps> = ({ onNavigate, theme }) => {
    const [instruments, setInstruments] = useState<Instrument[]>(curatedStocks);
    const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
    const [initialChartData, setInitialChartData] = useState<CandleData[]>([]);
    const [liveOhlc, setLiveOhlc] = useState<CandleData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [portfolio, setPortfolio] = useState<Portfolio>(createInitialPortfolio());
    const [isPositionManagerOpen, setIsPositionManagerOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [timeframe, setTimeframe] = useState<Timeframe>('1m');
    const [showWelcome, setShowWelcome] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
    const [orderDialogSide, setOrderDialogSide] = useState<OrderSide>('BUY');

    const simulatorRef = useRef<MarketSimulator | null>(null);
    const chartComponentRef = useRef<ChartComponentHandle>(null);
    const saveTimeoutRef = useRef<number | null>(null);
    
    const tickHistoryRef = useRef<CandleData[]>([]);
    const liveAggregatedCandleRef = useRef<CandleData | null>(null);

    // Debounced portfolio saving
    useEffect(() => {
        if (isLoading) return; 

        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        
        saveTimeoutRef.current = window.setTimeout(() => {
            savePortfolio(portfolio);
        }, 1500); 

        return () => {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        };
    }, [portfolio, isLoading]);

    // Main initialization effect
    useEffect(() => {
        const initialize = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const { portfolio: loadedPortfolio } = await loadPortfolio();
                
                const dailySeed = new Date().toISOString().slice(0, 10);
                const sim = new MarketSimulator(dailySeed);
                simulatorRef.current = sim;
                
                const fullHistory = sim.getFullHistory();
                tickHistoryRef.current = fullHistory;

                const currentPrice = fullHistory.length > 0 ? fullHistory[fullHistory.length - 1].close : 65000;
                
                const initialInstrument = instruments.find(i => i.tradingsymbol === 'BTCUSDT') || instruments[0];
                setSelectedInstrument(initialInstrument);
                
                const livePrices: { [key: string]: number } = { [initialInstrument.instrument_key]: currentPrice };
                const updatedPortfolio = updatePortfolioValue(loadedPortfolio, livePrices);
                setPortfolio(updatedPortfolio);

                const initialAggregatedData = aggregateHistory(fullHistory, timeframe);
                setInitialChartData(initialAggregatedData);
                const lastCandle = initialAggregatedData.length > 0 ? initialAggregatedData[initialAggregatedData.length - 1] : null;
                setLiveOhlc(lastCandle);
                liveAggregatedCandleRef.current = lastCandle;

                setInstruments(prev => prev.map(inst => ({ ...inst, last_price: currentPrice })));
                
                sim.start();
                setIsLoading(false);

            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
                setIsLoading(false);
            }
        };

        initialize();

        if (!localStorage.getItem('hasSeenSimulatorWelcome')) {
            const timer = setTimeout(() => setShowWelcome(true), 500);
            return () => clearTimeout(timer);
        }

        return () => {
            simulatorRef.current?.stop();
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        };
    }, []); 

    // Effect for handling live 1-second ticks
    useEffect(() => {
        if (isLoading || !simulatorRef.current) return;

        const handleTick = (tick: CandleData) => {
            tickHistoryRef.current.push(tick);
            if (tickHistoryRef.current.length > 50000) tickHistoryRef.current.shift();

            const periodInSeconds = TIMEFRAME_SECONDS_MAP[timeframe];
            const candleStartTime = tick.time - (tick.time % periodInSeconds);
            
            let currentAggregatedCandle = liveAggregatedCandleRef.current;

            if (currentAggregatedCandle && currentAggregatedCandle.time === candleStartTime) {
                currentAggregatedCandle.high = Math.max(currentAggregatedCandle.high, tick.high);
                currentAggregatedCandle.low = Math.min(currentAggregatedCandle.low, tick.low);
                currentAggregatedCandle.close = tick.close;
                currentAggregatedCandle.volume = (currentAggregatedCandle.volume || 0) + (tick.volume || 0);
            } else {
                currentAggregatedCandle = { ...tick };
            }
            liveAggregatedCandleRef.current = currentAggregatedCandle;
            
            chartComponentRef.current?.updateCandle(currentAggregatedCandle);
            setLiveOhlc(currentAggregatedCandle);
            
            if (selectedInstrument) {
                 setInstruments(prev => prev.map(inst =>
                    inst.instrument_key === selectedInstrument.instrument_key
                        ? { ...inst, last_price: tick.close }
                        : inst
                ));
                setPortfolio(prev => updatePortfolioValue(prev, { [selectedInstrument.instrument_key]: tick.close }));
            }
        };

        const unsubscribe = simulatorRef.current.subscribe(handleTick);
        return () => unsubscribe();

    }, [isLoading, timeframe, selectedInstrument]);

    // Effect for changing timeframe
    useEffect(() => {
        if (isLoading) return;
        
        let newAggregatedData = aggregateHistory(tickHistoryRef.current, timeframe);

        if (timeframe === '1s' && newAggregatedData.length > 3600) {
            newAggregatedData = newAggregatedData.slice(-3600);
        }
        
        setInitialChartData(newAggregatedData);
        const lastCandle = newAggregatedData.length > 0 ? newAggregatedData[newAggregatedData.length - 1] : null;
        liveAggregatedCandleRef.current = lastCandle;
        setLiveOhlc(lastCandle);
    }, [timeframe, isLoading]);
    
    const savePortfolioNow = (portfolioState: Portfolio): Portfolio => {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        savePortfolio(portfolioState);
        return portfolioState;
    };

    const handleOpenOrderDialog = (side: OrderSide) => {
        setOrderDialogSide(side);
        setIsOrderDialogOpen(true);
    };

    const handlePlaceOrder = (side: OrderSide, quantity: number) => {
        if (!selectedInstrument || quantity <= 0) return;
        
        const currentInstrument = instruments.find(i => i.instrument_key === selectedInstrument.instrument_key);
        if (!currentInstrument) return;

        const newOrder: Order = {
            id: `ord_${Date.now()}`,
            instrument: currentInstrument,
            type: 'MARKET', side, quantity, status: 'OPEN',
            createdAt: Date.now() / 1000,
        };
        
        setPortfolio(prevPortfolio => savePortfolioNow(executeOrder(prevPortfolio, newOrder, currentInstrument.last_price)));
    };

    const handleOpenPositionManager = (position: Position) => {
        setSelectedPosition(position);
        setIsPositionManagerOpen(true);
    };
    
    const handleClosePosition = (instrumentKey: string, quantity: number) => {
        const instrument = instruments.find(i => i.instrument_key === instrumentKey);
        if (!instrument) return;
        
        setPortfolio(prevPortfolio => {
            const positionToClose = prevPortfolio.positions.find(p => p.instrument.instrument_key === instrumentKey);
            if (!positionToClose) return prevPortfolio;

            const closingSide: OrderSide = positionToClose.quantity > 0 ? 'SELL' : 'BUY';
            
            const closeOrder: Order = {
                id: `ord_close_${Date.now()}`,
                instrument: instrument, type: 'MARKET', side: closingSide,
                quantity: quantity, status: 'OPEN', createdAt: Date.now() / 1000,
            };
            
            return savePortfolioNow(executeOrder(prevPortfolio, closeOrder, instrument.last_price));
        });
    };
    
    const handleReversePosition = (position: Position) => {
        if (!position) return;
        const instrument = instruments.find(i => i.instrument_key === position.instrument.instrument_key);
        if (!instrument) return;
    
        const reverseQuantity = Math.abs(position.quantity) * 2;
        const reverseSide: OrderSide = position.quantity > 0 ? 'SELL' : 'BUY';
    
        const reverseOrder: Order = {
            id: `ord_reverse_${Date.now()}`,
            instrument: instrument, type: 'MARKET', side: reverseSide,
            quantity: reverseQuantity, status: 'OPEN', createdAt: Date.now() / 1000,
        };
    
        setPortfolio(prevPortfolio => savePortfolioNow(executeOrder(prevPortfolio, reverseOrder, instrument.last_price)));
    };

    const handleResetPortfolio = async () => {
        if (window.confirm('Are you sure you want to reset your portfolio? This will erase all trades and reset your balance.')) {
            const newPortfolio = createInitialPortfolio();
            setPortfolio(newPortfolio);
            await savePortfolio(newPortfolio);
        }
    };
    
    const handleManageFunds = () => {
        const result = window.prompt(`Enter desired total portfolio value.\nCurrent: ₹${portfolio.totalValue.toFixed(2)}`, portfolio.totalValue.toFixed(0));
        if (result === null) return;
        const newTotalValue = parseFloat(result);
        if (isNaN(newTotalValue) || newTotalValue < 100000) {
            alert("Invalid input. Please enter a number >= 1,00,000.");
            return;
        }

        setPortfolio(prevPortfolio => savePortfolioNow({ ...prevPortfolio, cash: prevPortfolio.cash + (newTotalValue - prevPortfolio.totalValue) }));
    };

    if (error) {
        return (
            <div className="bg-[#131722] text-white h-screen flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-xl font-bold text-red-500">Failed to Load Simulator</h2>
                <p className="text-slate-400 mt-2 max-w-md">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-primary text-white font-semibold rounded-lg">
                    Refresh Page
                </button>
            </div>
        );
    }

    const displayedInstrument = instruments.find(i => i.instrument_key === selectedInstrument?.instrument_key) || selectedInstrument;

    return (
        <div className="bg-[#131722] text-white h-screen flex flex-col font-sans">
            <WelcomeDialog isOpen={showWelcome} onClose={() => { setShowWelcome(false); localStorage.setItem('hasSeenSimulatorWelcome', 'true'); }} />
            <SimulatorHeader onNavigate={onNavigate} title="Market Simulator" />
            
            <div className="practice-container">
                <main className="practice-canvas-container flex flex-col">
                    <ChartHeader
                        instruments={instruments} onSelectInstrument={setSelectedInstrument} selectedInstrument={selectedInstrument}
                        selectedTimeframe={timeframe} onSelectTimeframe={setTimeframe} liveOhlc={liveOhlc}
                        onTradeButtonClick={handleOpenOrderDialog}
                    />
                    <div className="flex-grow relative">
                        {isLoading ? (
                             <div className="absolute inset-0 flex items-center justify-center bg-[#131722]/80 z-30">
                                <svg className="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                             </div>
                        ) : (
                           <ChartComponent 
                               ref={chartComponentRef}
                               key={selectedInstrument ? selectedInstrument.instrument_key + timeframe : timeframe}
                               initialData={initialChartData}
                               timeframe={timeframe}
                           />
                        )}
                    </div>
                </main>
            </div>
            <BottomPanel
                portfolio={portfolio} onPositionClick={handleOpenPositionManager} onReversePosition={handleReversePosition}
                onResetPortfolio={handleResetPortfolio} onManageFunds={handleManageFunds}
            />
            
            <PositionManagerDialog
                position={selectedPosition} isOpen={isPositionManagerOpen} onClose={() => setIsPositionManagerOpen(false)}
                onClosePosition={handleClosePosition}
            />
            <OrderDialog
                instrument={displayedInstrument} isOpen={isOrderDialogOpen} onClose={() => setIsOrderDialogOpen(false)}
                onPlaceOrder={handlePlaceOrder} initialSide={orderDialogSide}
            />
        </div>
    );
};

export default PracticeView;

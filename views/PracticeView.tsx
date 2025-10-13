import React, { useState, useEffect, useRef, useLayoutEffect, useContext, useCallback } from 'react';
import type { CandleData, Instrument, Order, OrderSide, Portfolio, Position, Trade, Timeframe } from '../types';
import { curatedStocks } from '../data/curatedStocks';
import { MarketSimulator } from '../services/marketSimulator';
import { createInitialPortfolio, executeOrder, updatePortfolioValue } from '../services/simulationService';
import { loadPortfolio, savePortfolio } from '../services/portfolioService';
import { ThemeContext } from '../App';

// Components
import SimulatorHeader from '../components/practice/SimulatorHeader';
import ChartHeader from '../components/practice/ChartHeader';
import ChartComponent from '../components/practice/ChartComponent';
import PositionManagerDialog from '../components/practice/PositionManagerDialog';
import OrderDialog from '../components/practice/OrderDialog';
import BottomPanel from '../components/practice/BottomPanel';
import WelcomeDialog from '../components/practice/WelcomeDialog';
import PortfolioBar from '../components/practice/PortfolioBar';

interface PracticeViewProps {
  onNavigate: (path: string) => void;
}

export type DrawingTool = 'cursor' | 'trendline' | 'horizontal';
export interface Drawing {
  id: string;
  type: DrawingTool;
  [key: string]: any;
}


interface ChartComponentHandle {
    updateCandle: (candle: CandleData) => void;
}

const TIMEFRAME_SECONDS_MAP: Record<Timeframe, number> = { '1m': 60, '5m': 300, '15m': 900, '30m': 1800, '45m': 2700 };

const aggregateHistory = (minuteBars: CandleData[], timeframe: Timeframe): CandleData[] => {
    if (timeframe === '1m') return [...minuteBars];
    if (minuteBars.length === 0) return [];
    
    const aggregated: CandleData[] = [];
    const periodInSeconds = TIMEFRAME_SECONDS_MAP[timeframe];
    
    let currentCandle: CandleData | null = null;
    for (const bar of minuteBars) {
        const candleStartTime = bar.time - (bar.time % periodInSeconds);
        if (!currentCandle || currentCandle.time !== candleStartTime) {
            if (currentCandle) aggregated.push(currentCandle);
            currentCandle = { ...bar, time: candleStartTime };
        } else {
            currentCandle.high = Math.max(currentCandle.high, bar.high);
            currentCandle.low = Math.min(currentCandle.low, bar.low);
            currentCandle.close = bar.close;
            currentCandle.volume = (currentCandle.volume || 0) + (bar.volume || 0);
        }
    }
    if (currentCandle) aggregated.push(currentCandle);

    return aggregated;
};


const PracticeView: React.FC<PracticeViewProps> = ({ onNavigate }) => {
    const { theme } = useContext(ThemeContext);
    const [instruments, setInstruments] = useState<Instrument[]>(curatedStocks);
    const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
    const [initialChartData, setInitialChartData] = useState<CandleData[]>([]);
    const [liveOhlc, setLiveOhlc] = useState<CandleData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [portfolio, setPortfolio] = useState<Portfolio>(createInitialPortfolio());
    const [isPositionManagerOpen, setIsPositionManagerOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [timeframe, setTimeframe] = useState<Timeframe>('15m'); // Default to 15m
    const [showWelcome, setShowWelcome] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
    const [orderDialogSide, setOrderDialogSide] = useState<OrderSide>('BUY');
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
    
    // Drawing state
    const [activeDrawingTool, setActiveDrawingTool] = useState<DrawingTool>('cursor');
    const [drawings, setDrawings] = useState<Drawing[]>([]);

    const simulatorRef = useRef<MarketSimulator | null>(null);
    const chartComponentRef = useRef<ChartComponentHandle>(null);
    const saveTimeoutRef = useRef<number | null>(null);
    
    const liveAggregatedCandleRef = useRef<CandleData | null>(null);
    const prevLiveMinuteBarRef = useRef<CandleData | null>(null);

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
                
                const fullHistory = sim.getFullHistory(); // This is now an array of 1-minute bars

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

    // Effect for handling live bar updates
    useEffect(() => {
        if (isLoading || !simulatorRef.current) return;

        const handleTick = (liveMinuteBar: CandleData) => {
            // Update portfolio and instrument price first
            if (selectedInstrument) {
                 setInstruments(prev => prev.map(inst =>
                    inst.instrument_key === selectedInstrument.instrument_key
                        ? { ...inst, last_price: liveMinuteBar.close }
                        : inst
                ));
                setPortfolio(prev => updatePortfolioValue(prev, { [selectedInstrument.instrument_key]: liveMinuteBar.close }));
            }

            const periodInSeconds = TIMEFRAME_SECONDS_MAP[timeframe];
            const candleStartTime = liveMinuteBar.time - (liveMinuteBar.time % periodInSeconds);
            let currentAggregatedCandle = liveAggregatedCandleRef.current;
            const prevLiveMinuteBar = prevLiveMinuteBarRef.current;

            if (currentAggregatedCandle && currentAggregatedCandle.time === candleStartTime) {
                // Update existing aggregated candle
                currentAggregatedCandle.high = Math.max(currentAggregatedCandle.high, liveMinuteBar.high);
                currentAggregatedCandle.low = Math.min(currentAggregatedCandle.low, liveMinuteBar.low);
                currentAggregatedCandle.close = liveMinuteBar.close;

                // Update volume by delta
                if (prevLiveMinuteBar && prevLiveMinuteBar.time === liveMinuteBar.time) {
                    const volumeDelta = (liveMinuteBar.volume || 0) - (prevLiveMinuteBar.volume || 0);
                    currentAggregatedCandle.volume = (currentAggregatedCandle.volume || 0) + volumeDelta;
                } else {
                    // First tick of a new minute bar within the same aggregated candle
                    currentAggregatedCandle.volume = (currentAggregatedCandle.volume || 0) + (liveMinuteBar.volume || 0);
                }
            } else {
                // New aggregated candle starts
                currentAggregatedCandle = {
                    time: candleStartTime,
                    open: liveMinuteBar.open,
                    high: liveMinuteBar.high,
                    low: liveMinuteBar.low,
                    close: liveMinuteBar.close,
                    volume: liveMinuteBar.volume
                };
            }
            
            liveAggregatedCandleRef.current = currentAggregatedCandle;
            prevLiveMinuteBarRef.current = { ...liveMinuteBar }; // Store a copy for the next tick's delta calculation

            chartComponentRef.current?.updateCandle(currentAggregatedCandle);
            setLiveOhlc(currentAggregatedCandle);
        };

        const unsubscribe = simulatorRef.current.subscribe(handleTick);
        return () => unsubscribe();

    }, [isLoading, timeframe, selectedInstrument]);

    // Effect for changing timeframe
    useEffect(() => {
        if (isLoading || !simulatorRef.current) return;
        
        // Fetch the most up-to-date history from the simulator
        const fullHistory = simulatorRef.current.getFullHistory();
        let newAggregatedData = aggregateHistory(fullHistory, timeframe);

        const MAX_BARS_ON_CHART = 10000;
        if (newAggregatedData.length > MAX_BARS_ON_CHART) {
            newAggregatedData = newAggregatedData.slice(-MAX_BARS_ON_CHART);
        }
        
        setInitialChartData(newAggregatedData);
        const lastCandle = newAggregatedData.length > 0 ? newAggregatedData[newAggregatedData.length - 1] : null;
        liveAggregatedCandleRef.current = lastCandle;
        prevLiveMinuteBarRef.current = null; // Reset for new aggregation
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

    const handleDrawingComplete = useCallback((newDrawing: Drawing) => {
        setDrawings(prev => [...prev, newDrawing]);
        setActiveDrawingTool('cursor');
    }, []);

    if (error) {
        return (
            <div className="bg-background text-text-main h-screen flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-xl font-bold text-red-500">Failed to Load Simulator</h2>
                <p className="text-text-secondary mt-2 max-w-md">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-primary text-white font-semibold rounded-lg">
                    Refresh Page
                </button>
            </div>
        );
    }

    const displayedInstrument = instruments.find(i => i.instrument_key === selectedInstrument?.instrument_key) || selectedInstrument;

    return (
        <div className="bg-background text-text-main h-screen flex flex-col font-sans">
            <WelcomeDialog isOpen={showWelcome} onClose={() => { setShowWelcome(false); localStorage.setItem('hasSeenSimulatorWelcome', 'true'); }} />
            <SimulatorHeader title="Market Simulator" />
            
            <main className="flex-grow flex flex-col">
                <ChartHeader
                    instruments={instruments} onSelectInstrument={setSelectedInstrument} selectedInstrument={selectedInstrument}
                    selectedTimeframe={timeframe} onSelectTimeframe={setTimeframe} liveOhlc={liveOhlc}
                    onTradeButtonClick={handleOpenOrderDialog}
                    activeTool={activeDrawingTool}
                    onSelectTool={(tool) => setActiveDrawingTool(tool)}
                    onClearDrawings={() => setDrawings([])}
                />
                <div className="flex-grow relative">
                    {isLoading ? (
                         <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-30">
                            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                           theme={theme}
                           activeDrawingTool={activeDrawingTool}
                           drawings={drawings}
                           onDrawingComplete={handleDrawingComplete}
                       />
                    )}
                </div>
            </main>
            
            {isPortfolioOpen ? (
                <BottomPanel
                    portfolio={portfolio}
                    onPositionClick={handleOpenPositionManager}
                    onReversePosition={handleReversePosition}
                    onResetPortfolio={handleResetPortfolio}
                    onManageFunds={handleManageFunds}
                    onClose={() => setIsPortfolioOpen(false)}
                />
            ) : (
                <PortfolioBar 
                    portfolio={portfolio}
                    onOpen={() => setIsPortfolioOpen(true)}
                />
            )}
            
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
import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
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
    setData: (data: CandleData[]) => void;
}

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
    const [showWelcome, setShowWelcome] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('15m');
    
    const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
    const [orderDialogSide, setOrderDialogSide] = useState<OrderSide>('BUY');
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
    
    const [activeDrawingTool, setActiveDrawingTool] = useState<DrawingTool>('cursor');
    const [drawings, setDrawings] = useState<Drawing[]>([]);

    const chartComponentRef = useRef<ChartComponentHandle>(null);
    const saveTimeoutRef = useRef<number | null>(null);
    const simulatorRef = useRef<MarketSimulator | null>(null);
    const lastCandleRef = useRef<CandleData | null>(null);

    // Debounced portfolio saving
    useEffect(() => {
        if (isLoading) return; 
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = window.setTimeout(() => savePortfolio(portfolio), 1500); 
        return () => { if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current); };
    }, [portfolio, isLoading]);

    // Main initialization effect
    useEffect(() => {
        const initializePortfolio = async () => {
            const { portfolio: loadedPortfolio } = await loadPortfolio();
            setPortfolio(loadedPortfolio);
        };
        initializePortfolio();
        setSelectedInstrument(curatedStocks.find(s => s.instrument_key === 'CRYPTO_BTCUSDT') || curatedStocks[0]); // Default to BTC
        if (!localStorage.getItem('hasSeenSimulatorWelcome')) {
            const timer = setTimeout(() => setShowWelcome(true), 500);
            return () => clearTimeout(timer);
        }
    }, []);

    // Effect for handling instrument and timeframe changes
    useEffect(() => {
        if (!selectedInstrument) return;

        simulatorRef.current?.stop();
        const simulator = new MarketSimulator(selectedInstrument);
        simulatorRef.current = simulator;

        const timeframeInSeconds = parseInt(activeTimeframe.replace('m', '')) * 60;
        
        setIsLoading(true);
        setError(null);

        const historicalData = simulator.generateHistoricalData(200, timeframeInSeconds);
        setInitialChartData(historicalData);
        
        if (historicalData.length > 0) {
            const lastHistCandle = historicalData[historicalData.length - 1];
            lastCandleRef.current = { ...lastHistCandle };
            setLiveOhlc(lastHistCandle);

            const initialPrice = lastHistCandle.close;
            setInstruments(prev => prev.map(inst => inst.instrument_key === selectedInstrument.instrument_key ? { ...inst, last_price: initialPrice } : inst));
            setPortfolio(prev => updatePortfolioValue(prev, { [selectedInstrument.instrument_key]: initialPrice }));
        }
        setIsLoading(false);

        simulator.start((tick) => {
            const tickTimeSeconds = Math.floor(tick.time / 1000);
            
            let currentCandle = lastCandleRef.current;
            if (!currentCandle) return;

            const currentCandleStartTime = currentCandle.time - (currentCandle.time % timeframeInSeconds);

            if (tickTimeSeconds >= currentCandleStartTime + timeframeInSeconds) {
                // New candle
                const newCandleStartTime = tickTimeSeconds - (tickTimeSeconds % timeframeInSeconds);
                currentCandle = {
                    time: newCandleStartTime,
                    open: tick.price,
                    high: tick.price,
                    low: tick.price,
                    close: tick.price,
                };
            } else {
                // Update existing candle
                currentCandle = {
                    ...currentCandle,
                    high: Math.max(currentCandle.high, tick.price),
                    low: Math.min(currentCandle.low, tick.price),
                    close: tick.price,
                };
            }

            lastCandleRef.current = currentCandle;
            chartComponentRef.current?.updateCandle(currentCandle);
            setLiveOhlc(currentCandle);

            setInstruments(prev => prev.map(inst => inst.instrument_key === selectedInstrument.instrument_key ? { ...inst, last_price: tick.price } : inst));
            setPortfolio(prev => updatePortfolioValue(prev, { [selectedInstrument.instrument_key]: tick.price }));
        });

        return () => {
            simulatorRef.current?.stop();
        };
    }, [selectedInstrument, activeTimeframe]);
    
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

    const displayedInstrument = instruments.find(i => i.instrument_key === selectedInstrument?.instrument_key) || selectedInstrument;

    return (
        <div className="bg-background text-text-main h-screen flex flex-col font-sans">
            <WelcomeDialog isOpen={showWelcome} onClose={() => { setShowWelcome(false); localStorage.setItem('hasSeenSimulatorWelcome', 'true'); }} />
            <SimulatorHeader title="Market Simulator" />
            
            <main className="flex-grow flex flex-col">
                <ChartHeader
                    instruments={instruments} onSelectInstrument={setSelectedInstrument} selectedInstrument={selectedInstrument}
                    liveOhlc={liveOhlc}
                    onTradeButtonClick={handleOpenOrderDialog}
                    activeTool={activeDrawingTool}
                    onSelectTool={(tool) => setActiveDrawingTool(tool)}
                    onClearDrawings={() => setDrawings([])}
                    activeTimeframe={activeTimeframe}
                    onSelectTimeframe={setActiveTimeframe}
                />
                <div className="flex-grow relative">
                    { (isLoading || error) && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-30 p-4 text-center">
                            {isLoading && <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                            {error && <>
                                <h3 className="text-lg font-bold text-red-500 mt-4">Failed to Load Data</h3>
                                <p className="text-text-secondary text-sm max-w-sm">{error}</p>
                            </>}
                         </div>
                    )}
                    <ChartComponent 
                       ref={chartComponentRef}
                       initialData={initialChartData}
                       theme={theme}
                       activeDrawingTool={activeDrawingTool}
                       drawings={drawings}
                       onDrawingComplete={handleDrawingComplete}
                       timeframe={activeTimeframe}
                    />
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
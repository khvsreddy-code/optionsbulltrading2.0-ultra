import React, { useState, useEffect, useRef } from 'react';
import type { CandleData, Instrument, OrderSide, Portfolio, Position, Order, Trade } from '../types';
import { curatedStocks } from '../data/curatedStocks';
import { MarketSimulator, Timeframe } from '../services/marketSimulator';
import { createInitialPortfolio, executeOrder, updatePortfolioValue } from '../services/simulationService';
import { loadPortfolio, savePortfolio } from '../services/portfolioService';

// Components
import SimulatorHeader from '../components/practice/SimulatorHeader';
import ChartHeader from '../components/practice/ChartHeader';
import ChartComponent from '../components/practice/ChartComponent';
import PositionManagerDialog from '../components/practice/PositionManagerDialog';
import OrderDialog from '../components/practice/OrderDialog';
import ChartTradeButtons from '../components/practice/ChartTradeButtons';
import BottomPanel from '../components/practice/BottomPanel';
import WelcomeDialog from '../components/practice/WelcomeDialog';

interface PracticeViewProps {
  onNavigate: (path: string) => void;
  theme: 'light' | 'dark';
}

interface ChartComponentHandle {
    updateCandle: (candle: CandleData) => void;
}

const PracticeView: React.FC<PracticeViewProps> = ({ onNavigate, theme }) => {
    const [instruments, setInstruments] = useState<Instrument[]>(curatedStocks);
    const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
    const [initialChartData, setInitialChartData] = useState<CandleData[]>([]);
    const [liveOhlc, setLiveOhlc] = useState<CandleData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPortfolioLoading, setIsPortfolioLoading] = useState(true);
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
    
    useEffect(() => {
        if (isPortfolioLoading) return; 

        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        
        saveTimeoutRef.current = window.setTimeout(() => {
            savePortfolio(portfolio);
        }, 2000); 

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [portfolio, isPortfolioLoading]);

    useEffect(() => {
        const initializeSimulatorAndPortfolio = async () => {
            try {
                setIsLoading(true);
                setIsPortfolioLoading(true);
                setError(null);

                const { portfolio: loadedPortfolio } = await loadPortfolio();
                
                // Use today's date as a seed for a reproducible daily market
                const dailySeed = new Date().toISOString().slice(0, 10);
                const sim = new MarketSimulator(dailySeed);
                simulatorRef.current = sim;

                const fullHistory = sim.getFullHistory();
                const currentPrice = fullHistory.length > 0 ? fullHistory[fullHistory.length - 1].close : 65000;
                
                const initialInstrument = instruments.find(i => i.tradingsymbol === 'BTCUSDT') || instruments[0];
                setSelectedInstrument(initialInstrument);
                
                // Update portfolio P&L with the latest price from the deterministic simulation
                const livePrices: { [key: string]: number } = { [initialInstrument.instrument_key]: currentPrice };
                const updatedPortfolio = updatePortfolioValue(loadedPortfolio, livePrices);
                setPortfolio(updatedPortfolio);

                const initialDataForChart = sim.getHistoricalData(timeframe);
                setInitialChartData(initialDataForChart);
                setLiveOhlc(initialDataForChart.length > 0 ? initialDataForChart[initialDataForChart.length - 1] : null);
                setInstruments(prev => prev.map(inst =>
                    inst.instrument_type === 'CRYPTO'
                        ? { ...inst, last_price: currentPrice }
                        : inst
                ));
                
                setIsPortfolioLoading(false);
                setIsLoading(false);
                sim.start();

            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
                setIsLoading(false);
                setIsPortfolioLoading(false);
            }
        };

        initializeSimulatorAndPortfolio();

        if (!localStorage.getItem('hasSeenSimulatorWelcome')) {
            const timer = setTimeout(() => setShowWelcome(true), 500);
            return () => clearTimeout(timer);
        }

        return () => {
            simulatorRef.current?.stop();
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, []); 

    useEffect(() => {
        const simulator = simulatorRef.current;
        if (!simulator || isLoading || isPortfolioLoading || error) return;

        // On timeframe change, regenerate historical data from the deterministic simulator
        const historicalData = simulator.getHistoricalData(timeframe);
        setInitialChartData(historicalData);
        
        const handleTick = (candle: CandleData, isUpdate: boolean) => {
            setLiveOhlc(candle);
            chartComponentRef.current?.updateCandle(candle);

            if (selectedInstrument) {
                const livePrices = { [selectedInstrument.instrument_key]: candle.close };
                setInstruments(prev => prev.map(inst =>
                    inst.instrument_key === selectedInstrument.instrument_key
                        ? { ...inst, last_price: candle.close }
                        : inst
                ));
                
                setPortfolio(prevPortfolio => updatePortfolioValue(prevPortfolio, livePrices));
            }
        };

        const unsubscribe = simulator.subscribe(timeframe, handleTick);

        return () => unsubscribe();
    }, [timeframe, isLoading, isPortfolioLoading, selectedInstrument, error]);
    
    const savePortfolioNow = (portfolioState: Portfolio): Portfolio => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
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
            type: 'MARKET',
            side,
            quantity,
            status: 'OPEN',
            createdAt: Date.now() / 1000,
        };
        
        const executionPrice = currentInstrument.last_price;
        setPortfolio(prevPortfolio => {
            const newPortfolio = executeOrder(prevPortfolio, newOrder, executionPrice);
            return savePortfolioNow(newPortfolio);
        });
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
                instrument: instrument,
                type: 'MARKET',
                side: closingSide,
                quantity: quantity,
                status: 'OPEN',
                createdAt: Date.now() / 1000,
            };
            
            const executionPrice = instrument.last_price;
            const newPortfolio = executeOrder(prevPortfolio, closeOrder, executionPrice);
            return savePortfolioNow(newPortfolio);
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
            instrument: instrument,
            type: 'MARKET',
            side: reverseSide,
            quantity: reverseQuantity,
            status: 'OPEN',
            createdAt: Date.now() / 1000,
        };
    
        const executionPrice = instrument.last_price;
        setPortfolio(prevPortfolio => {
            const newPortfolio = executeOrder(prevPortfolio, reverseOrder, executionPrice);
            return savePortfolioNow(newPortfolio);
        });
    };

    const handleResetPortfolio = async () => {
        if (window.confirm('Are you sure you want to reset your portfolio? This will erase all trades and reset your balance. The chart history will remain for today.')) {
            const newPortfolio = createInitialPortfolio();
            setPortfolio(newPortfolio);
            await savePortfolio(newPortfolio);
        }
    };
    
    const handleManageFunds = () => {
        const currentTotal = portfolio.totalValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
        const result = window.prompt(`Enter your desired total portfolio value.\nYour current value is ${currentTotal}.\nMinimum value is ₹1,00,000.`, portfolio.totalValue.toFixed(0));
        
        if (result === null) return;

        const newTotalValue = parseFloat(result);

        if (isNaN(newTotalValue) || newTotalValue < 100000) {
            alert("Invalid input. Please enter a number greater than or equal to 1,00,000.");
            return;
        }

        setPortfolio(prevPortfolio => {
            const diff = newTotalValue - prevPortfolio.totalValue;
            const newCash = prevPortfolio.cash + diff;
            const updatedPortfolio = { ...prevPortfolio, cash: newCash };
            const newPortfolioWithValue = updatePortfolioValue(updatedPortfolio);
            return savePortfolioNow(newPortfolioWithValue);
        });
    };

    const handleCloseWelcome = () => {
        setShowWelcome(false);
        localStorage.setItem('hasSeenSimulatorWelcome', 'true');
    };
    
    if (error) {
        return (
            <div className="bg-[#131722] text-white h-screen flex flex-col items-center justify-center font-sans p-4 text-center">
                <h2 className="text-xl font-bold text-red-500">Failed to Load Simulator</h2>
                <p className="text-slate-400 mt-2 max-w-md">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-primary text-white font-semibold rounded-lg button-press-feedback"
                >
                    Refresh Page
                </button>
            </div>
        );
    }

    const displayedInstrument = instruments.find(i => i.instrument_key === selectedInstrument?.instrument_key) || selectedInstrument;

    return (
        <div className="bg-[#131722] text-white h-screen flex flex-col font-sans">
            <WelcomeDialog isOpen={showWelcome} onClose={handleCloseWelcome} />
            <SimulatorHeader onNavigate={onNavigate} title="Market Simulator" />
            
            <div className="flex-grow flex flex-col overflow-hidden">
                <main className="flex-grow flex flex-col relative">
                    <ChartHeader
                        instruments={instruments}
                        onSelectInstrument={setSelectedInstrument}
                        selectedInstrument={selectedInstrument}
                        selectedTimeframe={timeframe}
                        onSelectTimeframe={setTimeframe}
                        liveOhlc={liveOhlc}
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
                           <>
                               <ChartTradeButtons
                                   instrument={displayedInstrument}
                                   onTradeButtonClick={handleOpenOrderDialog}
                               />
                               <ChartComponent 
                                   ref={chartComponentRef}
                                   key={selectedInstrument ? selectedInstrument.instrument_key + timeframe : timeframe}
                                   initialData={initialChartData} 
                                   liveOhlc={liveOhlc}
                                   timeframe={timeframe}
                               />
                           </>
                        )}
                    </div>
                </main>
                <BottomPanel
                    portfolio={portfolio}
                    onPositionClick={handleOpenPositionManager}
                    onReversePosition={handleReversePosition}
                    onResetPortfolio={handleResetPortfolio}
                    onManageFunds={handleManageFunds}
                />
            </div>
            
            <PositionManagerDialog
                position={selectedPosition}
                isOpen={isPositionManagerOpen}
                onClose={() => setIsPositionManagerOpen(false)}
                onClosePosition={handleClosePosition}
            />

            <OrderDialog
                instrument={displayedInstrument}
                isOpen={isOrderDialogOpen}
                onClose={() => setIsOrderDialogOpen(false)}
                onPlaceOrder={handlePlaceOrder}
                initialSide={orderDialogSide}
            />
        </div>
    );
};

export default PracticeView;
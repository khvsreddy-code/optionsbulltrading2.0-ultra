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
    
    const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
    const [orderDialogSide, setOrderDialogSide] = useState<OrderSide>('BUY');

    const simulatorRef = useRef<MarketSimulator | null>(null);
    const chartComponentRef = useRef<ChartComponentHandle>(null);
    const saveTimeoutRef = useRef<number | null>(null);
    
    // Effect to save portfolio on change (debounced)
    useEffect(() => {
        if (isPortfolioLoading) return; // Don't save during initial load or while it's still loading

        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = window.setTimeout(() => {
            savePortfolio(portfolio);
        }, 1500); // Debounce save by 1.5 seconds

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [portfolio, isPortfolioLoading]);

    // Main initialization effect for loading data and starting the simulation
    useEffect(() => {
        const initializeSimulatorAndPortfolio = async () => {
            setIsLoading(true);
            setIsPortfolioLoading(true);

            // 1. Load portfolio from Supabase
            const loadedData = await loadPortfolio();
            let loadedPortfolio = loadedData.portfolio;
            const lastUpdated = new Date(loadedData.lastUpdated);
            
            // 2. Calculate time offline for catch-up simulation
            const secondsOffline = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
            const catchUpSeconds = secondsOffline > 5 ? secondsOffline : 0;

            // 3. Initialize simulator with catch-up duration
            const sim = new MarketSimulator();
            simulatorRef.current = sim;
            await sim.start(catchUpSeconds);

            // 4. Get the latest state from the caught-up simulator
            const initialData = sim.getHistoricalData(timeframe);
            setInitialChartData(initialData);
            
            const latestCandle = sim.getLatestCandle(timeframe);
            const initialInstrument = instruments.find(i => i.tradingsymbol === 'BTCUSDT') || instruments[0];
            setSelectedInstrument(initialInstrument);

            // 5. Update the loaded portfolio with the latest price to reflect offline P&L changes
            if (latestCandle) {
                const livePrices: { [key: string]: number } = {};
                loadedPortfolio.positions.forEach(pos => {
                     if (pos.instrument.instrument_key === initialInstrument.instrument_key) {
                        livePrices[pos.instrument.instrument_key] = latestCandle.close;
                    }
                });
                
                loadedPortfolio = updatePortfolioValue(loadedPortfolio, livePrices);
                setLiveOhlc(latestCandle);
                 setInstruments(prev => prev.map(inst =>
                    inst.instrument_key === initialInstrument.instrument_key
                        ? { ...inst, last_price: latestCandle.close }
                        : inst
                ));
            }
            
            // 6. Set the final state and enable live updates
            setPortfolio(loadedPortfolio);
            setIsPortfolioLoading(false);
            setIsLoading(false);
        };

        initializeSimulatorAndPortfolio();

        // Show welcome message on first visit
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
    }, []); // Main initialization runs only once on mount


    // Effect to manage timeframe subscriptions
    useEffect(() => {
        // Guard against running during initial load
        if (isLoading || isPortfolioLoading) return;

        const simulator = simulatorRef.current;
        if (!simulator) return;

        const historicalData = simulator.getHistoricalData(timeframe);
        setInitialChartData(historicalData);
        
        const latestCandle = simulator.getLatestCandle(timeframe);
        setLiveOhlc(latestCandle ?? null);

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
                setPortfolio(prevPortfolio => updatePortfolioValue(
                    prevPortfolio, // No need for deep copy, state update handles it
                    livePrices
                ));
            }
        };

        const unsubscribe = simulator.subscribe(timeframe, handleTick);

        return () => unsubscribe();
    }, [timeframe, isLoading, isPortfolioLoading, selectedInstrument]);


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
        setPortfolio(prevPortfolio => executeOrder(prevPortfolio, newOrder, executionPrice));
    };

    const handleOpenPositionManager = (position: Position) => {
        setSelectedPosition(position);
        setIsPositionManagerOpen(true);
    };
    
    const handleClosePosition = (instrumentKey: string, quantity: number) => {
        const instrument = instruments.find(i => i.instrument_key === instrumentKey);
        if (!instrument) return;
        
        const positionToClose = portfolio.positions.find(p => p.instrument.instrument_key === instrumentKey);
        if (!positionToClose) return;

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
        setPortfolio(prevPortfolio => executeOrder(prevPortfolio, closeOrder, executionPrice));
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
        setPortfolio(prevPortfolio => executeOrder(prevPortfolio, reverseOrder, executionPrice));
    };

    const handleResetPortfolio = async () => {
        if (window.confirm('Are you sure you want to reset your portfolio? This action cannot be undone.')) {
            const newPortfolio = createInitialPortfolio();
            setPortfolio(newPortfolio);
            await savePortfolio(newPortfolio); // Persist the reset immediately
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
            return updatePortfolioValue(updatedPortfolio);
        });
    };

    const handleCloseWelcome = () => {
        setShowWelcome(false);
        localStorage.setItem('hasSeenSimulatorWelcome', 'true');
    };

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
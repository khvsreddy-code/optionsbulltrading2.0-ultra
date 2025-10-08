import React, { useState, useEffect, useRef } from 'react';
import type { View, CandleData, Instrument, OrderSide, Portfolio, Position, Order } from '../types';
import { curatedStocks } from '../data/curatedStocks';
import { MarketSimulator, Timeframe } from '../services/marketSimulator';
import { createInitialPortfolio, executeOrder, updatePortfolioValue } from '../services/simulationService';
import SimulatorHeader from '../components/practice/SimulatorHeader';
import ChartHeader from '../components/practice/ChartHeader';
import ChartComponent from '../components/practice/ChartComponent';
import PracticeSidebar from '../components/practice/PracticeSidebar';
import OrderDialog from '../components/practice/OrderDialog';
import PositionManagerDialog from '../components/practice/PositionManagerDialog';

interface PracticeViewProps {
  onNavigate: (view: View) => void;
  theme: 'light' | 'dark';
}

// Define the type for the ChartComponent's imperative handle
interface ChartComponentHandle {
    updateCandle: (candle: CandleData) => void;
}

const PracticeView: React.FC<PracticeViewProps> = ({ onNavigate, theme }) => {
    const [instruments, setInstruments] = useState<Instrument[]>(curatedStocks);
    const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
    const [initialChartData, setInitialChartData] = useState<CandleData[]>([]);
    const [liveOhlc, setLiveOhlc] = useState<CandleData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [portfolio, setPortfolio] = useState<Portfolio>(createInitialPortfolio());
    const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
    const [orderSide, setOrderSide] = useState<OrderSide>('BUY');
    const [isPositionManagerOpen, setIsPositionManagerOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [timeframe, setTimeframe] = useState<Timeframe>('1s');

    const simulatorRef = useRef<MarketSimulator | null>(null);
    const chartComponentRef = useRef<ChartComponentHandle>(null);
    
    // Ref to hold the tick handler function. This is the key to fixing the re-render loop.
    const onTickRef = useRef((_candle: CandleData, _isUpdate: boolean) => {});

    // This effect updates the ref on every render with a new function that has
    // access to the latest state (e.g., portfolio, selectedInstrument).
    useEffect(() => {
        onTickRef.current = (candle, isUpdate) => {
            setLiveOhlc(candle);
            chartComponentRef.current?.updateCandle(candle);

            if (selectedInstrument) {
                const livePrices = { [selectedInstrument.instrument_key]: candle.close };

                // Update the master list of instruments with the new price
                setInstruments(prev => prev.map(inst =>
                    inst.instrument_key === selectedInstrument.instrument_key
                        ? { ...inst, last_price: candle.close }
                        : inst
                ));

                // Update portfolio using a functional update to avoid stale state issues.
                setPortfolio(prevPortfolio => updatePortfolioValue(
                    JSON.parse(JSON.stringify(prevPortfolio)),
                    livePrices
                ));
            }
        };
    }); // No dependency array: this runs on every render to keep the closure fresh.

    // Effect to set the initial instrument, runs only once.
    useEffect(() => {
        const initialInstrument = instruments.find(i => i.tradingsymbol === 'BTCUSDT') || instruments[0];
        setSelectedInstrument(initialInstrument);
    }, []);


    // Main effect to manage the simulator lifecycle.
    useEffect(() => {
        if (!selectedInstrument) return;

        setIsLoading(true);
        setInitialChartData([]);
        simulatorRef.current?.stop();
        
        // This callback is stable and safe to pass to the simulator.
        // It will always call the latest logic from onTickRef.current.
        const tickCallback = (candle: CandleData, isUpdate: boolean) => {
            onTickRef.current(candle, isUpdate);
        };
        
        simulatorRef.current = new MarketSimulator(tickCallback, timeframe);
        const initialData = simulatorRef.current.start();
        setInitialChartData(initialData);
        
        if (initialData.length > 0) {
            const lastCandle = initialData[initialData.length - 1];
            // Manually call the tick handler to set initial prices correctly.
            onTickRef.current(lastCandle, false);
        }
        
        setIsLoading(false);

        return () => {
            simulatorRef.current?.stop();
        };
    // This effect now only re-runs when the user *actually* changes instrument or timeframe.
    }, [selectedInstrument, timeframe]);

    const handlePlaceOrder = (side: OrderSide, quantity: number) => {
        if (!selectedInstrument) return;
        
        // Use the live price from the instruments list for accurate execution
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

    const handleOpenOrderDialog = (side: OrderSide) => {
        setOrderSide(side);
        setIsOrderDialogOpen(true);
    };
    
    const handleOpenPositionManager = (position: Position) => {
        setSelectedPosition(position);
        setIsPositionManagerOpen(true);
    };
    
    const handleClosePosition = (instrumentKey: string, quantity: number) => {
        const instrument = instruments.find(i => i.instrument_key === instrumentKey);
        if (!instrument) return;
        
        const sellOrder: Order = {
            id: `ord_close_${Date.now()}`,
            instrument: instrument,
            type: 'MARKET',
            side: 'SELL',
            quantity: quantity,
            status: 'OPEN',
            createdAt: Date.now() / 1000,
        };
        
        const executionPrice = instrument.last_price;
        setPortfolio(prevPortfolio => executeOrder(prevPortfolio, sellOrder, executionPrice));
    };
    
    // Derive the instrument to be displayed from the master instruments list,
    // ensuring it always has the live price for the UI.
    const displayedInstrument = instruments.find(i => i.instrument_key === selectedInstrument?.instrument_key) || selectedInstrument;

    return (
        <div className="bg-[#131722] text-white h-screen flex flex-col font-sans">
            <SimulatorHeader onNavigate={onNavigate} title="Market Simulator" />
            
            <div className="flex-grow flex overflow-hidden">
                {/* Main Content: Chart */}
                <main className="flex-1 flex flex-col">
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
                             <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 z-30">
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
                           />
                        )}
                    </div>
                </main>
                {/* Sidebar */}
                <aside className="w-80 flex-shrink-0 hidden md:block">
                   <PracticeSidebar 
                        instrument={displayedInstrument}
                        portfolio={portfolio}
                        onPlaceOrder={handleOpenOrderDialog}
                        onPositionClick={handleOpenPositionManager}
                   />
                </aside>
            </div>
            
            <OrderDialog 
                instrument={displayedInstrument}
                isOpen={isOrderDialogOpen}
                onClose={() => setIsOrderDialogOpen(false)}
                onPlaceOrder={handlePlaceOrder}
                initialSide={orderSide}
            />

            <PositionManagerDialog
                position={selectedPosition}
                isOpen={isPositionManagerOpen}
                onClose={() => setIsPositionManagerOpen(false)}
                onClosePosition={handleClosePosition}
            />
        </div>
    );
};

export default PracticeView;
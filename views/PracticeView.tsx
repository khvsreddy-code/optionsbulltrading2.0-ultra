import React, { useState, useEffect, useRef } from 'react';
import type { CandleData, Instrument, OrderSide, Portfolio, Position, Order } from '../types';
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
  onNavigate: (path: string) => void;
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
    
    const onTickRef = useRef((_candle: CandleData, _isUpdate: boolean) => {});

    useEffect(() => {
        onTickRef.current = (candle, isUpdate) => {
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
                    JSON.parse(JSON.stringify(prevPortfolio)),
                    livePrices
                ));
            }
        };
    });

    useEffect(() => {
        const initialInstrument = instruments.find(i => i.tradingsymbol === 'BTCUSDT') || instruments[0];
        setSelectedInstrument(initialInstrument);
    }, []);

    useEffect(() => {
        if (!selectedInstrument) return;

        const setupSimulator = async () => {
            setIsLoading(true);
            setInitialChartData([]);
            simulatorRef.current?.stop();
            
            const tickCallback = (candle: CandleData, isUpdate: boolean) => {
                onTickRef.current(candle, isUpdate);
            };
            
            simulatorRef.current = new MarketSimulator(tickCallback, timeframe);
            const initialData = await simulatorRef.current.start();
            setInitialChartData(initialData);
            
            if (initialData.length > 0) {
                const lastCandle = initialData[initialData.length - 1];
                onTickRef.current(lastCandle, false);
            }
            
            setIsLoading(false);
        };

        setupSimulator();

        return () => {
            simulatorRef.current?.stop();
        };
    }, [selectedInstrument, timeframe]);

    const handlePlaceOrder = (side: OrderSide, quantity: number) => {
        if (!selectedInstrument) return;
        
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
    
    const displayedInstrument = instruments.find(i => i.instrument_key === selectedInstrument?.instrument_key) || selectedInstrument;

    return (
        <div className="bg-[#131722] text-white h-screen flex flex-col font-sans">
            <SimulatorHeader onNavigate={onNavigate} title="Market Simulator" />
            
            <div className="flex-grow flex overflow-hidden">
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
                           />
                        )}
                    </div>
                </main>
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

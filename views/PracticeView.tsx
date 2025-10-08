import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { IPriceLine } from 'lightweight-charts';

interface PracticeViewProps {
  onNavigate: (view: View) => void;
  theme: 'light' | 'dark';
}

const PracticeView: React.FC<PracticeViewProps> = ({ onNavigate, theme }) => {
    const [instruments, setInstruments] = useState<Instrument[]>(curatedStocks);
    const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
    const [chartData, setChartData] = useState<CandleData[]>([]);
    const [liveOhlc, setLiveOhlc] = useState<CandleData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [portfolio, setPortfolio] = useState<Portfolio>(createInitialPortfolio());
    const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
    const [orderSide, setOrderSide] = useState<OrderSide>('BUY');
    const [isPositionManagerOpen, setIsPositionManagerOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [drawings, setDrawings] = useState<IPriceLine[]>([]);
    const [timeframe, setTimeframe] = useState<Timeframe>('1s');

    const simulatorRef = useRef<MarketSimulator | null>(null);

    const updatePrices = useCallback((lastPrice: number, instrumentKey: string) => {
        const livePrices = { [instrumentKey]: lastPrice };
        setInstruments(prev => prev.map(inst => inst.instrument_key === instrumentKey ? { ...inst, last_price: lastPrice } : inst));
        
        setSelectedInstrument(prev => {
            if (prev && prev.instrument_key === instrumentKey) {
                return { ...prev, last_price: lastPrice };
            }
            return prev;
        });

        setPortfolio(prev => updatePortfolioValue(JSON.parse(JSON.stringify(prev)), livePrices));
    }, []);
    
    useEffect(() => {
        const initialInstrument = instruments.find(i => i.tradingsymbol === 'BTCUSDT') || instruments[0];
        setSelectedInstrument(initialInstrument);
    }, [instruments]);


    useEffect(() => {
        if (!selectedInstrument) return;

        setIsLoading(true);
        setChartData([]); 

        const handleNewCandle = (candle: CandleData, isUpdate: boolean) => {
            setLiveOhlc(candle); // Update live OHLC for the header
            if (isUpdate) {
                setChartData(prevData => {
                    if (prevData.length === 0) return [candle]; 
                    return [...prevData.slice(0, -1), candle];
                });
            } else {
                setChartData(prevData => [...prevData, candle]);
            }
            updatePrices(candle.close, selectedInstrument.instrument_key);
        };
        
        simulatorRef.current = new MarketSimulator(handleNewCandle, timeframe);
        const initialData = simulatorRef.current.start();
        setChartData(initialData);
        
        if (initialData.length > 0) {
            const lastCandle = initialData[initialData.length - 1];
            updatePrices(lastCandle.close, selectedInstrument.instrument_key);
            setLiveOhlc(lastCandle);
        }
        
        setIsLoading(false);

        return () => {
            simulatorRef.current?.stop();
        };

    }, [selectedInstrument, timeframe, updatePrices]);

    const handlePlaceOrder = (side: OrderSide, quantity: number) => {
        if (!selectedInstrument) return;

        const newOrder: Order = {
            id: `ord_${Date.now()}`,
            instrument: selectedInstrument,
            type: 'MARKET',
            side,
            quantity,
            status: 'OPEN',
            createdAt: Date.now() / 1000,
        };
        
        const executionPrice = selectedInstrument.last_price;
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

    const handleAddDrawing = (drawing: IPriceLine) => {
        setDrawings(prev => [...prev, drawing]);
    };

    const handleClearDrawings = (series: any) => {
        drawings.forEach(line => series.removePriceLine(line));
        setDrawings([]);
    };

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
                        {isLoading || chartData.length === 0 ? (
                             <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 z-30">
                                <svg className="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                             </div>
                        ) : (
                           <ChartComponent 
                                key={selectedInstrument ? selectedInstrument.instrument_key + timeframe : timeframe}
                                data={chartData} 
                           />
                        )}
                    </div>
                </main>
                {/* Sidebar */}
                <aside className="w-80 flex-shrink-0 hidden md:block">
                   <PracticeSidebar 
                        instrument={selectedInstrument}
                        portfolio={portfolio}
                        onPlaceOrder={handleOpenOrderDialog}
                        onPositionClick={handleOpenPositionManager}
                   />
                </aside>
            </div>
            
            <OrderDialog 
                instrument={selectedInstrument}
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
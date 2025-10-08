import React, { useState, useEffect, useRef } from 'react';
import type { CandleData, Instrument, OrderSide, Portfolio, Position, Order } from '../types';
import { curatedStocks } from '../data/curatedStocks';
import { MarketSimulator, Timeframe } from '../services/marketSimulator';
import { createInitialPortfolio, executeOrder, updatePortfolioValue } from '../services/simulationService';
import SimulatorHeader from '../components/practice/SimulatorHeader';
import ChartHeader from '../components/practice/ChartHeader';
import ChartComponent from '../components/practice/ChartComponent';
import PracticeSidebar from '../components/practice/PracticeSidebar';
import PositionManagerDialog from '../components/practice/PositionManagerDialog';
import DrawingToolbar, { DrawingTool } from '../components/practice/DrawingToolbar';
import ChartTradeButtons from '../components/practice/ChartTradeButtons';

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
    const [portfolio, setPortfolio] = useState<Portfolio>(createInitialPortfolio());
    const [isPositionManagerOpen, setIsPositionManagerOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [timeframe, setTimeframe] = useState<Timeframe>('1m');
    const [activeDrawingTool, setActiveDrawingTool] = useState<DrawingTool>('crosshair');

    const simulatorRef = useRef<MarketSimulator | null>(null);
    const chartComponentRef = useRef<ChartComponentHandle>(null);

    // Effect to initialize the simulator ONCE on mount
    useEffect(() => {
        const sim = new MarketSimulator();
        simulatorRef.current = sim;
        
        sim.start().then(() => {
            const initialData = sim.getHistoricalData(timeframe);
            setInitialChartData(initialData);
            
            const latestCandle = sim.getLatestCandle(timeframe);
            if (latestCandle && selectedInstrument) {
                const livePrices = { [selectedInstrument.instrument_key]: latestCandle.close };
                 setInstruments(prev => prev.map(inst =>
                    inst.instrument_key === selectedInstrument.instrument_key
                        ? { ...inst, last_price: latestCandle.close }
                        : inst
                ));
                setPortfolio(prevPortfolio => updatePortfolioValue(prevPortfolio, livePrices));
                setLiveOhlc(latestCandle);
            }
            setIsLoading(false);
        });

        return () => {
            sim.stop();
        };
    }, []); // Empty dependency array ensures this runs only once

    // Effect to manage timeframe subscriptions
    useEffect(() => {
        const simulator = simulatorRef.current;
        if (!simulator || isLoading) return;

        // 1. Get historical data for the new timeframe
        const historicalData = simulator.getHistoricalData(timeframe);
        setInitialChartData(historicalData);
        
        const latestCandle = simulator.getLatestCandle(timeframe);
        setLiveOhlc(latestCandle ?? null);


        // 2. Subscribe to live updates for this timeframe
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
                    JSON.parse(JSON.stringify(prevPortfolio)),
                    livePrices
                ));
            }
        };

        const unsubscribe = simulator.subscribe(timeframe, handleTick);

        // 3. Return cleanup function
        return () => {
            unsubscribe();
        };
    }, [timeframe, isLoading, selectedInstrument]);

    useEffect(() => {
        const initialInstrument = instruments.find(i => i.tradingsymbol === 'BTCUSDT') || instruments[0];
        setSelectedInstrument(initialInstrument);
    }, []);


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

        // Determine the correct side for closing the position
        const closingSide: OrderSide = 'SELL';
        
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
    
    const handleResetPortfolio = () => {
        if (window.confirm('Are you sure you want to reset your portfolio? This action cannot be undone.')) {
            setPortfolio(createInitialPortfolio());
        }
    };

    const handleToolSelect = (tool: DrawingTool) => {
        if (tool === 'trash') {
            // This is a special case. We set the tool to 'trash' to trigger the
            // clearing effect in the child, then immediately reset it to the default.
            setActiveDrawingTool('trash');
            setTimeout(() => setActiveDrawingTool('crosshair'), 50);
        } else {
            setActiveDrawingTool(tool);
        }
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
                           <>
                               <DrawingToolbar 
                                   activeTool={activeDrawingTool}
                                   onToolSelect={handleToolSelect}
                               />
                               <ChartTradeButtons
                                   instrument={displayedInstrument}
                                   onPlaceOrder={handlePlaceOrder}
                               />
                               <ChartComponent 
                                   ref={chartComponentRef}
                                   key={selectedInstrument ? selectedInstrument.instrument_key + timeframe : timeframe}
                                   initialData={initialChartData} 
                                   activeTool={activeDrawingTool}
                                   liveOhlc={liveOhlc}
                                   timeframe={timeframe}
                               />
                           </>
                        )}
                    </div>
                </main>
                <aside className="w-80 flex-shrink-0 hidden md:block">
                   <PracticeSidebar 
                        portfolio={portfolio}
                        onPositionClick={handleOpenPositionManager}
                        onResetPortfolio={handleResetPortfolio}
                   />
                </aside>
            </div>
            
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
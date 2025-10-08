import React, { useState } from 'react';
import TradeTerminal from './TradeTerminal';
import PortfolioPanel from './PortfolioPanel';
import type { Instrument, Portfolio, Position, Order, OrderSide } from '../../types';

interface PracticeSidebarProps {
  instrument: Instrument | null;
  portfolio: Portfolio;
  onPlaceOrder: (side: OrderSide) => void;
  onPositionClick: (position: Position) => void;
}

const PracticeSidebar: React.FC<PracticeSidebarProps> = ({ instrument, portfolio, onPlaceOrder, onPositionClick }) => {
    const [activeTab, setActiveTab] = useState<'trade' | 'portfolio'>('trade');
    
    return (
        <div className="bg-[#1C2127] flex flex-col h-full border-l border-[#2A2E39]">
            <div className="flex-shrink-0 border-b border-[#2A2E39]">
                <div className="grid grid-cols-2">
                    <button 
                        onClick={() => setActiveTab('trade')}
                        className={`py-2.5 font-semibold text-center text-sm ${activeTab === 'trade' ? 'border-b-2 border-yellow-400 text-white' : 'text-slate-400'}`}
                    >
                        Trade
                    </button>
                    <button 
                        onClick={() => setActiveTab('portfolio')}
                        className={`py-2.5 font-semibold text-center text-sm ${activeTab === 'portfolio' ? 'border-b-2 border-yellow-400 text-white' : 'text-slate-400'}`}
                    >
                        Portfolio
                    </button>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto">
                {activeTab === 'trade' && (
                    <TradeTerminal
                        instrument={instrument}
                        onBuy={() => onPlaceOrder('BUY')}
                        onSell={() => onPlaceOrder('SELL')}
                    />
                )}
                {activeTab === 'portfolio' && (
                    <PortfolioPanel portfolio={portfolio} onPositionClick={onPositionClick} />
                )}
            </div>
        </div>
    );
};

export default PracticeSidebar;
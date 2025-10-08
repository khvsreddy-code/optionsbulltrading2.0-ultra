import React, { useState } from 'react';
import PortfolioPanel from './PortfolioPanel';
import TradeHistoryPanel from './TradeHistoryPanel';
import type { Portfolio, Position, OrderSide } from '../../types';

interface PracticeSidebarProps {
  portfolio: Portfolio;
  onPlaceOrder: (side: OrderSide) => void;
  onPositionClick: (position: Position) => void;
  onResetPortfolio: () => void;
}

const PracticeSidebar: React.FC<PracticeSidebarProps> = ({ portfolio, onPositionClick, onResetPortfolio }) => {
    const [activeTab, setActiveTab] = useState<'positions' | 'history'>('positions');
    
    return (
        <div className="bg-[#1C2127] flex flex-col h-full border-l border-[#2A2E39]">
            <div className="flex-shrink-0 border-b border-[#2A2E39]">
                <div className="grid grid-cols-2">
                    <button 
                        onClick={() => setActiveTab('positions')}
                        className={`py-2.5 font-semibold text-center text-sm ${activeTab === 'positions' ? 'border-b-2 border-yellow-400 text-white' : 'text-slate-400'}`}
                    >
                        Positions
                    </button>
                    <button 
                        onClick={() => setActiveTab('history')}
                        className={`py-2.5 font-semibold text-center text-sm ${activeTab === 'history' ? 'border-b-2 border-yellow-400 text-white' : 'text-slate-400'}`}
                    >
                        History
                    </button>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto">
                {activeTab === 'positions' && (
                    <PortfolioPanel 
                        portfolio={portfolio} 
                        onPositionClick={onPositionClick}
                        onResetPortfolio={onResetPortfolio}
                    />
                )}
                {activeTab === 'history' && (
                    <TradeHistoryPanel orders={portfolio.orders} />
                )}
            </div>
        </div>
    );
};

export default PracticeSidebar;
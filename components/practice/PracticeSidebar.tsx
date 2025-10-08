import React, { useState } from 'react';
import PortfolioPanel from './PortfolioPanel';
import TradeHistoryPanel from './TradeHistoryPanel';
import PortfolioDisplay from './PortfolioDisplay';
import { RotateCcw } from '../common/Icons';
import type { Portfolio, Position } from '../../types';

interface PracticeSidebarProps {
  portfolio: Portfolio;
  onPositionClick: (position: Position) => void;
  onResetPortfolio: () => void;
}

const PracticeSidebar: React.FC<PracticeSidebarProps> = ({ portfolio, onPositionClick, onResetPortfolio }) => {
    const [activeTab, setActiveTab] = useState<'positions' | 'history'>('positions');
    
    return (
        <div className="bg-[#1C2127] flex flex-col h-full border-l border-[#2A2E39]">
            {/* Portfolio Summary */}
            <div className="flex-shrink-0 border-b border-[#2A2E39]">
                <PortfolioDisplay portfolio={portfolio} />
            </div>

            {/* Tabs */}
            <div className="flex-shrink-0 border-b border-[#2A2E39]">
                <div className="grid grid-cols-2">
                    <button 
                        onClick={() => setActiveTab('positions')}
                        className={`py-2.5 font-semibold text-center text-sm transition-colors ${activeTab === 'positions' ? 'border-b-2 border-blue-500 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        Positions ({portfolio.positions.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('history')}
                        className={`py-2.5 font-semibold text-center text-sm transition-colors ${activeTab === 'history' ? 'border-b-2 border-blue-500 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        History ({portfolio.orders.length})
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-grow overflow-y-auto">
                {activeTab === 'positions' && (
                    <PortfolioPanel 
                        portfolio={portfolio} 
                        onPositionClick={onPositionClick}
                    />
                )}
                {activeTab === 'history' && (
                    <TradeHistoryPanel orders={portfolio.orders} />
                )}
            </div>

            {/* Footer with Reset Button */}
             <div className="flex-shrink-0 p-3 mt-auto border-t border-[#2A2E39]">
                 <button
                    onClick={onResetPortfolio}
                    className="w-full flex items-center justify-center p-2 bg-slate-700 hover:bg-slate-600 rounded-md font-semibold text-sm transition button-press-feedback"
                >
                    <RotateCcw size={16} className="mr-2" />
                    Reset Portfolio
                </button>
            </div>
        </div>
    );
};

export default PracticeSidebar;
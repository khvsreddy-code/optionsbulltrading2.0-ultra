import React, { useState } from 'react';
import PortfolioPanel from './PortfolioPanel';
import TradeHistoryPanel from './TradeHistoryPanel';
import PortfolioDisplay from './PortfolioDisplay';
import { RotateCcw } from '../common/Icons';
import type { Portfolio, Position } from '../../types';

interface BottomPanelProps {
  portfolio: Portfolio;
  onPositionClick: (position: Position) => void;
  onReversePosition: (position: Position) => void;
  onResetPortfolio: () => void;
  onManageFunds: () => void;
}

const BottomPanel: React.FC<BottomPanelProps> = ({ portfolio, onPositionClick, onReversePosition, onResetPortfolio, onManageFunds }) => {
    const [activeTab, setActiveTab] = useState<'positions' | 'history'>('positions');
    
    return (
        <div className="flex-shrink-0 bg-[#131722] flex flex-col border-t border-[#2A2E39]">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-2 flex-wrap border-b border-[#2A2E39]">
                <div className="flex items-center space-x-1">
                    <button 
                        onClick={() => setActiveTab('positions')}
                        className={`px-3 py-1.5 font-semibold text-center text-sm rounded-md transition-colors ${activeTab === 'positions' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        Positions ({portfolio.positions.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('history')}
                        className={`px-3 py-1.5 font-semibold text-center text-sm rounded-md transition-colors ${activeTab === 'history' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        History ({portfolio.trades.length})
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                   <PortfolioDisplay portfolio={portfolio} onManageFunds={onManageFunds} />
                   <button
                        onClick={onResetPortfolio}
                        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-md text-sm transition button-press-feedback border border-slate-700"
                        aria-label="Reset Portfolio"
                    >
                        <RotateCcw size={16} className="text-slate-400" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto" style={{ height: 240 }}>
                {activeTab === 'positions' && (
                    <PortfolioPanel 
                        portfolio={portfolio} 
                        onPositionClick={onPositionClick}
                        onReversePosition={onReversePosition}
                    />
                )}
                {activeTab === 'history' && (
                    <TradeHistoryPanel trades={portfolio.trades} />
                )}
            </div>
        </div>
    );
};

export default BottomPanel;
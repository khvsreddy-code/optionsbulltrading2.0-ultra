import React, { useState } from 'react';
import PortfolioPanel from './PortfolioPanel';
import TradeHistoryPanel from './TradeHistoryPanel';
import PortfolioDisplay from './PortfolioDisplay';
import { RotateCcw, ChevronDown } from '../common/Icons';
import type { Portfolio, Position } from '../../types';

interface BottomPanelProps {
  portfolio: Portfolio;
  onPositionClick: (position: Position) => void;
  onReversePosition: (position: Position) => void;
  onResetPortfolio: () => void;
  onManageFunds: () => void;
  onClose: () => void;
}

const BottomPanel: React.FC<BottomPanelProps> = ({ portfolio, onPositionClick, onReversePosition, onResetPortfolio, onManageFunds, onClose }) => {
    const [activeTab, setActiveTab] = useState<'positions' | 'history'>('positions');
    
    return (
        <div className="flex-shrink-0 bg-background flex flex-col border-t border-border h-[320px] animate-slideInUp" style={{ animationDuration: '0.3s' }}>
            {/* Panel Header */}
            <div className="flex items-center justify-between p-2 flex-wrap border-b border-border">
                <div className="flex items-center space-x-1">
                    <button 
                        onClick={() => setActiveTab('positions')}
                        className={`px-3 py-1.5 font-semibold text-center text-sm rounded-md transition-colors ${activeTab === 'positions' ? 'bg-card text-text-main' : 'text-text-secondary hover:bg-card hover:text-text-main'}`}
                    >
                        Positions ({portfolio.positions.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('history')}
                        className={`px-3 py-1.5 font-semibold text-center text-sm rounded-md transition-colors ${activeTab === 'history' ? 'bg-card text-text-main' : 'text-text-secondary hover:bg-card hover:text-text-main'}`}
                    >
                        History ({portfolio.trades.length})
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                   <PortfolioDisplay portfolio={portfolio} onManageFunds={onManageFunds} />
                   <button
                        onClick={onResetPortfolio}
                        className="p-2 bg-card hover:bg-background rounded-md text-sm transition button-press-feedback border border-border"
                        aria-label="Reset Portfolio"
                    >
                        <RotateCcw size={16} className="text-text-secondary" />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 bg-card hover:bg-background rounded-md text-sm transition button-press-feedback border border-border"
                        aria-label="Close Portfolio"
                    >
                        <ChevronDown size={16} className="text-text-secondary" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto flex-grow">
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
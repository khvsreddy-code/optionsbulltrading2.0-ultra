import React, { useState, useRef, useEffect } from 'react';
// FIX: Use a standard ES module import for animejs.
import anime from 'animejs';
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
}

const BottomPanel: React.FC<BottomPanelProps> = ({ portfolio, onPositionClick, onReversePosition, onResetPortfolio, onManageFunds }) => {
    const [activeTab, setActiveTab] = useState<'positions' | 'history'>('positions');
    const [isCollapsed, setIsCollapsed] = useState(true);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const contentEl = contentRef.current;
        if (contentEl) {
            anime.remove(contentEl);
            anime({
                targets: contentEl,
                height: isCollapsed ? 0 : 240,
                opacity: isCollapsed ? 0 : 1,
                duration: 350,
                easing: 'easeOutCubic',
                begin: () => {
                    if (!isCollapsed) contentEl.style.display = 'block';
                },
                complete: () => {
                    if (isCollapsed) contentEl.style.display = 'none';
                }
            });
        }
    }, [isCollapsed]);
    
    return (
        <div className="flex-shrink-0 bg-[#1C2127] flex flex-col border-t border-[#2A2E39]">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-2 flex-wrap">
                <div className="flex items-center space-x-4">
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
                <div className="flex items-center space-x-3">
                   <PortfolioDisplay portfolio={portfolio} onManageFunds={onManageFunds} />
                   <button
                        onClick={onResetPortfolio}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm transition button-press-feedback"
                        aria-label="Reset Portfolio"
                    >
                        <RotateCcw size={16} />
                    </button>
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md" aria-label={isCollapsed ? 'Expand Panel' : 'Collapse Panel'}>
                       <ChevronDown size={16} className={`transition-transform duration-200 ${!isCollapsed ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Collapsible Content */}
            <div ref={contentRef} className="overflow-y-auto" style={{ height: 0, opacity: 0, display: 'none' }}>
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
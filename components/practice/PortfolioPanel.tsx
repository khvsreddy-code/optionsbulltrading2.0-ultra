import React from 'react';
import type { Portfolio, Position } from '../../types';
import { Swap } from '../common/Icons';

interface PortfolioPanelProps {
  portfolio: Portfolio;
  onPositionClick: (position: Position) => void;
  onReversePosition: (position: Position) => void;
}

const PortfolioPanel: React.FC<PortfolioPanelProps> = ({ portfolio, onPositionClick, onReversePosition }) => {
  if (portfolio.positions.length === 0) {
    return <p className="p-4 text-center text-slate-400 text-sm">You're all set! Place a trade to see your live positions here.</p>;
  }

  return (
    <div className="flex flex-col">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 px-3 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700/50 bg-slate-800/20 sticky top-0">
        <span className="col-span-3">Symbol</span>
        <span className="col-span-1">Side</span>
        <span className="col-span-1 text-right">Qty</span>
        <span className="col-span-2 text-right">Avg. Price</span>
        <span className="col-span-2 text-right">P&L (₹)</span>
        <span className="col-span-3 text-right">Actions</span>
      </div>
      
      {/* Positions List */}
      <ul className="divide-y divide-slate-700/50">
        {portfolio.positions.map(pos => {
          const pnlColor = pos.pnl >= 0 ? 'text-green-500' : 'text-red-500';
          const isLong = pos.quantity > 0;

          return (
            <li key={pos.instrument.instrument_key} className="hover:bg-slate-700/30">
              <div className="grid grid-cols-12 gap-2 items-center px-3 py-2.5 text-sm">
                <div className="col-span-3 font-bold text-white truncate">
                  {pos.instrument.tradingsymbol}
                </div>
                <div className={`col-span-1 font-bold ${isLong ? 'text-green-500' : 'text-red-500'}`}>
                  {isLong ? 'LONG' : 'SHORT'}
                </div>
                <div className="col-span-1 text-right font-mono text-white">
                  {Math.abs(pos.quantity)}
                </div>
                <div className="col-span-2 text-right font-mono text-slate-300">
                  {pos.averagePrice.toFixed(2)}
                </div>
                <div className="col-span-2 text-right">
                   <p className={`font-mono font-semibold ${pnlColor}`}>
                        {pos.pnl >= 0 ? '+' : ''}{pos.pnl.toFixed(2)}
                   </p>
                   <p className={`font-mono text-xs ${pnlColor}`}>
                        ({pos.pnlPercent.toFixed(2)}%)
                   </p>
                </div>
                <div className="col-span-3 flex items-center justify-end space-x-2">
                    <button
                        onClick={() => onReversePosition(pos)}
                        className="p-1.5 rounded-full text-slate-400 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                        aria-label={`Reverse position for ${pos.instrument.tradingsymbol}`}
                    >
                        <Swap size={14} />
                    </button>
                    <button 
                        onClick={() => onPositionClick(pos)}
                        className="px-3 py-1 text-xs font-semibold bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600 transition-colors"
                        aria-label={`Close position for ${pos.instrument.tradingsymbol}`}
                    >
                       Close
                   </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PortfolioPanel;
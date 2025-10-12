import React from 'react';
import type { Portfolio, Position } from '../../types';

interface PortfolioPanelProps {
  portfolio: Portfolio;
  onPositionClick: (position: Position) => void;
  onReversePosition: (position: Position) => void;
}

const PortfolioPanel: React.FC<PortfolioPanelProps> = ({ portfolio, onPositionClick, onReversePosition }) => {
  if (portfolio.positions.length === 0) {
    return <p className="p-4 text-center text-text-secondary text-sm">You're all set! Place a trade to see your live positions here.</p>;
  }

  return (
    <div className="flex flex-col">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-text-secondary border-b border-border bg-background sticky top-0">
        <span className="col-span-3">Symbol</span>
        <span className="col-span-1">Side</span>
        <span className="col-span-1 text-right">Qty</span>
        <span className="col-span-2 text-right">Avg. Price</span>
        <span className="col-span-3 text-right">P&L (₹)</span>
        <span className="col-span-2 text-right">Actions</span>
      </div>
      
      {/* Positions List */}
      <ul className="divide-y divide-border">
        {portfolio.positions.map(pos => {
          const pnlColor = pos.pnl >= 0 ? 'text-green-500' : 'text-red-500';
          const isLong = pos.quantity > 0;

          return (
            <li key={pos.instrument.instrument_key} className="hover:bg-card/50 dark:hover:bg-card">
              <div className="grid grid-cols-12 gap-4 items-center px-4 py-3 text-sm">
                <div className="col-span-3 font-bold text-text-main truncate">
                  {pos.instrument.tradingsymbol}
                </div>
                <div className={`col-span-1 font-bold ${isLong ? 'text-green-500' : 'text-red-500'}`}>
                  {isLong ? 'LONG' : 'SHORT'}
                </div>
                <div className="col-span-1 text-right font-mono text-text-main">
                  {Math.abs(pos.quantity)}
                </div>
                <div className="col-span-2 text-right font-mono text-text-secondary">
                  {pos.averagePrice.toFixed(2)}
                </div>
                <div className="col-span-3 text-right">
                   <p className={`font-mono font-semibold ${pnlColor}`}>
                        {pos.pnl >= 0 ? '+' : ''}{pos.pnl.toFixed(2)}
                   </p>
                   <p className={`font-mono text-xs ${pnlColor}`}>
                        ({pos.pnlPercent.toFixed(2)}%)
                   </p>
                </div>
                <div className="col-span-2 flex items-center justify-end space-x-2">
                    <button 
                        onClick={() => onPositionClick(pos)}
                        className="px-3 py-1 text-xs font-semibold bg-card text-text-secondary rounded-md hover:bg-border transition-colors border border-border"
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
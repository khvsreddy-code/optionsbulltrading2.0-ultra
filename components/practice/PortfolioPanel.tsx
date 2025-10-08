import React from 'react';
import type { Portfolio, Position } from '../../types';
import PortfolioDisplay from './PortfolioDisplay';

interface PortfolioPanelProps {
  portfolio: Portfolio;
  onPositionClick: (position: Position) => void;
}

const PortfolioPanel: React.FC<PortfolioPanelProps> = ({ portfolio, onPositionClick }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 border-b border-[#2A2E39]">
        <PortfolioDisplay portfolio={portfolio} />
      </div>
      <div className="flex-grow overflow-y-auto">
        <h3 className="p-4 text-md font-semibold text-white">Positions ({portfolio.positions.length})</h3>
        {portfolio.positions.length > 0 ? (
          <ul>
            {portfolio.positions.map(pos => (
              <li key={pos.instrument.instrument_key} className="border-b border-slate-800 last:border-b-0">
                <button onClick={() => onPositionClick(pos)} className="w-full text-left p-4 hover:bg-slate-700/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">{pos.instrument.tradingsymbol}</p>
                      <p className="text-sm text-slate-400">Qty: {pos.quantity}</p>
                    </div>
                    <div>
                      <p className={`font-semibold text-right ${pos.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {pos.pnl >= 0 ? '+' : ''}₹{pos.pnl.toFixed(2)}
                      </p>
                      <p className="text-sm text-slate-400 text-right">LTP: ₹{pos.lastPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-4 text-slate-400 text-sm">You have no open positions.</p>
        )}
      </div>
    </div>
  );
};

export default PortfolioPanel;
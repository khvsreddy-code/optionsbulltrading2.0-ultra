import React from 'react';
import type { Trade } from '../../types';

interface TradeHistoryPanelProps {
  trades: Trade[];
}

const TradeHistoryPanel: React.FC<TradeHistoryPanelProps> = ({ trades }) => {
  if (trades.length === 0) {
      return <p className="p-4 text-center text-slate-400 text-sm">Your trade history will appear here. Learn from every move!</p>;
  }

  return (
    <div className="flex flex-col">
       {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 px-3 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700/50 bg-slate-800/20 sticky top-0">
        <span className="col-span-4">Symbol</span>
        <span className="col-span-2 text-right">Qty</span>
        <span className="col-span-3 text-right">Entry / Exit</span>
        <span className="col-span-3 text-right">P&L (₹)</span>
      </div>
       <ul className="divide-y divide-slate-700/50">
          {trades.map(trade => {
            const pnlColor = trade.realizedPnl >= 0 ? 'text-green-500' : 'text-red-500';
            const sideColor = trade.side === 'LONG' ? 'text-green-500' : 'text-red-500';

            return (
              <li key={trade.id} className="px-3 py-2.5 hover:bg-slate-700/30">
                <div className="grid grid-cols-12 gap-2 items-center text-sm">
                    <div className="col-span-4">
                        <p className="font-bold text-white truncate">{trade.instrument.tradingsymbol}</p>
                        <p className={`text-xs font-bold ${sideColor}`}>{trade.side}</p>
                    </div>
                    <div className="col-span-2 text-right font-mono text-white">
                        {trade.quantity}
                    </div>
                    <div className="col-span-3 text-right font-mono text-slate-300 text-xs">
                        <p>{trade.entryPrice.toFixed(2)}</p>
                        <p>&rarr; {trade.exitPrice.toFixed(2)}</p>
                    </div>
                    <div className={`col-span-3 text-right font-mono font-semibold ${pnlColor}`}>
                        {trade.realizedPnl >= 0 ? '+' : ''}{trade.realizedPnl.toFixed(2)}
                    </div>
                </div>
                <div className="text-right text-xs text-slate-500 mt-1">
                    {new Date(trade.exitTime * 1000).toLocaleString()}
                </div>
              </li>
            );
          })}
       </ul>
    </div>
  );
};

export default TradeHistoryPanel;
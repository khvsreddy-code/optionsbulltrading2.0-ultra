import React from 'react';
import type { Order } from '../../types';

interface TradeHistoryPanelProps {
  orders: Order[];
}

const TradeHistoryPanel: React.FC<TradeHistoryPanelProps> = ({ orders }) => {
  if (orders.length === 0) {
      return <p className="p-4 text-center text-slate-400 text-sm">No trades have been executed in this session.</p>;
  }

  return (
    <div className="flex flex-col">
       <ul className="divide-y divide-slate-700/50">
          {orders.map(order => (
            <li key={order.id} className="px-3 py-2.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex-1">
                    <p className="font-semibold text-white">{order.instrument.tradingsymbol}</p>
                    <p className={`text-xs font-bold ${order.side === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>
                        {order.side} {order.quantity} @ {order.executedPrice?.toFixed(2)}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-400">{new Date(order.executedAt! * 1000).toLocaleTimeString()}</p>
                </div>
              </div>
            </li>
          ))}
       </ul>
    </div>
  );
};

export default TradeHistoryPanel;
import React from 'react';
import type { Order } from '../../types';

interface TradeHistoryPanelProps {
  orders: Order[];
}

const TradeHistoryPanel: React.FC<TradeHistoryPanelProps> = ({ orders }) => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="p-4 text-md font-semibold text-white border-b border-[#2A2E39]">Trade History ({orders.length})</h3>
      <div className="flex-grow overflow-y-auto">
        {orders.length > 0 ? (
          <ul>
            {orders.map(order => (
              <li key={order.id} className="p-4 border-b border-slate-800 last:border-b-0">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <p className={`font-bold ${order.side === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>
                      {order.side} {order.instrument.tradingsymbol}
                    </p>
                    <p className="text-slate-400">Qty: {order.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">@ ₹{order.executedPrice?.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">{new Date(order.executedAt! * 1000).toLocaleString()}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 text-slate-400 text-sm">No trades executed yet.</p>
        )}
      </div>
    </div>
  );
};

export default TradeHistoryPanel;

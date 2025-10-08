import React from 'react';
import type { Instrument } from '../../types';

interface TradeTerminalProps {
  instrument: Instrument | null;
  onBuy: () => void;
  onSell: () => void;
}

const TradeTerminal: React.FC<TradeTerminalProps> = ({ instrument, onBuy, onSell }) => {
  if (!instrument) {
    return (
      <div className="p-4 text-center text-slate-400">
        <p>Select an instrument to start trading.</p>
      </div>
    );
  }

  const price = instrument.last_price || 0;
  // This is a mock change, in reality, it would come from a data feed
  const change = (price - (price / (1 + (Math.random() - 0.5) * 0.01)));
  const changePercent = (change / (price - change)) * 100 || 0;
  const priceColor = change >= 0 ? 'text-[#1AAB7A]' : 'text-[#FF3D5F]';

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white">{instrument.tradingsymbol}</h3>
        <p className={`text-2xl font-mono font-bold ${priceColor}`}>
          {price.toFixed(2)}
        </p>
        <p className={`text-sm font-semibold ${priceColor}`}>
          {change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={onBuy} className="w-full p-3 text-center font-bold bg-[#1AAB7A] rounded-md text-white button-press-feedback">
          BUY
        </button>
        <button onClick={onSell} className="w-full p-3 text-center font-bold bg-[#FF3D5F] rounded-md text-white button-press-feedback">
          SELL
        </button>
      </div>
    </div>
  );
};

export default TradeTerminal;
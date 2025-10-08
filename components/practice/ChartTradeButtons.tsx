import React from 'react';
import type { Instrument, OrderSide } from '../../types';

interface ChartTradeButtonsProps {
  instrument: Instrument | null;
  onPlaceOrder: (side: OrderSide) => void;
}

const ChartTradeButtons: React.FC<ChartTradeButtonsProps> = ({ instrument, onPlaceOrder }) => {
  if (!instrument) return null;

  const price = instrument.last_price || 0;

  return (
    <div className="absolute top-4 left-20 z-20 flex items-center bg-[#1C2127]/50 backdrop-blur-sm border border-[#2A2E39] rounded-lg">
      <button
        onClick={() => onPlaceOrder('SELL')}
        className="px-4 py-2 text-center font-bold text-white bg-[#FF3D5F] rounded-l-lg hover:bg-red-500 transition-colors"
      >
        SELL
      </button>
      <div className="px-3 py-2 font-mono font-bold text-white border-l border-r border-slate-600">
        {price.toFixed(2)}
      </div>
      <button
        onClick={() => onPlaceOrder('BUY')}
        className="px-4 py-2 text-center font-bold text-white bg-[#1AAB7A] rounded-r-lg hover:bg-green-500 transition-colors"
      >
        BUY
      </button>
    </div>
  );
};

export default ChartTradeButtons;

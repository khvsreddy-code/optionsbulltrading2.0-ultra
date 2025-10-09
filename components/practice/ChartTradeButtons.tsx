import React from 'react';
import type { Instrument, OrderSide } from '../../types';

interface ChartTradeButtonsProps {
  instrument: Instrument | null;
  onTradeButtonClick: (side: OrderSide) => void;
}

const ChartTradeButtons: React.FC<ChartTradeButtonsProps> = ({ instrument, onTradeButtonClick }) => {

  if (!instrument) return null;

  const price = instrument.last_price || 0;
  
  return (
    <div 
        className="absolute top-4 left-[56px] z-20 flex items-stretch bg-[#1C2127] border border-[#2A2E39] rounded-lg shadow-lg text-white font-semibold"
    >
      {/* BUY Button */}
      <button
        onClick={() => onTradeButtonClick('BUY')}
        className="flex items-center justify-center px-4 py-2 bg-[#1AAB7A] rounded-l-lg hover:bg-green-500 transition-colors button-press-feedback"
      >
        <span>BUY</span>
      </button>
      
      {/* Divider */}
      <div className="w-px bg-slate-700"></div>
      
      {/* SELL Button */}
      <button
        onClick={() => onTradeButtonClick('SELL')}
        className="flex items-center justify-center px-4 py-2 bg-[#FF3D5F] rounded-r-lg hover:bg-red-500 transition-colors button-press-feedback"
      >
        <span>SELL</span>
      </button>
    </div>
  );
};

export default ChartTradeButtons;
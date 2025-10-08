import React, { useState } from 'react';
import type { Instrument, OrderSide } from '../../types';
import { Plus, Minus } from '../common/Icons';

interface ChartTradeButtonsProps {
  instrument: Instrument | null;
  onPlaceOrder: (side: OrderSide, quantity: number) => void;
}

const ChartTradeButtons: React.FC<ChartTradeButtonsProps> = ({ instrument, onPlaceOrder }) => {
  const [quantity, setQuantity] = useState(1);

  if (!instrument) return null;

  const price = instrument.last_price || 0;
  
  const handleQuantityChange = (amount: number) => {
      setQuantity(prev => Math.max(1, prev + amount));
  }

  return (
    <div 
        className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-stretch bg-[#1C2127] border border-[#2A2E39] rounded-lg shadow-lg text-white font-semibold"
        style={{ minWidth: '320px' }}
    >
      {/* SELL Button */}
      <button
        onClick={() => onPlaceOrder('SELL', quantity)}
        className="flex-1 flex flex-col items-center justify-center p-2 bg-[#FF3D5F] rounded-l-lg hover:bg-red-500 transition-colors button-press-feedback"
      >
        <span>SELL MKT</span>
        <span className="text-xs font-mono">{price.toFixed(2)}</span>
      </button>
      
      {/* Quantity Stepper */}
      <div className="flex flex-col items-center justify-center px-3 py-1 border-l border-r border-slate-700 bg-slate-800/50">
          <span className="text-xs text-slate-400 mb-0.5">QTY</span>
          <div className="flex items-center">
              <button onClick={() => handleQuantityChange(-1)} className="p-1 text-slate-400 hover:text-white"><Minus size={16} /></button>
              <input 
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center bg-transparent font-mono text-lg outline-none"
              />
              <button onClick={() => handleQuantityChange(1)} className="p-1 text-slate-400 hover:text-white"><Plus size={16} /></button>
          </div>
      </div>
      
      {/* BUY Button */}
      <button
        onClick={() => onPlaceOrder('BUY', quantity)}
        className="flex-1 flex flex-col items-center justify-center p-2 bg-[#1AAB7A] rounded-r-lg hover:bg-green-500 transition-colors button-press-feedback"
      >
        <span>BUY MKT</span>
        <span className="text-xs font-mono">{price.toFixed(2)}</span>
      </button>
    </div>
  );
};

export default ChartTradeButtons;
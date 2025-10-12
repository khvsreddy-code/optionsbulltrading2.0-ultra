import React, { useState, useEffect, useRef } from 'react';
// FIX: Correctly import animejs to handle module interoperability issues.
import * as animejs from 'animejs';
const anime = (animejs as any).default;
import type { Instrument, OrderSide } from '../../types';

interface OrderDialogProps {
  instrument: Instrument | null;
  isOpen: boolean;
  onClose: () => void;
  onPlaceOrder: (side: OrderSide, quantity: number) => void;
  initialSide: OrderSide;
}

const OrderDialog: React.FC<OrderDialogProps> = ({ instrument, isOpen, onClose, onPlaceOrder, initialSide }) => {
  const [quantity, setQuantity] = useState(1);
  const [side, setSide] = useState<OrderSide>(initialSide);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isAnimatingOut = useRef(false);

  useEffect(() => {
    setSide(initialSide);
  }, [initialSide, isOpen]);

  useEffect(() => {
    const dialogEl = dialogRef.current;
    if (dialogEl) {
        if (isOpen) {
            isAnimatingOut.current = false;
            anime.remove(dialogEl);
            anime({
                targets: dialogEl,
                scale: [0.85, 1],
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
                easing: 'easeOutElastic(1, .8)'
            });
        }
    }
  }, [isOpen]);
  
  const handleClose = () => {
      if (isAnimatingOut.current) return;
      isAnimatingOut.current = true;
      anime({
          targets: dialogRef.current,
          scale: 0.9,
          opacity: 0,
          translateY: 10,
          duration: 200,
          easing: 'easeInQuad',
          complete: () => {
              onClose();
          }
      });
  };

  const handlePlaceOrder = () => {
    if (quantity > 0) {
      onPlaceOrder(side, quantity);
      handleClose();
    }
  };

  if (!isOpen || !instrument) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div ref={dialogRef} className="bg-slate-800 rounded-lg shadow-xl w-full max-w-sm text-white opacity-0">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold">{instrument.tradingsymbol}</h2>
          <p className="text-sm text-slate-400">{instrument.name}</p>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setSide('BUY')} className={`p-3 rounded-md font-semibold transition-colors ${side === 'BUY' ? 'bg-green-600' : 'bg-slate-700 hover:bg-slate-600'}`}>BUY</button>
            <button onClick={() => setSide('SELL')} className={`p-3 rounded-md font-semibold transition-colors ${side === 'SELL' ? 'bg-red-600' : 'bg-slate-700 hover:bg-slate-600'}`}>SELL</button>
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-slate-400">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded-md"
              min="1"
            />
          </div>
          <div className="text-sm text-slate-400">
            <p>Order Type: Market</p>
            <p>Approx. Value: ₹{(instrument.last_price * quantity).toFixed(2)}</p>
          </div>
        </div>
        <div className="p-4 border-t border-slate-700 grid grid-cols-2 gap-2">
          <button onClick={handleClose} className="p-3 bg-slate-700 rounded-md font-semibold button-press-feedback">Cancel</button>
          <button onClick={handlePlaceOrder} className={`p-3 rounded-md font-semibold button-press-feedback ${side === 'BUY' ? 'bg-green-600' : 'bg-red-600'}`}>
            {side === 'BUY' ? 'Place Buy Order' : 'Place Sell Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDialog;
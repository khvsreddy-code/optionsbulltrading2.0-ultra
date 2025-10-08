import React, { useState, useEffect } from 'react';
import type { Position } from '../../types';

interface PositionManagerDialogProps {
  position: Position | null;
  isOpen: boolean;
  onClose: () => void;
  onClosePosition: (instrumentKey: string, quantity: number) => void;
}

const PositionManagerDialog: React.FC<PositionManagerDialogProps> = ({ position, isOpen, onClose, onClosePosition }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (position) {
      setQuantity(Math.abs(position.quantity));
    }
  }, [position]);

  if (!isOpen || !position) return null;

  const isLong = position.quantity > 0;
  const maxQty = Math.abs(position.quantity);
  
  const handleClose = () => {
    if (quantity > 0 && quantity <= maxQty) {
      onClosePosition(position.instrument.instrument_key, quantity);
      onClose();
    }
  };

  const remainingQuantity = maxQty - quantity;
  const isClosingFullPosition = quantity === maxQty;
  const realizedPnl = (position.lastPrice - position.averagePrice) * (isLong ? quantity : -quantity);
  const pnlColor = realizedPnl >= 0 ? 'text-green-500' : 'text-red-500';
  const actionVerb = isLong ? 'Sell' : 'Buy to Cover';
  const buttonClass = isLong ? 'bg-red-600' : 'bg-green-600';
  const buttonText = isLong ? 'Sell' : 'Cover';

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-sm text-white">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold">Close {isLong ? 'Long' : 'Short'} Position: {position.instrument.tradingsymbol}</h2>
          <p className="text-sm text-slate-400">You are {isLong ? 'long' : 'short'} {maxQty} shares.</p>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-slate-400">Quantity to {actionVerb}</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(maxQty, parseInt(e.target.value) || 1)))}
              className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded-md"
              min="1"
              max={maxQty}
            />
          </div>
          <div className="text-sm text-slate-400 space-y-1">
            <p>Order Type: Market</p>
            <p>Approx. Value: ₹{(position.lastPrice * quantity).toFixed(2)}</p>
            <p>Realized P&amp;L: <span className={`font-semibold ${pnlColor}`}>{realizedPnl >= 0 ? '+' : ''}₹{realizedPnl.toFixed(2)}</span></p>
            <p>Remaining Shares: <span className="font-semibold text-slate-200">{remainingQuantity}</span></p>
          </div>
        </div>
        <div className="p-4 border-t border-slate-700 grid grid-cols-2 gap-2">
          <button onClick={onClose} className="p-3 bg-slate-700 rounded-md font-semibold button-press-feedback">Cancel</button>
          <button onClick={handleClose} className={`p-3 rounded-md font-semibold button-press-feedback ${buttonClass}`}>
            {isClosingFullPosition ? 'Close Full Position' : `${buttonText} ${quantity} Share(s)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PositionManagerDialog;
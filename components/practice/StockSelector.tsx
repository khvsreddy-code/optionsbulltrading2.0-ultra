import React, { useState } from 'react';
import type { Instrument } from '../../types';
import { ChevronDown } from '../common/Icons';

interface StockSelectorProps {
  instruments: Instrument[];
  onSelect: (instrument: Instrument) => void;
  selectedInstrument: Instrument | null;
}

const StockSelector: React.FC<StockSelectorProps> = ({ instruments, onSelect, selectedInstrument }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (instrument: Instrument) => {
    onSelect(instrument);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-2 bg-transparent rounded-lg text-left hover:bg-card"
      >
        <div className="flex items-center">
            {selectedInstrument && <selectedInstrument.icon size={22} className="mr-2 text-text-main" />}
            <span className="text-text-main font-semibold text-lg">{selectedInstrument?.exchange_token}</span>
        </div>
        <ChevronDown size={20} className={`text-text-secondary transition-transform ml-2 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-72 mt-1 bg-card border border-border rounded-lg shadow-xl">
          <ul className="max-h-72 overflow-y-auto p-1">
            {instruments.map(instrument => {
                const isEnabled = instrument.instrument_key === 'CRYPTO_BTCUSDT';
                return (
                    <li
                        key={instrument.instrument_key}
                        onClick={() => isEnabled && handleSelect(instrument)}
                        className={`flex items-center justify-between p-3 rounded-md transition-colors ${isEnabled ? 'cursor-pointer hover:bg-background' : 'opacity-50 cursor-not-allowed'}`}
                    >
                        <div className="flex items-center">
                            <instrument.icon size={22} className="mr-3 text-text-main" />
                            <div>
                                <span className="font-semibold text-text-main">{instrument.exchange_token}</span>
                                <div className="text-xs text-text-secondary">{instrument.name}</div>
                            </div>
                        </div>
                        {!isEnabled && (
                            <span className="text-xs font-semibold bg-primary-light text-primary px-2 py-1 rounded-full">
                                Coming Soon
                            </span>
                        )}
                    </li>
                );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StockSelector;
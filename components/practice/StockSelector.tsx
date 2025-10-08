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
    <div className="relative w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 bg-transparent rounded-lg text-left hover:bg-slate-800"
      >
        <div className="flex items-center">
            {selectedInstrument && <selectedInstrument.icon size={24} className="mr-3 text-white" />}
            <div>
                <span className="text-white font-semibold text-lg">{selectedInstrument?.tradingsymbol}</span>
                <span className="text-slate-400 text-xs ml-2">{selectedInstrument?.name}</span>
            </div>
        </div>
        <ChevronDown size={20} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#1C2127] border border-[#2A2E39] rounded-lg shadow-xl">
          <ul className="max-h-72 overflow-y-auto p-1">
            {instruments.map(instrument => {
              const isCrypto = instrument.instrument_type === 'CRYPTO';
              return (
                <li
                  key={instrument.instrument_key}
                  onClick={() => isCrypto && handleSelect(instrument)}
                  className={`flex items-center justify-between p-3 rounded-md transition-colors ${
                    !isCrypto 
                      ? 'cursor-not-allowed opacity-50' 
                      : 'cursor-pointer hover:bg-slate-800'
                  }`}
                >
                    <div className="flex items-center">
                        <instrument.icon size={22} className={`mr-3 ${!isCrypto ? 'text-slate-500' : 'text-white'}`} />
                        <div>
                            <span className={`font-semibold ${!isCrypto ? 'text-slate-500' : 'text-white'}`}>{instrument.tradingsymbol}</span>
                            <div className="text-xs text-slate-400">{instrument.name}</div>
                        </div>
                    </div>
                  {!isCrypto && (
                    <span className="text-xs font-bold text-yellow-500 bg-yellow-900/50 px-2 py-1 rounded-full">
                      SOON
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
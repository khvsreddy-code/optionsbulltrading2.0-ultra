import React from 'react';
import type { Timeframe } from '../../services/marketSimulator';

interface TimeframeSelectorProps {
  selectedTimeframe: Timeframe;
  onSelectTimeframe: (timeframe: Timeframe) => void;
}

const TIMEFRAMES: Timeframe[] = ['1s', '1m', '5m'];

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ selectedTimeframe, onSelectTimeframe }) => {
  return (
    <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-1">
      {TIMEFRAMES.map(tf => (
        <button
          key={tf}
          onClick={() => onSelectTimeframe(tf)}
          className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
            selectedTimeframe === tf
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:bg-slate-700 hover:text-white'
          }`}
        >
          {tf}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;

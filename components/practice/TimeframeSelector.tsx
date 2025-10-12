import React from 'react';
// FIX: The Timeframe type should be imported from the central types file.
import type { Timeframe } from '../../types';

interface TimeframeSelectorProps {
  selectedTimeframe: Timeframe;
  onSelectTimeframe: (timeframe: Timeframe) => void;
}

const TIMEFRAMES: Timeframe[] = ['1m', '5m', '15m', '30m', '45m'];

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ selectedTimeframe, onSelectTimeframe }) => {
  return (
    <div className="flex items-center bg-card border border-border rounded-lg p-1">
      {TIMEFRAMES.map(tf => (
        <button
          key={tf}
          onClick={() => onSelectTimeframe(tf)}
          className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
            selectedTimeframe === tf
              ? 'bg-blue-600 text-white'
              : 'text-text-secondary hover:bg-background hover:text-text-main'
          }`}
        >
          {tf}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;
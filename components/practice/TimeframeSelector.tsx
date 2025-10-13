import React from 'react';
import type { Timeframe } from '../../types';

interface TimeframeSelectorProps {
  activeTimeframe: Timeframe;
  onSelectTimeframe: (timeframe: Timeframe) => void;
}

const timeframes: Timeframe[] = ['1m', '5m', '15m', '30m', '45m'];

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ activeTimeframe, onSelectTimeframe }) => {
  return (
    <div className="flex items-center space-x-1 bg-card p-1 rounded-lg border border-border">
      {timeframes.map(tf => (
        <button
          key={tf}
          onClick={() => onSelectTimeframe(tf)}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
            activeTimeframe === tf ? 'bg-primary text-white' : 'text-text-secondary hover:bg-background'
          }`}
        >
          {tf.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;
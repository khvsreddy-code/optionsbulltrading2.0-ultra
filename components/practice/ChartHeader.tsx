import React from 'react';
import type { Instrument, CandleData, Timeframe } from '../../types';
import StockSelector from './StockSelector';
import TimeframeSelector from './TimeframeSelector';

interface ChartHeaderProps {
  instruments: Instrument[];
  selectedInstrument: Instrument | null;
  onSelectInstrument: (instrument: Instrument) => void;
  selectedTimeframe: Timeframe;
  onSelectTimeframe: (timeframe: Timeframe) => void;
  liveOhlc: CandleData | null;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({
  instruments,
  selectedInstrument,
  onSelectInstrument,
  selectedTimeframe,
  onSelectTimeframe,
  liveOhlc
}) => {
  const price = liveOhlc?.close ?? selectedInstrument?.last_price ?? 0;
  const open = liveOhlc?.open ?? 0;
  const change = price - open;
  const changePercent = open === 0 ? 0 : (change / open) * 100;
  const priceColor = change >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="flex-shrink-0 bg-[#131722] border-b border-[#2A2E39] p-2 flex items-center justify-between gap-x-4 gap-y-2 flex-wrap">
      <div className="flex items-center space-x-3">
        <StockSelector
            instruments={instruments}
            onSelect={onSelectInstrument}
            selectedInstrument={selectedInstrument}
        />
        {liveOhlc && (
          <div className="hidden sm:flex items-baseline space-x-2">
              <span className={`text-lg font-mono font-bold ${priceColor}`}>{price.toFixed(2)}</span>
              <span className={`text-sm font-semibold ${priceColor}`}>
                  {change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
              </span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {liveOhlc && (
            <div className="hidden md:flex items-center space-x-3 text-xs text-slate-400 font-mono">
                <span>O:{liveOhlc.open.toFixed(2)}</span>
                <span>H:{liveOhlc.high.toFixed(2)}</span>
                <span>L:{liveOhlc.low.toFixed(2)}</span>
                <span className={priceColor}>C:{liveOhlc.close.toFixed(2)}</span>
            </div>
        )}
        <TimeframeSelector
            selectedTimeframe={selectedTimeframe}
            onSelectTimeframe={onSelectTimeframe}
        />
      </div>
    </div>
  );
};

export default ChartHeader;
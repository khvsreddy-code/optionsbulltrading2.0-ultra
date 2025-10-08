import React, { useState, useEffect } from 'react';
import type { Instrument, CandleData } from '../../types';
import type { Timeframe } from '../../services/marketSimulator';
import StockSelector from './StockSelector';
import TimeframeSelector from './TimeframeSelector';
import { Clock } from '../common/Icons';

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
  const [countdown, setCountdown] = useState('');
  const price = liveOhlc?.close ?? selectedInstrument?.last_price ?? 0;
  const open = liveOhlc?.open ?? 0;
  const change = price - open;
  const changePercent = open === 0 ? 0 : (change / open) * 100;
  const priceColor = change >= 0 ? 'text-green-500' : 'text-red-500';
  
  useEffect(() => {
    if (!liveOhlc || selectedTimeframe === '1s') {
        setCountdown('');
        return;
    }

    const timeframeMap: Record<Timeframe, number | undefined> = { '1s': 1, '1m': 60, '5m': 300, '15m': 900, '30m': 1800, '45m': 2700 };
    const timeframeInSeconds = timeframeMap[selectedTimeframe];

    if (!timeframeInSeconds) {
        setCountdown('');
        return;
    }
    
    const closeTime = liveOhlc.time + timeframeInSeconds;

    const timerId = setInterval(() => {
        const nowSeconds = Date.now() / 1000;
        const remainingSeconds = Math.max(0, Math.floor(closeTime - nowSeconds));
        
        if (remainingSeconds <= 0) {
             setCountdown('00:00');
        } else {
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            setCountdown(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        }
    }, 1000);

    return () => clearInterval(timerId);

  }, [liveOhlc, selectedTimeframe]);


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
        {countdown && (
            <div className="flex items-center space-x-1.5 text-sm font-mono text-yellow-400 hidden lg:flex" title="Time until bar close">
                <Clock size={16} />
                <span>{countdown}</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default ChartHeader;

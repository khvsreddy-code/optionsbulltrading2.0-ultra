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

const InfoPill: React.FC<{ label: string; value: string; colorClass?: string }> = ({ label, value, colorClass = 'text-slate-300' }) => (
    <div className="text-xs">
        <span className="text-slate-500 mr-1.5">{label}</span>
        <span className={colorClass}>{value}</span>
    </div>
);

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
  const priceColor = change >= 0 ? 'text-[#1AAB7A]' : 'text-[#FF3D5F]';
  
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
    <div className="flex-shrink-0 bg-[#131722] border-b border-[#2A2E39]">
        <div className="flex items-center space-x-4 p-2">
            <StockSelector
                instruments={instruments}
                onSelect={onSelectInstrument}
                selectedInstrument={selectedInstrument}
            />
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
        {liveOhlc && (
             <div className="flex items-center space-x-4 px-3 pb-2">
                <InfoPill label="O" value={liveOhlc.open.toFixed(2)} />
                <InfoPill label="H" value={liveOhlc.high.toFixed(2)} />
                <InfoPill label="L" value={liveOhlc.low.toFixed(2)} />
                <InfoPill label="C" value={liveOhlc.close.toFixed(2)} colorClass={priceColor} />
                <InfoPill label="Chg" value={`${change >= 0 ? '+' : ''}${change.toFixed(2)} (${changePercent.toFixed(2)}%)`} colorClass={priceColor} />
            </div>
        )}
    </div>
  );
};

export default ChartHeader;
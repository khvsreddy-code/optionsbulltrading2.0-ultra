import React from 'react';
import type { Instrument, CandleData } from '../../types';
import type { Timeframe } from '../../services/marketSimulator';
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
  const price = liveOhlc?.close ?? selectedInstrument?.last_price ?? 0;
  const open = liveOhlc?.open ?? 0;
  const change = price - open;
  const changePercent = open === 0 ? 0 : (change / open) * 100;
  const priceColor = change >= 0 ? 'text-[#1AAB7A]' : 'text-[#FF3D5F]';

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

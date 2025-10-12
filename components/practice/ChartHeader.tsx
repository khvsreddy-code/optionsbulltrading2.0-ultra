import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import type { Instrument, CandleData, Timeframe, OrderSide } from '../../types';
import StockSelector from './StockSelector';
import TimeframeSelector from './TimeframeSelector';

interface ChartHeaderProps {
  instruments: Instrument[];
  selectedInstrument: Instrument | null;
  onSelectInstrument: (instrument: Instrument) => void;
  selectedTimeframe: Timeframe;
  onSelectTimeframe: (timeframe: Timeframe) => void;
  liveOhlc: CandleData | null;
  onTradeButtonClick: (side: OrderSide) => void;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({
  instruments,
  selectedInstrument,
  onSelectInstrument,
  selectedTimeframe,
  onSelectTimeframe,
  liveOhlc,
  onTradeButtonClick
}) => {
  const price = liveOhlc?.close ?? selectedInstrument?.last_price ?? 0;
  const open = liveOhlc?.open ?? 0;
  const change = price - open;
  const changePercent = open === 0 ? 0 : (change / open) * 100;
  const priceColor = change >= 0 ? 'text-green-500' : 'text-red-500';

  const priceRef = useRef<HTMLSpanElement>(null);
  const prevPriceRef = useRef<number>(price);

  useEffect(() => {
    if (priceRef.current) {
        const currentPrice = price;
        const prevPrice = prevPriceRef.current;
        
        if (currentPrice !== prevPrice && prevPrice !== 0) {
            const color = currentPrice > prevPrice ? 'rgba(22, 163, 74, 0.4)' : 'rgba(239, 68, 68, 0.4)'; // green or red with alpha
            anime.remove(priceRef.current);
            anime({
                targets: priceRef.current,
                backgroundColor: [color, 'rgba(0,0,0,0)'],
                duration: 700,
                easing: 'easeOutQuad'
            });
        }
        prevPriceRef.current = currentPrice;
    }
  }, [price]);

  return (
    <div className="flex-shrink-0 bg-background border-b border-border p-2 flex items-center justify-between gap-x-4 gap-y-2 flex-wrap">
      <div className="flex items-center space-x-3">
        <StockSelector
            instruments={instruments}
            onSelect={onSelectInstrument}
            selectedInstrument={selectedInstrument}
        />
        <div className="flex items-center gap-1">
            <button
                onClick={() => onTradeButtonClick('BUY')}
                className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded-md transition-colors button-press-feedback"
            >
                BUY
            </button>
            <button
                onClick={() => onTradeButtonClick('SELL')}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors button-press-feedback"
            >
                SELL
            </button>
        </div>
        {liveOhlc && (
          <div className="hidden sm:flex items-baseline space-x-2">
              <span ref={priceRef} className={`text-lg font-mono font-bold ${priceColor} rounded-md px-1 transition-colors duration-200`}>{price.toFixed(2)}</span>
              <span className={`text-sm font-semibold ${priceColor}`}>
                  {change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
              </span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {liveOhlc && (
            <div className="hidden md:flex items-center space-x-3 text-xs text-text-secondary font-mono">
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
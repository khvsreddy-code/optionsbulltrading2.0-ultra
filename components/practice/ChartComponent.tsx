import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, UTCTimestamp, ColorType, BarData, LineWidth } from 'lightweight-charts';
import type { CandleData } from '../../types';

interface ChartComponentProps {
  data: CandleData[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const lastAppliedTimestampRef = useRef<UTCTimestamp | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: '#131722' },
        textColor: '#D9D9D9',
      },
      grid: {
        vertLines: { color: '#2A2E39' },
        horzLines: { color: '#2A2E39' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        borderColor: '#485158',
      },
      rightPriceScale: {
        borderColor: '#485158',
      },
      crosshair: {
        mode: 1, // Magnet mode
        vertLine: {
          width: 2 as LineWidth,
          color: '#C3BCDB',
          style: 4, // Dashed
          labelBackgroundColor: '#9B7DFF',
        },
        horzLine: {
          color: '#9B7DFF',
          labelBackgroundColor: '#9B7DFF',
        },
      },
    });

    candlestickSeriesRef.current = (chartRef.current as any).addCandlestickSeries({
        upColor: '#1AAB7A',
        downColor: '#FF3D5F',
        borderDownColor: '#FF3D5F',
        borderUpColor: '#1AAB7A',
        wickDownColor: '#FF3D5F',
        wickUpColor: '#1AAB7A',
    });

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []); // Create chart only once

  // Effect for updating data
  useEffect(() => {
    if (!candlestickSeriesRef.current || !data) return;

    if (data.length === 0) {
        candlestickSeriesRef.current.setData([]);
        lastAppliedTimestampRef.current = null;
        return;
    }

    const candlestickData: BarData[] = data.map(candle => ({
      time: candle.time as UTCTimestamp,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }));
    
    const lastCandle = candlestickData[candlestickData.length - 1];
    
    // FIX: Correctly determine if this is an update to the last candle or a new candle.
    if (lastCandle.time === lastAppliedTimestampRef.current) {
        // This is an update to the last candle, use the efficient `update` method.
        candlestickSeriesRef.current.update(lastCandle);
    } else {
        // This is a new candle or a full historical data load, use `setData`.
        candlestickSeriesRef.current.setData(candlestickData);
    }
    
    // FIX: Correctly cast the 'time' property of the last candle to 'UTCTimestamp' before assigning it to the ref. This resolves the TypeScript error where the broader 'Time' type (which can be a string) was not assignable to the stricter 'UTCTimestamp' (number) type expected by the ref.
    lastAppliedTimestampRef.current = lastCandle.time as UTCTimestamp;
    
  }, [data]);

  return <div ref={chartContainerRef} className="w-full h-full" />;
};

export default ChartComponent;
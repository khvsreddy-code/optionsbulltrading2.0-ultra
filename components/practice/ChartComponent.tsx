import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { createChart, IChartApi, ISeriesApi, UTCTimestamp, ColorType, BarData, LineWidth } from 'lightweight-charts';
import type { CandleData } from '../../types';

interface ChartComponentProps {
  initialData: CandleData[];
}

// forwardRef allows the parent component (PracticeView) to get a ref to this component's instance
const ChartComponent = forwardRef<({ updateCandle: (candle: CandleData) => void; }), ChartComponentProps>(({ initialData }, ref) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  
  // Expose a function to the parent component
  useImperativeHandle(ref, () => ({
    updateCandle(candle: CandleData) {
      if (candlestickSeriesRef.current) {
        candlestickSeriesRef.current.update({
          time: candle.time as UTCTimestamp,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
        });
      }
    }
  }));

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

    candlestickSeriesRef.current = chartRef.current.addCandlestickSeries({
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

  // Effect for initializing data
  useEffect(() => {
    if (candlestickSeriesRef.current && initialData && initialData.length > 0) {
        const candlestickData: BarData[] = initialData.map(candle => ({
            time: candle.time as UTCTimestamp,
            open: candle.open,
            high: candle.high,
            low: candle.low,
            close: candle.close,
        }));
        candlestickSeriesRef.current.setData(candlestickData);
    }
  }, [initialData]);

  return <div ref={chartContainerRef} className="w-full h-full" />;
});

export default ChartComponent;
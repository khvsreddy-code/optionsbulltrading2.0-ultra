import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { createChart, IChartApi, ISeriesApi, UTCTimestamp, ColorType, BarData, LineWidth, CrosshairMode } from 'lightweight-charts';
import type { CandleData } from '../../types';
import type { DrawingTool } from './DrawingToolbar';

interface ChartComponentProps {
  initialData: CandleData[];
  activeTool: DrawingTool;
}

// forwardRef allows the parent component (PracticeView) to get a ref to this component's instance
const ChartComponent = forwardRef<({ updateCandle: (candle: CandleData) => void; }), ChartComponentProps>(({ initialData, activeTool }, ref) => {
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

    const chart = createChart(chartContainerRef.current, {
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
        mode: CrosshairMode.Normal,
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
    chartRef.current = chart;

    candlestickSeriesRef.current = chart.addCandlestickSeries({
        upColor: '#1AAB7A',
        downColor: '#FF3D5F',
        borderDownColor: '#FF3D5F',
        borderUpColor: '#1AAB7A',
        wickDownColor: '#FF3D5F',
        wickUpColor: '#1AAB7A',
    });
    
    // Modern, robust way to handle chart resizing. It observes the container
    // element and automatically resizes the chart whenever the container's
    // dimensions change.
    const resizeObserver = new ResizeObserver(entries => {
      if (entries.length === 0 || entries[0].target !== chartContainerRef.current) {
        return;
      }
      const { width, height } = entries[0].contentRect;
      chart.resize(width, height);
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      candlestickSeriesRef.current = null;
    };
  }, []); // Create chart only once

  // Effect to handle drawing tool changes
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.applyOptions({
        crosshair: {
          mode: activeTool === 'crosshair' ? CrosshairMode.Normal : CrosshairMode.Magnet,
        }
      });
    }
    if (chartContainerRef.current) {
      // Use a crosshair cursor for any tool other than the default one
      chartContainerRef.current.style.cursor = activeTool === 'crosshair' ? '' : 'crosshair';
    }
  }, [activeTool]);

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

  return <div ref={chartContainerRef} className="absolute inset-0" />;
});

export default ChartComponent;
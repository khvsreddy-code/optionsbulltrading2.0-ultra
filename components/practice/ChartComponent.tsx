import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi, UTCTimestamp, ColorType, BarData, LineWidth, CrosshairMode, IPriceLine, MouseEventParams } from 'lightweight-charts';
import type { CandleData } from '../../types';
import type { Timeframe } from '../../services/marketSimulator';
import type { DrawingTool } from './DrawingToolbar';

interface ChartComponentProps {
  initialData: CandleData[];
  activeTool: DrawingTool;
  liveOhlc: CandleData | null;
  timeframe: Timeframe;
}

const ChartComponent = forwardRef<({ updateCandle: (candle: CandleData) => void; }), ChartComponentProps>(({ initialData, activeTool, liveOhlc, timeframe }, ref) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [countdown, setCountdown] = useState('');
  const drawnLinesRef = useRef<IPriceLine[]>([]);

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

  // Countdown Timer Logic
  useEffect(() => {
    if (!liveOhlc || timeframe === '1s') {
        setCountdown('');
        return;
    }

    const timeframeMap: Record<Timeframe, number | undefined> = { '1s': 1, '1m': 60, '5m': 300, '15m': 900, '30m': 1800, '45m': 2700 };
    const timeframeInSeconds = timeframeMap[timeframe];
    if (!timeframeInSeconds) return;
    
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
  }, [liveOhlc, timeframe]);

  // Main Chart Initialization
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
      },
      // --- ADDED FOR ZOOM AND PAN ---
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true, // Panning
      },
      handleScale: {
        axisPressedMouseMove: true, // Scaling by dragging axes
        mouseWheel: true, // Zooming
        pinch: true, // Pinch-to-zoom on touch devices
      },
      // --- END OF ADDITION ---
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
    
    const resizeObserver = new ResizeObserver(entries => {
      if (entries.length === 0 || entries[0].target !== chartContainerRef.current) return;
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
  }, []);

  // Update Price Scale with Countdown
  useEffect(() => {
    if (candlestickSeriesRef.current && liveOhlc) {
        const series = candlestickSeriesRef.current;
        const currentPrice = liveOhlc.close;

        series.applyOptions({
            lastValueVisible: true,
            priceLineVisible: true,
            priceFormat: {
                type: 'custom',
                formatter: (price: number) => {
                    if (price === currentPrice) {
                        return countdown ? `${price.toFixed(2)} \u200B ${countdown}` : price.toFixed(2);
                    }
                    return price.toFixed(2);
                },
                minMove: 0.01,
            },
        });
    }
  }, [liveOhlc, countdown]);


  // Effect to handle drawing tool logic
  useEffect(() => {
    const chart = chartRef.current;
    const series = candlestickSeriesRef.current;
    if (!chart || !series) return;

    if (activeTool === 'trash') {
        drawnLinesRef.current.forEach(line => series.removePriceLine(line));
        drawnLinesRef.current = [];
        return; // Don't subscribe to click, just clear and exit
    }

    const handleClick = (param: MouseEventParams) => {
        if (!param.point || !param.seriesPrices.size || !series) return;
        const priceData = param.seriesPrices.get(series);
        if (!priceData) return;
        
        const price = series.coordinateToPrice(param.point.y);
        if (price === null) return;
        
        if (activeTool === 'horizontal') {
            const newLine = series.createPriceLine({
                price: price,
                color: '#2962FF',
                lineWidth: 2,
                lineStyle: 2, // Dashed
                axisLabelVisible: true,
                title: '',
            });
            drawnLinesRef.current.push(newLine);
        }
    };
    
    chart.subscribeClick(handleClick);
    return () => chart.unsubscribeClick(handleClick);
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
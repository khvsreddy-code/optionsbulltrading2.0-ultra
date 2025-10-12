import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi, UTCTimestamp, ColorType, BarData, CrosshairMode } from 'lightweight-charts';
import type { CandleData, Timeframe } from '../../types';

interface ChartComponentProps {
  initialData: CandleData[];
  timeframe: Timeframe;
  theme: 'light' | 'dark';
}

const ChartComponent = forwardRef<({ updateCandle: (candle: CandleData) => void; }), ChartComponentProps>(({ initialData, timeframe, theme }, ref) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
    const [countdown, setCountdown] = useState('');

    useImperativeHandle(ref, () => ({
        updateCandle(candle: CandleData) {
            if (!candlestickSeriesRef.current) return;
            
            candlestickSeriesRef.current.update({
                time: candle.time as UTCTimestamp, open: candle.open, high: candle.high, low: candle.low, close: candle.close,
            });
        }
    }));
    
    useEffect(() => {
        const timeframeMap: Record<Timeframe, number> = { '1m': 60, '5m': 300, '15m': 900, '30m': 1800, '45m': 2700 };
        const timeframeInSeconds = timeframeMap[timeframe];
        if (!timeframeInSeconds) return;

        const updateCountdown = () => {
            const nowSeconds = Date.now() / 1000;
            const barEndTime = Math.ceil(nowSeconds / timeframeInSeconds) * timeframeInSeconds;
            const remainingSeconds = Math.max(0, Math.floor(barEndTime - nowSeconds));
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            setCountdown(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        };

        updateCountdown();
        const timerId = setInterval(updateCountdown, 1000);
        return () => clearInterval(timerId);
    }, [timeframe]);

    useEffect(() => {
        if (!chartContainerRef.current) return;
        
        const chartColors = theme === 'dark'
            ? { bg: '#111827', text: '#F9FAFB', grid: '#374151', border: '#374151' }
            : { bg: '#FAF9F6', text: '#1F2937', grid: '#E5E7EB', border: '#E5E7EB' };

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight,
            layout: { background: { type: ColorType.Solid, color: chartColors.bg }, textColor: chartColors.text },
            grid: { vertLines: { color: chartColors.grid }, horzLines: { color: chartColors.grid } },
            timeScale: { timeVisible: true, secondsVisible: false, borderColor: chartColors.border },
            rightPriceScale: { borderColor: chartColors.border },
            crosshair: { mode: CrosshairMode.Normal },
            handleScroll: { mouseWheel: true, pressedMouseMove: true },
            handleScale: { axisPressedMouseMove: true, mouseWheel: true, pinch: true },
            localization: {
                timeFormatter: (timestamp: number) => new Date(timestamp * 1000).toLocaleTimeString(),
            },
        });
        chartRef.current = chart;

        candlestickSeriesRef.current = chart.addCandlestickSeries({
            upColor: '#16A34A', downColor: '#EF4444', borderDownColor: '#EF4444',
            borderUpColor: '#16A34A', wickDownColor: '#EF4444', wickUpColor: '#16A34A',
        });
        candlestickSeriesRef.current.applyOptions({
            lastValueVisible: true,
            priceLineVisible: true,
            priceFormat: {
                type: 'price',
                precision: 2,
                minMove: 0.01,
            },
        });

        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0]) chart.resize(entries[0].contentRect.width, entries[0].contentRect.height);
        });
        resizeObserver.observe(chartContainerRef.current);
        return () => { resizeObserver.disconnect(); chart.remove(); };
    }, [timeframe, theme]);
    
    useEffect(() => {
        if (candlestickSeriesRef.current && initialData.length > 0) {
            const candlestickData: BarData[] = initialData.map(c => ({
                time: c.time as UTCTimestamp, open: c.open, high: c.high, low: c.low, close: c.close,
            }));

            candlestickSeriesRef.current.setData(candlestickData);
            
            if (chartRef.current) {
                const dataLength = candlestickData.length;
                if (dataLength > 1) {
                    const lastBar = candlestickData[dataLength - 1];
                    const visibleBars = 200; 
                    const firstVisibleBarIndex = Math.max(0, dataLength - visibleBars);
                    const firstVisibleBar = candlestickData[firstVisibleBarIndex];

                    chartRef.current.timeScale().setVisibleRange({
                        from: firstVisibleBar.time,
                        to: lastBar.time,
                    });
                } else {
                    chartRef.current.timeScale().fitContent();
                }
            }
        }
    }, [initialData]);

    return (
        <div className="absolute inset-0">
            <div ref={chartContainerRef} className="w-full h-full" />
            {countdown && (
                <div 
                    className="absolute bottom-2 right-[80px] z-10 bg-card/50 text-text-secondary text-sm font-mono px-2 py-1 rounded pointer-events-none"
                >
                    {countdown}
                </div>
            )}
        </div>
    );
});

export default ChartComponent;
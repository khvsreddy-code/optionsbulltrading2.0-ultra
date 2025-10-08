import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi, UTCTimestamp, ColorType, BarData, CrosshairMode, MouseEventParams, LineStyle, ILineSeriesApi } from 'lightweight-charts';
import type { CandleData } from '../../types';
import type { Timeframe } from '../../services/marketSimulator';

interface ChartComponentProps {
  initialData: CandleData[];
  liveOhlc: CandleData | null;
  timeframe: Timeframe;
}

const ChartComponent = forwardRef<({ updateCandle: (candle: CandleData) => void; }), ChartComponentProps>(({ initialData, liveOhlc, timeframe }, ref) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
    const [countdown, setCountdown] = useState('');
    const [countdownPosition, setCountdownPosition] = useState<{ top: number; right: number; } | null>(null);


    useImperativeHandle(ref, () => ({
        updateCandle(candle: CandleData) {
            candlestickSeriesRef.current?.update({
                time: candle.time as UTCTimestamp, open: candle.open, high: candle.high, low: candle.low, close: candle.close,
            });
        }
    }));

    useEffect(() => {
        if (timeframe === '1s') { setCountdown(''); return; }
        const timeframeMap: Record<Timeframe, number> = { '1s': 1, '1m': 60, '5m': 300, '15m': 900, '30m': 1800, '45m': 2700 };
        const timeframeInSeconds = timeframeMap[timeframe];
        if (!timeframeInSeconds) return;
        const update = () => {
            const nowSeconds = Date.now() / 1000;
            const barEndTime = Math.ceil(nowSeconds / timeframeInSeconds) * timeframeInSeconds;
            const remainingSeconds = Math.max(0, Math.floor(barEndTime - nowSeconds));
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            setCountdown(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        };
        update();
        const timerId = setInterval(update, 1000);
        return () => clearInterval(timerId);
    }, [timeframe]);

    useEffect(() => {
        if (!chartContainerRef.current) return;
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight,
            layout: { background: { type: ColorType.Solid, color: '#131722' }, textColor: '#D9D9D9' },
            grid: { vertLines: { color: '#2A2E39' }, horzLines: { color: '#2A2E39' } },
            timeScale: { timeVisible: true, secondsVisible: true, borderColor: '#485158' },
            rightPriceScale: { borderColor: '#485158' },
            crosshair: { mode: CrosshairMode.Normal },
            handleScroll: { mouseWheel: true, pressedMouseMove: true },
            handleScale: { axisPressedMouseMove: true, mouseWheel: true, pinch: true },
        });
        chartRef.current = chart;
        candlestickSeriesRef.current = chart.addCandlestickSeries({
            upColor: '#1AAB7A', downColor: '#FF3D5F', borderDownColor: '#FF3D5F',
            borderUpColor: '#1AAB7A', wickDownColor: '#FF3D5F', wickUpColor: '#1AAB7A',
        });
        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0]) chart.resize(entries[0].contentRect.width, entries[0].contentRect.height);
        });
        resizeObserver.observe(chartContainerRef.current);
        return () => { resizeObserver.disconnect(); chart.remove(); };
    }, []);
    
    useEffect(() => {
        if (candlestickSeriesRef.current && liveOhlc) {
            const series = candlestickSeriesRef.current;
            series.applyOptions({
                lastValueVisible: true,
                priceLineVisible: true,
                priceFormat: {
                    type: 'price',
                    precision: 2,
                    minMove: 0.01,
                },
            });
        }
    }, [liveOhlc]);
    
    useEffect(() => {
        const chart = chartRef.current;
        if (!chart || !liveOhlc) {
            setCountdownPosition(null);
            return;
        }

        const updatePosition = () => {
            if (!liveOhlc) return;
            const priceScale = chart.priceScale('right');
            if (priceScale.isEmpty()) return;

            const price = liveOhlc.close;
            const coordinate = priceScale.priceToCoordinate(price);

            if (coordinate === null) {
                setCountdownPosition(null);
                return;
            }
            
            const priceScaleWidth = priceScale.width();
            const chartHeight = chartContainerRef.current?.clientHeight ?? 0;

            if (coordinate >= 0 && coordinate <= chartHeight) {
                 setCountdownPosition({
                    top: coordinate,
                    right: priceScaleWidth + 5,
                });
            } else {
                setCountdownPosition(null);
            }
        };

        const rafUpdatePosition = () => requestAnimationFrame(updatePosition);
        
        rafUpdatePosition();

        const subscription = chart.timeScale().subscribeVisibleLogicalRangeChange(rafUpdatePosition);
        
        return () => {
            chart.timeScale().unsubscribeVisibleLogicalRangeChange(subscription);
        };
    }, [liveOhlc]);

    useEffect(() => {
        if (candlestickSeriesRef.current && initialData.length > 0) {
            const candlestickData: BarData[] = initialData.map(c => ({
                time: c.time as UTCTimestamp, open: c.open, high: c.high, low: c.low, close: c.close,
            }));
            candlestickSeriesRef.current.setData(candlestickData);
            chartRef.current?.timeScale().fitContent();
        }
    }, [initialData]);

    return (
        <>
            <div ref={chartContainerRef} className="absolute inset-0" />
            {countdownPosition && countdown && (
                <div
                    style={{
                        top: `${countdownPosition.top}px`,
                        right: `${countdownPosition.right}px`,
                        transform: 'translateY(12px)',
                    }}
                    className="absolute z-20 pointer-events-none text-xs bg-slate-700 text-slate-200 px-1.5 py-0.5 rounded"
                >
                    {countdown}
                </div>
            )}
        </>
    );
});

export default ChartComponent;
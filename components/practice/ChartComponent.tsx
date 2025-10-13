import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, memo, useCallback } from 'react';
import { createChart, IChartApi, ISeriesApi, UTCTimestamp, ColorType, BarData, CrosshairMode, ILineSeries, IPriceLine, LineStyle } from 'lightweight-charts';
import type { CandleData, Timeframe } from '../../types';
import type { Drawing, DrawingTool } from '../../views/PracticeView';

interface ChartComponentProps {
  initialData: CandleData[];
  timeframe: Timeframe;
  theme: 'light' | 'dark';
  activeDrawingTool: DrawingTool;
  drawings: Drawing[];
  onDrawingComplete: (drawing: Drawing) => void;
}

const ChartComponent = forwardRef<({ updateCandle: (candle: CandleData) => void; }), ChartComponentProps>(({ initialData, timeframe, theme, activeDrawingTool, drawings, onDrawingComplete }, ref) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
    const [countdown, setCountdown] = useState('');

    const drawingStateRef = useRef<{
        isDrawing: boolean;
        startPoint: { time: UTCTimestamp; price: number } | null;
        tempLine: ILineSeries | null;
    }>({ isDrawing: false, startPoint: null, tempLine: null });

    const drawnObjectsRef = useRef<Map<string, ILineSeries | IPriceLine>>(new Map());
    const lastMouseMoveTimeRef = useRef(0);

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
            priceFormat: { type: 'price', precision: 2, minMove: 0.01 },
        });

        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0] && chartRef.current) {
                chartRef.current.resize(entries[0].contentRect.width, entries[0].contentRect.height);
            }
        });
        resizeObserver.observe(chartContainerRef.current);
        
        return () => {
            resizeObserver.disconnect();
            if (chartRef.current) {
                chartRef.current.remove();
            }
            chartRef.current = null;
            candlestickSeriesRef.current = null;
            drawnObjectsRef.current.clear();
        };
    }, [timeframe, theme]);
    
    useEffect(() => {
        if (candlestickSeriesRef.current && initialData.length > 0) {
            const candlestickData: BarData[] = initialData.map(c => ({
                time: c.time as UTCTimestamp, open: c.open, high: c.high, low: c.low, close: c.close,
            }));
            candlestickSeriesRef.current.setData(candlestickData);
            if (chartRef.current) chartRef.current.timeScale().fitContent();
        }
    }, [initialData]);

    useEffect(() => {
        const chart = chartRef.current;
        const series = candlestickSeriesRef.current;
        if (!chart || !series) return;
    
        drawnObjectsRef.current.forEach(obj => {
            try {
                if ('price' in (obj as any)) series.removePriceLine(obj as IPriceLine);
                else chart.removeSeries(obj as ILineSeries);
            } catch (e) { console.warn("Could not remove drawn object", e); }
        });
        drawnObjectsRef.current.clear();
    
        drawings.forEach(drawing => {
            if (drawing.type === 'horizontal') {
                const line = series.createPriceLine({
                    price: drawing.price, color: '#3B82F6', lineWidth: 2, lineStyle: LineStyle.Solid, axisLabelVisible: true, title: '',
                });
                drawnObjectsRef.current.set(drawing.id, line);
            }
            if (drawing.type === 'trendline') {
                const lineSeries = chart.addLineSeries({
                    color: '#3B82F6', lineWidth: 2, priceLineVisible: false, lastValueVisible: false,
                    // CRITICAL FIX: Prevent the permanent line from affecting auto-scaling.
                    autoscaleInfoProvider: () => null,
                });
                lineSeries.setData([
                    { time: drawing.start.time as UTCTimestamp, value: drawing.start.price },
                    { time: drawing.end.time as UTCTimestamp, value: drawing.end.price },
                ]);
                drawnObjectsRef.current.set(drawing.id, lineSeries);
            }
        });
    }, [drawings]);

    const handleCrosshairMove = useCallback((param: any) => {
        const now = Date.now();
        if (now - lastMouseMoveTimeRef.current < 16) return;
        lastMouseMoveTimeRef.current = now;

        const chart = chartRef.current;
        const series = candlestickSeriesRef.current;

        if (!chart || !series || !drawingStateRef.current.isDrawing || !drawingStateRef.current.startPoint || !param.point) return;

        if (activeDrawingTool === 'trendline') {
            try {
                const price = series.coordinateToPrice(param.point.y);
                const time = chart.timeScale().coordinateToTime(param.point.x);
                if (price && time && drawingStateRef.current.tempLine) {
                    const startPoint = { time: drawingStateRef.current.startPoint.time, value: drawingStateRef.current.startPoint.price };
                    const currentPoint = { time: time as UTCTimestamp, value: price };
                    
                    // CRITICAL FIX: Ensure the line data is always sorted by time to prevent it from disappearing.
                    const lineData = [startPoint, currentPoint].sort((a, b) => a.time - b.time);

                    drawingStateRef.current.tempLine.setData(lineData);
                }
            } catch (e) {
                console.error("Error drawing temp line:", e);
            }
        }
    }, [activeDrawingTool]);

    const handleClick = useCallback((param: any) => {
        const chart = chartRef.current;
        const series = candlestickSeriesRef.current;
        if (!chart || !series || !param.point) return;
        
        const price = series.coordinateToPrice(param.point.y);
        const time = chart.timeScale().coordinateToTime(param.point.x);
        if (!price || !time) return;

        if (activeDrawingTool === 'horizontal') {
            onDrawingComplete({ id: `d_${Date.now()}_${Math.random()}`, type: 'horizontal', price });
        }

        if (activeDrawingTool === 'trendline') {
            if (!drawingStateRef.current.isDrawing) {
                drawingStateRef.current = {
                    isDrawing: true,
                    startPoint: { time: time as UTCTimestamp, price },
                    tempLine: chart.addLineSeries({ 
                        color: '#9CA3AF', 
                        lineWidth: 2, 
                        lineStyle: LineStyle.Dashed, 
                        lastValueVisible: false, 
                        priceLineVisible: false,
                        autoscaleInfoProvider: () => null,
                    }),
                };
            } else {
                if (drawingStateRef.current.startPoint) {
                    onDrawingComplete({
                        id: `d_${Date.now()}_${Math.random()}`, type: 'trendline',
                        start: drawingStateRef.current.startPoint, end: { time: time as UTCTimestamp, price }
                    });
                }
                if (drawingStateRef.current.tempLine) {
                    try { chart.removeSeries(drawingStateRef.current.tempLine); } catch(e) {}
                }
                drawingStateRef.current = { isDrawing: false, startPoint: null, tempLine: null };
            }
        }
    }, [activeDrawingTool, onDrawingComplete]);

    useEffect(() => {
        const chart = chartRef.current;
        if (!chart || activeDrawingTool === 'cursor') return;

        chart.subscribeCrosshairMove(handleCrosshairMove);
        chart.subscribeClick(handleClick);

        return () => {
            if (chartRef.current) {
                try {
                    chartRef.current.unsubscribeCrosshairMove(handleCrosshairMove);
                    chartRef.current.unsubscribeClick(handleClick);
                } catch(e) {}
            }
            if (drawingStateRef.current.tempLine && chartRef.current) {
                try { chartRef.current.removeSeries(drawingStateRef.current.tempLine); } catch(e) {}
            }
            drawingStateRef.current = { isDrawing: false, startPoint: null, tempLine: null };
        };
    }, [activeDrawingTool, handleClick, handleCrosshairMove]);

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

export default memo(ChartComponent);
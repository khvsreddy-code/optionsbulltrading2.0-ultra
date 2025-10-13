import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
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

    // Effect to render drawings
    useEffect(() => {
        if (!chartRef.current || !candlestickSeriesRef.current) return;
        const chart = chartRef.current;
        const series = candlestickSeriesRef.current;
    
        // CRASH FIX: Clear all previously drawn objects using correct methods and type guards
        drawnObjectsRef.current.forEach(obj => {
            if ('setData' in obj) {
                // This is an ISeriesApi (like our trendline)
                chart.removeSeries(obj as ILineSeries);
            } else {
                // This is an IPriceLine (our horizontal line). It must be removed from the series it was created on.
                series.removePriceLine(obj as IPriceLine);
            }
        });
        drawnObjectsRef.current.clear();
    
        // Redraw all drawings from the state
        drawings.forEach(drawing => {
            if (drawing.type === 'horizontal') {
                const line = series.createPriceLine({
                    price: drawing.price,
                    color: '#3B82F6',
                    lineWidth: 2,
                    lineStyle: LineStyle.Solid,
                    axisLabelVisible: true,
                    title: '',
                });
                drawnObjectsRef.current.set(drawing.id, line);
            }
            if (drawing.type === 'trendline') {
                const lineSeries = chart.addLineSeries({
                    color: '#3B82F6',
                    lineWidth: 2,
                    priceLineVisible: false, // UX Improvement: Hide distracting labels
                    lastValueVisible: false,
                });
                lineSeries.setData([
                    { time: drawing.start.time as UTCTimestamp, value: drawing.start.price },
                    { time: drawing.end.time as UTCTimestamp, value: drawing.end.price },
                ]);
                drawnObjectsRef.current.set(drawing.id, lineSeries);
            }
        });
    }, [drawings]);

    // Effect to handle drawing logic
    useEffect(() => {
        if (!chartRef.current) return;
        const chart = chartRef.current;

        const handleCrosshairMove = (param: any) => {
            if (!drawingStateRef.current.isDrawing || !drawingStateRef.current.startPoint || !param.point) return;
            if (activeDrawingTool === 'trendline') {
                const price = candlestickSeriesRef.current!.coordinateToPrice(param.point.y);
                const time = chart.timeScale().coordinateToTime(param.point.x);
                if (price && time) {
                    drawingStateRef.current.tempLine?.setData([
                        { time: drawingStateRef.current.startPoint.time, value: drawingStateRef.current.startPoint.price },
                        { time: time as UTCTimestamp, value: price },
                    ]);
                }
            }
        };

        const handleClick = (param: any) => {
            if (!param.point || !candlestickSeriesRef.current) return;
            
            const price = candlestickSeriesRef.current.coordinateToPrice(param.point.y);
            const time = chart.timeScale().coordinateToTime(param.point.x);

            if (!price || !time) return;

            if (activeDrawingTool === 'horizontal') {
                onDrawingComplete({ id: `d_${Date.now()}_${Math.random()}`, type: 'horizontal', price });
            }

            if (activeDrawingTool === 'trendline') {
                if (!drawingStateRef.current.isDrawing) { // First click
                    drawingStateRef.current.isDrawing = true;
                    drawingStateRef.current.startPoint = { time: time as UTCTimestamp, price };
                    drawingStateRef.current.tempLine = chart.addLineSeries({
                        color: '#9CA3AF', lineWidth: 2, lineStyle: LineStyle.Dashed, lastValueVisible: false, priceLineVisible: false,
                    });
                } else { // Second click
                    // TRENDLINE FIX: Add safety check for startPoint before completing the drawing
                    if (drawingStateRef.current.startPoint) {
                        onDrawingComplete({
                            id: `d_${Date.now()}_${Math.random()}`, type: 'trendline',
                            start: drawingStateRef.current.startPoint, end: { time: time as UTCTimestamp, price }
                        });
                    }
                    
                    if (drawingStateRef.current.tempLine) {
                        chart.removeSeries(drawingStateRef.current.tempLine);
                    }
                    drawingStateRef.current = { isDrawing: false, startPoint: null, tempLine: null };
                }
            }
        };

        const crosshairMoveHandler = (e: any) => handleCrosshairMove(e);
        const clickHandler = (e: any) => handleClick(e);

        if (activeDrawingTool !== 'cursor') {
            chart.subscribeCrosshairMove(crosshairMoveHandler);
            chart.subscribeClick(clickHandler);
        }

        return () => {
            chart.unsubscribeCrosshairMove(crosshairMoveHandler);
            chart.unsubscribeClick(clickHandler);
            
            if (drawingStateRef.current.tempLine) {
                chart.removeSeries(drawingStateRef.current.tempLine);
            }
            drawingStateRef.current = { isDrawing: false, startPoint: null, tempLine: null };
        };
    }, [activeDrawingTool, onDrawingComplete]);


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
import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, memo, useCallback } from 'react';
// FIX: ILineSeries is not an exported member. Use ISeriesApi<'Line'> instead.
import { createChart, IChartApi, ISeriesApi, UTCTimestamp, ColorType, BarData, CrosshairMode, IPriceLine, LineStyle } from 'lightweight-charts';
import type { CandleData, Timeframe } from '../../types';
import type { Drawing, DrawingTool } from '../../views/PracticeView';

interface ChartComponentProps {
  initialData: CandleData[];
  theme: 'light' | 'dark';
  activeDrawingTool: DrawingTool;
  drawings: Drawing[];
  onDrawingComplete: (drawing: Drawing) => void;
  timeframe: Timeframe;
}

const ChartComponent = forwardRef<({ updateCandle: (candle: CandleData) => void; setData: (data: CandleData[]) => void; }), ChartComponentProps>(({ initialData, theme, activeDrawingTool, drawings, onDrawingComplete, timeframe }, ref) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
    const [tooltip, setTooltip] = useState<{
        visible: boolean;
        x: number;
        y: number;
        content: React.ReactNode;
    } | null>(null);
    const [countdown, setCountdown] = useState('');
    const countdownIntervalRef = useRef<number | null>(null);

    // FIX: Use ISeriesApi<'Line'> instead of the non-existent ILineSeries type.
    const drawingStateRef = useRef<{
        isDrawing: boolean;
        startPoint: { time: UTCTimestamp; price: number } | null;
        tempLine: ISeriesApi<'Line'> | null;
    }>({ isDrawing: false, startPoint: null, tempLine: null });

    // FIX: Use ISeriesApi<'Line'> instead of the non-existent ILineSeries type.
    const drawnObjectsRef = useRef<Map<string, ISeriesApi<'Line'> | IPriceLine>>(new Map());
    const lastMouseMoveTimeRef = useRef(0);

    const getTimeframeInSeconds = (tf: Timeframe): number => {
        const value = parseInt(tf.replace('m', ''));
        return value * 60;
    };

    // This effect now ONLY handles the countdown timer logic.
    useEffect(() => {
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

        countdownIntervalRef.current = window.setInterval(() => {
            const periodSeconds = getTimeframeInSeconds(timeframe);
            const now = Math.floor(Date.now() / 1000);
            const secondsUntilNextBar = periodSeconds - (now % periodSeconds);

            const minutes = Math.floor(secondsUntilNextBar / 60);
            const seconds = secondsUntilNextBar % 60;
            setCountdown(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }, 1000);

        return () => {
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        };
    }, [timeframe]);


    useImperativeHandle(ref, () => ({
        updateCandle(candle: CandleData) {
            if (!candlestickSeriesRef.current) return;
            candlestickSeriesRef.current.update({
                time: candle.time as UTCTimestamp, open: candle.open, high: candle.high, low: candle.low, close: candle.close,
            });
        },
        setData(data: CandleData[]) {
            if (candlestickSeriesRef.current) {
                candlestickSeriesRef.current.setData(data.map(c => ({...c, time: c.time as UTCTimestamp})));
            }
        },
    }));

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
            rightPriceScale: { 
                borderColor: chartColors.border,
            },
            crosshair: { 
                mode: CrosshairMode.Normal,
                horzLine: {
                    labelBackgroundColor: '#3B82F6', // Prominent blue for the Y-axis label
                    color: '#9CA3AF80',
                },
                vertLine: {
                    labelBackgroundColor: '#1F2937',
                    color: '#9CA3AF80',
                }
            },
            handleScroll: { mouseWheel: true, pressedMouseMove: true },
            handleScale: { axisPressedMouseMove: true, mouseWheel: true, pinch: true },
        });
        chartRef.current = chart;

        // FIX: Cast to 'any' to bypass incorrect type definitions from the library for IChartApi.
        candlestickSeriesRef.current = (chart as any).addCandlestickSeries({
            upColor: '#16A34A', downColor: '#EF4444', borderDownColor: '#EF4444',
            borderUpColor: '#16A34A', wickDownColor: '#EF4444', wickUpColor: '#16A34A',
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
    }, [theme]);
    
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
                // FIX: Use ISeriesApi<'Line'> for type casting.
                if ('price' in (obj as any)) series.removePriceLine(obj as IPriceLine);
                else chart.removeSeries(obj as ISeriesApi<'Line'>);
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
                // FIX: Cast to 'any' to bypass incorrect type definitions from the library for IChartApi.
                const lineSeries = (chart as any).addLineSeries({
                    color: '#3B82F6', lineWidth: 2, priceLineVisible: false, lastValueVisible: false,
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
        if (now - lastMouseMoveTimeRef.current < 16) return; // Throttling
        lastMouseMoveTimeRef.current = now;
    
        const chart = chartRef.current;
        const series = candlestickSeriesRef.current;
        const container = chartContainerRef.current;
    
        if (!chart || !series || !container) return;
    
        if (!param.point || !param.time) {
            setTooltip(t => (t?.visible ? { ...t, visible: false } : t));
            return;
        }
    
        if (activeDrawingTool === 'trendline' && drawingStateRef.current.isDrawing) {
            try {
                const price = series.coordinateToPrice(param.point.y);
                const time = chart.timeScale().coordinateToTime(param.point.x);
                if (price && time && drawingStateRef.current.tempLine) {
                    const startPoint = { time: drawingStateRef.current.startPoint!.time, value: drawingStateRef.current.startPoint!.price };
                    const currentPoint = { time: time as UTCTimestamp, value: price };
                    const lineData = [startPoint, currentPoint].sort((a, b) => a.time - b.time);
                    drawingStateRef.current.tempLine.setData(lineData);
                }
            } catch (e) { console.error("Error drawing temp line:", e); }
        }
    
        if (activeDrawingTool === 'cursor') {
            const data = param.seriesData.get(series) as BarData | undefined;
            if (data) {
                const date = new Date((data.time as number) * 1000).toLocaleString();
                const ohlc = `O: ${data.open.toFixed(2)} H: ${data.high.toFixed(2)} L: ${data.low.toFixed(2)} C: ${data.close.toFixed(2)}`;
    
                let tooltipX = param.point.x + 20;
                let tooltipY = param.point.y + 20;
    
                if (tooltipX > container.clientWidth - 180) tooltipX = param.point.x - 200;
                if (tooltipY > container.clientHeight - 80) tooltipY = param.point.y - 100;
    
                setTooltip({
                    visible: true, x: tooltipX, y: tooltipY,
                    content: (
                        <>
                            <div className="font-bold">{date}</div>
                            <div>{ohlc}</div>
                        </>
                    ),
                });
            } else {
                setTooltip(t => (t?.visible ? { ...t, visible: false } : t));
            }
        } else {
            setTooltip(t => (t?.visible ? { ...t, visible: false } : t));
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
                    // FIX: Cast to 'any' to bypass incorrect type definitions from the library for IChartApi.
                    tempLine: (chart as any).addLineSeries({ 
                        color: '#9CA3AF', lineWidth: 2, lineStyle: LineStyle.Dashed, 
                        lastValueVisible: false, priceLineVisible: false,
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
        if (!chart) return;
    
        // Subscribe to crosshair move for tooltips and drawing guides
        chart.subscribeCrosshairMove(handleCrosshairMove);
    
        // Subscribe to click only when a drawing tool is active
        if (activeDrawingTool !== 'cursor') {
            chart.subscribeClick(handleClick);
        }
    
        return () => {
            if (chartRef.current) {
                try {
                    chartRef.current.unsubscribeCrosshairMove(handleCrosshairMove);
                    if (activeDrawingTool !== 'cursor') {
                        chartRef.current.unsubscribeClick(handleClick);
                    }
                } catch(e) { /* ignore cleanup errors */ }
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
                <div className="absolute bottom-10 left-3 z-20 px-2 py-1 bg-card/80 backdrop-blur-sm rounded-md text-xs font-mono text-text-secondary border border-border">
                    {countdown}
                </div>
            )}
            
            {tooltip && tooltip.visible && (
                <div
                    className="absolute z-20 p-2 text-xs bg-card border border-border rounded-md shadow-lg pointer-events-none"
                    style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
                >
                    {tooltip.content}
                </div>
            )}
        </div>
    );
});

export default memo(ChartComponent);
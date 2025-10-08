import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi, UTCTimestamp, ColorType, BarData, LineWidth, CrosshairMode, IPriceLine, MouseEventParams, LineStyle, ILineSeriesApi } from 'lightweight-charts';
import type { CandleData } from '../../types';
import type { Timeframe } from '../../services/marketSimulator';
import type { DrawingTool } from './DrawingToolbar';

interface ChartComponentProps {
  initialData: CandleData[];
  activeTool: DrawingTool;
  liveOhlc: CandleData | null;
  timeframe: Timeframe;
}

// --- Data Structures for Drawings ---
interface Point { time: UTCTimestamp; price: number; }
interface BaseDrawing { id: string; type: DrawingTool; }
interface TrendLineDrawing extends BaseDrawing { type: 'trendline'; start: Point; end: Point; }
interface HorizontalLineDrawing extends BaseDrawing { type: 'horizontal'; price: number; }
interface FibRetracementDrawing extends BaseDrawing { type: 'fib'; start: Point; end: Point; }
interface TextDrawing extends BaseDrawing { type: 'text'; point: Point; text: string; }
type Drawing = TrendLineDrawing | HorizontalLineDrawing | FibRetracementDrawing | TextDrawing;

type DrawingState = 
    | { tool: 'trendline' | 'fib'; step: 1; start?: Point; }
    | { tool: 'horizontal' | 'text'; step: 1; }
    | null;

const fibLevels = [
    { level: 0, color: '#F44336', label: '0%' }, { level: 0.236, color: '#FF9800', label: '23.6%' },
    { level: 0.382, color: '#FFEB3B', label: '38.2%' }, { level: 0.5, color: '#4CAF50', label: '50%' },
    { level: 0.618, color: '#2196F3', label: '61.8%' }, { level: 0.786, color: '#9C27B0', label: '78.6%' },
    { level: 1, color: '#F44336', label: '100%' },
];
const MAGNET_THRESHOLD_PX = 10;

const ChartComponent = forwardRef<({ updateCandle: (candle: CandleData) => void; }), ChartComponentProps>(({ initialData, activeTool, liveOhlc, timeframe }, ref) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
    const [countdown, setCountdown] = useState('');

    // --- NEW: Advanced Drawing State Management ---
    const [drawings, setDrawings] = useState<Drawing[]>([]);
    const [drawingState, setDrawingState] = useState<DrawingState>(null);
    const drawnObjectsRef = useRef<Map<string, any[]>>(new Map());
    const previewLineRef = useRef<ILineSeriesApi | null>(null);

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
            const currentPrice = liveOhlc.close;
            series.applyOptions({
                lastValueVisible: true, priceLineVisible: true,
                priceFormat: {
                    type: 'custom',
                    formatter: (price: number) => price === currentPrice ? (countdown ? `${price.toFixed(2)} \u200B ${countdown}` : price.toFixed(2)) : price.toFixed(2),
                    minMove: 0.01,
                },
            });
        }
    }, [liveOhlc, countdown]);

    // --- NEW: Snapping Logic ---
    const findSnapPoint = (param: MouseEventParams): Point => {
        const series = candlestickSeriesRef.current;
        if (!series || !param.point || !param.time) return { time: 0 as UTCTimestamp, price: 0 };

        const price = param.seriesPrices.get(series) as BarData['close'] ?? 0;
        const time = param.time;
        const cursorY = series.priceToCoordinate(price);
        if (cursorY === null) return { time, price };

        let bestSnap = { price, distance: Infinity };

        // 1. Snap to candle OHLC
        const bar = Array.from(param.seriesPrices.values()).find(p => p) as BarData;
        if (bar) {
            [bar.open, bar.high, bar.low, bar.close].forEach(p => {
                const pY = series.priceToCoordinate(p);
                if (pY !== null) {
                    const distance = Math.abs(cursorY - pY);
                    if (distance < bestSnap.distance) bestSnap = { price: p, distance };
                }
            });
        }

        // 2. Snap to existing drawing anchors
        drawings.forEach(d => {
            const pointsToSnap = [];
            if (d.type === 'trendline' || d.type === 'fib') {
                pointsToSnap.push(d.start.price, d.end.price);
            } else if (d.type === 'horizontal') {
                pointsToSnap.push(d.price);
            }
            pointsToSnap.forEach(p => {
                const pY = series.priceToCoordinate(p);
                if (pY !== null) {
                    const distance = Math.abs(cursorY - pY);
                    if (distance < bestSnap.distance) bestSnap = { price: p, distance };
                }
            });
        });
        
        return bestSnap.distance < MAGNET_THRESHOLD_PX ? { time, price: bestSnap.price } : { time, price };
    };

    // --- NEW: Overhauled Drawing Logic ---
    useEffect(() => {
        const chart = chartRef.current;
        const series = candlestickSeriesRef.current;
        if (!chart || !series) return;

        // Reset state when tool changes
        setDrawingState(activeTool === 'trendline' || activeTool === 'fib' ? { tool: activeTool, step: 1 } : activeTool === 'horizontal' || activeTool === 'text' ? { tool: activeTool, step: 1 } : null);
        chart.applyOptions({ crosshair: { mode: activeTool === 'crosshair' ? CrosshairMode.Normal : CrosshairMode.Magnet } });
        if (previewLineRef.current) previewLineRef.current.setData([]);

        if (activeTool === 'trash') {
            setDrawings([]);
            return;
        }

        const handleCrosshairMove = (param: MouseEventParams) => {
            if (drawingState?.step === 1 && drawingState.start && (drawingState.tool === 'trendline' || drawingState.tool === 'fib')) {
                const snapPoint = findSnapPoint(param);
                if (!previewLineRef.current) {
                    previewLineRef.current = chart.addLineSeries({ color: '#2962FF', lineWidth: 2, lineStyle: LineStyle.Dashed, lastValueVisible: false, priceLineVisible: false });
                }
                previewLineRef.current.setData([drawingState.start, snapPoint]);
            }
        };

        const handleClick = (param: MouseEventParams) => {
            if (!drawingState) return;
            const snapPoint = findSnapPoint(param);
            const { tool } = drawingState;

            if (tool === 'horizontal') {
                setDrawings(prev => [...prev, { id: `h_${Date.now()}`, type: 'horizontal', price: snapPoint.price }]);
            } else if (tool === 'text') {
                const text = prompt("Enter annotation text:");
                if (text) setDrawings(prev => [...prev, { id: `t_${Date.now()}`, type: 'text', point: snapPoint, text }]);
            } else if (tool === 'trendline' || tool === 'fib') {
                if (!drawingState.start) {
                    setDrawingState({ ...drawingState, start: snapPoint });
                } else {
                    setDrawings(prev => [...prev, { id: `${tool}_${Date.now()}`, type: tool, start: drawingState.start!, end: snapPoint }]);
                    setDrawingState({ tool, step: 1 }); // Reset for next drawing
                    if (previewLineRef.current) previewLineRef.current.setData([]);
                }
            }
        };

        if (activeTool && activeTool !== 'crosshair') {
            chart.subscribeClick(handleClick);
            chart.subscribeCrosshairMove(handleCrosshairMove);
        }

        return () => {
            chart.unsubscribeClick(handleClick);
            chart.unsubscribeCrosshairMove(handleCrosshairMove);
        };
    }, [activeTool, drawings, drawingState]);


    // --- NEW: Rendering Effect for Drawings ---
    useEffect(() => {
        const chart = chartRef.current;
        const series = candlestickSeriesRef.current;
        if (!chart || !series) return;

        // Clear all old objects
        drawnObjectsRef.current.forEach(objects => {
            objects.forEach(obj => {
                if ('remove' in obj) obj.remove();
                else series.removePriceLine(obj);
            });
        });
        drawnObjectsRef.current.clear();

        // Render all current drawings
        drawings.forEach(d => {
            const objects = [];
            if (d.type === 'horizontal') {
                objects.push(series.createPriceLine({ price: d.price, color: '#2962FF', lineWidth: 2, lineStyle: LineStyle.Solid, axisLabelVisible: true, title: '' }));
            } else if (d.type === 'trendline') {
                const lineSeries = chart.addLineSeries({ color: '#FFEB3B', lineWidth: 2, lastValueVisible: false, priceLineVisible: false });
                lineSeries.setData([d.start, d.end]);
                objects.push(lineSeries);
            } else if (d.type === 'text') {
                 objects.push(series.createPriceLine({ price: d.point.price, color: 'transparent', axisLabelVisible: true, title: d.text, lineVisible: false, axisLabelColor: '#FFFFFF', axisLabelTextColor: '#131722' }));
            } else if (d.type === 'fib') {
                const startPrice = Math.max(d.start.price, d.end.price);
                const endPrice = Math.min(d.start.price, d.end.price);
                const diff = startPrice - endPrice;
                fibLevels.forEach(({ level, color, label }) => {
                    const price = endPrice + diff * level;
                    objects.push(series.createPriceLine({ price, color, lineWidth: 1, lineStyle: LineStyle.Dotted, axisLabelVisible: true, title: label }));
                });
            }
            drawnObjectsRef.current.set(d.id, objects);
        });
    }, [drawings]);

    useEffect(() => {
        if (candlestickSeriesRef.current && initialData.length > 0) {
            const candlestickData: BarData[] = initialData.map(c => ({
                time: c.time as UTCTimestamp, open: c.open, high: c.high, low: c.low, close: c.close,
            }));
            candlestickSeriesRef.current.setData(candlestickData);
            chartRef.current?.timeScale().fitContent();
        }
    }, [initialData]);

    return <div ref={chartContainerRef} className="absolute inset-0" />;
});

export default ChartComponent;

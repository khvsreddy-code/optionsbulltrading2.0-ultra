import { COINAPI_KEY } from '../env';
import type { CandleData, Timeframe } from '../types';

if (!COINAPI_KEY) {
  console.error("CoinAPI key is missing. The simulator will not work. Please add your key to env.ts");
}

const REST_API_URL = 'https://rest.coinapi.io/v1';
const WS_URL = 'wss://ws.coinapi.io/v1/';

// Map our app's timeframe to CoinAPI's period_id
const TIMEFRAME_MAP: Record<Timeframe, string> = {
  '1m': '1MIN', '5m': '5MIN', '15m': '15MIN', '30m': '30MIN', '45m': '45MIN',
};

interface CoinApiCandle {
  time_period_start: string;
  time_open: string;
  time_close: string;
  price_open: number;
  price_high: number;
  price_low: number;
  price_close: number;
  volume_traded: number;
}

interface CoinApiTrade {
    type: 'trade';
    symbol_id: string;
    sequence: number;
    time_exchange: string;
    price: number;
    size: number;
    taker_side: 'BUY' | 'SELL' | 'BUY_ESTIMATED' | 'SELL_ESTIMATED' | 'UNKNOWN';
}

export const getHistoricalData = async (symbol: string, timeframe: Timeframe): Promise<CandleData[]> => {
  const periodId = TIMEFRAME_MAP[timeframe];
  // Fetch a reasonable amount of data for the chart history
  const limit = 1000; 
  const timeEnd = new Date().toISOString();
  
  const response = await fetch(
    `${REST_API_URL}/ohlcv/${symbol}/history?period_id=${periodId}&time_end=${timeEnd}&limit=${limit}`,
    { headers: { 'X-CoinAPI-Key': COINAPI_KEY } }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`CoinAPI Error: ${errorData.error || 'Failed to fetch historical data'}`);
  }

  const data: CoinApiCandle[] = await response.json();
  
  // Map API response to our internal CandleData format
  return data.map(candle => ({
    time: Math.floor(new Date(candle.time_period_start).getTime() / 1000),
    open: candle.price_open,
    high: candle.price_high,
    low: candle.price_low,
    close: candle.price_close,
    volume: candle.volume_traded,
  })).sort((a, b) => a.time - b.time); // Ensure data is sorted chronologically
};


let ws: WebSocket | null = null;

export const subscribeToTrades = (symbol: string, onTrade: (trade: CoinApiTrade) => void): (() => void) => {
  // Close any existing connection before opening a new one
  if (ws && ws.readyState !== WebSocket.CLOSED) {
    ws.close();
  }

  ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log('CoinAPI WebSocket connected.');
    ws?.send(JSON.stringify({
      type: 'hello',
      apikey: COINAPI_KEY,
      heartbeat: false,
      subscribe_data_type: ['trade'],
      subscribe_filter_symbol_id: [symbol]
    }));
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'trade') {
      onTrade(message as CoinApiTrade);
    }
  };

  ws.onerror = (error) => {
    console.error('CoinAPI WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('CoinAPI WebSocket disconnected.');
  };

  // Return an unsubscribe function
  return () => {
    if (ws) {
      ws.close();
      ws = null;
    }
  };
};
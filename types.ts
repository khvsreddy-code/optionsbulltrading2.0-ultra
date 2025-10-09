// types.ts
import React from 'react';
import type { Timeframe } from './services/marketSimulator';

// Navigation view types
export type View =
  | 'home'
  | 'pricing'
  | 'policiesList'
  | 'cancellation'
  | 'terms'
  | 'shipping'
  | 'privacy'
  | 'contact'
  | 'learningHome'
  | 'learningChapter'
  | 'learningModuleDetail'
  | 'practice'
  | 'profile'
  | 'bullishPatternsList'
  | 'bearishPatternsList'
  | 'patternDetail'
  | 'technicalIndicatorsList'
  | 'fundamentalAnalysisList';

// Financial data types
export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface Instrument {
  instrument_key: string;
  exchange_token: string;
  tradingsymbol: string;
  name: string;
  last_price: number;
  expiry: string;
  strike: string;
  tick_size: string;
  lot_size: string;
  instrument_type: 'EQUITY' | 'CRYPTO';
  segment: string;
  exchange: string;
  icon: React.FC<any>;
}

// Trading simulation types
export type OrderType = 'MARKET' | 'LIMIT';
export type OrderSide = 'BUY' | 'SELL';

export interface Order {
  id: string;
  instrument: Instrument;
  type: OrderType;
  side: OrderSide;
  quantity: number;
  price?: number; // for LIMIT orders
  status: 'OPEN' | 'EXECUTED' | 'CANCELLED';
  createdAt: number;
  executedAt?: number;
  executedPrice?: number;
}

export interface Position {
  instrument: Instrument;
  quantity: number; // Positive for LONG, negative for SHORT
  averagePrice: number;
  lastPrice: number;
  pnl: number;
  pnlPercent: number;
  createdAt: number; // NEW: Timestamp of position opening
}

// NEW: Trade interface for completed trades
export interface Trade {
  id: string;
  instrument: Instrument;
  side: 'LONG' | 'SHORT';
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  realizedPnl: number;
  entryTime: number;
  exitTime: number;
}

export interface Portfolio {
  cash: number;
  positions: Position[];
  totalValue: number;
  orders: Order[];
  trades: Trade[]; // NEW: To store completed trades
}

// Re-export Timeframe to be accessible from types
export type { Timeframe };
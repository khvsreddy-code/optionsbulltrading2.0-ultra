import type { Instrument } from '../types';
import { Bank, Building, Bitcoin } from '../components/common/Icons';

// This file now provides a stable, offline-first list of mock Instrument objects.
// This eliminates the need for a network request to fetch instruments, making the app
// faster and more reliable, and fixing the "No stocks found" bug.

export const curatedStocks: Instrument[] = [
  {
    instrument_key: 'NSE_EQ|INE002A01018',
    exchange_token: '2885',
    tradingsymbol: 'RELIANCE',
    name: 'Reliance Industries Limited',
    instrument_type: 'EQUITY',
    icon: Building,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_EQ|INE041A01034',
    exchange_token: '1333',
    tradingsymbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    instrument_type: 'EQUITY',
    icon: Bank,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_EQ|INE062A01020',
    exchange_token: '3045',
    tradingsymbol: 'SBIN',
    name: 'State Bank of India',
    instrument_type: 'EQUITY',
    icon: Bank,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_EQ|INE467B01029',
    exchange_token: '29682',
    tradingsymbol: 'TCS',
    name: 'Tata Consultancy Services Limited',
    instrument_type: 'EQUITY',
    icon: Building,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_EQ|INE009A01021',
    exchange_token: '1594',
    tradingsymbol: 'INFY',
    name: 'Infosys Limited',
    instrument_type: 'EQUITY',
    icon: Building,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_EQ|INE075A01022',
    exchange_token: '3787',
    tradingsymbol: 'WIPRO',
    name: 'Wipro Limited',
    instrument_type: 'EQUITY',
    icon: Building,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_EQ|INE090A01021',
    exchange_token: '1270',
    tradingsymbol: 'ICICIBANK',
    name: 'ICICI Bank Limited',
    instrument_type: 'EQUITY',
    icon: Bank,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_EQ|INE238A01034',
    exchange_token: '5900',
    tradingsymbol: 'AXISBANK',
    name: 'Axis Bank Limited',
    instrument_type: 'EQUITY',
    icon: Bank,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_EQ|INE028A01039',
    exchange_token: '3506',
    tradingsymbol: 'BANKBARODA',
    name: 'Bank of Baroda',
    instrument_type: 'EQUITY',
    icon: Bank,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_EQ|INE296A01024',
    exchange_token: '317',
    tradingsymbol: 'BAJFINANCE',
    name: 'Bajaj Finance Limited',
    instrument_type: 'EQUITY',
    icon: Building,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_EQ|INE397D01024',
    exchange_token: '10604',
    tradingsymbol: 'BHARTIARTL',
    name: 'Bharti Airtel Limited',
    instrument_type: 'EQUITY',
    icon: Building,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_EQ|INE030A01027',
    exchange_token: '1394',
    tradingsymbol: 'HINDUNILVR',
    name: 'Hindustan Unilever Limited',
    instrument_type: 'EQUITY',
    icon: Building,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_EQ|INE018A01030',
    exchange_token: '1922',
    tradingsymbol: 'LT',
    name: 'Larsen & Toubro Limited',
    instrument_type: 'EQUITY',
    icon: Building,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_EQ|INE860A01027',
    exchange_token: '7229',
    tradingsymbol: 'HCLTECH',
    name: 'HCL Technologies Limited',
    instrument_type: 'EQUITY',
    icon: Building,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'CRYPTO|BTCUSDT',
    exchange_token: 'BTCUSDT',
    tradingsymbol: 'BTCUSDT',
    name: 'Bitcoin / Tether',
    instrument_type: 'CRYPTO',
    icon: Bitcoin,
    last_price: 0, expiry: '', strike: '0', tick_size: '0.01', lot_size: '1', segment: 'CRYPTO', exchange: 'CRYPTO'
  },
];

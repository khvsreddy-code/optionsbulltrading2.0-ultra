import type { Instrument } from '../types';
import { Bitcoin, Building, Bank } from '../components/common/Icons';

export const curatedStocks: Instrument[] = [
  {
    instrument_key: 'NSE_RELIANCE',
    exchange_token: 'RELIANCE',
    tradingsymbol: 'RELIANCE',
    name: 'Reliance Industries',
    last_price: 2800.00,
    instrument_type: 'EQUITY',
    icon: Building,
    expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_TCS',
    exchange_token: 'TCS',
    tradingsymbol: 'TCS',
    name: 'Tata Consultancy',
    last_price: 3800.00,
    instrument_type: 'EQUITY',
    icon: Building,
    expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'NSE_HDFCBANK',
    exchange_token: 'HDFCBANK',
    tradingsymbol: 'HDFCBANK',
    name: 'HDFC Bank',
    last_price: 1600.00,
    instrument_type: 'EQUITY',
    icon: Bank,
    expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
    {
    instrument_key: 'NSE_INFY',
    exchange_token: 'INFY',
    tradingsymbol: 'INFY',
    name: 'Infosys',
    last_price: 1500.00,
    instrument_type: 'EQUITY',
    icon: Building,
    expiry: '', strike: '0', tick_size: '0.05', lot_size: '1', segment: 'NSE_EQ', exchange: 'NSE'
  },
  {
    instrument_key: 'CRYPTO_BTCUSD',
    exchange_token: 'BTC',
    tradingsymbol: 'BTC/USD',
    name: 'Bitcoin',
    last_price: 65000.00,
    instrument_type: 'CRYPTO',
    icon: Bitcoin,
    expiry: '', strike: '0', tick_size: '0.01', lot_size: '1', segment: 'CRYPTO', exchange: 'CRYPTO'
  },
];
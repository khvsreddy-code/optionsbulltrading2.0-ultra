import type { Instrument } from '../types';
import { Bitcoin, DollarSign } from '../components/common/Icons';

// This file now provides a stable, offline-first list of popular cryptocurrency instruments
// for use in the CoinAPI-powered trading simulator.

export const curatedStocks: Instrument[] = [
  {
    instrument_key: 'BINANCE_SPOT_BTC_USDT', exchange_token: 'BTCUSDT', tradingsymbol: 'BINANCE_SPOT_BTC_USDT', name: 'Bitcoin / Tether',
    instrument_type: 'CRYPTO', icon: Bitcoin, last_price: 0, expiry: '', strike: '0', tick_size: '0.01', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_ETH_USDT', exchange_token: 'ETHUSDT', tradingsymbol: 'BINANCE_SPOT_ETH_USDT', name: 'Ethereum / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.01', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_SOL_USDT', exchange_token: 'SOLUSDT', tradingsymbol: 'BINANCE_SPOT_SOL_USDT', name: 'Solana / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.01', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_BNB_USDT', exchange_token: 'BNBUSDT', tradingsymbol: 'BINANCE_SPOT_BNB_USDT', name: 'BNB / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.01', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_XRP_USDT', exchange_token: 'XRPUSDT', tradingsymbol: 'BINANCE_SPOT_XRP_USDT', name: 'Ripple / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.01', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_DOGE_USDT', exchange_token: 'DOGEUSDT', tradingsymbol: 'BINANCE_SPOT_DOGE_USDT', name: 'Dogecoin / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.0001', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_ADA_USDT', exchange_token: 'ADAUSDT', tradingsymbol: 'BINANCE_SPOT_ADA_USDT', name: 'Cardano / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.0001', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_AVAX_USDT', exchange_token: 'AVAXUSDT', tradingsymbol: 'BINANCE_SPOT_AVAX_USDT', name: 'Avalanche / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.01', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_SHIB_USDT', exchange_token: 'SHIBUSDT', tradingsymbol: 'BINANCE_SPOT_SHIB_USDT', name: 'Shiba Inu / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.00000001', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_DOT_USDT', exchange_token: 'DOTUSDT', tradingsymbol: 'BINANCE_SPOT_DOT_USDT', name: 'Polkadot / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.001', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_LINK_USDT', exchange_token: 'LINKUSDT', tradingsymbol: 'BINANCE_SPOT_LINK_USDT', name: 'Chainlink / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.001', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_TRX_USDT', exchange_token: 'TRXUSDT', tradingsymbol: 'BINANCE_SPOT_TRX_USDT', name: 'Tron / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.0001', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_MATIC_USDT', exchange_token: 'MATICUSDT', tradingsymbol: 'BINANCE_SPOT_MATIC_USDT', name: 'Polygon / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.0001', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_BCH_USDT', exchange_token: 'BCHUSDT', tradingsymbol: 'BINANCE_SPOT_BCH_USDT', name: 'Bitcoin Cash / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.01', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_ICP_USDT', exchange_token: 'ICPUSDT', tradingsymbol: 'BINANCE_SPOT_ICP_USDT', name: 'Internet Computer / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.001', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_NEAR_USDT', exchange_token: 'NEARUSDT', tradingsymbol: 'BINANCE_SPOT_NEAR_USDT', name: 'NEAR Protocol / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.001', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_LTC_USDT', exchange_token: 'LTCUSDT', tradingsymbol: 'BINANCE_SPOT_LTC_USDT', name: 'Litecoin / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.01', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_UNI_USDT', exchange_token: 'UNIUSDT', tradingsymbol: 'BINANCE_SPOT_UNI_USDT', name: 'Uniswap / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.001', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_LEO_USDT', exchange_token: 'LEOUSDT', tradingsymbol: 'BINANCE_SPOT_LEO_USDT', name: 'UNUS SED LEO / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.001', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
  {
    instrument_key: 'BINANCE_SPOT_ATOM_USDT', exchange_token: 'ATOMUSDT', tradingsymbol: 'BINANCE_SPOT_ATOM_USDT', name: 'Cosmos / Tether',
    instrument_type: 'CRYPTO', icon: DollarSign, last_price: 0, expiry: '', strike: '0', tick_size: '0.001', lot_size: '1', segment: 'CRYPTO', exchange: 'BINANCE'
  },
];
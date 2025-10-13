// env.ts

// ======================================================================
// IMPORTANT: PASTE YOUR KEYS HERE
// ======================================================================
// These keys are for local development convenience.
// It is included in .gitignore to prevent accidental commits.
// For production deployments, you should use real environment variables.

// Google Gemini API Key (for client-side calls like AI Chat)
export const API_KEY = 'AIzaSyCJgfzOTB1-IUdMXS2tpn8wnL8HctBK0dY';

// Razorpay Public Key ID (safe to expose on client-side)
// Replace this with your LIVE Key ID from the Razorpay dashboard.
export const RAZORPAY_KEY_ID = 'rzp_live_RSPHbB9Dddpy2j';

// NEW: CoinAPI Key (for real-time crypto data in Paper Trading)
// Get your free key from https://www.coinapi.io/ and paste it here.
export const COINAPI_KEY = 'e82dc513-00d6-4fb6-8600-8377a6ed5b42';

// ======================================================================
// DO NOT PASTE YOUR RAZORPAY SECRET KEY HERE
// ======================================================================
// Your Razorpay Key Secret is private. It must ONLY be stored as an
// environment variable in your Supabase Edge Function settings.
// The backend functions are configured to read it securely from there.
// ======================================================================
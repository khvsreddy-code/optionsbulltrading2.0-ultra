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

// ======================================================================
// DO NOT PASTE YOUR RAZORPAY SECRET KEY HERE
// ======================================================================
// Your Razorpay Key Secret is private. It must ONLY be stored as an
// environment variable in your Supabase Edge Function settings.
// The backend functions are configured to read it securely from there.
// ======================================================================

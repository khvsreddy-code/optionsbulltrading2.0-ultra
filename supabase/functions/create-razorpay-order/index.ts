// supabase/functions/create-razorpay-order/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Buffer } from 'https://deno.land/std@0.168.0/io/buffer.ts';

// Add type declarations to satisfy TypeScript linter
declare const Deno: any;

// Helper to create a Base64 string for Basic Authentication
const toBase64 = (str: string) => new Buffer(str).toString('base64');

serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    } });
  }

  try {
    const { amount, currency = 'INR', receipt } = await req.json();

    if (!amount) {
      throw new Error('Amount is required.');
    }

    const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID');
    const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay credentials are not configured on the server.');
    }

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${toBase64(RAZORPAY_KEY_ID + ':' + RAZORPAY_KEY_SECRET)}`
      },
      body: JSON.stringify({
        amount: amount, // Amount in paise
        currency: currency,
        receipt: receipt,
      }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Razorpay API Error:", errorBody);
        throw new Error(`Razorpay API responded with status: ${response.status}`);
    }

    const order = await response.json();

    return new Response(JSON.stringify(order), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error in create-razorpay-order function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 500,
    });
  }
});

// supabase/functions/create-razorpay-order/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
// Import Buffer from Deno's Node compatibility layer for robust Base64 encoding.
import { Buffer } from 'https://deno.land/std@0.168.0/node/buffer.ts';


// Add type declarations to satisfy TypeScript linter
declare const Deno: any;

serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    } });
  }

  try {
    const { amount, currency = 'INR', receipt, key_id } = await req.json();

    if (!amount) {
      throw new Error('Amount is required.');
    }
    if (!key_id) {
        throw new Error('Razorpay Key ID is required in the request body.');
    }

    const RAZORPAY_KEY_ID = key_id;
    const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay Key Secret is not configured on the server. Please set it in your Supabase project secrets.');
    }

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Use Buffer for Base64 encoding, standard in Node.js environments and more reliable for auth.
        'Authorization': `Basic ${Buffer.from(RAZORPAY_KEY_ID + ':' + RAZORPAY_KEY_SECRET).toString('base64')}`
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
        throw new Error(`Razorpay API responded with status ${response.status}: ${errorBody}`);
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

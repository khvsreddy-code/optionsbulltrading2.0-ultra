// supabase/functions/create-razorpay-order/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

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

    // This is the correct way to read secrets in Deno runtime for Supabase
    const env = Deno.env.toObject();
    const RAZORPAY_KEY_SECRET = env.RAZORPAY_KEY_SECRET;

    if (!RAZORPAY_KEY_SECRET) {
      throw new Error('CRITICAL: The "RAZORPAY_KEY_SECRET" was not found in the server environment. Please go to your Supabase dashboard, navigate to Edge Functions > Secrets, and ensure you have saved the secret with this exact name.');
    }
    
    // The public key ID is passed from the client
    const RAZORPAY_KEY_ID = key_id;

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Use native btoa for Base64 encoding
        'Authorization': `Basic ${btoa(RAZORPAY_KEY_ID + ':' + RAZORPAY_KEY_SECRET)}`
      },
      body: JSON.stringify({
        amount: amount, // Amount in paise
        currency: currency,
        receipt: receipt,
      }),
    });

    if (!response.ok) {
        // Parse the error from Razorpay and send it back to the client.
        const errorBody = await response.json();
        const errorMessage = errorBody?.error?.description || `Razorpay API responded with status ${response.status}`;
        console.error("Razorpay API Error:", errorMessage);
        throw new Error(errorMessage);
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
    // Ensure the client gets a clear error message in a consistent format.
    const message = error.message || 'An unknown error occurred on the server.';
    return new Response(JSON.stringify({ error: message }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 500,
    });
  }
});

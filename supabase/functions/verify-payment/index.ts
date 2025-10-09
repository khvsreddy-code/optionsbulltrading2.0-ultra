// supabase/functions/verify-payment/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.4';
import { createHmac } from 'https://deno.land/std@0.168.0/node/crypto.ts';

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
    const { order_id, razorpay_payment_id, razorpay_signature, plan_duration_months } = await req.json();
    const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay secret is not configured.');
    }

    // 1. Verify the payment signature
    const body = order_id + "|" + razorpay_payment_id;
    const expectedSignature = createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      throw new Error('Payment verification failed. Signature mismatch.');
    }

    // 2. Signature is valid, update user profile in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
      
    // Get the user ID from the request's Authorization header
    const authHeader = req.headers.get('Authorization')!;
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(jwt);

    if (!user) {
        throw new Error('User not found or invalid token.');
    }

    // Calculate the new expiry date
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + plan_duration_months);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        subscription_status: 'premium',
        subscription_expires_at: expiresAt.toISOString(),
      })
      .eq('id', user.id);

    if (updateError) {
      throw updateError;
    }

    return new Response(JSON.stringify({ success: true, message: 'Subscription activated.' }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
       },
      status: 200,
    });
  } catch (error) {
    console.error("Error in verify-payment function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 500,
    });
  }
});

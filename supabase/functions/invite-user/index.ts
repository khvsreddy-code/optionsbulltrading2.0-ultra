// supabase/functions/invite-user/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.4';

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
    const { email } = await req.json();

    if (!email) {
      throw new Error('Email is required in the request body.');
    }

    const env = Deno.env.toObject();
    const SUPABASE_URL = env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('Missing Supabase environment variables on the server.');
    }

    // Create an admin client to perform the invite
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email);

    if (error) {
      // Re-throw the Supabase error so the client can receive it
      throw error;
    }

    return new Response(JSON.stringify({ success: true, user: data.user }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
       },
      status: 200,
    });
  } catch (error) {
    console.error("Error in invite-user function:", error);
    // Return the error message in a structured way for the client to parse.
    const message = error.message || 'An unknown error occurred on the server.';
    return new Response(JSON.stringify({ error: message }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 500, // Use a 500 status for server-side failures
    });
  }
});

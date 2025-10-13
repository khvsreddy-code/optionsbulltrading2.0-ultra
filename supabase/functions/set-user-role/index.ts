// supabase/functions/set-user-role/index.ts

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
    const { user_id, role } = await req.json();

    if (!user_id || !role) {
      throw new Error('user_id and role are required in the request body.');
    }
    if (role !== 'user' && role !== 'admin') {
      throw new Error("Invalid role specified. Must be 'user' or 'admin'.");
    }

    const env = Deno.env.toObject();
    const SUPABASE_URL = env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('Missing Supabase environment variables on the server.');
    }
    
    // Create an admin client to perform the role update
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // IMPORTANT: Verify that the user making the request is an admin.
    // This is a critical security check.
    const authHeader = req.headers.get('Authorization')!;
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseAdmin.auth.getUser(jwt);

    if (!user) {
        throw new Error('Authentication failed.');
    }

    const { data: adminProfile, error: adminCheckError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (adminCheckError || adminProfile?.role !== 'admin') {
      throw new Error('Permission denied. You must be an admin to change user roles.');
    }
    // END SECURITY CHECK

    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ role: role })
      .eq('id', user_id);

    if (updateError) {
      throw updateError;
    }

    return new Response(JSON.stringify({ success: true, message: `User ${user_id} role updated to ${role}.` }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
       },
      status: 200,
    });
  } catch (error) {
    console.error("Error in set-user-role function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 500,
    });
  }
});
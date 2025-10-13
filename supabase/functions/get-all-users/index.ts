// supabase/functions/get-all-users/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.4';

declare const Deno: any;

// FIX: Add an interface for the profile data to provide type safety.
interface ProfileInfo {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'user' | 'admin' | null;
}

serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    } });
  }

  try {
    const env = Deno.env.toObject();
    const SUPABASE_URL = env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('Missing Supabase environment variables on the server.');
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Security Check: Ensure the user calling this function is an admin.
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing Authorization header.');
    }
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseAdmin.auth.getUser(jwt);

    if (!user) {
      return new Response(JSON.stringify({ error: 'Authentication failed.' }), { status: 401 });
    }

    const { data: adminProfile, error: adminCheckError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (adminCheckError || adminProfile?.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Permission denied. You must be an admin.' }), { status: 403 });
    }
    // End Security Check

    // 1. Fetch all users from the auth schema
    const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
    if (usersError) throw usersError;

    // 2. Fetch all profiles from the public schema
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('id, full_name, avatar_url, role');
    if (profilesError) throw profilesError;

    // 3. Create a map of profiles for efficient lookup
    // FIX: Explicitly type the Map to ensure `profile` objects are correctly typed, resolving property access errors.
    const profilesMap = new Map<string, ProfileInfo>((profiles || []).map(p => [p.id, p]));

    // 4. Combine the data, ensuring a consistent structure
    const combinedUsers = users.map(authUser => {
      const profile = profilesMap.get(authUser.id);
      return {
        user_id: authUser.id,
        email: authUser.email,
        created_at: authUser.created_at,
        // Map `full_name` from DB to `display_name` for frontend consistency
        display_name: profile?.full_name || 'No Name', 
        avatar_url: profile?.avatar_url || null,
        role: profile?.role || 'user',
      };
    });

    return new Response(JSON.stringify(combinedUsers), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
       },
      status: 200,
    });

  } catch (error) {
    console.error("Error in get-all-users function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      status: 500,
    });
  }
});
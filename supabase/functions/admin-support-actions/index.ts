// supabase/functions/admin-support-actions/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.4';

declare const Deno: any;

// Helper to get Supabase admin client
const getSupabaseAdmin = () => {
    const env = Deno.env.toObject();
    const SUPABASE_URL = env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('Missing Supabase environment variables on the server.');
    }
    return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
};

// Helper function to check for admin role
const checkAdminRole = async (supabaseAdmin: any, req: Request) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing Authorization header.');
    const jwt = authHeader.replace('Bearer ', '');
    
    const { data: { user } } = await supabaseAdmin.auth.getUser(jwt);
    if (!user) throw new Error('Authentication failed.');

    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (error || profile?.role !== 'admin') {
      throw new Error('Permission denied. You must be an admin.');
    }
};

// Action: Fetch all messages. The client will process them into conversations.
const handleGetAllMessages = async (supabaseAdmin: any) => {
    const { data, error } = await supabaseAdmin
        .from('support_chats')
        .select('*')
        .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
};

// Action: Send a message as an admin
const handleSendMessage = async (supabaseAdmin: any, payload: any) => {
    const { user_id, message_content } = payload;
    if (!user_id || !message_content) throw new Error('user_id and message_content are required for SEND_MESSAGE action.');
    
    const { data, error } = await supabaseAdmin.from('support_chats').insert({
        user_id: user_id,
        message_content: message_content,
        sent_by: 'admin',
    }).select();
    
    if (error) throw error;
    return data[0]; // Return the newly created message
};

// Main server function
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' } });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    await checkAdminRole(supabaseAdmin, req); // Security check
    const { action, payload } = await req.json();
    
    let responseData;
    switch(action) {
        case 'GET_ALL_MESSAGES':
            responseData = await handleGetAllMessages(supabaseAdmin);
            break;
        case 'SEND_MESSAGE':
            responseData = await handleSendMessage(supabaseAdmin, payload);
            break;
        default:
            throw new Error(`Invalid action provided: ${action}`);
    }

    return new Response(JSON.stringify(responseData), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      status: 200,
    });
  } catch (error) {
    console.error("Error in admin-support-actions function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      status: 500,
    });
  }
});

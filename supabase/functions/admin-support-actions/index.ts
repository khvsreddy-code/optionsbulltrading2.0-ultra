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

const handleGetConversations = async (supabaseAdmin: any) => {
    // 1. Get all users and create a map
    const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
    if (usersError) throw usersError;
    const userMap = new Map<string, any>();
    users.forEach(u => userMap.set(u.id, {
        display_name: u.user_metadata?.full_name || u.email,
        avatar_url: u.user_metadata?.avatar_url
    }));

    // 2. Get all support messages
    const { data: messages, error: messagesError } = await supabaseAdmin
        .from('support_chats')
        .select('*')
        .order('created_at', { ascending: false }); // get latest first
    if (messagesError) throw messagesError;

    // 3. Process into conversations
    const convosMap = new Map<string, any>();
    for (const msg of messages) {
        if (!convosMap.has(msg.user_id)) {
            const userDetails = userMap.get(msg.user_id);
            // FIX: Explicitly type userDetails as 'any' to resolve potential type errors
            const typedUserDetails: any = userDetails;
            convosMap.set(msg.user_id, {
                user_id: msg.user_id,
                last_message_content: msg.message_content,
                last_message_at: msg.created_at,
                display_name: typedUserDetails?.display_name || msg.user_id,
                avatar_url: typedUserDetails?.avatar_url,
            });
        }
    }
    
    const conversations = Array.from(convosMap.values())
        .sort((a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime());
        
    return conversations;
};

const handleGetMessagesForUser = async (supabaseAdmin: any, payload: any) => {
    const { user_id } = payload;
    if (!user_id) throw new Error('user_id is required');
    const { data, error } = await supabaseAdmin
        .from('support_chats')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
}

const handleSendMessage = async (supabaseAdmin: any, payload: any) => {
    const { user_id, message_content } = payload;
    if (!user_id || !message_content) throw new Error('user_id and message_content are required for SEND_MESSAGE action.');
    
    const { data, error } = await supabaseAdmin.from('support_chats').insert({
        user_id: user_id,
        message_content: message_content,
        sent_by: 'admin',
    }).select();
    
    if (error) throw error;
    return data[0];
};

// Main server function
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' } });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    await checkAdminRole(supabaseAdmin, req);
    const { action, payload } = await req.json();
    
    let responseData;
    switch(action) {
        case 'GET_CONVERSATIONS':
            responseData = await handleGetConversations(supabaseAdmin);
            break;
        case 'GET_MESSAGES_FOR_USER':
            responseData = await handleGetMessagesForUser(supabaseAdmin, payload);
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

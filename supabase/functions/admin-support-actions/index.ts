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

// Helper function to check for admin role and get user ID
const getAdminUserId = async (supabaseAdmin: any, req: Request): Promise<string> => {
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
    return user.id;
};

// Action: Fetch and combine all data to build the conversation list
const handleGetConversations = async (supabaseAdmin: any) => {
    const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
    if (usersError) throw usersError;
    const userMap = new Map(users.map((u: any) => [u.id, {
        display_name: u.user_metadata?.full_name || u.email || `User`,
        avatar_url: u.user_metadata?.avatar_url || null,
    }]));

    const { data: messages, error: messagesError } = await supabaseAdmin
        .from('support_chats').select('user_id, message_content, created_at').order('created_at', { ascending: false });
    if (messagesError) throw messagesError;

    const latestMessages = new Map<string, { content: string, at: string }>();
    if (messages) {
        for (const message of messages) {
            if (!latestMessages.has(message.user_id)) {
                latestMessages.set(message.user_id, {
                    content: message.message_content,
                    at: message.created_at,
                });
            }
        }
    }

    const conversations = Array.from(latestMessages.entries()).map(([userId, lastMsg]) => {
        // FIX: Explicitly type userDetails as `any` to resolve type inference issues where properties were not being found on type `unknown`.
        const userDetails: any = userMap.get(userId) || { display_name: '', avatar_url: null };
        return {
            user_id: userId,
            display_name: userDetails.display_name || `User ${userId.substring(0, 6)}`,
            avatar_url: userDetails.avatar_url || `https://ui-avatars.com/api/?name=${(userDetails.display_name || 'U').charAt(0)}`,
            last_message_content: lastMsg.content,
            last_message_at: lastMsg.at,
        };
    });
    conversations.sort((a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime());
    return conversations;
};

// Action: Fetch all messages for a single conversation
const handleGetMessages = async (supabaseAdmin: any, payload: any) => {
    const { user_id } = payload;
    if (!user_id) throw new Error('user_id is required for GET_MESSAGES action.');
    const { data, error } = await supabaseAdmin.from('support_chats').select('*').eq('user_id', user_id).order('created_at', { ascending: true });
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
    return data;
};

// Main server function
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' } });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    await getAdminUserId(supabaseAdmin, req); // Security check
    const { action, payload } = await req.json();
    
    let responseData;
    switch(action) {
        case 'GET_CONVERSATIONS':
            responseData = await handleGetConversations(supabaseAdmin);
            break;
        case 'GET_MESSAGES':
            responseData = await handleGetMessages(supabaseAdmin, payload);
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

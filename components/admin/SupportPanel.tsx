import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Search } from '../../components/common/Icons';

// --- TYPE DEFINITIONS ---
interface Message {
  id: string;
  created_at: string;
  message_content: string;
  sent_by: 'user' | 'admin';
}

interface Conversation {
  user_id: string;
  display_name: string;
  email: string;
  last_message_content: string;
  last_message_at: string;
  avatar_url: string | null;
}

// Simple SVG Send Icon
const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);


const SupportPanel: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConvoId, setSelectedConvoId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState<'list' | 'chat' | 'none'>('list');
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const fetchConversations = async () => {
        const { data, error } = await supabase.rpc('get_support_conversations');
        if (error) {
            setError(error.message);
            console.error("Error fetching conversations:", error);
        } else {
            setConversations(data || []);
        }
        setLoading('none');
    };

    // Fetch conversation list on mount and subscribe to updates
    useEffect(() => {
        fetchConversations();
        const channel = supabase.channel('support-list-updates-admin')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'support_chats' }, 
            payload => {
                fetchConversations();
            }).subscribe();
        return () => { supabase.removeChannel(channel); };
    }, []);

    // Fetch messages when a conversation is selected
    useEffect(() => {
        if (!selectedConvoId) return;
        
        const fetchMessages = async () => {
            setLoading('chat');
            const { data, error } = await supabase
                .from('support_chats')
                .select('*')
                .eq('user_id', selectedConvoId)
                .order('created_at', { ascending: true });
            
            if (error) {
                setError(error.message);
            } else {
                setMessages(data || []);
            }
            setLoading('none');
        };

        fetchMessages();

        const channel = supabase.channel(`admin-support-chat-${selectedConvoId}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'support_chats', filter: `user_id=eq.${selectedConvoId}` },
            payload => {
                setMessages(prev => [...prev, payload.new as Message]);
            }).subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [selectedConvoId]);

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConvoId) return;

        const { error } = await supabase.from('support_chats').insert({
            user_id: selectedConvoId,
            message_content: newMessage.trim(),
            sent_by: 'admin',
        });

        if (error) {
            console.error("Error sending admin message:", error);
            alert("Failed to send message.");
        } else {
            setNewMessage('');
        }
    };

    const selectedConvo = conversations.find(c => c.user_id === selectedConvoId);

    const filteredConversations = conversations.filter(convo =>
        convo.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convo.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full flex overflow-hidden">
            {/* Conversation List Panel */}
            <aside className="w-1/3 max-w-sm flex-shrink-0 bg-background border-r border-border flex flex-col">
                <div className="p-3 border-b border-border">
                    <h2 className="font-bold text-text-main mb-2">Conversations ({filteredConversations.length})</h2>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-text-main"
                        />
                    </div>
                </div>
                {loading === 'list' ? (
                    <div className="flex-grow flex items-center justify-center"><p>Loading...</p></div>
                ) : (
                    <div className="flex-grow overflow-y-auto">
                        {filteredConversations.map(convo => (
                            <button key={convo.user_id} onClick={() => setSelectedConvoId(convo.user_id)}
                                className={`w-full text-left p-3 border-b border-border flex items-center space-x-3 transition-colors ${selectedConvoId === convo.user_id ? 'bg-primary-light' : 'hover:bg-background/50'}`}>
                                <img src={convo.avatar_url || `https://ui-avatars.com/api/?name=${convo.display_name}&background=7065F0&color=fff`} alt="avatar" className="w-10 h-10 rounded-full" />
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-semibold text-text-main truncate">{convo.display_name}</p>
                                    <p className="text-xs text-text-secondary truncate">{convo.email}</p>
                                    <p className="text-sm text-text-secondary truncate mt-1">{convo.last_message_content}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </aside>

            {/* Chat Panel */}
            <main className="flex-1 flex flex-col bg-background">
                {!selectedConvoId ? (
                    <div className="flex-grow flex items-center justify-center text-center text-text-secondary p-4">
                        <p>Select a conversation from the left to start replying.</p>
                    </div>
                ) : (
                    <>
                        <div className="p-3 border-b border-border flex items-center bg-card">
                            <h3 className="font-bold text-text-main">{selectedConvo?.display_name}</h3>
                        </div>
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {loading === 'chat' && <p>Loading messages...</p>}
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sent_by === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-lg ${msg.sent_by === 'admin' ? 'bg-primary text-white' : 'bg-card border border-border'}`}>
                                        <p className="whitespace-pre-wrap">{msg.message_content}</p>
                                        <p className={`text-xs mt-1 ${msg.sent_by === 'admin' ? 'text-white/70' : 'text-text-secondary'} text-right`}>
                                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} className="flex-shrink-0 p-3 border-t border-border flex items-center space-x-2 bg-card">
                            <input
                                type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your reply..."
                                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main"
                            />
                            <button type="submit" className="w-12 h-12 flex-shrink-0 bg-primary text-white rounded-full flex items-center justify-center button-press-feedback" aria-label="Send message">
                                <SendIcon className="w-6 h-6" />
                            </button>
                        </form>
                    </>
                )}
            </main>
        </div>
    );
};

export default SupportPanel;
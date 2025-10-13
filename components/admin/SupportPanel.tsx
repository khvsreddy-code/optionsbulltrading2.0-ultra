import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Search } from '../../components/common/Icons';

// --- TYPE DEFINITIONS ---
interface Message {
  id: string;
  created_at: string;
  user_id: string;
  message_content: string;
  sent_by: 'user' | 'admin';
}

interface Conversation {
  user_id: string;
  last_message_content: string;
  last_message_at: string;
}

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);

const SupportPanel: React.FC = () => {
    const [allMessages, setAllMessages] = useState<Message[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConvoId, setSelectedConvoId] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState<'list' | 'none'>('list');
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isSending, setIsSending] = useState(false);

    const processMessages = useCallback((messages: Message[]) => {
        const convosMap = new Map<string, Conversation>();
        for (const msg of messages) {
            convosMap.set(msg.user_id, {
                user_id: msg.user_id,
                last_message_content: msg.message_content,
                last_message_at: msg.created_at,
            });
        }
        const sortedConversations = Array.from(convosMap.values())
            .sort((a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime());
        setConversations(sortedConversations);
    }, []);

    const fetchAllData = useCallback(async (isInitialLoad: boolean) => {
        if (isInitialLoad) {
            setLoading('list');
            setError(null);
        }
        try {
            const { data, error: functionError } = await supabase.functions.invoke('admin-support-actions', {
                body: { action: 'GET_ALL_MESSAGES' }
            });

            if (functionError) {
                let detailMessage = "Failed to fetch conversations.";
                // Check if context is a Response object and has a json method
                if (functionError.context && typeof functionError.context.json === 'function') {
                    try {
                        const errorContext = await functionError.context.json();
                        detailMessage = errorContext?.error || `The admin service returned an error: ${functionError.message}`;
                    } catch (e) {
                        // In case .json() fails for other reasons (e.g., not valid JSON response)
                        detailMessage = `Could not parse the error response from the admin service.`;
                    }
                } else {
                    // This branch handles network errors, CORS, 404s etc.
                    detailMessage = `Failed to send a request to the Edge Function. Ensure the function is deployed.`;
                }
                throw new Error(detailMessage);
            }

            const messages = (data as Message[]) || [];
            setAllMessages(messages);
            processMessages(messages);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch data.";
            if (isInitialLoad) setError(errorMessage);
            console.error("Polling/Fetch Error:", errorMessage);
        } finally {
            if (isInitialLoad) setLoading('none');
        }
    }, [processMessages]);

    useEffect(() => {
        fetchAllData(true); // Initial fetch
        const intervalId = setInterval(() => fetchAllData(false), 5000); // Poll every 5 seconds
        return () => clearInterval(intervalId);
    }, [fetchAllData]);

    const currentMessages = useMemo(() => {
        if (!selectedConvoId) return [];
        return allMessages.filter(m => m.user_id === selectedConvoId);
    }, [selectedConvoId, allMessages]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentMessages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConvoId || isSending) return;
        setIsSending(true);
        const optimisticMessageContent = newMessage.trim();
        setNewMessage('');
        
        try {
            const { data: sentMessage, error } = await supabase.functions.invoke('admin-support-actions', {
                body: { 
                    action: 'SEND_MESSAGE', 
                    payload: { user_id: selectedConvoId, message_content: optimisticMessageContent } 
                }
            });
            if (error) throw error;
            // Optimistically add the new message, the next poll will sync everything
            setAllMessages(prev => [...prev, sentMessage as Message]);
            processMessages([...allMessages, sentMessage as Message]);
        } catch (err) {
            alert(`Failed to send message: ${err instanceof Error ? err.message : 'Unknown error'}`);
            setNewMessage(optimisticMessageContent);
        } finally {
            setIsSending(false);
        }
    };
    
    const filteredConversations = useMemo(() => 
        conversations.filter(convo =>
            convo.user_id.toLowerCase().includes(searchTerm.toLowerCase())
        ), [conversations, searchTerm]);

    return (
        <div className="h-full flex overflow-hidden">
            <aside className="w-1/3 max-w-sm flex-shrink-0 bg-background border-r border-border flex flex-col">
                <div className="p-3 border-b border-border">
                    <h2 className="font-bold text-text-main mb-2">Conversations ({filteredConversations.length})</h2>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input type="text" placeholder="Search by user ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-text-main" />
                    </div>
                </div>
                {loading === 'list' ? (
                    <div className="flex-grow flex items-center justify-center p-4 text-center"><p className="text-text-secondary">Loading conversations...</p></div>
                ) : error ? (
                    <div className="p-4 text-red-500">{error}</div>
                ) : (
                    <div className="flex-grow overflow-y-auto">
                        {filteredConversations.length === 0 ? (
                            <p className="p-4 text-center text-text-secondary">No conversations yet.</p>
                        ) : (
                            filteredConversations.map(convo => (
                                <button key={convo.user_id} onClick={() => setSelectedConvoId(convo.user_id)}
                                    className={`w-full text-left p-3 border-b border-border flex items-center space-x-3 transition-colors ${selectedConvoId === convo.user_id ? 'bg-primary-light' : 'hover:bg-background/50'}`}>
                                    <img src={`https://ui-avatars.com/api/?name=${convo.user_id.charAt(0)}&background=7065F0&color=fff`} alt="avatar" className="w-10 h-10 rounded-full" />
                                    <div className="flex-grow overflow-hidden">
                                        <p className="font-semibold text-text-main truncate font-mono">{convo.user_id.substring(0, 12)}...</p>
                                        <p className="text-sm text-text-secondary truncate mt-1">
                                            {convo.last_message_content.startsWith('[IMAGE]') ? 'Photo attachment' : convo.last_message_content}
                                        </p>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                )}
            </aside>
            <main className="flex-1 flex flex-col bg-background">
                {!selectedConvoId ? (
                    <div className="flex-grow flex items-center justify-center text-center text-text-secondary p-4">
                        <p>Select a conversation from the left to start replying.</p>
                    </div>
                ) : (
                    <>
                        <div className="p-3 border-b border-border flex items-center bg-card">
                            <h3 className="font-bold text-text-main font-mono">User: {selectedConvoId}</h3>
                        </div>
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {currentMessages.map(msg => {
                                const isImage = msg.message_content.startsWith('[IMAGE]');
                                const content = isImage ? msg.message_content.replace('[IMAGE]', '') : msg.message_content;
                                return (
                                    <div key={msg.id} className={`flex items-end ${msg.sent_by === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-2 rounded-lg max-w-lg ${msg.sent_by === 'admin' ? 'bg-primary text-white' : 'bg-card border border-border'}`}>
                                            {isImage ? (
                                                <a href={content} target="_blank" rel="noopener noreferrer">
                                                    <img src={content} alt="User attachment" className="rounded-md max-w-xs cursor-pointer" />
                                                </a>
                                            ) : ( <p className="whitespace-pre-wrap px-1">{content}</p> )}
                                            <p className={`text-xs mt-1 ${msg.sent_by === 'admin' ? 'text-white/70' : 'text-text-secondary'} text-right`}>
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} className="flex-shrink-0 p-3 border-t border-border flex items-center space-x-2 bg-card">
                            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your reply..."
                                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main"
                            />
                            <button type="submit" disabled={isSending} className="w-12 h-12 flex-shrink-0 bg-primary text-white rounded-full flex items-center justify-center button-press-feedback disabled:opacity-50" aria-label="Send message">
                                {isSending ? (
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <SendIcon className="w-6 h-6" />
                                )}
                            </button>
                        </form>
                    </>
                )}
            </main>
        </div>
    );
};

export default SupportPanel;
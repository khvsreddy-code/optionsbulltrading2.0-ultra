import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabaseClient';
import type { User as SupabaseUser } from '@supabase/auth-js';
import { ChevronRight } from '../components/common/Icons';

// Simple SVG Send Icon
const SendIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);


interface Message {
  id: string;
  created_at: string;
  user_id: string;
  message_content: string;
  sent_by: 'user' | 'admin';
}

const SupportView: React.FC<{ onNavigate: (path: string) => void; }> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get user and initial messages
  useEffect(() => {
    const setup = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          throw new Error("Authentication required.");
        }
        setUser(session.user);

        const { data: initialMessages, error: fetchError } = await supabase
          .from('support_chats')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: true });

        if (fetchError) throw fetchError;
        setMessages(initialMessages || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load chat.");
      } finally {
        setLoading(false);
      }
    };
    setup();
  }, []);

  // Realtime subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel(`support-chat-${user.id}`)
      .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'support_chats', 
          filter: `user_id=eq.${user.id}` 
        }, 
        (payload) => {
            const newMessageFromServer = payload.new as Message;
            setMessages(prevMessages => {
                // Prevent duplicates from the realtime listener
                if (prevMessages.some(msg => msg.id === newMessageFromServer.id)) {
                    return prevMessages;
                }
                return [...prevMessages, newMessageFromServer];
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newMessage.trim() || !user) return;

      const messageContent = newMessage.trim();
      setNewMessage('');

      // Insert the message and immediately select it back.
      // This guarantees the sender sees their message without relying on realtime.
      const { data: newMessages, error: insertError } = await supabase
        .from('support_chats')
        .insert({
            user_id: user.id,
            message_content: messageContent,
            sent_by: 'user',
        })
        .select();

      if (insertError) {
          console.error("Error sending message:", insertError);
          alert("Failed to send message. Please try again.");
          setNewMessage(messageContent); // Restore input on failure
      } else if (newMessages && newMessages.length > 0) {
          // Manually add the new message to the state.
          // This provides instant feedback for the sender.
          setMessages(prevMessages => [...prevMessages, newMessages[0] as Message]);
      }
  };

  return (
    <div className="bg-background min-h-screen font-sans flex flex-col">
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-sm shadow-sm p-3 border-b border-border">
            <div className="max-w-4xl mx-auto flex items-center">
                <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-background" aria-label="Go back">
                    <ChevronRight size={22} className="text-text-secondary transform rotate-180" />
                </button>
                <h1 className="text-lg font-semibold text-text-main ml-2">Live Support</h1>
            </div>
        </header>

        <main className="flex-grow flex flex-col p-4 max-w-4xl w-full mx-auto">
            {loading && (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-text-secondary">Loading chat...</p>
                </div>
            )}
            {error && (
                <div className="flex-grow flex items-center justify-center text-center">
                    <p className="text-red-500">{error}</p>
                </div>
            )}
            {!loading && !error && (
                <>
                    <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                        {messages.length === 0 ? (
                            <div className="text-center text-text-secondary p-8">
                                <h3 className="font-semibold text-text-main">Welcome to Live Support!</h3>
                                <p>Ask us anything about the app, your subscription, or trading concepts. We'll get back to you as soon as possible.</p>
                            </div>
                        ) : (
                             messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sent_by === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-xs md:max-w-md ${msg.sent_by === 'user' ? 'bg-primary text-white' : 'bg-card border border-border'}`}>
                                        <p className="whitespace-pre-wrap">{msg.message_content}</p>
                                        <p className={`text-xs mt-1 ${msg.sent_by === 'user' ? 'text-white/70' : 'text-text-secondary'} text-right`}>
                                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <form onSubmit={handleSendMessage} className="flex-shrink-0 mt-4 flex items-center space-x-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full bg-card border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main"
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

export default SupportView;
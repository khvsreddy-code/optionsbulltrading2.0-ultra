import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabaseClient';
import type { User as SupabaseUser } from '@supabase/auth-js';
import { ChevronRight, Paperclip, X } from '../components/common/Icons';
import { uploadSupportImage } from '../services/storageService';

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

  // New states for image upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
                // Avoid duplicating messages that were added optimistically
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
          setImageFile(file);
          setPreviewUrl(URL.createObjectURL(file));
          setNewMessage(''); // Clear text when an image is selected
      } else if (file) {
          alert("Please select a valid image file.");
      }
  };

  const clearAttachment = () => {
      setImageFile(null);
      if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
      }
      if (fileInputRef.current) {
          fileInputRef.current.value = '';
      }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
      e.preventDefault();
      if ((!newMessage.trim() && !imageFile) || !user) return;

      if (imageFile) {
          setIsUploading(true);
          try {
              const publicUrl = await uploadSupportImage(user.id, imageFile);
              await supabase.from('support_chats').insert({
                  user_id: user.id,
                  message_content: `[IMAGE]${publicUrl}`,
                  sent_by: 'user',
              });
              clearAttachment();
          } catch (error) {
              console.error("Error sending image:", error);
              alert(error instanceof Error ? error.message : "Failed to send image.");
          } finally {
              setIsUploading(false);
          }
      } else {
          const messageContent = newMessage.trim();
          setNewMessage('');
          await supabase.from('support_chats').insert({
              user_id: user.id,
              message_content: messageContent,
              sent_by: 'user',
          });
      }
  };

  const AdminAvatar = () => (
      <img
        src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/Gemini_Generated_Image_e6q469e6q469e6q4.png"
        alt="Support"
        className="w-8 h-8 rounded-full"
    />
  );

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
                <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                    {messages.length === 0 ? (
                        <div className="text-center text-text-secondary p-8">
                            <h3 className="font-semibold text-text-main">Welcome to Live Support!</h3>
                            <p>Ask us anything about the app, your subscription, or trading concepts. We'll get back to you as soon as possible.</p>
                        </div>
                    ) : (
                         messages.map(msg => {
                            const isImage = msg.message_content.startsWith('[IMAGE]');
                            const content = isImage ? msg.message_content.replace('[IMAGE]', '') : msg.message_content;
                            
                            return (
                                <div key={msg.id} className={`flex items-end gap-2 ${msg.sent_by === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.sent_by === 'admin' && <AdminAvatar />}
                                    <div className={`p-2 max-w-xs md:max-w-md ${msg.sent_by === 'user' ? 'bg-primary text-white rounded-2xl rounded-br-none' : 'bg-card border border-border text-text-main rounded-2xl rounded-bl-none'}`}>
                                        {isImage ? (
                                            <a href={content} target="_blank" rel="noopener noreferrer">
                                                <img src={content} alt="Attachment" className="rounded-md max-w-full h-auto cursor-pointer" />
                                            </a>
                                        ) : (
                                            <p className="whitespace-pre-wrap text-sm px-1">{content}</p>
                                        )}
                                        <p className={`text-xs mt-1 ${msg.sent_by === 'user' ? 'text-white/70' : 'text-text-secondary'} text-right`}>
                                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>
            )}
        </main>
        
        <footer className="sticky bottom-0 bg-card border-t border-border">
            <div className="max-w-4xl mx-auto p-3">
                {previewUrl && (
                    <div className="relative w-24 h-24 p-2">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-md" />
                        <button onClick={clearAttachment} className="absolute -top-1 -right-1 bg-gray-800 text-white rounded-full p-0.5">
                            <X size={16} />
                        </button>
                    </div>
                )}
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="w-12 h-12 flex-shrink-0 bg-background text-text-secondary rounded-full flex items-center justify-center button-press-feedback border border-border" aria-label="Attach image">
                        <Paperclip size={22} />
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => { setNewMessage(e.target.value); if (e.target.value) clearAttachment(); }}
                        placeholder="Type your message..."
                        className="w-full bg-background border border-border rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main"
                        disabled={!!imageFile || isUploading}
                    />
                    <button type="submit" className="w-12 h-12 flex-shrink-0 bg-primary text-white rounded-full flex items-center justify-center button-press-feedback disabled:opacity-50" aria-label="Send message" disabled={(!newMessage.trim() && !imageFile) || isUploading}>
                        {isUploading ? (
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <SendIcon className="w-6 h-6" />
                        )}
                    </button>
                </form>
            </div>
        </footer>
    </div>
  );
};

export default SupportView;
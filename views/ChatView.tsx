import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveSession, LiveServerMessage, Modality, Blob } from '@google/genai';
import { process } from '../env'; // Import the mock process.env object
import { Mic, StopCircle, X, MessageSquare } from '../components/common/Icons';
import anime from 'animejs';

// Audio Encoding/Decoding functions as per guidelines
function encode(bytes: Uint8Array): string {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}


function createBlob(data: Float32Array): Blob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    return {
        data: encode(new Uint8Array(int16.buffer)),
        mimeType: 'audio/pcm;rate=16000',
    };
}

interface TranscriptItem {
    id: number;
    speaker: 'user' | 'model';
    text: string;
}

const ChatView: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
    const [sessionState, setSessionState] = useState<'idle' | 'connecting' | 'active' | 'error'>('idle');
    const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    const aiRef = useRef<GoogleGenAI | null>(null);
    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
    const nextStartTimeRef = useRef(0);
    const currentInputTranscriptionRef = useRef('');
    const currentOutputTranscriptionRef = useRef('');
    const transcriptEndRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
        return () => { // Cleanup on unmount
            sessionPromiseRef.current?.then(session => session.close());
            streamRef.current?.getTracks().forEach(track => track.stop());
            inputAudioContextRef.current?.close();
            outputAudioContextRef.current?.close();
        };
    }, []);

    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [transcript]);
    
    useEffect(() => {
        if (orbRef.current) {
            if (isSpeaking) {
                anime({
                    targets: orbRef.current,
                    scale: [1, 1.2, 1],
                    duration: 1000,
                    easing: 'easeInOutSine',
                    loop: true
                });
            } else {
                anime.remove(orbRef.current);
                anime({
                    targets: orbRef.current,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        }
    }, [isSpeaking, sessionState]);

    const toggleSession = async () => {
        if (sessionState === 'active' || sessionState === 'connecting') {
            sessionPromiseRef.current?.then(session => session.close());
            return;
        }

        setSessionState('connecting');
        setError(null);
        setTranscript([]);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            // FIX: Cast window to `any` to allow access to the vendor-prefixed `webkitAudioContext` for older browser compatibility, resolving TypeScript errors.
            inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            sourcesRef.current = new Set<AudioBufferSourceNode>();
            nextStartTimeRef.current = 0;

            sessionPromiseRef.current = aiRef.current!.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        setSessionState('active');
                        const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
                        scriptProcessorRef.current = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
                        
                        scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromiseRef.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        
                        source.connect(scriptProcessorRef.current);
                        scriptProcessorRef.current.connect(inputAudioContextRef.current!.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        // Handle Transcription
                        if (message.serverContent?.outputTranscription) {
                            currentOutputTranscriptionRef.current += message.serverContent.outputTranscription.text;
                        } else if (message.serverContent?.inputTranscription) {
                            currentInputTranscriptionRef.current += message.serverContent.inputTranscription.text;
                        }

                        if (message.serverContent?.turnComplete) {
                            setTranscript(prev => [
                                ...prev,
                                { id: Date.now() + 1, speaker: 'user', text: currentInputTranscriptionRef.current.trim() },
                                { id: Date.now() + 2, speaker: 'model', text: currentOutputTranscriptionRef.current.trim() },
                            ]);
                            currentInputTranscriptionRef.current = '';
                            currentOutputTranscriptionRef.current = '';
                        }

                        // Handle Audio
                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
                        if (base64Audio) {
                            setIsSpeaking(true);
                            const nextStartTime = Math.max(nextStartTimeRef.current, outputAudioContextRef.current!.currentTime);
                            const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContextRef.current!, 24000, 1);
                            
                            const source = outputAudioContextRef.current!.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputAudioContextRef.current!.destination);
                            
                            source.addEventListener('ended', () => {
                                sourcesRef.current.delete(source);
                                if (sourcesRef.current.size === 0) {
                                    setIsSpeaking(false);
                                }
                            });
                            
                            source.start(nextStartTime);
                            nextStartTimeRef.current = nextStartTime + audioBuffer.duration;
                            sourcesRef.current.add(source);
                        }
                        
                        if (message.serverContent?.interrupted) {
                            for (const source of sourcesRef.current.values()) {
                                source.stop();
                            }
                            sourcesRef.current.clear();
                            nextStartTimeRef.current = 0;
                            setIsSpeaking(false);
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Session error:', e);
                        setError('A session error occurred. Please try again.');
                        setSessionState('error');
                    },
                    onclose: () => {
                        streamRef.current?.getTracks().forEach(track => track.stop());
                        inputAudioContextRef.current?.close();
                        outputAudioContextRef.current?.close();
                        scriptProcessorRef.current?.disconnect();
                        setSessionState('idle');
                        setIsSpeaking(false);
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                    systemInstruction: 'You are a world-class trading expert and market analyst for OptionsBullTrading. Your name is Bull. Your purpose is to be a live market assistant and teacher. You must be friendly, encouraging, and an expert teacher. Explain complex trading concepts (like candlestick patterns, technical indicators, or fundamental analysis) in a simple, easy-to-understand way. You can also discuss current market sentiment or hypothetical trading scenarios. Always keep your answers concise and conversational, as you are speaking to the user in real-time.',
                },
            });

        } catch (err) {
            console.error('Error starting session:', err);
            setError(err instanceof Error ? err.message : 'Failed to get microphone permissions.');
            setSessionState('error');
        }
    };

    const renderCentralButton = () => {
        switch (sessionState) {
            case 'idle':
            case 'error':
                return (
                    <button onClick={toggleSession} className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-lg button-press-feedback">
                        <Mic size={40} />
                    </button>
                );
            case 'connecting':
                return (
                    <div className="w-24 h-24 border-4 border-slate-600 border-t-primary rounded-full animate-spin"></div>
                );
            case 'active':
                return (
                     <button onClick={toggleSession} className="w-24 h-24 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg button-press-feedback">
                        <StopCircle size={40} />
                    </button>
                );
        }
    };

    const getStatusText = () => {
         switch (sessionState) {
            case 'idle': return 'Tap to start conversation';
            case 'connecting': return 'Connecting...';
            case 'active': return isSpeaking ? 'Gemini is speaking...' : 'Listening...';
            case 'error': return error || 'An error occurred';
         }
    };

    return (
        <div className="min-h-screen bg-background font-sans flex flex-col">
            <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm p-4 flex items-center justify-between border-b border-border">
                <h1 className="text-lg font-bold text-text-main">Live Market Assistant</h1>
                <button onClick={() => onNavigate('/home')} className="p-2 rounded-full hover:bg-border">
                    <X size={20} className="text-text-secondary" />
                </button>
            </header>

            <main className="flex-grow flex flex-col p-4 overflow-hidden">
                {transcript.length === 0 && sessionState !== 'active' && sessionState !== 'connecting' && (
                    <div className="flex-grow flex flex-col items-center justify-center text-center">
                        <MessageSquare size={48} className="text-primary opacity-50 mb-4"/>
                        <h2 className="text-2xl font-bold text-text-main">Welcome to Your AI Trading Coach</h2>
                        <p className="text-text-secondary mt-2 max-w-sm">Tap the microphone to start a real-time conversation. Ask about trading concepts, market analysis, or anything else you're curious about.</p>
                    </div>
                )}

                <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                    {transcript.filter(t => t.text).map((item) => (
                        <div key={item.id} className={`flex ${item.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-lg max-w-xs md:max-w-md ${item.speaker === 'user' ? 'bg-primary text-white' : 'bg-card border border-border'}`}>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={transcriptEndRef} />
                </div>
            </main>

            <footer className="flex-shrink-0 bg-card border-t border-border p-4 flex flex-col items-center justify-center space-y-3">
                 <div ref={orbRef} className={`w-14 h-14 rounded-full transition-colors duration-300 ${isSpeaking ? 'bg-primary' : 'bg-primary-light'}`}></div>
                {renderCentralButton()}
                <p className={`font-semibold transition-colors ${sessionState === 'error' ? 'text-red-500' : 'text-text-secondary'}`}>{getStatusText()}</p>
            </footer>
        </div>
    );
};

export default ChatView;

import { supabase } from './supabaseClient';
import type { QuizQuestion, QuizTopic } from '../types';

// The topic definitions remain on the client for the UI
export type TopicDetails = { id: QuizTopic; name: string; description: string };

export const quizTopics: TopicDetails[] = [
    { id: 'all', name: 'Comprehensive Quiz', description: 'Test your knowledge across all learning categories.' },
    { id: 'basics', name: 'Trading Basics', description: 'Questions on fundamental concepts of stocks and markets.' },
    { id: 'bullish', name: 'Bullish Patterns', description: 'Identify and understand bullish candlestick patterns.' },
    { id: 'bearish', name: 'Bearish Patterns', description: 'Identify and understand bearish candlestick patterns.' },
    { id: 'indicators', name: 'Technical Indicators', description: 'Test your knowledge of popular technical indicators.' },
    { id: 'fundamental', name: 'Fundamental Analysis', description: 'Questions on company valuation and economic analysis.' },
];

export const generateQuiz = async (topic: QuizTopic): Promise<QuizQuestion[]> => {
    try {
        // First, ensure the user session is fresh to prevent authentication errors.
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
            console.error("Authentication error:", sessionError);
            throw new Error("Authentication error. Please sign in again.");
        }
        
        // Invoke the secure Supabase Edge Function instead of calling Gemini directly from the browser.
        // The function's name ('finnhub-webhook') is determined by its folder name in the `supabase/functions` directory.
        // This function now securely handles the API key and Gemini API call.
        const { data, error } = await supabase.functions.invoke('finnhub-webhook', {
            body: { topic },
        });

        if (error) {
            console.error('Supabase function invocation error:', error);
            throw new Error(`The AI Quiz server is unavailable. Please try again later.`);
        }
        
        // The edge function returns the array of questions directly.
        const quizData = data;

        if (!Array.isArray(quizData) || quizData.length === 0) {
            throw new Error("The AI returned empty or invalid quiz data. Please try again.");
        }
        
        // Simple validation of the received data structure.
        const validatedData = quizData.filter(q => 
            q.question && Array.isArray(q.options) && q.options.length === 4 && q.correctAnswer && q.options.includes(q.correctAnswer)
        );

        if(validatedData.length === 0) {
             throw new Error("Received invalid questions from the AI server. Please try again.");
        }

        return validatedData;

    } catch (error) {
        console.error("Error generating quiz via Supabase function:", error);
        // Re-throw a user-friendly error for the UI to display.
        throw new Error(error.message || "Failed to generate the AI quiz. Please try again later.");
    }
};
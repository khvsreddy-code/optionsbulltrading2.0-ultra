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
        // This function securely calls a backend Supabase Edge Function.
        // The Edge Function is confusingly named 'finnhub-webhook' but it handles quiz generation.
        const { data, error } = await supabase.functions.invoke('finnhub-webhook', {
            body: { topic },
        });

        if (error) {
            console.error("Error invoking Supabase function:", error);
            throw new Error(error.message || 'Failed to communicate with the quiz generation service.');
        }

        const quizData = data;

        if (!Array.isArray(quizData) || quizData.length === 0) {
            throw new Error("The AI returned empty or invalid quiz data. Please try again.");
        }
        
        // Basic validation on the client side as well.
        const validatedData = quizData.filter(q => 
            q.question && Array.isArray(q.options) && q.options.length === 4 && q.correctAnswer && q.options.includes(q.correctAnswer)
        );

        if(validatedData.length === 0) {
             throw new Error("Received invalid questions from the AI server. Please try again.");
        }

        return validatedData;

    } catch (error) {
        console.error("Error in quizService.generateQuiz:", error);
        // Re-throw a user-friendly message.
        throw new Error(error.message || "An unexpected error occurred while generating the quiz.");
    }
};

import { GoogleGenAI, Type } from '@google/genai';
import { process } from '../env';
import type { QuizQuestion, QuizTopic } from '../types';
import { getTopicTitles, quizSchema } from '../data/quizContent';

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
        if (!process.env.API_KEY || process.env.API_KEY.includes('PASTE')) {
             throw new Error("API Key not found. Please add it to the env.ts file.");
        }
        
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const topicName = quizTopics.find(t => t.id === topic)?.name || 'Stock Market Trading';
        const numberOfQuestions = topic === 'all' ? 25 : 10;
        
        const QUIZ_GENERATION_PROMPT = `
You are an expert quizmaster specializing in stock market trading education.
Your task is to generate a challenging quiz of ${numberOfQuestions} multiple-choice questions on the general topic of "${topicName}".
The specific concepts to be tested are included in the following list: {{CONTEXT}}.
Each question must have exactly 4 options, and only one correct answer.
The questions should be diverse and cover the concepts from the provided list.
You must use your general knowledge about these trading concepts to formulate the questions and answers.
The output must be a JSON array of objects, strictly following the provided schema.
`;
        
        const content = getTopicTitles(topic);
        const prompt = QUIZ_GENERATION_PROMPT.replace('{{CONTEXT}}', content);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: quizSchema,
            },
        });

        const jsonString = response.text.trim();
        const quizData = JSON.parse(jsonString);

        if (!Array.isArray(quizData) || quizData.length === 0) {
            throw new Error("The AI returned empty or invalid quiz data. Please try again.");
        }
        
        const validatedData = quizData.filter(q => 
            q.question && Array.isArray(q.options) && q.options.length === 4 && q.correctAnswer && q.options.includes(q.correctAnswer)
        );

        if(validatedData.length === 0) {
             throw new Error("Received invalid questions from the AI server. Please try again.");
        }

        return validatedData;

    } catch (error) {
        console.error("Error generating quiz on client-side:", error);
        let errorMessage = "Failed to generate the AI quiz. Please try again later.";
        if (error.message.includes('API Key')) {
            errorMessage = "Invalid API Key. Please check the key in your env.ts file.";
        } else if (error instanceof SyntaxError) {
            errorMessage = "The AI returned an invalid response. Please try again.";
        } else if (error.message) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

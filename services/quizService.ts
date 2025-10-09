import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion, QuizTopic } from '../types';

// Import all content sources
import { learningCurriculum } from '../data/learningContent';
import { bullishPatterns } from '../data/learning/bullishPatternsContent';
import { bearishPatterns } from '../data/learning/bearishPatternsContent';
import { technicalIndicators } from '../data/learning/technicalIndicatorsContent';
import { fundamentalAnalysisTopics } from '../data/learning/fundamentalAnalysisContent';

export type TopicDetails = { id: QuizTopic; name: string; description: string };

export const quizTopics: TopicDetails[] = [
    { id: 'all', name: 'Comprehensive Quiz', description: 'Test your knowledge across all learning categories.' },
    { id: 'basics', name: 'Trading Basics', description: 'Questions on fundamental concepts of stocks and markets.' },
    { id: 'bullish', name: 'Bullish Patterns', description: 'Identify and understand bullish candlestick patterns.' },
    { id: 'bearish', name: 'Bearish Patterns', description: 'Identify and understand bearish candlestick patterns.' },
    { id: 'indicators', name: 'Technical Indicators', description: 'Test your knowledge of popular technical indicators.' },
    { id: 'fundamental', name: 'Fundamental Analysis', description: 'Questions on company valuation and economic analysis.' },
];

// Helper to get a list of topic titles
const getTopicTitles = (topic: QuizTopic): string => {
    let titles: string[] = [];

    switch (topic) {
        case 'basics':
            const basicsModule = learningCurriculum.find(c => c.id === 'ch1');
            if (basicsModule) {
                titles = basicsModule.subChapters.map(sub => sub.title.split(': ')[1] || sub.title);
            }
            break;
        case 'bullish':
            titles = bullishPatterns.map(p => p.title);
            break;
        case 'bearish':
            titles = bearishPatterns.map(p => p.title);
            break;
        case 'indicators':
            titles = technicalIndicators.map(p => p.title);
            break;
        case 'fundamental':
            titles = fundamentalAnalysisTopics.map(p => p.title);
            break;
        case 'all':
        default:
            const basics = learningCurriculum.find(c => c.id === 'ch1');
            if (basics) {
                titles.push(...basics.subChapters.map(sub => sub.title.split(': ')[1] || sub.title));
            }
            titles.push(...bullishPatterns.map(p => p.title));
            titles.push(...bearishPatterns.map(p => p.title));
            titles.push(...technicalIndicators.map(p => p.title));
            titles.push(...fundamentalAnalysisTopics.map(p => p.title));
            break;
    }

    return titles.join(', ');
};


const quizSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: "The quiz question text."
      },
      options: {
        type: Type.ARRAY,
        description: "An array of exactly 4 string options for the question.",
        items: {
          type: Type.STRING,
        },
      },
      correctAnswer: {
        type: Type.STRING,
        description: "The string of the correct answer, which must be one of the provided options."
      },
    },
    required: ["question", "options", "correctAnswer"],
  },
};

// Singleton pattern to ensure the AI client is initialized only once and when needed.
let aiClient: GoogleGenAI | null = null;
const getAiClient = (): GoogleGenAI => {
    if (aiClient) {
        return aiClient;
    }
    if (!process.env.API_KEY) {
        console.error("Gemini API key is not configured.");
        throw new Error("The AI Quiz feature is not available at this time. Please contact support.");
    }
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return aiClient;
};


export const generateQuiz = async (topic: QuizTopic): Promise<QuizQuestion[]> => {
    try {
        const ai = getAiClient();

        const topicName = quizTopics.find(t => t.id === topic)?.name || 'Stock Market Trading';
        const numberOfQuestions = topic === 'all' ? 25 : 10; // Reduced number of questions for faster, more reliable generation

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
            throw new Error("AI returned empty or invalid quiz data.");
        }
        
        // Simple validation
        const validatedData = quizData.filter(q => 
            q.question && Array.isArray(q.options) && q.options.length === 4 && q.correctAnswer && q.options.includes(q.correctAnswer)
        );

        if(validatedData.length < (numberOfQuestions / 2)) { // Expect at least half the requested questions
             throw new Error("AI returned too few valid questions.");
        }

        return validatedData;

    } catch (error) {
        console.error("Error generating quiz:", error);
        throw new Error("Failed to generate the AI quiz. Please try again later.");
    }
};
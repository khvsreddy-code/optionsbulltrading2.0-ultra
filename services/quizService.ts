import { GoogleGenAI, Type } from "@google/genai";
import React from 'react';
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

// Helper to extract text from React nodes
const extractTextFromNode = (node: React.ReactNode): string => {
    if (typeof node === 'string') {
        return node;
    }
    if (typeof node === 'number') {
        return String(node);
    }
    if (Array.isArray(node)) {
        return node.map(extractTextFromNode).join(' ');
    }
    if (React.isValidElement(node)) {
        // Don't extract from code or other special elements that might not be text
        if (typeof node.type === 'string' && ['code', 'pre', 'img', 'figure', 'figcaption'].includes(node.type)) {
            return '';
        }
        return extractTextFromNode(node.props.children);
    }
    return '';
};

const processContent = (items: { title: string; content: React.ReactNode }[]) => {
    let text = '';
    items.forEach(item => {
        text += `Topic: ${item.title}\n`;
        text += `${extractTextFromNode(item.content)}\n\n`;
    });
    return text;
};

// Aggregate learning content based on the selected topic
const getAggregatedContent = (topic: QuizTopic): string => {
    let fullText = '';

    switch (topic) {
        case 'basics':
            learningCurriculum.forEach(chapter => {
                if (chapter.id === 'ch1') { // Only basics module
                    chapter.subChapters.forEach(sub => {
                         fullText += `Topic: ${chapter.title} - ${sub.title}\n`;
                         fullText += `${extractTextFromNode(sub.content)}\n\n`;
                    });
                }
            });
            break;
        case 'bullish':
            fullText = processContent(bullishPatterns);
            break;
        case 'bearish':
            fullText = processContent(bearishPatterns);
            break;
        case 'indicators':
            fullText = processContent(technicalIndicators);
            break;
        case 'fundamental':
            fullText = processContent(fundamentalAnalysisTopics);
            break;
        case 'all':
        default:
             learningCurriculum.forEach(chapter => {
                chapter.subChapters.forEach(sub => {
                     fullText += `Topic: ${chapter.title} - ${sub.title}\n`;
                     fullText += `${extractTextFromNode(sub.content)}\n\n`;
                });
            });
            fullText += processContent(bullishPatterns);
            fullText += processContent(bearishPatterns);
            fullText += processContent(technicalIndicators);
            fullText += processContent(fundamentalAnalysisTopics);
            break;
    }

    // Naive text reduction to fit within context limits if needed.
    return fullText.replace(/\s+/g, ' ').trim();
};


const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

export const generateQuiz = async (topic: QuizTopic): Promise<QuizQuestion[]> => {
    try {
        const topicName = quizTopics.find(t => t.id === topic)?.name || 'Stock Market Trading';
        const numberOfQuestions = topic === 'all' ? 50 : 15;

        const QUIZ_GENERATION_PROMPT = `
You are an expert quizmaster specializing in stock market trading education. 
Based on the following learning material on the topic of "${topicName}", generate a challenging quiz of ${numberOfQuestions} multiple-choice questions. 
Each question must have exactly 4 options, and only one correct answer.
The questions should cover a wide and diverse range of topics from the provided material.
Ensure the options are plausible and the correct answer is clearly identifiable from the source material.
Do not make up information not present in the text.

The output must be a JSON array of objects, strictly following the provided schema.

Learning Material:
---
{{CONTEXT}}
---
`;

        const content = getAggregatedContent(topic);
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
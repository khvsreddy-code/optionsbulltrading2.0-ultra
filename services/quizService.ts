import { GoogleGenAI, Type } from "@google/genai";
import React from 'react';
import type { QuizQuestion } from '../types';

// Import all content sources
import { learningCurriculum } from '../data/learningContent';
import { bullishPatterns } from '../data/learning/bullishPatternsContent';
import { bearishPatterns } from '../data/learning/bearishPatternsContent';
import { technicalIndicators } from '../data/learning/technicalIndicatorsContent';
import { fundamentalAnalysisTopics } from '../data/learning/fundamentalAnalysisContent';

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

// Aggregate all learning content into a single string
const getAggregatedContent = (): string => {
    let fullText = '';

    const processContent = (items: { title: string; content: React.ReactNode }[]) => {
        items.forEach(item => {
            fullText += `Topic: ${item.title}\n`;
            fullText += `${extractTextFromNode(item.content)}\n\n`;
        });
    };
    
    // Process main curriculum
    learningCurriculum.forEach(chapter => {
        chapter.subChapters.forEach(sub => {
             fullText += `Topic: ${chapter.title} - ${sub.title}\n`;
             fullText += `${extractTextFromNode(sub.content)}\n\n`;
        });
    });

    processContent(bullishPatterns);
    processContent(bearishPatterns);
    processContent(technicalIndicators);
    processContent(fundamentalAnalysisTopics);

    // Naive text reduction to fit within context limits if needed.
    return fullText.replace(/\s+/g, ' ').trim();
};


const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const QUIZ_GENERATION_PROMPT = `
You are an expert quizmaster specializing in stock market trading education. 
Based on the following learning material, generate a challenging quiz of 50 multiple-choice questions. 
Each question must have exactly 4 options, and only one correct answer.
The questions should cover a wide and diverse range of topics from the provided material, from basic concepts to advanced analysis.
Ensure the options are plausible and the correct answer is clearly identifiable from the source material.
Do not make up information not present in the text.

The output must be a JSON array of objects, strictly following the provided schema.

Learning Material:
---
{{CONTEXT}}
---
`;

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

export const generateQuiz = async (): Promise<QuizQuestion[]> => {
    try {
        const content = getAggregatedContent();
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

        if(validatedData.length < 10) { // Expect at least 10 valid questions
             throw new Error("AI returned too few valid questions.");
        }

        return validatedData;

    } catch (error) {
        console.error("Error generating quiz:", error);
        throw new Error("Failed to generate the AI quiz. Please try again later.");
    }
};

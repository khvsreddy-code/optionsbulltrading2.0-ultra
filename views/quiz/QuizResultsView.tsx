import React, { useState, useEffect } from 'react';
// FIX: Correctly import animejs to handle module interoperability issues.
import * as animejs from 'animejs';
const anime = (animejs as any).default;
import type { QuizQuestion } from '../../types';
import { CheckCircle, X, ChevronRight, RotateCcw } from '../../components/common/Icons';

interface QuizResultsViewProps {
    onNavigate: (path: string) => void;
}

const QuizResultsView: React.FC<QuizResultsViewProps> = ({ onNavigate }) => {
    const [results, setResults] = useState<{
        questions: QuizQuestion[];
        userAnswers: Record<number, string>;
        score: number;
        totalAnswered: number;
        totalQuestions: number;
    } | null>(null);

    useEffect(() => {
        const resultsData = sessionStorage.getItem('quizResults');
        if (resultsData) {
            const { questions, userAnswers } = JSON.parse(resultsData);
            let score = 0;
            const totalAnswered = Object.keys(userAnswers).length;

            questions.forEach((q: QuizQuestion, index: number) => {
                if (userAnswers[index] === q.correctAnswer) {
                    score++;
                }
            });
            setResults({ questions, userAnswers, score, totalAnswered, totalQuestions: questions.length });
            
            // Animate score circle
            const scorePercentage = totalAnswered > 0 ? score / totalAnswered : 0;
            anime({
                targets: '.score-circle',
                strokeDashoffset: [anime.setDashoffset, 339.29 * (1 - scorePercentage)],
                easing: 'easeInOutSine',
                duration: 1200,
                delay: 200,
            });
            anime({
                 targets: '.score-text',
                 innerHTML: [0, score],
                 easing: 'linear',
                 round: 1,
                 duration: 1200,
                 delay: 200,
            });

        } else {
            // Handle case where user navigates directly to results without taking quiz
            onNavigate('/quiz');
        }
    }, [onNavigate]);

    const handleRetake = () => {
        sessionStorage.removeItem('quizResults');
        onNavigate('/quiz');
    };
    
    if (!results) {
        return <div className="min-h-screen bg-background flex items-center justify-center"><p>Loading results...</p></div>;
    }
    
    const scorePercentage = results.totalAnswered > 0 ? (results.score / results.totalAnswered) * 100 : 0;

    return (
        <div className="min-h-screen bg-background font-sans">
            <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm p-4 flex items-center border-b border-border">
                <button onClick={() => window.history.back()} className="p-2 -ml-2 rounded-full hover:bg-border" aria-label="Go back">
                    <ChevronRight size={22} className="transform rotate-180 text-text-secondary" />
                </button>
                 <h1 className="text-lg font-bold text-text-main ml-2">Quiz Results</h1>
            </header>
            
            <main className="p-4 max-w-3xl mx-auto">
                {/* Score Summary */}
                <div className="bg-card p-6 rounded-lg border border-border text-center mb-6">
                     <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg width="128" height="128" viewBox="0 0 120 120" className="transform -rotate-90">
                            <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" strokeWidth="12" />
                            <circle
                                cx="60" cy="60" r="54" fill="none" stroke="#53AC53" strokeWidth="12"
                                strokeDasharray="339.29"
                                strokeDashoffset={339.29} /* Initial state for animation */
                                strokeLinecap="round"
                                className="score-circle"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold score-text">{results.score}</span>
                            <span className="text-sm text-text-secondary">/ {results.totalAnswered}</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-text-main">
                        {scorePercentage >= 80 ? "Excellent Job!" : scorePercentage >= 50 ? "Good Effort!" : "Keep Practicing!"}
                    </h2>
                    <p className="text-text-secondary mt-1">You answered {results.score} out of {results.totalAnswered} questions correctly.</p>

                    <div className="mt-6 flex justify-center gap-3">
                        <button onClick={handleRetake} className="px-6 py-3 bg-primary-light text-primary font-bold rounded-lg flex items-center">
                            <RotateCcw size={18} className="mr-2"/> Retake Quiz
                        </button>
                        <button onClick={() => onNavigate('/learning')} className="px-6 py-3 bg-primary text-white font-bold rounded-lg flex items-center">
                            Back to Library <ChevronRight size={18} className="ml-2"/>
                        </button>
                    </div>
                </div>

                {/* Question Review */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Review Your Answers</h3>
                    {results.questions.map((q, index) => {
                        const userAnswer = results.userAnswers[index];
                        const isCorrect = userAnswer === q.correctAnswer;
                        const wasAnswered = userAnswer !== undefined;
                        
                        if (!wasAnswered) return null; // Only show questions that were answered

                        return (
                            <div key={index} className="bg-card p-4 rounded-lg border border-border">
                                <p className="font-bold text-text-main">{index + 1}. {q.question}</p>
                                <div className="mt-3 space-y-2 text-sm">
                                    {q.options.map(opt => {
                                        const isUserChoice = userAnswer === opt;
                                        const isCorrectAnswer = q.correctAnswer === opt;
                                        let stateClass = 'bg-background border-border text-text-secondary';
                                        let icon = <div className="w-[18px] mr-3 flex-shrink-0" />; // Placeholder for alignment

                                        if (isCorrectAnswer) {
                                            stateClass = 'bg-primary-light border-primary text-primary';
                                            icon = <CheckCircle size={18} className="mr-3 flex-shrink-0 text-primary" />;
                                        }
                                        if (isUserChoice && !isCorrect) {
                                            stateClass = 'bg-red-500/10 border-red-500 text-red-500';
                                            icon = <X size={18} className="mr-3 flex-shrink-0 text-red-500" />;
                                        }

                                        return (
                                            <div key={opt} className={`p-3 rounded-lg border-2 ${stateClass} flex items-center transition-colors`}>
                                                {icon}
                                                <span className="font-semibold">{opt}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default QuizResultsView;
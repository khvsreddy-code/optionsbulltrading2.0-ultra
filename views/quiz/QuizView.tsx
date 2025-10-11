import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { generateQuiz, quizTopics, TopicDetails } from '../../services/quizService';
import type { QuizQuestion, QuizTopic } from '../../types';
import { ChevronRight, X, Sparkles } from '../../components/common/Icons';

const LoaderIcon: React.FC<{className?: string}> = ({ className }) => (
     <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

interface QuizViewProps {
    onNavigate: (path: string) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ onNavigate }) => {
    const [quizState, setQuizState] = useState<'topicSelection' | 'loading' | 'active' | 'error'>('topicSelection');
    const [selectionStep, setSelectionStep] = useState<'initial' | 'selecting'>('initial');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    const questionCardRef = useRef<HTMLDivElement>(null);
    const selectionContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (quizState === 'topicSelection' && selectionContainerRef.current) {
            anime({
                targets: selectionContainerRef.current.children,
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(100),
                easing: 'easeOutCubic',
                duration: 500,
            });
        }
    }, [quizState]);

    useEffect(() => {
        if (quizState === 'active' && questionCardRef.current && !isAnimatingOut) {
            anime.set(questionCardRef.current, { opacity: 0, translateX: 30 });
            anime({
                targets: questionCardRef.current,
                opacity: 1,
                translateX: 0,
                duration: 400,
                easing: 'easeOutCubic'
            });
        }
    }, [currentQuestionIndex, quizState, isAnimatingOut]);

    const handleStartQuiz = async () => {
        if (!selectedTopic) return;
        setQuizState('loading');
        setError(null);
        try {
            const quizQuestions = await generateQuiz(selectedTopic);
            setQuestions(quizQuestions);
            setUserAnswers({});
            setCurrentQuestionIndex(0);
            setQuizState('active');
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
            setQuizState('error');
        }
    };
    
    const handleAnswerSelect = (answer: string) => {
        setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
    };

    const handleNext = () => {
        if (isAnimatingOut || currentQuestionIndex >= questions.length - 1) return;

        setIsAnimatingOut(true);
        anime({
            targets: questionCardRef.current,
            opacity: 0,
            translateX: -30,
            duration: 300,
            easing: 'easeInCubic',
            complete: () => {
                setCurrentQuestionIndex(prev => prev + 1);
                setIsAnimatingOut(false);
            }
        });
    };
    
    const handleFinish = () => {
        sessionStorage.setItem('quizResults', JSON.stringify({
            questions,
            userAnswers,
        }));
        onNavigate('/quiz/results');
    };
    
    const handleExit = () => {
        if (quizState === 'active' && Object.keys(userAnswers).length > 0) {
            if (confirm('Are you sure you want to exit? Your progress will be saved, and you can view your results.')) {
                handleFinish();
            }
        } else {
            onNavigate('/home');
        }
    };

    const handleBackToSelection = () => {
        setSelectionStep('initial');
        setQuizState('topicSelection');
        setSelectedTopic(null);
        setError(null);
    };
    
    const handleRetry = () => {
        if (selectedTopic) {
            handleStartQuiz();
        } else {
            handleBackToSelection();
        }
    };

    const renderTopicSelection = () => {
        if (selectionStep === 'initial') {
            return (
                <div ref={selectionContainerRef} className="text-center">
                    <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-primary-light border-2 border-primary mb-5">
                            <Sparkles size={40} className="text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-text-main">AI Smart Quiz</h1>
                        <p className="text-lg text-text-secondary mt-2 mb-8 max-w-md mx-auto">Challenge yourself with questions generated by AI, tailored to your learning.</p>
                        <button 
                            onClick={() => setSelectionStep('selecting')}
                            className="w-full max-w-xs mx-auto px-8 py-4 bg-primary text-white font-bold rounded-lg text-lg button-press-feedback"
                        >
                            Begin
                        </button>
                    </div>
                </div>
            );
        }

        return (
             <div ref={selectionContainerRef} className="text-center">
                 <h1 className="text-3xl font-bold text-text-main">Choose Your Arena</h1>
                 <p className="text-lg text-text-secondary mt-2 mb-8 max-w-lg mx-auto">Select a topic to test your knowledge.</p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {quizTopics.map(topic => (
                        <button 
                            key={topic.id}
                            onClick={() => setSelectedTopic(topic.id)}
                            className={`p-4 rounded-lg border-2 text-left transition-all button-press-feedback transform hover:-translate-y-1 ${selectedTopic === topic.id ? 'bg-primary-light border-primary' : 'bg-card border-border hover:border-primary/50'}`}
                        >
                            <h3 className={`font-bold text-lg ${selectedTopic === topic.id ? 'text-primary' : 'text-text-main'}`}>{topic.name}</h3>
                            <p className="text-sm text-text-secondary mt-1">{topic.description}</p>
                        </button>
                    ))}
                 </div>
                 
                 <button 
                    onClick={handleStartQuiz} 
                    disabled={!selectedTopic}
                    className="w-full max-w-xs mx-auto px-8 py-4 bg-primary text-white font-bold rounded-lg text-lg button-press-feedback disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    Start Quiz
                </button>
            </div>
        );
    };

    const renderContent = () => {
        switch(quizState) {
            case 'loading':
                return (
                    <div className="text-center flex flex-col items-center">
                        <LoaderIcon className="h-12 w-12 text-primary mb-4" />
                        <h2 className="text-2xl font-bold text-text-main">Generating Your Quiz</h2>
                        <p className="text-text-secondary mt-2">Our AI is crafting personalized questions just for you. This may take a moment...</p>
                    </div>
                );
            case 'error':
                 return (
                    <div className="text-center p-6 bg-red-500/10 rounded-lg border border-red-500/20">
                        <h2 className="text-2xl font-bold text-red-500">Oops! Something went wrong.</h2>
                        <p className="text-text-secondary mt-2 mb-6">{error}</p>
                         <div className="flex justify-center gap-4">
                            <button onClick={handleBackToSelection} className="px-6 py-3 bg-slate-600 text-white font-semibold rounded-lg">
                                Choose Topic
                            </button>
                            <button onClick={handleRetry} className="px-6 py-3 bg-primary text-white font-semibold rounded-lg">
                                Try Again
                            </button>
                        </div>
                    </div>
                );
            case 'active':
                const question = questions[currentQuestionIndex];
                const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
                return (
                    <>
                        {/* Progress Bar */}
                        <div className="mb-4">
                            <p className="text-sm font-semibold text-text-secondary text-right mb-1">Question {currentQuestionIndex + 1} of {questions.length}</p>
                            <div className="w-full bg-border rounded-full h-2.5">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.3s ease-out' }}></div>
                            </div>
                        </div>

                        {/* Question Card */}
                        <div ref={questionCardRef} className="bg-card p-6 rounded-lg border border-border">
                            <h2 className="text-xl font-bold text-text-main mb-6 leading-tight">{question.question}</h2>
                            <div className="space-y-3">
                                {question.options.map((option, index) => {
                                    const isSelected = userAnswers[currentQuestionIndex] === option;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerSelect(option)}
                                            className={`w-full text-left p-4 rounded-lg border-2 font-semibold transition-all button-press-feedback
                                                ${isSelected ? 'bg-primary-light border-primary text-primary' : 'bg-background border-border hover:border-primary/50'}`}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Navigation Footer */}
                        <div className="mt-6 flex justify-end items-center">
                            {currentQuestionIndex === questions.length - 1 ? (
                                <button
                                    onClick={handleFinish}
                                    disabled={!userAnswers[currentQuestionIndex]}
                                    className="px-8 py-3 bg-primary text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Finish & See Results
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    disabled={!userAnswers[currentQuestionIndex]}
                                    className="px-8 py-3 bg-primary text-white font-bold rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next <ChevronRight size={20} className="ml-1" />
                                </button>
                            )}
                        </div>
                    </>
                );
            case 'topicSelection':
            default:
                return renderTopicSelection();
        }
    };
    
    return (
        <div className="min-h-screen bg-background font-sans flex flex-col">
            <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm p-4 flex items-center justify-between border-b border-border">
                 <h1 className="text-lg font-bold text-text-main">AI Smart Quiz</h1>
                 <button onClick={handleExit} className="p-2 rounded-full hover:bg-border">
                    <X size={20} className="text-text-secondary" />
                 </button>
            </header>
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default QuizView;
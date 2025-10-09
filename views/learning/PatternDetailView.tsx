import React, { useRef, useEffect, useState } from 'react';
// FIX: Use a standard ES module import for animejs.
import anime from 'animejs';
import { bullishPatterns } from '../../data/learning/bullishPatternsContent';
import { bearishPatterns } from '../../data/learning/bearishPatternsContent';
import { technicalIndicators } from '../../data/learning/technicalIndicatorsContent';
import { fundamentalAnalysisTopics } from '../../data/learning/fundamentalAnalysisContent';
import { ChevronRight, CheckCircle } from '../../components/common/Icons';
import { isSubChapterComplete, toggleSubChapterCompletion } from '../../services/progressService';
import CompletionDialog from '../../components/learning/CompletionDialog';

interface PatternDetailViewProps {
    onNavigate: (path: string) => void;
    patternId: string | null;
}

const PatternDetailView: React.FC<PatternDetailViewProps> = ({ onNavigate, patternId }) => {
    const mainRef = useRef<HTMLElement>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [isCompletionDialogOpen, setIsCompletionDialogOpen] = useState(false);

    useEffect(() => {
        if (patternId) {
            setIsComplete(isSubChapterComplete(patternId));
        }
        window.scrollTo(0, 0); // Scroll to top when new lesson loads
    }, [patternId]);

    useEffect(() => {
        if (mainRef.current) {
            anime({
                targets: mainRef.current,
                opacity: [0, 1],
                translateY: [15, 0],
                duration: 500,
                easing: 'easeOutQuad'
            });
        }
    }, [patternId]);

    const allContent = [
        ...bullishPatterns, 
        ...bearishPatterns, 
        ...technicalIndicators, 
        ...fundamentalAnalysisTopics
    ];

    const currentIndex = allContent.findIndex(p => p.id === patternId);
    const pattern = currentIndex !== -1 ? allContent[currentIndex] : null;
    const nextLesson = (currentIndex !== -1 && currentIndex < allContent.length - 1) 
        ? allContent[currentIndex + 1] 
        : null;
    
    const handleToggleComplete = () => {
        if (pattern) {
            if (!isComplete) {
                toggleSubChapterCompletion(pattern.id);
                setIsComplete(true);
                setIsCompletionDialogOpen(true); // Open the dialog on completion
            } else {
                toggleSubChapterCompletion(pattern.id);
                setIsComplete(false);
            }
        }
    };
    
    const handleNextLesson = () => {
        setIsCompletionDialogOpen(false); // Close dialog before navigating
        if (nextLesson) {
            onNavigate(`/learning/pattern/${nextLesson.id}`);
        } else {
            // If it's the last lesson, navigate back to the main learning page
            onNavigate('/learning');
        }
    };
    
    // Determine the correct back path based on where the content was found
    const backTargetPath = fundamentalAnalysisTopics.some(p => p.id === patternId) ? '/learning/fundamental'
                         : technicalIndicators.some(p => p.id === patternId) ? '/learning/indicators'
                         : bearishPatterns.some(p => p.id === patternId) ? '/learning/bearish'
                         : bullishPatterns.some(p => p.id === patternId) ? '/learning/bullish'
                         : '/learning';

    if (!pattern) {
        return (
            <div className="bg-background text-text-main min-h-screen font-sans p-4 flex flex-col items-center justify-center">
                 <h1 className="text-xl font-bold text-red-500 mb-4">Content Not Found</h1>
                 <p className="text-text-secondary mb-6">The requested learning module could not be found.</p>
                 <button 
                    onClick={() => onNavigate('/learning')}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-lg"
                >
                    Back to Curriculum
                </button>
            </div>
        );
    }
    
    return (
        <div className="bg-background text-text-main min-h-screen font-sans">
            <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm p-4 flex items-center border-b border-border">
                 <button onClick={() => onNavigate(backTargetPath)} className="p-2 -ml-2" aria-label="Back to list">
                    <ChevronRight size={24} className="transform rotate-180 text-text-secondary" />
                </button>
                <h1 className="text-md font-semibold text-text-main ml-2 truncate">{pattern.title}</h1>
            </header>

            <main ref={mainRef} className="p-4 pb-32">
                <div className="prose max-w-none text-text-secondary prose-h3:text-text-main prose-h4:text-text-main prose-strong:text-text-main prose-code:text-primary prose-code:bg-primary-light prose-headings:font-bold">
                    {pattern.content}
                </div>
            </main>
            
            <footer className="fixed bottom-0 left-0 right-0 z-20 bg-card border-t border-border p-4 flex items-center justify-between gap-4">
                <button
                    onClick={handleToggleComplete}
                    className={`flex-1 flex items-center justify-center p-3 rounded-lg font-semibold transition-all button-press-feedback text-sm ${
                        isComplete
                            ? 'bg-primary-light text-primary'
                            : 'bg-primary text-white'
                    }`}
                >
                    <CheckCircle size={20} className="mr-2" />
                    <span>{isComplete ? 'Completed' : 'Mark as Complete'}</span>
                </button>
                <button
                    onClick={handleNextLesson}
                    className="w-14 h-14 flex-shrink-0 bg-text-main text-white rounded-full flex items-center justify-center button-press-feedback shadow-lg"
                    aria-label="Next Lesson"
                >
                    <ChevronRight size={24} />
                </button>
            </footer>
            
            <CompletionDialog
                isOpen={isCompletionDialogOpen}
                onClose={() => setIsCompletionDialogOpen(false)}
                onNext={handleNextLesson}
                nextLessonTitle={nextLesson ? nextLesson.title : "Back to Library"}
            />
        </div>
    );
};

export default PatternDetailView;
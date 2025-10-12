import React, { useRef, useEffect, useState } from 'react';
// FIX: Correctly import animejs to handle module interoperability issues.
import * as animejs from 'animejs';
const anime = (animejs as any).default;
import { bullishPatterns } from '../../data/learning/bullishPatternsContent';
import { bearishPatterns } from '../../data/learning/bearishPatternsContent';
import { technicalIndicators } from '../../data/learning/technicalIndicatorsContent';
import { fundamentalAnalysisTopics } from '../../data/learning/fundamentalAnalysisContent';
import { ChevronRight, CheckCircle } from '../../components/common/Icons';
import { toggleSubChapterCompletion } from '../../services/progressService';
import { useProfileData } from '../../services/profileService';
import CompletionDialog from '../../components/learning/CompletionDialog';
import Confetti from '../../components/common/Confetti';

interface PatternDetailViewProps {
    onNavigate: (path: string) => void;
    patternId: string | null;
}

const PatternDetailView: React.FC<PatternDetailViewProps> = ({ onNavigate, patternId }) => {
    const mainRef = useRef<HTMLElement>(null);
    const [isCompletionDialogOpen, setIsCompletionDialogOpen] = useState(false);
    const [confettiTrigger, setConfettiTrigger] = useState(0);
    const [isCompleting, setIsCompleting] = useState(false); // New state to prevent double-clicks
    
    const profile = useProfileData();

    // DERIVE completion status directly from the profile data. No local state.
    const isComplete = !!(profile && patternId && profile.progress_data[patternId]);

    useEffect(() => {
        window.scrollTo(0, 0);
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
    
    const handleToggleComplete = async () => {
        if (pattern && !isCompleting) {
            setIsCompleting(true);
            const wasJustCompleted = !isComplete;

            await toggleSubChapterCompletion(pattern.id);

            if (wasJustCompleted) {
                setIsCompletionDialogOpen(true);
                setConfettiTrigger(c => c + 1); // Trigger confetti animation
            }
            setIsCompleting(false);
        }
    };
    
    const backTargetPath = fundamentalAnalysisTopics.some(p => p.id === patternId) ? '/learning/fundamental'
                         : technicalIndicators.some(p => p.id === patternId) ? '/learning/indicators'
                         : bearishPatterns.some(p => p.id === patternId) ? '/learning/bearish'
                         : bullishPatterns.some(p => p.id === patternId) ? '/learning/bullish'
                         : '/learning';
                         
    const handleNextLesson = () => {
        setIsCompletionDialogOpen(false);
        if (nextLesson && nextLesson.id) { // Ensure next lesson has an id
            // Check if the next lesson is in the same category
             const isNextInSameCategory = (
                (bullishPatterns.some(p => p.id === patternId) && bullishPatterns.some(p => p.id === nextLesson.id)) ||
                (bearishPatterns.some(p => p.id === patternId) && bearishPatterns.some(p => p.id === nextLesson.id)) ||
                (technicalIndicators.some(p => p.id === patternId) && technicalIndicators.some(p => p.id === nextLesson.id)) ||
                (fundamentalAnalysisTopics.some(p => p.id === patternId) && fundamentalAnalysisTopics.some(p => p.id === nextLesson.id))
            );

            if (isNextInSameCategory) {
                 onNavigate(`/learning/pattern/${nextLesson.id}`);
                 return;
            }
        }
        // If no next lesson or it's in a different category, go back to the list
        onNavigate(backTargetPath);
    };

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
            <Confetti trigger={confettiTrigger} />
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
                    disabled={isCompleting}
                    className={`flex-1 flex items-center justify-center p-3 rounded-lg font-semibold transition-all button-press-feedback text-sm ${
                        isCompleting
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : isComplete
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-primary text-white'
                    }`}
                >
                    <CheckCircle size={20} className="mr-2" />
                    <span>{isCompleting ? 'Saving...' : isComplete ? 'Completed' : 'Mark as Complete'}</span>
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
                nextLessonTitle={"Back to Library"}
            />
        </div>
    );
};

export default PatternDetailView;
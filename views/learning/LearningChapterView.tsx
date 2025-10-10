import React, { useRef, useEffect, useState } from 'react';
import anime from 'animejs';
import { learningCurriculum } from '../../data/learningContent';
import { ChevronRight, CheckCircle } from '../../components/common/Icons';
import { toggleSubChapterCompletion } from '../../services/progressService';
import { useProfileData } from '../../services/profileService';
import CompletionDialog from '../../components/learning/CompletionDialog';
import Confetti from '../../components/common/Confetti';

interface LearningChapterViewProps {
    onNavigate: (path: string) => void;
    chapterId: string | null;
}

const LearningChapterView: React.FC<LearningChapterViewProps> = ({ onNavigate, chapterId }) => {
    const mainRef = useRef<HTMLElement>(null);
    const [isCompletionDialogOpen, setIsCompletionDialogOpen] = useState(false);
    const [confettiTrigger, setConfettiTrigger] = useState(0);
    
    const profile = useProfileData();

    // DERIVE completion status directly from the profile data. No local state needed.
    const isComplete = !!(profile && chapterId && profile.progress_data[chapterId]);
    
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
    }, [chapterId]);
    
    const allSubChapters = learningCurriculum.flatMap(c => c.subChapters);
    const currentSubChapterIndex = allSubChapters.findIndex(sub => sub.id === chapterId);
    const subChapter = currentSubChapterIndex !== -1 ? allSubChapters[currentSubChapterIndex] : null;
    const nextSubChapter = currentSubChapterIndex !== -1 && currentSubChapterIndex < allSubChapters.length - 1 
        ? allSubChapters[currentSubChapterIndex + 1] 
        : null;
        
    const handleToggleComplete = async () => {
        if (subChapter) {
            const wasJustCompleted = !isComplete;
            
            // This will persist the change and trigger a global state update.
            // The `isComplete` variable will automatically update on re-render.
            await toggleSubChapterCompletion(subChapter.id);

            if (wasJustCompleted) {
                setIsCompletionDialogOpen(true);
                setConfettiTrigger(c => c + 1); // Trigger confetti animation
            }
        }
    };
    
    const handleNextLesson = () => {
        setIsCompletionDialogOpen(false); // Close dialog
        // Navigate back to the module detail view instead of the next lesson
        const parentModule = learningCurriculum.find(c => c.subChapters.some(sc => sc.id === chapterId));
        if (parentModule) {
            onNavigate(`/learning/module/${parentModule.id}`);
        } else {
            onNavigate('/learning');
        }
    };

    if (!subChapter) {
        return (
            <div className="bg-background text-text-main min-h-screen font-sans p-4 flex flex-col items-center justify-center">
                 <h1 className="text-xl font-bold text-red-500 mb-4">Lesson Not Found</h1>
                 <p className="text-text-secondary mb-6">The requested lesson could not be found.</p>
                 <button 
                    onClick={() => onNavigate('/learning')}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-lg"
                >
                    Back to Curriculum
                </button>
            </div>
        );
    }
    
    const parentModule = learningCurriculum.find(c => c.subChapters.some(sc => sc.id === chapterId));

    return (
        <div className="bg-background text-text-main min-h-screen font-sans">
            <Confetti trigger={confettiTrigger} />
            <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm p-4 flex items-center border-b border-border">
                 <button onClick={() => parentModule ? onNavigate(`/learning/module/${parentModule.id}`) : onNavigate('/learning')} className="p-2 -ml-2" aria-label="Back to curriculum list">
                    <ChevronRight size={24} className="transform rotate-180 text-text-secondary" />
                </button>
                <h1 className="text-md font-semibold text-text-main ml-2 truncate">{subChapter.title}</h1>
            </header>

            <main ref={mainRef} className="p-4 pb-28">
                 <div className="prose max-w-none prose-p:text-text-secondary prose-h3:text-text-main prose-h4:text-text-main prose-strong:text-text-main prose-code:text-primary prose-code:bg-primary-light prose-headings:font-bold prose-table:bg-card prose-th:text-text-main prose-tr:border-border prose-td:text-text-secondary">
                    {subChapter.content}
                </div>
            </main>
            
            <footer className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border z-20">
                <button
                    onClick={handleToggleComplete}
                    className={`w-full flex items-center justify-center p-4 rounded-lg font-semibold transition-all button-press-feedback ${
                        isComplete
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-primary text-white'
                    }`}
                >
                    <CheckCircle size={20} className="mr-2" />
                    <span>{isComplete ? 'Completed!' : 'Mark as Complete'}</span>
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

export default LearningChapterView;
import React, { useRef, useEffect, useState } from 'react';
import anime from 'animejs';
import { learningCurriculum } from '../../data/learningContent';
import { ChevronRight, CheckCircle } from '../../components/common/Icons';
import { toggleSubChapterCompletion } from '../../services/progressService';
import { useProfileData } from '../../services/profileService';
import CompletionDialog from '../../components/learning/CompletionDialog';

interface LearningChapterViewProps {
    onNavigate: (path: string) => void;
    chapterId: string | null;
}

const LearningChapterView: React.FC<LearningChapterViewProps> = ({ onNavigate, chapterId }) => {
    const mainRef = useRef<HTMLElement>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [isCompletionDialogOpen, setIsCompletionDialogOpen] = useState(false);
    
    const profile = useProfileData();

    useEffect(() => {
        // Sync local state with the source of truth from the hook
        if (profile && chapterId) {
            setIsComplete(!!profile.progress_data[chapterId]);
        }
    }, [profile, chapterId]);
    
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
            setIsComplete(wasJustCompleted); // Optimistic UI update
            
            // This will persist the change and trigger a global state update
            await toggleSubChapterCompletion(subChapter.id);

            if (wasJustCompleted) {
                setIsCompletionDialogOpen(true);
            }
        }
    };
    
    const handleNextLesson = () => {
        setIsCompletionDialogOpen(false); // Close dialog
        if (nextSubChapter) {
            onNavigate(`/learning/chapter/${nextSubChapter.id}`);
        } else {
            onNavigate('/learning'); // Go back to library if it's the last lesson
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
    
    return (
        <div className="bg-background text-text-main min-h-screen font-sans">
            <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm p-4 flex items-center border-b border-border">
                 <button onClick={() => onNavigate('/learning/module/ch1')} className="p-2 -ml-2" aria-label="Back to curriculum list">
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
                            ? 'bg-primary-light text-primary border border-primary'
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
                nextLessonTitle={nextSubChapter ? nextSubChapter.title : "Back to Library"}
            />
        </div>
    );
};

export default LearningChapterView;

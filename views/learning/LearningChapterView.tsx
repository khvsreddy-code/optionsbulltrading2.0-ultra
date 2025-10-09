import React, { useRef, useEffect, useState } from 'react';
// FIX: Use a standard ES module import for animejs.
import anime from 'animejs';
import { learningCurriculum } from '../../data/learningContent';
import { ChevronRight, CheckCircle } from '../../components/common/Icons';
import { isSubChapterComplete, toggleSubChapterCompletion } from '../../services/progressService';

interface LearningChapterViewProps {
    onNavigate: (path: string) => void;
    chapterId: string | null;
}

const LearningChapterView: React.FC<LearningChapterViewProps> = ({ onNavigate, chapterId }) => {
    const mainRef = useRef<HTMLElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (chapterId) {
            setIsComplete(isSubChapterComplete(chapterId));
        }
    }, [chapterId]);


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
    }, [chapterId]);
    
    const subChapter = learningCurriculum
        .flatMap(chapter => chapter.subChapters)
        .find(sub => sub.id === chapterId);
        
    const handleToggleComplete = () => {
        if (subChapter) {
            toggleSubChapterCompletion(subChapter.id);
            setIsComplete(!isComplete);
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
                 <button onClick={() => onNavigate('/learning')} className="p-2 -ml-2" aria-label="Back to curriculum list">
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
                    <span>{isComplete ? 'Completed! Mark as Incomplete?' : 'Mark as Complete'}</span>
                </button>
            </footer>
        </div>
    );
};

export default LearningChapterView;
import React, { useRef, useEffect, useState } from 'react';
import anime from 'animejs';
import { learningCurriculum } from '../../data/learningContent';
import { ChevronRight, CheckCircle } from '../../components/common/Icons';
import { getModuleLessonCounts, isSubChapterComplete } from '../../services/progressService';

interface LearningModuleDetailViewProps {
    onNavigate: (path: string) => void;
    moduleId: string | null;
}

interface LessonItemProps {
    subChapter: { id: string; title: string; readingTime: string; };
    onNavigate: (path: string) => void;
}

const LessonItem: React.FC<LessonItemProps> = ({ subChapter, onNavigate }) => {
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const checkCompletion = async () => {
            const completed = await isSubChapterComplete(subChapter.id);
            setIsComplete(completed);
        };
        checkCompletion();

        const handleProgressUpdate = () => checkCompletion();
        window.addEventListener('progressUpdated', handleProgressUpdate);
        window.addEventListener('focus', handleProgressUpdate); // Also check on focus
        return () => {
            window.removeEventListener('progressUpdated', handleProgressUpdate);
            window.removeEventListener('focus', handleProgressUpdate);
        };
    }, [subChapter.id]);

    return (
        <button
            onClick={() => onNavigate(`/learning/chapter/${subChapter.id}`)}
            className="w-full text-left p-4 bg-card rounded-lg transition-colors hover:bg-card/70 button-press-feedback flex justify-between items-center border border-border"
        >
            <div>
                <p className={`font-semibold transition-colors ${isComplete ? 'text-text-secondary line-through' : 'text-text-main'}`}>{subChapter.title}</p>
                <p className="text-sm text-text-secondary mt-1">{subChapter.readingTime}</p>
            </div>
            {isComplete ? (
                <CheckCircle size={22} className="text-primary flex-shrink-0 ml-2" />
            ) : (
                <ChevronRight size={20} className="text-text-secondary flex-shrink-0 ml-2" />
            )}
        </button>
    );
};

const LearningModuleDetailView: React.FC<LearningModuleDetailViewProps> = ({ onNavigate, moduleId }) => {
    const viewRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState({ completed: 0, total: 0 });

    useEffect(() => {
        const fetchProgress = async () => {
            if (moduleId) {
                const counts = await getModuleLessonCounts(moduleId);
                setProgress(counts);
            }
        };
        fetchProgress();

        window.addEventListener('progressUpdated', fetchProgress);
        window.addEventListener('focus', fetchProgress);
        return () => {
            window.removeEventListener('progressUpdated', fetchProgress);
            window.removeEventListener('focus', fetchProgress);
        };
    }, [moduleId]);

    useEffect(() => {
        if(viewRef.current) {
            anime({
                targets: viewRef.current.querySelectorAll('.anim-child'),
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(80),
                duration: 500,
                easing: 'easeOutSine'
            });
        }
    }, [moduleId]);

    const module = learningCurriculum.find(c => c.id === moduleId);

    if (!module) {
        return (
            <div className="bg-background text-text-main min-h-screen font-sans p-4 flex flex-col items-center justify-center">
                 <h1 className="text-xl font-bold text-red-500 mb-4">Module Not Found</h1>
                 <p className="text-text-secondary mb-6">The requested module could not be found.</p>
                 <button 
                    onClick={() => onNavigate('/learning')}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-lg"
                >
                    Back to Library
                </button>
            </div>
        );
    }

    const progressPercent = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
    const moduleTitle = module.shortTitle;

    return (
        <div ref={viewRef} className="bg-background min-h-screen font-sans p-4">
            <header className="flex items-center mb-6 anim-child">
                 <button onClick={() => onNavigate('/learning')} className="p-2 -ml-2 text-text-secondary" aria-label="Go back to learning library">
                    <ChevronRight size={24} className="transform rotate-180" />
                </button>
                <h1 className="text-xl font-bold text-text-main ml-4">{moduleTitle}</h1>
            </header>

            <main>
                <div className="pro-card rounded-2xl overflow-hidden anim-child mb-6">
                    <div className="relative w-full h-40">
                        <img src={module.image} alt={module.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute bottom-4 left-4 z-10">
                            <h2 className="font-bold text-2xl text-white">{moduleTitle}</h2>
                            <p className="text-white/80 font-semibold">{module.title}</p>
                        </div>
                    </div>
                    <div className="p-4 bg-card">
                        <p className="text-sm font-semibold text-text-secondary">{progress.completed} of {progress.total} lessons completed</p>
                        <div className="w-full bg-primary-light rounded-full h-2.5 mt-2">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progressPercent}%`, transition: 'width 0.5s ease-in-out' }}></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {module.subChapters.map((subChapter) => (
                        <div key={subChapter.id} className="anim-child">
                           <LessonItem subChapter={subChapter} onNavigate={onNavigate} />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LearningModuleDetailView;
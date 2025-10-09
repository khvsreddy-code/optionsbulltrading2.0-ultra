import React, { useRef, useEffect, useState } from 'react';
import anime from 'animejs';
import { learningCurriculum, Chapter } from '../../data/learningContent';
import { ChevronRight } from '../../components/common/Icons';
import { getModuleLessonCounts } from '../../services/progressService';

interface LearningHomeViewProps {
    onNavigate: (path: string) => void;
}

const ModuleCard: React.FC<{ chapter: Chapter; onNavigate: (path: string) => void; }> = ({ chapter, onNavigate }) => {
    const [progress, setProgress] = useState({ completed: 0, total: 0 });
    const progressPercent = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
    const title = chapter.title.split(': ')[1] || chapter.title;

    useEffect(() => {
        const fetchProgress = async () => {
            const counts = await getModuleLessonCounts(chapter.id);
            setProgress(counts);
        };
        fetchProgress();

        const handleProgressUpdate = () => fetchProgress();
        window.addEventListener('progressUpdated', handleProgressUpdate);
        return () => window.removeEventListener('progressUpdated', handleProgressUpdate);
    }, [chapter.id]);


    const getPathForModule = (chapterId: string): string => {
        switch(chapterId) {
            case 'ch1': return `/learning/module/ch1`;
            case 'ch3': return '/learning/bullish';
            case 'ch4': return '/learning/bearish';
            case 'ch5': return '/learning/indicators';
            case 'ch6': return '/learning/fundamental';
            default: return '/learning';
        }
    };

    return (
        <div 
            className="pro-card rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => onNavigate(getPathForModule(chapter.id))}
        >
            <div className="relative w-full aspect-video group-hover:scale-105 transition-transform duration-300">
                <img src={chapter.image} alt={chapter.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
                <h3 className="absolute bottom-4 left-4 font-bold text-lg text-white z-10">{title}</h3>
            </div>
            <div className="p-4 bg-card">
                <p className="text-sm font-semibold text-text-secondary">{progress.completed} of {progress.total} lessons completed</p>
                <div className="w-full bg-primary-light rounded-full h-2.5 mt-2">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progressPercent}%`, transition: 'width 0.5s ease-in-out' }}></div>
                </div>
            </div>
        </div>
    );
};


const LearningHomeView: React.FC<LearningHomeViewProps> = ({ onNavigate }) => {
    const viewRef = useRef<HTMLDivElement>(null);
    
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
    }, []);
    
    return (
        <div ref={viewRef} className="bg-background min-h-screen font-sans p-4">
            <header className="flex items-center mb-6 anim-child">
                 <button onClick={() => onNavigate('/home')} className="p-2 -ml-2 text-text-secondary" aria-label="Go back to home">
                    <ChevronRight size={24} className="transform rotate-180" />
                </button>
                <h1 className="text-xl font-bold text-text-main ml-4">Learning Library</h1>
            </header>

            <main>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {learningCurriculum.map((chapter) => (
                        <div key={chapter.id} className="anim-child">
                            <ModuleCard chapter={chapter} onNavigate={onNavigate} />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LearningHomeView;
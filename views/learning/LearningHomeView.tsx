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

    useEffect(() => {
        const fetchProgress = async () => {
            const counts = await getModuleLessonCounts(chapter.id);
            setProgress(counts);
        };
        
        fetchProgress();

        // Add listeners to refetch progress on custom events or when tab is re-focused
        window.addEventListener('progressUpdated', fetchProgress);
        window.addEventListener('focus', fetchProgress);
        
        return () => {
            window.removeEventListener('progressUpdated', fetchProgress);
            window.removeEventListener('focus', fetchProgress);
        };
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
            className="bg-card rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:-translate-y-1"
            onClick={() => onNavigate(getPathForModule(chapter.id))}
        >
            {/* Top part */}
            <div className="relative p-5 h-40" style={{ backgroundColor: '#2d3450' }}>
                <img 
                    src={chapter.image} 
                    alt={chapter.title} 
                    className="absolute right-0 top-0 h-full w-2/3 object-contain" 
                />
                <div className="relative h-full flex flex-col justify-start text-white">
                    <h4 className="text-lg font-normal text-white/80 w-1/2">{chapter.category}</h4>
                    <h3 className="text-xl font-bold mt-1 w-1/2">{chapter.shortTitle}</h3>
                </div>
            </div>

            {/* Bottom part */}
            <div className="p-4">
                <p className="text-sm text-gray-600">{progress.completed} of {progress.total} lessons completed</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                        className="bg-green-400 h-1.5 rounded-full" 
                        style={{ width: `${progressPercent}%`, transition: 'width 0.5s ease-in-out' }}
                    ></div>
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
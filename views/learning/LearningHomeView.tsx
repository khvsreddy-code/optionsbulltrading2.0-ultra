import React, { useRef, useEffect, useState } from 'react';
import anime from 'animejs';
import { learningCurriculum, Chapter } from '../../data/learningContent';
import { ChevronRight } from '../../components/common/Icons';
import { getModuleLessonCounts } from '../../services/progressService';

interface LearningHomeViewProps {
    onNavigate: (path: string) => void;
}

// Card for dynamic learning modules (Bullish, Bearish)
const ModuleCard: React.FC<{ chapter: Chapter; onNavigate: (path: string) => void; }> = ({ chapter, onNavigate }) => {
    const [progress, setProgress] = useState({ completed: 0, total: 0 });
    const progressPercent = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

    useEffect(() => {
        const fetchProgress = async () => {
            const counts = await getModuleLessonCounts(chapter.id);
            setProgress(counts);
        };
        
        fetchProgress();
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
            className="bg-card h-full rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-1 pro-card flex flex-col"
            onClick={() => onNavigate(getPathForModule(chapter.id))}
        >
            <div className="aspect-video bg-border">
                <img 
                    src={chapter.image} 
                    alt={chapter.title} 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-text-main text-base">{chapter.title.split(': ')[1] || chapter.title}</h3>
                    <p className="text-sm text-text-secondary mt-1">{progress.completed} of {progress.total} lessons completed</p>
                </div>
                <div className="w-full bg-border rounded-full h-1.5 mt-2">
                    <div 
                        className="bg-primary h-1.5 rounded-full" 
                        style={{ width: `${progressPercent}%`, transition: 'width 0.5s ease-in-out' }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

// Card for static content (Courses, Daily Analysis)
const StaticCard: React.FC<{ title: string; image: string; onClick?: () => void; }> = ({ title, image, onClick }) => {
    return (
        <div 
            onClick={onClick}
            style={{ backgroundColor: '#2B2E60' }} // Dark blue from screenshot
            className="text-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-1 pro-card flex items-center justify-between p-6 aspect-video"
        >
            <h2 className="text-2xl font-bold w-1/2 break-words">{title}</h2>
            <div className="w-1/2 h-full flex items-center justify-center">
                <img src={image} alt={title} className="max-h-full max-w-full object-contain" />
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

    const bullishChapter = learningCurriculum.find(c => c.id === 'ch3');
    const bearishChapter = learningCurriculum.find(c => c.id === 'ch4');

    const staticCards = [
        { id: 'courses', title: 'Courses', image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/00673d26-3620-4e25-83f7-63c361937ead%20(1).png', onClick: () => onNavigate('/learning/module/ch1') },
        { id: 'daily-analysis', title: 'Daily Chart Analysis', image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/220a283a-e23c-450e-833a-5a7bac49ee84.png', onClick: () => onNavigate('/learning/indicators') },
        { id: 'stock-events', title: 'Upcoming Stock Events', image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/0ca90da9-e791-44ea-bb2d-eef8a3ec351b.png', onClick: () => onNavigate('/learning/fundamental') }
    ];
    
    return (
        <div ref={viewRef} className="bg-background min-h-screen font-sans p-4">
            <header className="flex items-center mb-6 anim-child">
                 <button onClick={() => onNavigate('/home')} className="p-2 -ml-2 text-text-secondary" aria-label="Go back to home">
                    <ChevronRight size={24} className="transform rotate-180" />
                </button>
                <h1 className="text-xl font-bold text-text-main ml-4">Learning Library</h1>
            </header>

            <main>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="anim-child">
                        <StaticCard title={staticCards[0].title} image={staticCards[0].image} onClick={staticCards[0].onClick} />
                    </div>
                    {bullishChapter && (
                        <div className="anim-child">
                            <ModuleCard chapter={bullishChapter} onNavigate={onNavigate} />
                        </div>
                    )}
                    {bearishChapter && (
                        <div className="anim-child">
                            <ModuleCard chapter={bearishChapter} onNavigate={onNavigate} />
                        </div>
                    )}
                    <div className="anim-child">
                        <StaticCard title={staticCards[1].title} image={staticCards[1].image} onClick={staticCards[1].onClick} />
                    </div>
                    <div className="anim-child">
                        <StaticCard title={staticCards[2].title} image={staticCards[2].image} onClick={staticCards[2].onClick} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LearningHomeView;
import React, { useRef, useEffect, useState } from 'react';
// FIX: Use a standard ES module import for animejs.
import anime from 'animejs';
import { learningCurriculum } from '../../data/learningContent';
import { ChevronRight } from '../../components/common/Icons';
import { getCompletedCountForChapter } from '../../services/progressService';

interface LearningHomeViewProps {
    onNavigate: (path: string) => void;
}

const ImageCard: React.FC<{title: string, image: string, onClick: () => void, className?: string}> = ({ title, image, onClick, className = '' }) => (
    <div
        onClick={onClick}
        className={`pro-card relative rounded-2xl overflow-hidden cursor-pointer group ${className}`}
    >
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
        <h3 className="absolute bottom-4 left-4 font-bold text-lg text-white z-10">{title}</h3>
    </div>
);


const LearningHomeView: React.FC<LearningHomeViewProps> = ({ onNavigate }) => {
    const viewRef = useRef<HTMLDivElement>(null);
    const [progressVersion, setProgressVersion] = useState(0);

    // Listen for progress changes to trigger re-renders
    useEffect(() => {
        const handleProgressUpdate = () => {
            setProgressVersion(v => v + 1);
        };
        window.addEventListener('progressUpdated', handleProgressUpdate);
        return () => {
            window.removeEventListener('progressUpdated', handleProgressUpdate);
        };
    }, []);


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
    
    const basicsModule = learningCurriculum.find(c => c.id === 'ch1');
    const otherModules = learningCurriculum.filter(c => c.id !== 'ch1');

    // Calculate progress for basics module
    const basicsCompletedCount = basicsModule ? getCompletedCountForChapter(basicsModule.id) : 0;
    const basicsTotalCount = basicsModule ? basicsModule.subChapters.length : 0;
    const basicsProgress = basicsTotalCount > 0 ? (basicsCompletedCount / basicsTotalCount) * 100 : 0;


    return (
        <div ref={viewRef} className="bg-background min-h-screen font-sans p-4">
            <header className="flex items-center mb-6 anim-child">
                 <button onClick={() => onNavigate('/home')} className="p-2 -ml-2 text-text-secondary" aria-label="Go back to home">
                    <ChevronRight size={24} className="transform rotate-180" />
                </button>
                <h1 className="text-xl font-bold text-text-main ml-4">Learning Library</h1>
            </header>

            <main>
                <div className="space-y-8">
                    {/* Render Basics Module Separately with Progress */}
                    {basicsModule && (
                        <div 
                            className="pro-card rounded-2xl overflow-hidden anim-child cursor-pointer group"
                            onClick={() => onNavigate(getPathForModule(basicsModule.id))}
                        >
                            <div className="relative w-full h-40 group-hover:scale-105 transition-transform duration-300">
                                <img src={basicsModule.image} alt={basicsModule.title} className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40"></div>
                                <h3 className="absolute bottom-4 left-4 font-bold text-lg text-white z-10">{basicsModule.title.split(': ')[1] || basicsModule.title}</h3>
                            </div>
                            <div className="p-4 bg-card">
                                <p className="text-sm font-semibold text-text-secondary">{basicsCompletedCount} of {basicsTotalCount} lessons completed</p>
                                <div className="w-full bg-primary-light rounded-full h-2.5 mt-2">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${basicsProgress}%`, transition: 'width 0.5s ease-in-out' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Render Other Modules as a Grid */}
                     <div className="grid grid-cols-2 gap-4">
                        {otherModules.map((chapter) => (
                            <div key={chapter.id} className="anim-child">
                                <ImageCard
                                    title={chapter.title.split(': ')[1] || chapter.title}
                                    image={chapter.image}
                                    onClick={() => onNavigate(getPathForModule(chapter.id))}
                                    className="h-32"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LearningHomeView;
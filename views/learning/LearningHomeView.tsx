import React, { useRef, useEffect, useState } from 'react';
// FIX: Use a standard ES module import for animejs.
import anime from 'animejs';
import { learningCurriculum } from '../../data/learningContent';
import { ChevronRight, CheckCircle } from '../../components/common/Icons';
import { getCompletedCountForChapter, isSubChapterComplete } from '../../services/progressService';

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
    
    const getTargetPathForChapter = (chapterId: string): string => {
        if (chapterId === 'ch3') return '/learning/bullish';
        if (chapterId === 'ch4') return '/learning/bearish';
        if (chapterId === 'ch5') return '/learning/indicators';
        if (chapterId === 'ch6') return '/learning/fundamental';
        // For 'Basics', we navigate to the main learning home which lists sub-chapters
        return '/learning'; 
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
                        <div>
                            <div className="pro-card rounded-2xl overflow-hidden anim-child">
                                <div className="relative w-full h-40">
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
                            <div className="space-y-3 mt-4">
                                {basicsModule.subChapters.map((subChapter) => {
                                    const isComplete = isSubChapterComplete(subChapter.id);
                                    return (
                                        <div key={subChapter.id} className="anim-child">
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
                                        </div>
                                    );
                                })}
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
                                    onClick={() => onNavigate(getTargetPathForChapter(chapter.id))}
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
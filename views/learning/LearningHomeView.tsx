import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import { learningCurriculum } from '../../data/learningContent';
import { ChevronRight } from '../../components/common/Icons';

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
                    {/* Render Basics Module Separately */}
                    {basicsModule && (
                        <div>
                            <div className="anim-child">
                                <ImageCard
                                    title={basicsModule.title.split(': ')[1] || basicsModule.title}
                                    image={basicsModule.image}
                                    onClick={() => onNavigate('/learning')}
                                    className="w-full h-40 mb-4"
                                />
                            </div>
                            <div className="space-y-3">
                                {basicsModule.subChapters.map((subChapter) => (
                                    <div key={subChapter.id} className="anim-child">
                                        <button
                                            onClick={() => onNavigate(`/learning/chapter/${subChapter.id}`)}
                                            className="w-full text-left p-4 bg-card rounded-lg transition-colors hover:bg-card/70 button-press-feedback flex justify-between items-center border border-border"
                                        >
                                            <div>
                                                <p className="font-semibold text-text-main">{subChapter.title}</p>
                                                <p className="text-sm text-text-secondary mt-1">{subChapter.readingTime}</p>
                                            </div>
                                            <ChevronRight size={20} className="text-text-secondary" />
                                        </button>
                                    </div>
                                ))}
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
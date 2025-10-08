import React from 'react';
import { learningCurriculum } from '../../data/learningContent';
import { ChevronRight } from '../../components/common/Icons';

interface LearningHomeViewProps {
    onNavigate: (path: string) => void;
}

const LearningHomeView: React.FC<LearningHomeViewProps> = ({ onNavigate }) => {
    
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
        <div className="bg-background min-h-screen font-sans p-4">
            <header className="flex items-center mb-6">
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
                             <div
                                key={basicsModule.id}
                                onClick={() => onNavigate('/learning')}
                                className="learning-card cursor-pointer mb-4"
                                style={{ backgroundImage: `url(${basicsModule.image})`, aspectRatio: '16/9' }}
                            >
                                <h3 className="font-bold text-xl">{basicsModule.title.split(': ')[1]}</h3>
                            </div>
                            <div className="space-y-3">
                                {basicsModule.subChapters.map((subChapter) => (
                                    <button
                                        key={subChapter.id}
                                        onClick={() => onNavigate(`/learning/chapter/${subChapter.id}`)}
                                        className="w-full text-left p-4 bg-card rounded-lg transition-colors hover:bg-card/70 button-press-feedback flex justify-between items-center border border-border"
                                    >
                                        <div>
                                            <p className="font-semibold text-text-main">{subChapter.title}</p>
                                            <p className="text-sm text-text-secondary mt-1">{subChapter.readingTime}</p>
                                        </div>
                                        <ChevronRight size={20} className="text-text-secondary" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Render Other Modules as a Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {otherModules.map((chapter) => (
                             <div
                                key={chapter.id}
                                onClick={() => onNavigate(getTargetPathForChapter(chapter.id))}
                                className="learning-card cursor-pointer"
                                style={{ backgroundImage: `url(${chapter.image})` }}
                            >
                                <h3 className="font-bold text-lg">{chapter.title.split(': ')[1]}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LearningHomeView;
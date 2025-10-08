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
                                className={`p-4 h-40 rounded-2xl flex flex-col justify-end relative overflow-hidden text-white cursor-pointer group shadow-lg hover:shadow-xl transition-shadow mb-4 ${basicsModule.bgColor || 'bg-slate-700'}`}
                            >
                                <img src={basicsModule.image} alt="" className="absolute w-32 h-32 -right-5 -bottom-5 opacity-50 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
                                <h3 className="font-bold text-xl z-10">{basicsModule.title.split(': ')[1]}</h3>
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
                                className={`p-4 h-40 rounded-2xl flex flex-col justify-end relative overflow-hidden text-white cursor-pointer group shadow-lg hover:shadow-xl transition-shadow ${chapter.bgColor || 'bg-slate-700'}`}
                            >
                                <img src={chapter.image} alt="" className="absolute w-28 h-28 -right-5 -bottom-5 opacity-50 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
                                <h3 className="font-bold text-lg z-10">{chapter.title.split(': ')[1]}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LearningHomeView;
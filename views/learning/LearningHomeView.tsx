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
        return '/learning'; // Fallback
    };
    
    return (
        <div className="bg-[#111111] text-white min-h-screen font-sans p-4">
            <header className="flex items-center justify-between mb-6">
                 <button onClick={() => onNavigate('/home')} className="p-2 -ml-2" aria-label="Go back to home">
                    <ChevronRight size={24} className="transform rotate-180" />
                </button>
                <div className="flex-1 text-center">
                    <h1 className="text-lg font-bold text-slate-200">The Stock Market Fundamentals</h1>
                    <p className="text-sm text-slate-400">A Complete Learning Curriculum</p>
                </div>
                <div className="w-8"></div>
            </header>

            <main>
                <div className="space-y-8">
                    {learningCurriculum.map((chapter) => (
                        <div key={chapter.id}>
                            <h2 className="text-xl font-semibold text-slate-300 mb-4">{chapter.title}</h2>
                            {chapter.subChapters.length > 0 ? (
                                <div className="space-y-3">
                                    {chapter.subChapters.map((subChapter) => (
                                        <button
                                            key={subChapter.id}
                                            onClick={() => onNavigate(`/learning/chapter/${subChapter.id}`)}
                                            className="w-full text-left p-4 bg-[#1C1C1E] rounded-lg transition-colors hover:bg-[#2C2C2E] button-press-feedback"
                                        >
                                            <p className="font-semibold text-slate-100">{subChapter.title}</p>
                                            <p className="text-sm text-slate-400 mt-1">{subChapter.readingTime}</p>
                                        </button>
                                    ))}
                                </div>
                            ) : chapter.isExternalLink ? (
                                 <div className="space-y-3">
                                     <button
                                        onClick={() => onNavigate(getTargetPathForChapter(chapter.id))}
                                        className="w-full text-left p-4 bg-[#1C1C1E] rounded-lg transition-colors hover:bg-[#2C2C2E] button-press-feedback flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-semibold text-slate-100">View All Patterns</p>
                                            <p className="text-sm text-slate-400 mt-1">Explore detailed explanations</p>
                                        </div>
                                        <ChevronRight size={20} className="text-slate-400" />
                                    </button>
                                 </div>
                            ) : (
                                <div className="p-4 bg-[#1C1C1E] rounded-lg text-center">
                                    <p className="text-slate-400">More lessons coming soon!</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LearningHomeView;

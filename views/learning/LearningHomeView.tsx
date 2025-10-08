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
        return '/learning'; // Fallback
    };
    
    return (
        <div className="bg-background min-h-screen font-sans p-4">
            <header className="flex items-center justify-between mb-6">
                 <button onClick={() => onNavigate('/home')} className="p-2 -ml-2 text-text-secondary" aria-label="Go back to home">
                    <ChevronRight size={24} className="transform rotate-180" />
                </button>
                <div className="flex-1 text-center">
                    <h1 className="text-lg font-bold text-text-main">The Stock Market Fundamentals</h1>
                    <p className="text-sm text-text-secondary">Your journey to market mastery starts here.</p>
                </div>
                <div className="w-8"></div>
            </header>

            <main>
                <div className="space-y-8">
                    {learningCurriculum.map((chapter) => (
                        <div key={chapter.id}>
                            <h2 className="text-xl font-semibold text-text-main mb-4">{chapter.title}</h2>
                            {chapter.subChapters.length > 0 ? (
                                <div className="space-y-3">
                                    {chapter.subChapters.map((subChapter) => (
                                        <button
                                            key={subChapter.id}
                                            onClick={() => onNavigate(`/learning/chapter/${subChapter.id}`)}
                                            className="w-full text-left p-4 bg-white rounded-lg transition-colors hover:bg-gray-50 button-press-feedback border border-border-color"
                                        >
                                            <p className="font-semibold text-text-main">{subChapter.title}</p>
                                            <p className="text-sm text-text-secondary mt-1">{subChapter.readingTime}</p>
                                        </button>
                                    ))}
                                </div>
                            ) : chapter.isExternalLink ? (
                                 <div className="space-y-3">
                                     <button
                                        onClick={() => onNavigate(getTargetPathForChapter(chapter.id))}
                                        className="w-full text-left p-4 bg-white rounded-lg transition-colors hover:bg-gray-50 button-press-feedback flex justify-between items-center border border-border-color"
                                    >
                                        <div>
                                            <p className="font-semibold text-text-main">View All Topics</p>
                                            <p className="text-sm text-text-secondary mt-1">Explore detailed explanations</p>
                                        </div>
                                        <ChevronRight size={20} className="text-text-secondary" />
                                    </button>
                                 </div>
                            ) : (
                                <div className="p-4 bg-white rounded-lg text-center border border-border-color">
                                    <p className="text-text-secondary">More lessons coming soon!</p>
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
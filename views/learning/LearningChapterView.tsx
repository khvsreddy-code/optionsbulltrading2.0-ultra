import React from 'react';
import type { View } from '../../types';
import { learningCurriculum } from '../../data/learningContent';
import { ChevronRight } from '../../components/common/Icons';

interface LearningChapterViewProps {
    onNavigate: (view: View) => void;
    chapterId: string | null;
}

const LearningChapterView: React.FC<LearningChapterViewProps> = ({ onNavigate, chapterId }) => {
    
    const subChapter = learningCurriculum
        .flatMap(chapter => chapter.subChapters)
        .find(sub => sub.id === chapterId);

    if (!subChapter) {
        return (
            <div className="bg-[#111111] text-white min-h-screen font-sans p-4 flex flex-col items-center justify-center">
                 <h1 className="text-xl font-bold text-red-500 mb-4">Lesson Not Found</h1>
                 <p className="text-slate-400 mb-6">The requested lesson could not be found.</p>
                 <button 
                    onClick={() => onNavigate('learningHome')}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg"
                >
                    Back to Curriculum
                </button>
            </div>
        );
    }
    
    return (
        <div className="bg-[#111111] text-white min-h-screen font-sans">
            <header className="sticky top-0 z-10 bg-[#1C1C1E]/80 backdrop-blur-sm p-4 flex items-center border-b border-slate-700">
                 <button onClick={() => onNavigate('learningHome')} className="p-2 -ml-2" aria-label="Back to curriculum list">
                    <ChevronRight size={24} className="transform rotate-180 text-slate-300" />
                </button>
                <h1 className="text-md font-semibold text-slate-200 ml-2 truncate">{subChapter.title}</h1>
            </header>

            <main className="p-4">
                <div className="prose prose-invert prose-lg max-w-none">
                    {subChapter.content}
                </div>
            </main>
        </div>
    );
};

export default LearningChapterView;

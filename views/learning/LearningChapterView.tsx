import React from 'react';
import { learningCurriculum } from '../../data/learningContent';
import { ChevronRight } from '../../components/common/Icons';

interface LearningChapterViewProps {
    onNavigate: (path: string) => void;
    chapterId: string | null;
}

const LearningChapterView: React.FC<LearningChapterViewProps> = ({ onNavigate, chapterId }) => {
    
    const subChapter = learningCurriculum
        .flatMap(chapter => chapter.subChapters)
        .find(sub => sub.id === chapterId);

    if (!subChapter) {
        return (
            <div className="bg-background text-text-main min-h-screen font-sans p-4 flex flex-col items-center justify-center">
                 <h1 className="text-xl font-bold text-red-500 mb-4">Lesson Not Found</h1>
                 <p className="text-text-secondary mb-6">The requested lesson could not be found.</p>
                 <button 
                    onClick={() => onNavigate('/learning')}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-lg"
                >
                    Back to Curriculum
                </button>
            </div>
        );
    }
    
    return (
        <div className="bg-background text-text-main min-h-screen font-sans">
            <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm p-4 flex items-center border-b border-border">
                 <button onClick={() => onNavigate('/learning')} className="p-2 -ml-2" aria-label="Back to curriculum list">
                    <ChevronRight size={24} className="transform rotate-180 text-text-secondary" />
                </button>
                <h1 className="text-md font-semibold text-text-main ml-2 truncate">{subChapter.title}</h1>
            </header>

            <main className="p-4">
                 <div className="prose max-w-none prose-p:text-text-secondary prose-h3:text-text-main prose-h4:text-text-main prose-strong:text-text-main prose-code:text-primary prose-code:bg-primary-light prose-headings:font-bold prose-table:bg-card prose-th:text-text-main prose-tr:border-border prose-td:text-text-secondary">
                    {subChapter.content}
                </div>
            </main>
        </div>
    );
};

export default LearningChapterView;
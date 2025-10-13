import React from 'react';
import { learningCurriculum, Chapter } from '../../data/learningContent';
import { ChevronRight } from '../../components/common/Icons';

interface LearningHomeViewProps {
    onNavigate: (path: string) => void;
}

// Helper function to determine navigation path
const getPathForModule = (chapter: Chapter): string => {
    if (chapter.isExternalLink) {
         switch(chapter.id) {
            case 'ch3': return '/learning/bullish';
            case 'ch4': return '/learning/bearish';
            case 'ch5': return '/learning/indicators';
            case 'ch6': return '/learning/fundamental';
            default: return '/learning';
        }
    }
    return `/learning/module/${chapter.id}`;
};

const ModuleCard: React.FC<{ module: Chapter, onNavigate: (path: string) => void }> = ({ module, onNavigate }) => {
    return (
        <button
            onClick={() => onNavigate(getPathForModule(module))}
            className="pro-card rounded-2xl overflow-hidden cursor-pointer group transition-transform duration-300 hover:-translate-y-1.5 w-full"
        >
            <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                <img src={module.image} alt={module.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
        </button>
    );
};


const LearningHomeView: React.FC<LearningHomeViewProps> = ({ onNavigate }) => {
    return (
        <div className="bg-background min-h-screen font-sans">
            <header className="p-4 flex items-center border-b border-border">
                <button onClick={() => window.history.back()} className="p-2 -ml-2 text-text-secondary" aria-label="Go back">
                    <ChevronRight size={24} className="transform rotate-180" />
                </button>
                <h1 className="text-xl font-bold text-text-main ml-4">Learning Library</h1>
            </header>

            <main className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   {learningCurriculum.map(module => (
                       <ModuleCard key={module.id} module={module} onNavigate={onNavigate} />
                   ))}
                </div>
            </main>
        </div>
    );
};

export default LearningHomeView;
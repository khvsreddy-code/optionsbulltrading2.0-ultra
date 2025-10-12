import React, { useMemo } from 'react';
import { learningCurriculum, Chapter } from '../../data/learningContent';
import { useProfileData } from '../../services/profileService';
import { ChevronRight } from '../../components/common/Icons';

// Import all lesson data to calculate counts
import { bullishPatterns } from '../../data/learning/bullishPatternsContent';
import { bearishPatterns } from '../../data/learning/bearishPatternsContent';
import { technicalIndicators } from '../../data/learning/technicalIndicatorsContent';
import { fundamentalAnalysisTopics } from '../../data/learning/fundamentalAnalysisContent';

interface LearningHomeViewProps {
    onNavigate: (path: string) => void;
}

// Helper to get all lesson IDs for a module
const getLessonIdsForModule = (moduleId: string): string[] => {
    switch(moduleId) {
        case 'ch1': return learningCurriculum.find(c => c.id === 'ch1')?.subChapters.map(sc => sc.id) || [];
        case 'ch3': return bullishPatterns.map(p => p.id);
        case 'ch4': return bearishPatterns.map(p => p.id);
        case 'ch5': return technicalIndicators.map(i => i.id);
        case 'ch6': return fundamentalAnalysisTopics.map(t => t.id);
        default: return [];
    }
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
    const profile = useProfileData();

    const { completedCount, totalLessons } = useMemo(() => {
        const lessonIds = getLessonIdsForModule(module.id);
        const total = lessonIds.length;
        if (total === 0) return { completedCount: 0, totalLessons: 0 };
        
        const completed = profile?.progress_data 
            ? lessonIds.filter(id => profile.progress_data[id]).length 
            : 0;

        return { completedCount: completed, totalLessons: total };
    }, [profile, module.id]);

    const progressPercent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

    return (
        <button
            onClick={() => onNavigate(getPathForModule(module))}
            className="pro-card rounded-2xl overflow-hidden cursor-pointer group transition-transform duration-300 hover:-translate-y-1.5 w-full text-left"
        >
            {/* Plain Image - NO TEXT OVERLAY */}
            <div className="aspect-video bg-gray-200">
                <img src={module.image} alt={module.title} className="w-full h-full object-cover" />
            </div>
            
            {/* Content Below Image */}
            <div className="p-4">
                <h3 className="font-bold text-lg text-text-main">{module.shortTitle}</h3>
                {totalLessons > 0 ? (
                    <>
                        <p className="text-sm text-text-secondary mt-1">{completedCount} of {totalLessons} lessons completed</p>
                        <div className="w-full bg-primary-light rounded-full h-1.5 mt-2">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${progressPercent}%`, transition: 'width 0.5s ease-in-out' }}></div>
                        </div>
                    </>
                ) : (
                     <p className="text-sm text-text-secondary mt-1">Explore this topic</p>
                )}
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
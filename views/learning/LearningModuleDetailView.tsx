import React, { useRef, useEffect, useMemo } from 'react';
// FIX: Correctly import animejs to handle module interoperability issues.
import * as animejs from 'animejs';
const anime = (animejs as any).default;
import { learningCurriculum } from '../../data/learningContent';
import { ChevronRight, CheckCircle, GraduationCap } from '../../components/common/Icons';
import { useProfileData } from '../../services/profileService';

interface LearningModuleDetailViewProps {
    onNavigate: (path: string) => void;
    moduleId: string | null;
}

interface LessonItemProps {
    subChapter: { id: string; title: string; readingTime: string; };
    isComplete: boolean;
    onNavigate: (path: string) => void;
    moduleTitle: string;
}

const LessonItem: React.FC<LessonItemProps> = ({ subChapter, isComplete, onNavigate, moduleTitle }) => {
    return (
        <button
            onClick={() => onNavigate(`/learning/chapter/${subChapter.id}`)}
            className="w-full text-left p-4 bg-card rounded-lg transition-colors hover:bg-background button-press-feedback flex justify-between items-center border border-border"
        >
            <div>
                <p className={`font-semibold transition-colors ${isComplete ? 'text-text-secondary line-through' : 'text-text-main'}`}>{subChapter.title}</p>
                <p className="text-sm text-text-secondary mt-1">{subChapter.readingTime} · {moduleTitle}</p>
            </div>
            {isComplete ? (
                <CheckCircle size={24} className="text-primary flex-shrink-0 ml-2" />
            ) : (
                <ChevronRight size={22} className="text-text-secondary flex-shrink-0 ml-2" />
            )}
        </button>
    );
};

const LearningModuleDetailView: React.FC<LearningModuleDetailViewProps> = ({ onNavigate, moduleId }) => {
    const viewRef = useRef<HTMLDivElement>(null);
    const profile = useProfileData();
    
    const module = learningCurriculum.find(c => c.id === moduleId);

    const progress = useMemo(() => {
        if (!profile || !module || !module.subChapters) return { completed: 0, total: 0 };
        
        const lessons = module.subChapters;
        const total = lessons.length;
        if (total === 0) return { completed: 0, total: 0 };

        const completed = lessons.filter(lesson => profile.progress_data[lesson.id]).length;
        return { completed, total };
    }, [profile, moduleId, module]);

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
    }, [moduleId]);

    if (!module) {
        return (
            <div className="bg-background text-text-main min-h-screen font-sans p-4 flex flex-col items-center justify-center">
                 <h1 className="text-xl font-bold text-red-500 mb-4">Module Not Found</h1>
                 <p className="text-text-secondary mb-6">The requested module could not be found.</p>
                 <button 
                    onClick={() => onNavigate('/learning')}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-lg"
                >
                    Back to Library
                </button>
            </div>
        );
    }

    const progressPercent = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
    const moduleTitle = module.shortTitle;

    return (
        <div ref={viewRef} className="bg-background min-h-screen font-sans">
            <header className="p-4 flex items-center anim-child">
                 <button onClick={() => window.history.back()} className="p-2 -ml-2 text-text-secondary" aria-label="Go back">
                    <ChevronRight size={24} className="transform rotate-180" />
                </button>
                <h1 className="text-xl font-bold text-text-main ml-4">{moduleTitle}</h1>
            </header>

            <main className="px-4">
                {/* Redesigned Header Card */}
                <div className="pro-card rounded-2xl overflow-hidden anim-child mb-6 bg-[#2B2E4A] text-white">
                    <div className="relative w-full h-40">
                        <img src={module.image} alt={module.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        <div className="absolute top-4 left-4 z-10">
                            <h2 className="font-extrabold text-4xl text-white tracking-tight">{module.title.split(': ')[0]}</h2>
                            <h3 className="font-bold text-3xl text-white/90">{module.shortTitle}</h3>
                        </div>
                    </div>
                    <div className="p-4 bg-[#393D62]/50">
                        <p className="text-sm font-semibold text-white/80">{progress.completed} of {progress.total} lessons completed</p>
                        <div className="w-full bg-black/30 rounded-full h-2.5 mt-2">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progressPercent}%`, transition: 'width 0.5s ease-in-out' }}></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {module.subChapters.map((subChapter) => (
                        <div key={subChapter.id} className="anim-child">
                           <LessonItem 
                                subChapter={subChapter}
                                isComplete={!!(profile && profile.progress_data[subChapter.id])}
                                onNavigate={onNavigate}
                                moduleTitle={module.title}
                           />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LearningModuleDetailView;
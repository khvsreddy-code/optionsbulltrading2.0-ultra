import React, { useRef, useEffect } from 'react';
// FIX: Use a standard ES module import for animejs.
import anime from 'animejs';
import { bullishPatterns } from '../../data/learning/bullishPatternsContent';
import { bearishPatterns } from '../../data/learning/bearishPatternsContent';
import { technicalIndicators } from '../../data/learning/technicalIndicatorsContent';
import { fundamentalAnalysisTopics } from '../../data/learning/fundamentalAnalysisContent';
import { ChevronRight } from '../../components/common/Icons';

interface PatternDetailViewProps {
    onNavigate: (path: string) => void;
    patternId: string | null;
}

const PatternDetailView: React.FC<PatternDetailViewProps> = ({ onNavigate, patternId }) => {
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (mainRef.current) {
            anime({
                targets: mainRef.current,
                opacity: [0, 1],
                translateY: [15, 0],
                duration: 500,
                easing: 'easeOutQuad'
            });
        }
    }, [patternId]);

    const allContent = [
        ...bullishPatterns, 
        ...bearishPatterns, 
        ...technicalIndicators, 
        ...fundamentalAnalysisTopics
    ];

    const pattern = allContent.find(p => p.id === patternId);
    
    // Determine the correct back path based on where the content was found
    const backTargetPath = fundamentalAnalysisTopics.some(p => p.id === patternId) ? '/learning/fundamental'
                         : technicalIndicators.some(p => p.id === patternId) ? '/learning/indicators'
                         : bearishPatterns.some(p => p.id === patternId) ? '/learning/bearish'
                         : bullishPatterns.some(p => p.id === patternId) ? '/learning/bullish'
                         : '/learning';

    if (!pattern) {
        return (
            <div className="bg-background text-text-main min-h-screen font-sans p-4 flex flex-col items-center justify-center">
                 <h1 className="text-xl font-bold text-red-500 mb-4">Content Not Found</h1>
                 <p className="text-text-secondary mb-6">The requested learning module could not be found.</p>
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
                 <button onClick={() => onNavigate(backTargetPath)} className="p-2 -ml-2" aria-label="Back to list">
                    <ChevronRight size={24} className="transform rotate-180 text-text-secondary" />
                </button>
                <h1 className="text-md font-semibold text-text-main ml-2 truncate">{pattern.title}</h1>
            </header>

            <main ref={mainRef} className="p-4">
                <div className="prose max-w-none text-text-secondary prose-h3:text-text-main prose-h4:text-text-main prose-strong:text-text-main prose-code:text-primary prose-code:bg-primary-light prose-headings:font-bold">
                    {pattern.content}
                </div>
            </main>
        </div>
    );
};

export default PatternDetailView;
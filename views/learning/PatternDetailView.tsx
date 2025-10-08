import React from 'react';
import type { View } from '../../types';
import { bullishPatterns } from '../../data/learning/bullishPatternsContent';
import { ChevronRight } from '../../components/common/Icons';

interface PatternDetailViewProps {
    onNavigate: (view: View) => void;
    patternId: string | null;
}

const PatternDetailView: React.FC<PatternDetailViewProps> = ({ onNavigate, patternId }) => {
    
    const pattern = bullishPatterns.find(p => p.id === patternId);

    if (!pattern) {
        return (
            <div className="bg-[#111111] text-white min-h-screen font-sans p-4 flex flex-col items-center justify-center">
                 <h1 className="text-xl font-bold text-red-500 mb-4">Pattern Not Found</h1>
                 <p className="text-slate-400 mb-6">The requested pattern could not be found.</p>
                 <button 
                    onClick={() => onNavigate('bullishPatternsList')}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg"
                >
                    Back to Patterns List
                </button>
            </div>
        );
    }
    
    return (
        <div className="bg-[#111111] text-white min-h-screen font-sans">
            <header className="sticky top-0 z-10 bg-[#1C1C1E]/80 backdrop-blur-sm p-4 flex items-center border-b border-slate-700">
                 <button onClick={() => onNavigate('bullishPatternsList')} className="p-2 -ml-2" aria-label="Back to patterns list">
                    <ChevronRight size={24} className="transform rotate-180 text-slate-300" />
                </button>
                <h1 className="text-md font-semibold text-slate-200 ml-2 truncate">{pattern.title}</h1>
            </header>

            <main className="p-4">
                <div className="prose prose-invert prose-lg max-w-none">
                    {pattern.content}
                </div>
            </main>
        </div>
    );
};

export default PatternDetailView;
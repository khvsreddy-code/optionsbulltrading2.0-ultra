import React from 'react';
import type { View } from '../../types';
import { bearishPatterns } from '../../data/learning/bearishPatternsContent';
import { ChevronRight } from '../../components/common/Icons';

interface BearishPatternsListViewProps {
    onNavigate: (view: View, params?: { patternId: string }) => void;
}

const BearishPatternsListView: React.FC<BearishPatternsListViewProps> = ({ onNavigate }) => {
    return (
        <div className="bg-[#111111] text-white min-h-screen font-sans p-4">
            <header className="flex items-center justify-between mb-6">
                 <button onClick={() => onNavigate('learningHome')} className="p-2 -ml-2" aria-label="Go back to curriculum">
                    <ChevronRight size={24} className="transform rotate-180" />
                </button>
                <div className="flex-1 text-center">
                    <h1 className="text-lg font-bold text-slate-200">Major Bearish Candlestick Patterns</h1>
                    <p className="text-sm text-slate-400">Select a pattern to learn more</p>
                </div>
                {/* Placeholder for right side icon if needed */}
                <div className="w-8"></div>
            </header>

            <main>
                 <div className="space-y-3">
                    {bearishPatterns.map((pattern) => (
                        <button
                            key={pattern.id}
                            onClick={() => onNavigate('patternDetail', { patternId: pattern.id })}
                            className="w-full text-left p-4 bg-[#1C1C1E] rounded-lg transition-colors hover:bg-[#2C2C2E] button-press-feedback flex justify-between items-center"
                        >
                            <p className="font-semibold text-slate-100">{pattern.emoji} {pattern.title}</p>
                            <ChevronRight size={20} className="text-slate-400" />
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default BearishPatternsListView;
import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import { bullishPatterns } from '../../data/learning/bullishPatternsContent';
import { ChevronRight } from '../../components/common/Icons';

interface BullishPatternsListViewProps {
    onNavigate: (path: string) => void;
}

const BullishPatternsListView: React.FC<BullishPatternsListViewProps> = ({ onNavigate }) => {
    const viewRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(viewRef.current) {
            anime({
                targets: viewRef.current.querySelectorAll('.anim-child'),
                opacity: [0, 1],
                translateX: [-20, 0],
                delay: anime.stagger(70),
                duration: 400,
                easing: 'easeOutCubic'
            });
        }
    }, []);

    return (
        <div ref={viewRef} className="bg-background text-text-main min-h-screen font-sans p-4">
            <header className="flex items-center justify-between mb-6 anim-child">
                 <button onClick={() => onNavigate('/learning')} className="p-2 -ml-2 text-text-secondary" aria-label="Go back to curriculum">
                    <ChevronRight size={24} className="transform rotate-180" />
                </button>
                <div className="flex-1 text-center">
                    <h1 className="text-lg font-bold text-text-main">Major Bullish Candlestick Patterns</h1>
                    <p className="text-sm text-text-secondary">Select a pattern to learn more</p>
                </div>
                <div className="w-8"></div>
            </header>

            <main>
                 <div className="space-y-3">
                    {bullishPatterns.map((pattern) => (
                        <div key={pattern.id} className="anim-child">
                          <button
                              onClick={() => onNavigate(`/learning/pattern/${pattern.id}`)}
                              className="w-full text-left p-4 bg-card rounded-lg transition-colors hover:bg-card/70 button-press-feedback flex justify-between items-center border border-border"
                          >
                              <p className="font-semibold text-text-main">{pattern.emoji} {pattern.title}</p>
                              <ChevronRight size={20} className="text-text-secondary" />
                          </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default BullishPatternsListView;
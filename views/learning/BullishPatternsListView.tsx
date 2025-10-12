import React, { useRef, useEffect } from 'react';
// FIX: Correctly import animejs to handle module interoperability issues.
import * as animejs from 'animejs';
const anime = (animejs as any).default;
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
                              className="w-full text-left p-3 bg-card rounded-lg transition-colors hover:bg-background button-press-feedback flex items-center border border-border"
                          >
                              {pattern.image && (
                                  <div className="w-16 h-12 flex-shrink-0 mr-4 bg-background rounded-md overflow-hidden flex items-center justify-center p-1">
                                      <img src={pattern.image} alt={pattern.title} className="w-auto h-full object-contain" />
                                  </div>
                              )}
                              <div className="flex-grow">
                                  <p className="font-semibold text-text-main">{pattern.emoji} {pattern.title}</p>
                              </div>
                              <ChevronRight size={20} className="text-text-secondary flex-shrink-0 ml-2" />
                          </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default BullishPatternsListView;
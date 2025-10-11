import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import { fundamentalAnalysisTopics } from '../../data/learning/fundamentalAnalysisContent';
import { ChevronRight } from '../../components/common/Icons';

interface FundamentalAnalysisListViewProps {
    onNavigate: (path: string) => void;
}

const FundamentalAnalysisListView: React.FC<FundamentalAnalysisListViewProps> = ({ onNavigate }) => {
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
                    <h1 className="text-lg font-bold text-text-main">Fundamental Analysis Library</h1>
                    <p className="text-sm text-text-secondary">Select a topic to learn more</p>
                </div>
                <div className="w-8"></div>
            </header>

            <main>
                 <div className="space-y-3">
                    {fundamentalAnalysisTopics.map((topic) => (
                        <div key={topic.id} className="anim-child">
                          <button
                              onClick={() => onNavigate(`/learning/pattern/${topic.id}`)}
                              className="w-full text-left p-4 bg-card rounded-lg transition-colors hover:bg-card/70 button-press-feedback flex items-center justify-between border border-border"
                          >
                              <div className="flex items-center space-x-4">
                                  {topic.icon && (
                                      <div className="w-10 h-10 flex items-center justify-center bg-primary-light rounded-lg">
                                          <topic.icon size={22} className="text-primary" />
                                      </div>
                                  )}
                                  <span className="font-semibold text-text-main">{topic.title}</span>
                              </div>
                              <ChevronRight size={20} className="text-text-secondary" />
                          </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default FundamentalAnalysisListView;
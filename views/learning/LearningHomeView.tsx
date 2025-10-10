import React, { useRef, useEffect } from 'react';
import anime from 'animejs';

interface LearningHomeViewProps {
    onNavigate: (path: string) => void;
}

const HubCard: React.FC<{ card: CardData; onNavigate: (path: string) => void; }> = ({ card, onNavigate }) => {
    const isDark = card.theme === 'dark';
    const isDisabled = !card.path;

    const handleClick = () => {
        if (card.path) {
            onNavigate(card.path);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`pro-card rounded-2xl overflow-hidden flex items-center p-4 h-44 ${isDisabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer transition-transform hover:-translate-y-1.5'} ${isDark ? 'bg-[#373B6B] text-white' : 'bg-card text-text-main'}`}
        >
            <div className="flex flex-col justify-between h-full w-1/2 pl-2 py-2">
                 <h3 className="font-bold text-2xl leading-tight">{card.title}</h3>
            </div>
            <div className="w-1/2 h-full flex items-center justify-center">
                <img src={card.image} alt={card.title} className="max-h-full max-w-full object-contain" />
            </div>
        </div>
    );
};


interface CardData {
    title: string;
    image: string;
    path: string | null;
    theme: 'dark' | 'light';
}

const LearningHomeView: React.FC<LearningHomeViewProps> = ({ onNavigate }) => {
    const viewRef = useRef<HTMLDivElement>(null);

    const hubCards: CardData[] = [
        { title: "Courses", image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/00673d26-3620-4e25-83f7-63c361937ead%20(1).png", path: "/learning/module/ch1", theme: 'dark' },
        { title: "Telegram Subscriptions", image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/365a317e-e26a-407f-9557-d0bcd77aaca0.png", path: "/pricing", theme: 'dark' },
        { title: "Paper Trading", image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/c1802249-a012-4953-95fe-62a74a6bce77.png", path: "/practice", theme: 'light' },
        { title: "Daily Chart Analysis", image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/220a283a-e23c-450e-833a-5a7bac49ee84.png", path: null, theme: 'dark' },
        { title: "Upcoming Stock Events", image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/0ca90da9-e791-44ea-bb2d-eef8a3ec351b.png", path: null, theme: 'dark' },
    ];
    
    useEffect(() => {
        if(viewRef.current) {
            anime({
                targets: viewRef.current.querySelectorAll('.anim-child'),
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(100),
                duration: 600,
                easing: 'easeOutCubic'
            });
        }
    }, []);
    
    return (
        <div ref={viewRef} className="bg-background min-h-screen font-sans p-4">
            <header className="mb-6 anim-child">
                <h1 className="text-2xl font-bold text-text-main">Learning Library</h1>
            </header>

            <main>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {hubCards.map(card => (
                        <div key={card.title} className="anim-child">
                            <HubCard card={card} onNavigate={onNavigate} />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LearningHomeView;
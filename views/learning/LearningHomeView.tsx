import React from 'react';

interface LearningHomeViewProps {
    onNavigate: (path: string) => void;
}

const hubCards = [
    {
        title: "Courses",
        image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/00673d26-3620-4e25-83f7-63c361937ead%20(1).png",
        bgColor: "bg-[#3A3F7A]",
        textColor: "text-white",
        path: "/home",
    },
    {
        title: "Telegram Subscriptions",
        image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/365a317e-e26a-407f-9557-d0bcd77aaca0.png",
        bgColor: "bg-[#3A3F7A]",
        textColor: "text-white",
        path: "/pricing",
    },
    {
        title: "Paper Trading",
        image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/c1802249-a012-4953-95fe-62a74a6bce77.png",
        bgColor: "bg-white",
        textColor: "text-text-main",
        path: "/practice",
    },
    {
        title: "Daily Chart Analysis",
        image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/220a283a-e23c-450e-833a-5a7bac49ee84.png",
        bgColor: "bg-[#6E7498]",
        textColor: "text-white",
        path: null, // No path specified
    },
    {
        title: "Upcoming Stock Events",
        image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/0ca90da9-e791-44ea-bb2d-eef8a3ec351b.png",
        bgColor: "bg-[#6E7498]",
        textColor: "text-white",
        path: null, // No path specified
    }
];

const StaticCard: React.FC<{ card: typeof hubCards[0], onNavigate: (path: string) => void }> = ({ card, onNavigate }) => {
    const CardContent = () => (
        <div className={`pro-card rounded-2xl p-6 flex items-center justify-between h-full ${card.bgColor} transition-transform duration-300 hover:-translate-y-1.5`}>
            <h2 className={`text-2xl font-bold ${card.textColor} w-1/2`}>{card.title}</h2>
            <div className="w-1/2 flex justify-center items-center pl-4">
                <img src={card.image} alt={card.title} className="max-h-24 object-contain rounded-lg" />
            </div>
        </div>
    );

    if (card.path) {
        return <button onClick={() => onNavigate(card.path)} className="w-full h-full text-left"><CardContent /></button>;
    }
    
    return <div className="w-full h-full opacity-70 cursor-not-allowed"><CardContent /></div>;
};

const LearningHomeView: React.FC<LearningHomeViewProps> = ({ onNavigate }) => {
    return (
        <div className="bg-background min-h-screen font-sans p-4">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-text-main">Learning Library</h1>
            </header>

            <main>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-1">
                        <StaticCard card={hubCards[0]} onNavigate={onNavigate} />
                    </div>
                    <div className="md:col-span-1">
                        <StaticCard card={hubCards[1]} onNavigate={onNavigate} />
                    </div>
                    <div className="md:col-span-1">
                        <StaticCard card={hubCards[2]} onNavigate={onNavigate} />
                    </div>
                    <div className="md:col-span-1">
                        <StaticCard card={hubCards[3]} onNavigate={onNavigate} />
                    </div>
                    <div className="md:col-span-2">
                        <StaticCard card={hubCards[4]} onNavigate={onNavigate} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LearningHomeView;
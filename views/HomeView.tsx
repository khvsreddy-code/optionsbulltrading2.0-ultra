import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import IconLink from '../components/home/IconLink';
import { Telegram, BookOpen, Clock } from '../components/common/Icons';
import { learningCurriculum } from '../data/learningContent';

interface HomeViewProps {
    onNavigate: (path: string) => void;
    user: SupabaseUser | null;
}

const ImageCard: React.FC<{title: string, image: string, onClick: () => void, className?: string}> = ({ title, image, onClick, className = '' }) => (
    <div
        onClick={onClick}
        className={`pro-card relative rounded-2xl overflow-hidden cursor-pointer group ${className}`}
    >
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
        <h3 className="absolute bottom-4 left-4 font-bold text-lg text-white z-10">{title}</h3>
    </div>
);


const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {

    const mainCards = [
        { title: "Daily Chart Analysis", image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/220a283a-e23c-450e-833a-5a7bac49ee84.png" },
        { title: "Upcoming Stock Events", image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/0ca90da9-e791-44ea-bb2d-eef8a3ec351b.png" },
        { title: "Telegram Subscriptions", image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/365a317e-e26a-407f-9557-d0bcd77aaca0.png" },
        { title: "Courses", image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/00673d26-3620-4e25-83f7-63c361937ead%20(1).png" }
    ];

    const getTargetPathForChapter = (chapterId: string): string => {
        if (chapterId === 'ch3') return '/learning/bullish';
        if (chapterId === 'ch4') return '/learning/bearish';
        if (chapterId === 'ch5') return '/learning/indicators';
        if (chapterId === 'ch6') return '/learning/fundamental';
        return '/learning';
    };

    return (
        <div className="p-4 space-y-8">
            {/* Quick Links */}
            <div className="pro-card p-4">
                <div className="grid grid-cols-4 gap-4">
                    <IconLink title="Premium" href="https://t.me/optionsbulltrading" icon={Telegram} />
                    <IconLink title="Free Group" href="https://t.me/optionsbulltradingfree" icon={Telegram} />
                    <IconLink title="Library" onClick={() => onNavigate('/learning')} icon={BookOpen} />
                    <IconLink title="Simulator" onClick={() => onNavigate('/practice')} icon={Clock} />
                </div>
            </div>
            
            {/* NEW Paper Trading Hero Card */}
            <ImageCard 
                title="Paper Trading"
                image="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/c1802249-a012-4953-95fe-62a74a6bce77.png"
                onClick={() => onNavigate('/practice')}
                className="w-full aspect-[16/9]"
            />

            {/* Main Content Cards */}
            <div>
                <h2 className="text-xl font-bold text-text-main mb-4">What are you looking for?</h2>
                <div className="grid grid-cols-2 gap-4">
                    {mainCards.map(card => (
                        <ImageCard
                            key={card.title}
                            title={card.title}
                            image={card.image}
                            onClick={() => {}} // Placeholder onClick
                            className="h-32"
                        />
                    ))}
                </div>
            </div>

            {/* Learning Library Section */}
            <div>
                <h2 className="text-xl font-bold text-text-main mb-4">Learning Library</h2>
                <div className="grid grid-cols-2 gap-4">
                    {learningCurriculum.map(chapter => (
                        <ImageCard
                            key={chapter.id}
                            title={chapter.title.split(': ')[1] || chapter.title}
                            image={chapter.image}
                            onClick={() => onNavigate(chapter.isExternalLink ? getTargetPathForChapter(chapter.id) : '/learning')}
                            className="h-32"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeView;
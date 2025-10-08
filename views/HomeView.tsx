import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import IconLink from '../components/home/IconLink';
import { Telegram, BookOpen, Clock } from '../components/common/Icons';
import { learningCurriculum } from '../data/learningContent';

interface HomeViewProps {
    onNavigate: (path: string) => void;
    user: SupabaseUser | null;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {

    const mainCards = [
        { title: "Daily Chart Analysis", iconUrl: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/3d-renders/icons8-stocks-growth-3d-fluency-96.png", bgColor: "bg-blue-600" },
        { title: "Upcoming Stock Events", iconUrl: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/3d-renders/icons8-calendar-3d-fluency-96.png", bgColor: "bg-indigo-600" },
        { title: "Telegram Subscriptions", iconUrl: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/3d-renders/icons8-telegram-3d-fluency-96.png", bgColor: "bg-sky-500" },
        { title: "Courses", iconUrl: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/3d-renders/icons8-education-3d-fluency-96.png", bgColor: "bg-purple-600" }
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

            {/* Main Content Cards */}
            <div>
                <h2 className="text-xl font-bold text-text-main mb-4">What are you looking for?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mainCards.map(card => (
                        <div key={card.title} className={`p-4 h-36 rounded-2xl flex flex-col justify-end relative overflow-hidden text-white cursor-pointer group shadow-lg hover:shadow-xl transition-shadow ${card.bgColor}`}>
                            <img src={card.iconUrl} alt="" className="absolute w-24 h-24 -right-4 -bottom-4 opacity-70 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                            <h3 className="font-bold text-lg z-10">{card.title}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Learning Library Section */}
            <div>
                <h2 className="text-xl font-bold text-text-main mb-4">Learning Library</h2>
                <div className="grid grid-cols-2 gap-4">
                    {learningCurriculum.map(chapter => (
                        <div
                            key={chapter.id}
                            onClick={() => onNavigate(chapter.isExternalLink ? getTargetPathForChapter(chapter.id) : '/learning')}
                            className={`p-4 h-40 rounded-2xl flex flex-col justify-end relative overflow-hidden text-white cursor-pointer group shadow-lg hover:shadow-xl transition-shadow ${chapter.bgColor || 'bg-slate-700'}`}
                        >
                            <img src={chapter.image} alt="" className="absolute w-28 h-28 -right-5 -bottom-5 opacity-50 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
                            <h3 className="font-bold text-lg z-10">{chapter.title.split(': ')[1] || chapter.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeView;
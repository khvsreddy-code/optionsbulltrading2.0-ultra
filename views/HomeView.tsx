import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import IconLink from '../components/home/IconLink';
import { Telegram, BookOpen, Clock, LineChart, Calendar } from '../components/common/Icons';
import { learningCurriculum } from '../data/learningContent';

interface HomeViewProps {
    onNavigate: (path: string) => void;
    user: SupabaseUser | null;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {

    const mainCards = [
        { title: "Daily Chart Analysis", icon: LineChart, bgColor: "bg-blue-500" },
        { title: "Upcoming Stock Events", icon: Calendar, bgColor: "bg-indigo-500" },
        { title: "Telegram Subscriptions", icon: Telegram, bgColor: "bg-sky-500" },
        { title: "Courses", icon: BookOpen, bgColor: "bg-purple-500" }
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
                    {mainCards.map(card => {
                        const Icon = card.icon;
                        return (
                            <div key={card.title} className={`p-6 rounded-2xl flex flex-col justify-end relative overflow-hidden text-white cursor-pointer group pro-card ${card.bgColor}`}>
                                <Icon size={64} className="absolute -right-3 -bottom-3 opacity-20 transform group-hover:scale-110 transition-transform duration-300" />
                                <h3 className="font-bold text-lg z-10">{card.title}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Learning Library Section */}
            <div>
                <h2 className="text-xl font-bold text-text-main mb-4">Learning Library</h2>
                <div className="grid grid-cols-2 gap-4">
                    {learningCurriculum.map(chapter => {
                        const Icon = chapter.icon;
                        return (
                            <div
                                key={chapter.id}
                                onClick={() => onNavigate(chapter.isExternalLink ? getTargetPathForChapter(chapter.id) : '/learning')}
                                className={`p-6 rounded-2xl flex flex-col justify-end relative overflow-hidden text-white cursor-pointer group pro-card ${chapter.bgColor || 'bg-slate-700'}`}
                            >
                                <Icon size={64} className="absolute -right-3 -bottom-3 opacity-20 transform group-hover:scale-110 transition-transform duration-300" />
                                <h3 className="font-bold text-lg z-10">{chapter.title.split(': ')[1] || chapter.title}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default HomeView;
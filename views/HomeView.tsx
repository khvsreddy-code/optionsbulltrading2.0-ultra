import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import IconLink from '../components/home/IconLink';
import { Telegram, BookOpen, CandlestickChart, Clock } from '../components/common/Icons';
import { learningCurriculum } from '../data/learningContent';

interface HomeViewProps {
    onNavigate: (path: string) => void;
    user: SupabaseUser | null;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {

    const mainCards = [
        { title: "Daily Chart Analysis", image: "https://plus.unsplash.com/premium_photo-1681487814165-018814c29141?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { title: "Upcoming Stock Events", image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { title: "Telegram Subscriptions", image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { title: "Courses", image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
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
                        <div key={card.title} className="pro-card p-4 h-40 flex items-end" style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), transparent), url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <h3 className="text-white font-bold text-lg">{card.title}</h3>
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
                            className="learning-card cursor-pointer"
                            style={{ backgroundImage: `url(${chapter.image})` }}
                        >
                            <h3 className="font-bold text-lg">{chapter.title.split(': ')[1] || chapter.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeView;
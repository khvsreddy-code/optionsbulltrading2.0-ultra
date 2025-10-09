import React, { useRef, useEffect, useState } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import IconLink from '../components/home/IconLink';
import { Telegram, GraduationCap, CandlestickChart, CheckCircle, Zap, DollarSign, ChevronRight } from '../components/common/Icons';
import { learningCurriculum } from '../data/learningContent';
import { getProfileData } from '../services/profileService'; // <-- Use new centralized service
import { getTestsPassedCount, getTotalLessonCount } from '../services/progressService';
import anime from 'animejs';

interface HomeViewProps {
    onNavigate: (path: string) => void;
    user: SupabaseUser | null;
}

const ImageCard: React.FC<{title: string, image: string, onClick: () => void, className?: string}> = ({ title, image, onClick, className = '' }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cardEl = cardRef.current;
        if (!cardEl) return;

        const handleMouseEnter = () => {
            anime.remove(cardEl);
            anime({
                targets: cardEl,
                translateY: -8,
                scale: 1.05,
                rotate: '2deg',
                boxShadow: '0 12px 20px rgba(0,0,0,0.1), 0 5px 8px rgba(0,0,0,0.08)',
                duration: 400,
                easing: 'easeOutElastic(1, .8)'
            });
        };

        const handleMouseLeave = () => {
            anime.remove(cardEl);
            anime({
                targets: cardEl,
                translateY: 0,
                scale: 1,
                rotate: 0,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                duration: 250,
                easing: 'easeOutQuad'
            });
        };

        cardEl.addEventListener('mouseenter', handleMouseEnter);
        cardEl.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cardEl.removeEventListener('mouseenter', handleMouseEnter);
            cardEl.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            className={`pro-card relative rounded-2xl overflow-hidden cursor-pointer group ${className}`}
        >
            <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
    );
};

const StatCard: React.FC<{icon: React.FC<any>, title: string, value: string | number, iconBgColor: string, iconColor: string}> = ({ icon: Icon, title, value, iconBgColor, iconColor }) => (
    <div className="bg-gray-700/50 rounded-2xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-300">{title}</h4>
            <Icon size={20} className={iconColor} />
        </div>
        <div>
            {typeof value === 'number' && value % 1 !== 0 ? (
                 <p className="text-2xl font-bold text-white mt-2">{value.toFixed(2)}</p>
            ) : (
                <p className="text-2xl font-bold text-white mt-2">{value}</p>
            )}
        </div>
    </div>
);


const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
    const homeViewRef = useRef<HTMLDivElement>(null);
    const [stats, setStats] = useState({ pnl: 0, lessonsLearned: 0, testsPassed: 0, pnlPercent: 0, overallProgress: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const profile = await getProfileData();
            const lessonsLearned = Object.values(profile.progress_data || {}).filter(Boolean).length;
            const testsPassed = getTestsPassedCount();
            const totalLessons = getTotalLessonCount();
            const initialPortfolio = 100000;
            const pnlPercent = initialPortfolio > 0 ? (profile.total_pnl / initialPortfolio) * 100 : 0;
            const overallProgress = totalLessons > 0 ? (lessonsLearned / totalLessons) * 100 : 0;

            setStats({ pnl: profile.total_pnl, lessonsLearned, testsPassed, pnlPercent, overallProgress });
        };

        fetchStats();

        window.addEventListener('progressUpdated', fetchStats);
        window.addEventListener('testProgressUpdated', fetchStats);
        // Also listen for subscription updates that might change view
        window.addEventListener('subscriptionUpdated', fetchStats);

        return () => {
            window.removeEventListener('progressUpdated', fetchStats);
            window.removeEventListener('testProgressUpdated', fetchStats);
            window.removeEventListener('subscriptionUpdated', fetchStats);
        };
    }, []);

    useEffect(() => {
        const container = homeViewRef.current;
        if (container) {
            const quickLinks = container.querySelector('.quick-links');
            const paperTrading = container.querySelector('.paper-trading-card');
            const sectionHeaders = container.querySelectorAll('.section-header');
            const mainCards = container.querySelectorAll('.main-card-item');
            const libraryCards = container.querySelectorAll('.library-card-item');
            const aiQuizCard = container.querySelector('.ai-quiz-card');
            const progressDashboard = container.querySelector('.progress-dashboard');


            anime.timeline({
                easing: 'easeOutExpo',
                duration: 700
            })
            .add({
                targets: quickLinks,
                opacity: [0, 1],
                translateY: [-20, 0],
            })
            .add({
                targets: paperTrading,
                opacity: [0, 1],
                scale: [0.95, 1],
            }, '-=500')
            .add({
                targets: sectionHeaders[0],
                opacity: [0, 1],
                translateX: [-20, 0],
            }, '-=500')
            .add({
                targets: mainCards,
                opacity: [0, 1],
                scale: [0.8, 1],
                delay: anime.stagger(100),
            }, '-=500')
            .add({
                targets: sectionHeaders[1],
                opacity: [0, 1],
                translateX: [-20, 0],
            }, '-=900')
            .add({
                targets: libraryCards,
                opacity: [0, 1],
                scale: [0.8, 1],
                delay: anime.stagger(100),
            }, '-=700')
            .add({
                targets: aiQuizCard,
                opacity: [0, 1],
                translateY: [20, 0],
            }, '-=600')
            .add({
                targets: progressDashboard,
                opacity: [0, 1],
                translateY: [30, 0],
            }, '-=1000');
        }
    }, []);

    const mainCards = [
        { title: "Daily Chart Analysis", image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/220a283a-e23c-450e-833a-5a7bac49ee84.png" },
        { title: "Upcoming Stock Events", image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/0ca90da9-e791-44ea-bb2d-eef8a3ec351b.png" },
        { title: "Telegram Subscriptions", image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/365a317e-e26a-407f-9557-d0bcd77aaca0.png" },
        { title: "Courses", image: "https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/00673d26-3620-4e25-83f7-63c361937ead%20(1).png" }
    ];

    const getPathForModule = (chapterId: string): string => {
        switch(chapterId) {
            case 'ch1': return `/learning/module/ch1`;
            case 'ch3': return '/learning/bullish';
            case 'ch4': return '/learning/bearish';
            case 'ch5': return '/learning/indicators';
            case 'ch6': return '/learning/fundamental';
            default: return '/learning';
        }
    };

    return (
        <div ref={homeViewRef} className="p-4 space-y-8">
            {/* Quick Links */}
            <div className="pro-card p-4 quick-links">
                <div className="grid grid-cols-5 gap-4">
                    <IconLink title="Free Group" href="https://t.me/optionsbulltradingfree" icon={Telegram} />
                    <IconLink title="Premium" onClick={() => onNavigate('/pricing')} icon={DollarSign} />
                    <IconLink title="Library" onClick={() => onNavigate('/learning')} icon={GraduationCap} />
                    <IconLink title="AI Quiz" onClick={() => onNavigate('/quiz')} icon={Zap} />
                    <IconLink title="Paper Trading" onClick={() => onNavigate('/practice')} icon={CandlestickChart} />
                </div>
            </div>
            
            {/* NEW Paper Trading Hero Card */}
            <div className="paper-trading-card">
              <ImageCard 
                  title="Paper Trading"
                  image="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/c1802249-a012-4953-95fe-62a74a6bce77.png"
                  onClick={() => onNavigate('/practice')}
                  className="w-full aspect-[16/9]"
              />
            </div>

            {/* Main Content Cards */}
            <div>
                <h2 className="text-xl font-bold text-text-main mb-4 section-header">What are you looking for?</h2>
                <div className="grid grid-cols-2 gap-4">
                    {mainCards.map(card => (
                        <div className="main-card-item" key={card.title}>
                          <ImageCard
                              title={card.title}
                              image={card.image}
                              onClick={() => {}} // Placeholder onClick
                              className="aspect-video"
                          />
                        </div>
                    ))}
                </div>
            </div>

            {/* Learning Library Section */}
            <div>
                <h2 className="text-xl font-bold text-text-main mb-4 section-header">Learning Library</h2>
                <div className="grid grid-cols-2 gap-4">
                    {learningCurriculum.map(chapter => (
                        <div className="library-card-item" key={chapter.id}>
                          <ImageCard
                              title={chapter.title.split(': ')[1] || chapter.title}
                              image={chapter.image}
                              onClick={() => onNavigate(getPathForModule(chapter.id))}
                              className="aspect-video"
                          />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* AI Quiz Section */}
            <div className="ai-quiz-card">
                <div
                    onClick={() => onNavigate('/quiz')}
                    className="pro-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between bg-gray-800 text-white cursor-pointer hover:bg-gray-700 transition-colors"
                >
                    <div className="flex items-center mb-4 md:mb-0 text-center md:text-left">
                        <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-primary rounded-xl mr-4">
                            <Zap size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">AI Smart Quiz</h3>
                            <p className="text-slate-300">Challenge yourself with an AI-powered test.</p>
                        </div>
                    </div>
                    <button className="px-5 py-2.5 bg-primary font-semibold rounded-lg button-press-feedback flex items-center mt-4 md:mt-0 flex-shrink-0">
                        Start Quiz <ChevronRight size={20} className="ml-1" />
                    </button>
                </div>
            </div>

             {/* Progress Dashboard */}
            <div className="progress-dashboard">
                <h2 className="text-xl font-bold text-text-main mb-4 section-header">Your Progress</h2>
                <div className="bg-gray-800 text-white rounded-2xl p-6 space-y-6">
                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32">
                            <svg width="128" height="128" viewBox="0 0 120 120" className="transform -rotate-90">
                                <circle cx="60" cy="60" r="54" fill="none" stroke="#4B5563" strokeWidth="12" />
                                <circle
                                    cx="60" cy="60" r="54" fill="none" stroke="#3B82F6" strokeWidth="12"
                                    strokeDasharray="339.29"
                                    strokeDashoffset={339.29 * (1 - (stats.overallProgress / 100))}
                                    strokeLinecap="round"
                                    style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold">{Math.floor(stats.overallProgress)}%</span>
                            </div>
                        </div>
                        <p className="mt-2 text-lg font-semibold tracking-wider text-slate-300">BEGINNER</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <StatCard icon={GraduationCap} title="Lessons Learned" value={stats.lessonsLearned} iconBgColor="bg-cyan-500/20" iconColor="text-cyan-400" />
                        <StatCard icon={CheckCircle} title="Tests Passed" value={stats.testsPassed} iconBgColor="bg-red-500/20" iconColor="text-red-400" />
                        <StatCard icon={Zap} title="Current Streak" value={0} iconBgColor="bg-orange-500/20" iconColor="text-orange-400" />
                        <StatCard 
                            icon={DollarSign} 
                            title="Money Earned" 
                            value={`${stats.pnlPercent.toFixed(2)}%`} 
                            iconBgColor="bg-green-500/20" 
                            iconColor="text-green-400" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeView;

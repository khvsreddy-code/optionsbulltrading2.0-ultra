

import React, { useRef, useEffect, useMemo } from 'react';
// FIX: Updated Supabase type import to resolve module export errors.
import type { User as SupabaseUser } from '@supabase/auth-js';
import IconLink from '../components/home/IconLink';
import { Telegram, GraduationCap, CheckCircle, Sparkles, DollarSign, ChevronRight, Share } from '../components/common/Icons';
import { learningCurriculum } from '../data/learningContent';
import { useProfileData } from '../services/profileService';
import { getTestsPassedCount, getTotalLessonCount } from '../services/progressService';
// FIX: Correctly import animejs to handle module interoperability issues.
import * as animejs from 'animejs';
const anime = (animejs as any).default;

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
    <div className="bg-background/50 dark:bg-card rounded-2xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-text-secondary">{title}</h4>
            <Icon size={20} className={iconColor} />
        </div>
        <div>
            {typeof value === 'number' && value % 1 !== 0 ? (
                 <p className="text-2xl font-bold text-text-main mt-2">{value.toFixed(2)}</p>
            ) : (
                <p className="text-2xl font-bold text-text-main mt-2">{value}</p>
            )}
        </div>
    </div>
);


const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
    const homeViewRef = useRef<HTMLDivElement>(null);
    const profile = useProfileData();

    const stats = useMemo(() => {
        if (!profile) {
            return { pnl: 0, lessonsLearned: 0, testsPassed: 0, pnlPercent: 0, overallProgress: 0 };
        }
        const lessonsLearned = Object.values(profile.progress_data || {}).filter(Boolean).length;
        const testsPassed = getTestsPassedCount();
        const totalLessons = getTotalLessonCount();
        const initialPortfolio = 100000;
        const pnlPercent = initialPortfolio > 0 ? (profile.total_pnl / initialPortfolio) * 100 : 0;
        const overallProgress = totalLessons > 0 ? (lessonsLearned / totalLessons) * 100 : 0;

        return { pnl: profile.total_pnl, lessonsLearned, testsPassed, pnlPercent, overallProgress };
    }, [profile]);

    useEffect(() => {
        const container = homeViewRef.current;
        if (container) {
            const quickLinksItems = container.querySelectorAll('.quick-links .grid > *, .quick-links > button');
            const paperTradingCard = container.querySelector('.paper-trading-card');
            const sectionHeaders = container.querySelectorAll('.section-header');
            const mainCards = container.querySelectorAll('.main-card-item');
            const libraryCards = container.querySelectorAll('.library-card-item');
            const aiQuizCard = container.querySelector('.ai-quiz-card');
            const progressDashboard = container.querySelector('.progress-dashboard');
    
            // Set initial states for animation
            anime.set([quickLinksItems, paperTradingCard, sectionHeaders, mainCards, libraryCards, aiQuizCard, progressDashboard], { opacity: 0, scale: 0.8, rotate: '5deg' });
    
            const tl = anime.timeline({
                easing: 'easeOutElastic(1, .8)',
                duration: 1200
            });
    
            tl.add({
                targets: quickLinksItems,
                opacity: 1,
                scale: 1,
                rotate: 0,
                delay: anime.stagger(100),
            })
            .add({
                targets: paperTradingCard,
                opacity: 1,
                scale: 1,
                rotate: 0,
            }, '-=900')
            .add({
                targets: sectionHeaders,
                opacity: 1,
                translateX: [-25, 0],
                scale: 1,
                rotate: 0,
                delay: anime.stagger(150)
            }, '-=1000')
            .add({
                targets: [...mainCards, ...libraryCards],
                opacity: 1,
                scale: 1,
                rotate: 0,
                delay: anime.stagger(80, { grid: [2, 4], from: 'first' })
            }, '-=1100')
            .add({
                targets: [aiQuizCard, progressDashboard],
                opacity: 1,
                scale: 1,
                rotate: 0,
                translateY: [40, 0],
                delay: anime.stagger(120)
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
    
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'OptionsBullTrading',
                    text: 'Check out this amazing app to learn stock market trading!',
                    url: 'https://optionsbulltrading.vercel.app/#/home',
                });
            } catch (error) {
                console.error('Error sharing:', error);
                // Silently fail if user cancels share dialog
            }
        } else {
            // Fallback for browsers that don't support the API
            alert('Web Share is not supported on this device. You can copy the link: https://optionsbulltrading.vercel.app/#/home');
        }
    };

    return (
        <div ref={homeViewRef} className="p-4 space-y-8">
            {/* Quick Actions */}
            <div className="pro-card p-4 space-y-4 quick-links">
                <div className="grid grid-cols-3 gap-4">
                    <IconLink title="Free Group" href="https://t.me/optionsbulltradingfree" icon={Telegram} />
                    <IconLink title="Library" onClick={() => onNavigate('/learning')} icon={GraduationCap} />
                    <IconLink title="Web Sharing" onClick={handleShare} icon={Share} />
                </div>
                <button
                    onClick={() => onNavigate('/pricing')}
                    className="candle-chart-button w-full p-3 text-white font-semibold rounded-lg transition-colors button-press-feedback"
                >
                    <div className="candle-track" aria-hidden="true">
                        {Array.from({ length: 80 }).map((_, i) => (
                            <div key={i} className="candle"></div>
                        ))}
                    </div>
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                        <DollarSign size={20} />
                        <span>Subscribe</span>
                    </div>
                </button>
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
                    className="pro-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between bg-card cursor-pointer hover:bg-background transition-colors"
                >
                    <div className="flex items-center mb-4 md:mb-0 text-center md:text-left">
                        <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-primary-light rounded-xl mr-4">
                            <Sparkles size={32} className="text-primary"/>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-main">AI Smart Quiz</h3>
                            <p className="text-text-secondary">Challenge yourself with an AI-powered test.</p>
                        </div>
                    </div>
                    <button className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg button-press-feedback flex items-center mt-4 md:mt-0 flex-shrink-0">
                        Start Quiz <ChevronRight size={20} className="ml-1" />
                    </button>
                </div>
            </div>

             {/* Progress Dashboard */}
            <div className="progress-dashboard">
                <h2 className="text-xl font-bold text-text-main mb-4 section-header">Your Progress</h2>
                <div className="bg-card text-text-main rounded-2xl p-6 space-y-6 border border-border">
                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32">
                            <svg width="128" height="128" viewBox="0 0 120 120" className="transform -rotate-90">
                                <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border-color)" strokeWidth="12" />
                                <circle
                                    cx="60" cy="60" r="54" fill="none" stroke="var(--primary)" strokeWidth="12"
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
                        <p className="mt-2 text-lg font-semibold tracking-wider text-text-secondary">BEGINNER</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <StatCard icon={GraduationCap} title="Lessons Learned" value={stats.lessonsLearned} iconBgColor="bg-cyan-500/20" iconColor="text-cyan-400" />
                        <StatCard icon={CheckCircle} title="Tests Passed" value={stats.testsPassed} iconBgColor="bg-red-500/20" iconColor="text-red-400" />
                        <StatCard icon={Sparkles} title="Current Streak" value={0} iconBgColor="bg-orange-500/20" iconColor="text-orange-400" />
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
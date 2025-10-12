

import React, { useRef, useEffect, useMemo } from 'react';
// FIX: Updated Supabase type import to resolve module export errors.
import type { User as SupabaseUser } from '@supabase/auth-js';
import IconLink from '../components/home/IconLink';
// FIX: Add GraduationCap to imports to resolve reference error.
import { Telegram, Rupee, CheckCircle, Sparkles, DollarSign, ChevronRight, Share, GraduationCap, Swap } from '../components/common/Icons';
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

const ImageCard: React.FC<{
    title: string; 
    image: string; 
    onClick: () => void; 
    className?: string; 
    textPosition?: 'top' | 'bottom';
    fitContent?: boolean;
}> = ({ title, image, onClick, className = '', textPosition = 'top', fitContent = false }) => {
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
    
    // Shorten titles like "Module 1: Basics" to just "Basics" for cleaner display
    const displayTitle = title.includes(': ') ? title.split(': ')[1] : title;

    const gradientClass = textPosition === 'top' 
        ? 'bg-gradient-to-b from-black/70 via-black/40 to-transparent' // Dark at top
        : 'bg-gradient-to-t from-black/70 via-black/40 to-transparent'; // Dark at bottom
    
    const textContainerClass = textPosition === 'top' ? 'top-0' : 'bottom-0';

    const imgClass = fitContent
        ? "w-full h-auto block transition-transform duration-300 group-hover:scale-105"
        : "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105";

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            className={`pro-card relative rounded-2xl overflow-hidden cursor-pointer group ${!fitContent ? className : ''}`}
        >
            <img src={image} alt={title} className={imgClass} />
            <div className={`absolute inset-0 ${gradientClass}`}></div>
            <div className={`absolute left-0 p-4 ${textContainerClass}`}>
                 <h3 className="font-bold text-white text-lg leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{displayTitle}</h3>
            </div>
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

    // Main view entrance animation
    useEffect(() => {
        const container = homeViewRef.current;
        if (container) {
            const quickLinksItems = container.querySelectorAll('.quick-links .grid > *, .quick-links > button');
            const sectionHeaders = container.querySelectorAll('.section-header');
            const mainCards = container.querySelectorAll('.main-card-item');
            const libraryCards = container.querySelectorAll('.library-card-item');
            const aiQuizCard = container.querySelector('.ai-quiz-card');
            const progressDashboard = container.querySelector('.progress-dashboard');
    
            anime.set([quickLinksItems, sectionHeaders, mainCards, libraryCards, aiQuizCard, progressDashboard], { opacity: 0, scale: 0.8, rotate: '5deg' });
    
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
            }
        } else {
            alert('Web Share is not supported on this device. You can copy the link: https://optionsbulltrading.vercel.app/#/home');
        }
    };

    return (
        <div ref={homeViewRef} className="p-4 space-y-8">
            {/* Quick Links & Subscribe */}
            <div className="quick-links">
                <div className="grid grid-cols-3 gap-4">
                    <IconLink title="Free Group" icon={Telegram} href="https://t.me/optionsbulltrading" />
                    <IconLink title="Share App" icon={Share} onClick={handleShare} />
                    <IconLink title="Exclusive Group" icon={Sparkles} onClick={() => onNavigate('/pricing')} />
                </div>
                 {/* Subscribe Button */}
                <div className="mt-8">
                    <button
                        onClick={() => onNavigate('/pricing')}
                        className="star-trek-button w-full h-16 rounded-2xl flex items-center justify-center text-lg font-bold button-press-feedback"
                    >
                        <div className="flex items-center space-x-2">
                            <Telegram size={24} />
                            <span>Subscribe to Pro</span>
                        </div>
                    </button>
                </div>
            </div>
            
            {/* What are you looking for? Section */}
            <div>
                <h2 className="section-header text-xl font-bold mb-4 text-text-main">What are you looking for?</h2>
                <div className="grid grid-cols-2 gap-4">
                    {mainCards.map((card, i) => (
                        <div className="main-card-item" key={i}>
                             <ImageCard 
                                title={card.title} 
                                image={card.image} 
                                onClick={() => {}} 
                                fitContent={true}
                            />
                        </div>
                    ))}
                </div>
            </div>

             {/* Learning Library Section */}
            <div>
                <div className="section-header mb-4">
                    <h2 className="text-xl font-bold text-text-main">Learning Library</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                     {learningCurriculum.map((chapter, i) => (
                         <div className="library-card-item" key={chapter.id}>
                            <ImageCard 
                                title={chapter.title} 
                                image={chapter.image} 
                                onClick={() => onNavigate(getPathForModule(chapter.id))}
                                className="aspect-video"
                                textPosition="bottom"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Quiz Card */}
            <div 
                onClick={() => onNavigate('/quiz')}
                className="ai-quiz-card pro-card rounded-2xl p-6 flex items-center justify-between cursor-pointer bg-primary-light"
            >
                <div>
                    <h3 className="font-bold text-lg text-primary">AI Smart Quiz</h3>
                    <p className="text-sm text-primary/80 mt-1">Test your knowledge with AI-generated questions.</p>
                </div>
                <ChevronRight size={24} className="text-primary" />
            </div>

            {/* Progress Dashboard */}
            <div className="progress-dashboard">
                <h2 className="text-xl font-bold mb-4 text-text-main section-header">Your Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard icon={GraduationCap} title="Lessons Learned" value={stats.lessonsLearned} iconBgColor="bg-blue-100" iconColor="text-blue-500" />
                    <StatCard icon={CheckCircle} title="Tests Passed" value={stats.testsPassed} iconBgColor="bg-green-100" iconColor="text-green-500" />
                    <StatCard icon={DollarSign} title="Paper Trading P&L" value={`₹${stats.pnl.toLocaleString('en-IN')}`} iconBgColor="bg-yellow-100" iconColor="text-yellow-500" />
                </div>
            </div>
            
        </div>
    );
};

export default HomeView;
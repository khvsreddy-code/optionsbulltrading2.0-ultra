
import React, { useRef, useEffect, useMemo } from 'react';
// FIX: Updated Supabase type import to resolve module export errors.
import type { User as SupabaseUser } from '@supabase/auth-js';
import IconLink from '../components/home/IconLink';
// FIX: Add GraduationCap to imports to resolve reference error.
import { Telegram, Rupee, CheckCircle, Sparkles, DollarSign, ChevronRight, Share, GraduationCap, Swap, Flame } from '../components/common/Icons';
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
    image: string; 
    onClick: () => void; 
    className?: string;
}> = ({ image, onClick, className = '' }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cardEl = cardRef.current;
        if (!cardEl) return;

        const handleMouseEnter = () => {
            anime.remove(cardEl);
            anime({
                targets: cardEl,
                translateY: -8,
                scale: 1.03,
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        };

        const handleMouseLeave = () => {
            anime.remove(cardEl);
            anime({
                targets: cardEl,
                translateY: 0,
                scale: 1,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                duration: 200,
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
            <img src={image} alt="" className="w-full h-auto block transition-transform duration-300 group-hover:scale-105" />
        </div>
    );
};


const ProgressWidget: React.FC<{
    lessonsLearned: number;
    testsPassed: number;
    currentStreak: number;
    moneyEarnedPercent: number;
    overallProgress: number;
}> = ({ lessonsLearned, testsPassed, currentStreak, moneyEarnedPercent, overallProgress }) => {
    
    useEffect(() => {
        anime({
            targets: '.progress-circle-bar',
            strokeDashoffset: [anime.setDashoffset, 283 * (1 - (overallProgress / 100))],
            easing: 'easeInOutSine',
            duration: 1200,
            delay: 200,
        });
    }, [overallProgress]);

    const StatItem: React.FC<{ icon: React.FC<any>, label: string, value: string | number }> = ({ icon: Icon, label, value }) => (
        <div className="flex items-start space-x-3">
            <div className="bg-primary-light p-2 rounded-lg mt-1">
                 <Icon size={18} className="text-primary" />
            </div>
            <div>
                <p className="text-sm text-text-secondary">{label}</p>
                <p className="font-bold text-xl text-text-main">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-text-main">Your Progress</h2>
            <div className="flex flex-col items-center">
                <div className="relative w-32 h-32">
                    <svg width="128" height="128" viewBox="0 0 100 100" className="transform -rotate-90">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border-color)" strokeWidth="10" />
                        <circle
                            cx="50" cy="50" r="45" fill="none" stroke="var(--primary)" strokeWidth="10"
                            strokeDasharray="283" strokeDashoffset="283"
                            strokeLinecap="round" className="progress-circle-bar"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">{Math.round(overallProgress)}%</span>
                    </div>
                </div>
                <p className="font-bold text-sm uppercase tracking-wider text-text-secondary mt-2">BEGINNER</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 mt-6">
                <StatItem icon={GraduationCap} label="Lessons Learned" value={lessonsLearned} />
                <StatItem icon={CheckCircle} label="Tests Passed" value={testsPassed} />
                <StatItem icon={Flame} label="Current Streak" value={currentStreak} />
                <StatItem icon={DollarSign} label="Money Earned" value={`${moneyEarnedPercent.toFixed(2)}%`} />
            </div>
        </div>
    );
};


const HomeView: React.FC<HomeViewProps> = ({ onNavigate, user }) => {
    const profile = useProfileData();

    const { lessonsCompleted, pnlPercent, overallProgressPercent } = useMemo(() => {
        const completedLessons = profile?.progress_data ? Object.values(profile.progress_data).filter(Boolean).length : 0;
        const pnl = profile?.total_pnl || 0;
        const pnlPercentage = (pnl / 100000) * 100; // Assuming initial capital of 1,00,000 for percentage calculation
        
        const totalLessons = getTotalLessonCount();
        const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
        
        return { lessonsCompleted: completedLessons, pnlPercent: pnlPercentage, overallProgressPercent: overallProgress };
    }, [profile]);
    
    const testsPassed = getTestsPassedCount();

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'OptionsBullTrading',
                    text: 'Check out this awesome trading education app!',
                    url: window.location.origin,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback for browsers that don't support the Web Share API
            alert('Sharing is not supported on this browser. Please copy the link manually.');
        }
    };

    return (
        <div className="p-4 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
                <IconLink title="Free Group" icon={Telegram} href="https://t.me/+0_l_kNOW_u4zY2E1" />
                <IconLink title="Exclusive Group" icon={Sparkles} onClick={() => onNavigate('/pricing')} />
                <IconLink title="Web Sharing" icon={Share} onClick={handleShare} />
            </div>

            {/* Subscribe Button */}
            <button
                onClick={() => onNavigate('/pricing')}
                className="star-trek-button w-full h-14 rounded-2xl flex items-center justify-center text-md font-bold button-press-feedback"
            >
                <div className="flex items-center space-x-2">
                    <Sparkles size={20} />
                    <span>Subscribe to Pro</span>
                </div>
            </button>

            {/* Paper Trading Card */}
            <ImageCard
                image="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/c1802249-a012-4953-95fe-62a74a6bce77.png"
                onClick={() => onNavigate('/practice')}
            />

            {/* --- NEW Pro Features Section --- */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Pro Features</h2>
                    <button onClick={() => onNavigate('/pricing')} className="text-sm font-semibold text-primary flex items-center">
                        See plans <ChevronRight size={16} className="ml-1" />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ImageCard
                        image="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/00673d26-3620-4e25-83f7-63c361937ead%20(1).png"
                        onClick={() => onNavigate('/pricing')}
                    />
                    <ImageCard
                        image="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/220a283a-e23c-450e-833a-5a7bac49ee84.png"
                        onClick={() => onNavigate('/pricing')}
                    />
                    <ImageCard
                        image="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/0ca90da9-e791-44ea-bb2d-eef8a3ec351b.png"
                        onClick={() => onNavigate('/pricing')}
                    />
                    <ImageCard
                        image="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/365a317e-e26a-407f-9557-d0bcd77aaca0.png"
                        onClick={() => onNavigate('/pricing')}
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Learning Library</h2>
                    <button onClick={() => onNavigate('/learning')} className="text-sm font-semibold text-primary flex items-center">
                        See all <ChevronRight size={16} className="ml-1" />
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {learningCurriculum.map(chapter => (
                        <ImageCard 
                            key={chapter.id}
                            image={chapter.image}
                            onClick={() => onNavigate(chapter.isExternalLink ? `/learning/${chapter.id.replace('ch', '') === '3' ? 'bullish' : 'bearish'}` : `/learning/module/${chapter.id}`)}
                        />
                    ))}
                </div>
            </div>
            
            <ProgressWidget
                lessonsLearned={lessonsCompleted}
                testsPassed={testsPassed}
                currentStreak={0} // Placeholder
                moneyEarnedPercent={pnlPercent}
                overallProgress={overallProgressPercent}
            />
        </div>
    );
};

export default HomeView;

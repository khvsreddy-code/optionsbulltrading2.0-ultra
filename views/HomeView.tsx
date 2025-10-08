import React, { useRef, useEffect } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import IconLink from '../components/home/IconLink';
import { Telegram, GraduationCap, CandlestickChart } from '../components/common/Icons';
import { learningCurriculum } from '../data/learningContent';
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


const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
    const homeViewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = homeViewRef.current;
        if (container) {
            const quickLinks = container.querySelector('.quick-links');
            const paperTrading = container.querySelector('.paper-trading-card');
            const sectionHeaders = container.querySelectorAll('.section-header');
            const mainCards = container.querySelectorAll('.main-card-item');
            const libraryCards = container.querySelectorAll('.library-card-item');

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
            }, '-=700');
        }
    }, []);

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
        <div ref={homeViewRef} className="p-4 space-y-8">
            {/* Quick Links */}
            <div className="pro-card p-4 quick-links">
                <div className="grid grid-cols-4 gap-4">
                    <IconLink title="Premium" onClick={() => onNavigate('/pricing')} icon={Telegram} />
                    <IconLink title="Free Group" href="https://t.me/optionsbulltradingfree" icon={Telegram} />
                    <IconLink title="Library" onClick={() => onNavigate('/learning')} icon={GraduationCap} />
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
                              onClick={() => onNavigate(chapter.isExternalLink ? getTargetPathForChapter(chapter.id) : '/learning')}
                              className="aspect-video"
                          />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeView;
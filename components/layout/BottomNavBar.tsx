import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Home, BookOpen, Swap, Briefcase, User } from '../common/Icons';
import type { View } from '../../types';

interface BottomNavBarProps {
    activeView: View;
    onTabChange: (path: string) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, onTabChange }) => {
    const navItems = [
        { label: 'Home', icon: Home, path: '/home' },
        { label: 'Learn', icon: BookOpen, path: '/learning' },
        { label: 'Practice', icon: Swap, path: '/practice', isCentral: true },
        { label: 'Portfolio', icon: Briefcase, path: '/home' }, // Placeholder path
        { label: 'Profile', icon: User, path: '/profile' },
    ];
    
    const activeViewsMap: { [key: string]: View[] } = {
        '/home': ['home'],
        '/learning': ['learningHome', 'learningChapter', 'bullishPatternsList', 'bearishPatternsList', 'patternDetail', 'technicalIndicatorsList', 'fundamentalAnalysisList'],
        '/practice': ['practice'],
        '/profile': ['profile'],
    };

    const prevActiveViewRef = useRef<View>(activeView);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        navItems.forEach((item, index) => {
            const wasActive = activeViewsMap[item.path]?.includes(prevActiveViewRef.current);
            const isActive = activeViewsMap[item.path]?.includes(activeView);
            const targetEl = itemRefs.current[index];

            if (targetEl && !wasActive && isActive) {
                const icon = targetEl.querySelector('svg');

                if (item.isCentral) { // Main button animation
                    anime({
                        targets: targetEl.querySelector('div'),
                        scale: [0.9, 1.1, 1],
                        duration: 500,
                        easing: 'easeOutElastic(1, .8)'
                    });
                } else if (icon) { // Tab icon animation
                    anime.remove(icon);
                    anime({
                        targets: icon,
                        scale: [0.8, 1.25, 1],
                        translateY: [0, -5, 0],
                        duration: 400,
                        easing: 'easeOutCubic'
                    });
                }
            }
        });
        prevActiveViewRef.current = activeView;
    }, [activeView]);

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-30 h-20 bg-card border-t border-border">
             <div className="relative h-full w-full flex justify-around items-center">
                {navItems.map((item, index) => {
                    const isActive = activeViewsMap[item.path]?.includes(activeView);
                    
                    if (item.isCentral) {
                        return (
                             <div 
                                key={item.label}
                                // FIX: The ref callback should return void. Using curly braces ensures this.
                                ref={el => { itemRefs.current[index] = el; }}
                                className="-mt-10 z-20"
                                onClick={() => item.path && onTabChange(item.path)}
                            >
                                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cursor-pointer button-press-feedback shadow-lg shadow-primary/30">
                                    <item.icon size={28} className="text-white" />
                                </div>
                            </div>
                        );
                    }
                    
                    return (
                        <div 
                            key={item.label}
                            // FIX: The ref callback should return void. Using curly braces ensures this.
                            ref={el => { itemRefs.current[index] = el; }}
                            className="flex flex-col items-center justify-center h-full w-full cursor-pointer transition-transform duration-150 ease-in-out transform active:scale-90"
                            onClick={() => item.path && onTabChange(item.path)}
                            aria-label={item.label}
                        >
                            <item.icon 
                                size={24} 
                                className={`mb-1 transition-colors ${isActive ? 'text-primary' : 'text-text-secondary'}`}
                            />
                            <span 
                                className={`text-xs font-semibold transition-colors ${isActive ? 'text-primary' : 'text-text-secondary'}`}
                            >
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </footer>
    );
};

export default BottomNavBar;
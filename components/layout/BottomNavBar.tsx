import React from 'react';
import { BookOpen, Target, CandlestickChart, User, Settings } from '../common/Icons';
import type { View } from '../../types';

interface BottomNavBarProps {
    activeView: View;
    onTabChange: (path: string) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, onTabChange }) => {
    const navItems = [
        { label: 'Learn', icon: BookOpen, path: '/learning' },
        { label: 'Games', icon: Target, path: '/home' },
        { label: 'Practice', icon: CandlestickChart, path: '/practice' },
        { label: 'Profile', icon: User, path: '/profile' },
        { label: 'Settings', icon: Settings, path: '/home' },
    ];

    const activeViewsMap: { [key: string]: View[] } = {
        '/learning': ['learningHome', 'learningChapter', 'bullishPatternsList', 'bearishPatternsList', 'patternDetail', 'technicalIndicatorsList', 'fundamentalAnalysisList'],
        '/home': ['home'],
        '/practice': ['practice'],
        '/profile': ['profile'],
    };
    
    const getActiveIndex = () => {
        // Find which nav item's path corresponds to the active view
        const activeItem = navItems.find(item => activeViewsMap[item.path]?.includes(activeView));
        // Find the index of that item in the original navItems array
        return activeItem ? navItems.indexOf(activeItem) : -1;
    };

    const activeIndex = getActiveIndex();

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-30 h-20 px-2 pb-4">
             <div className="relative h-full w-full bg-slate-800/70 dark:bg-[#18181C]/70 backdrop-blur-lg rounded-2xl border border-slate-700/50 flex justify-around items-center shadow-2xl shadow-black/30">
                {/* Animated Active Pill */}
                {activeIndex !== -1 && (
                    <div 
                        className="absolute top-1/2 -translate-y-1/2 h-12 w-1/5 bg-blue-600 rounded-xl transition-all duration-300 ease-in-out"
                        style={{ 
                            transform: `translateX(calc(${activeIndex * 100}% - 50% * ${2 * activeIndex - (navItems.length - 1)})) translateY(-50%)`,
                            left: `calc(100% / ${navItems.length * 2})`
                        }}
                    ></div>
                )}
            
                {navItems.map((item, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <div 
                            key={item.label}
                            className="relative z-10 flex flex-col items-center justify-center h-full w-full cursor-pointer transition-transform duration-150 ease-in-out transform active:scale-90"
                            onClick={() => item.path && onTabChange(item.path)}
                            aria-label={item.label}
                        >
                            <div className={`transition-all duration-200 ease-out mb-1 ${isActive ? 'scale-100' : 'scale-90'}`}>
                                 <item.icon 
                                    size={22} 
                                    className={`${isActive ? 'text-white' : 'text-slate-400'}`}
                                />
                            </div>
                            <span 
                                className={`text-xs transition-all duration-200 ${isActive ? 'text-white font-semibold' : 'text-slate-400'}`}
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
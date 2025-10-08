import React from 'react';
import { BookOpen, Target, CandlestickChart, User, Settings } from '../common/Icons';
import type { View } from '../../types';

interface BottomNavBarProps {
    activeView: View;
    onTabChange: (path: string) => void;
    onMenuClick: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, onTabChange }) => {
    const navItems = [
        { label: 'Learn', icon: BookOpen, path: '/learning', view: 'learningHome' },
        { label: 'Games', icon: Target, path: '/home', view: 'home' }, 
        { label: 'Practice', icon: CandlestickChart, path: '/practice', view: 'practice' },
        { label: 'Profile', icon: User, path: '/profile', view: 'profile' },
        { label: 'Settings', icon: Settings, path: '/home', view: 'home' },
    ];

    // A view is considered "active" if it's the main view for that tab
    const activeViewsMap: { [key: string]: View[] } = {
        '/learning': ['learningHome', 'learningChapter', 'bullishPatternsList', 'bearishPatternsList', 'patternDetail'],
        '/home': ['home'],
        '/practice': ['practice'],
        '/profile': ['profile'],
    };

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E] z-30 border-t border-slate-700/50 flex justify-around items-center h-16 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.2)]">
            {navItems.map((item) => {
                const isActive = activeViewsMap[item.path]?.includes(activeView);
                return (
                    <div 
                        key={item.label}
                        className="flex flex-col items-center justify-center h-full w-full cursor-pointer transition-transform duration-150 ease-in-out transform active:scale-95"
                        onClick={() => item.path && onTabChange(item.path)}
                        aria-label={item.label}
                    >
                        <div className={`transition-transform duration-200 ease-out ${isActive ? 'scale-110' : ''}`}>
                             <item.icon 
                                size={22} 
                                className={`${isActive ? 'text-white' : 'text-slate-400'}`}
                            />
                        </div>
                        <span 
                            className={`text-xs mt-1 ${isActive ? 'text-white font-semibold' : 'text-slate-400'}`}
                        >
                            {item.label}
                        </span>
                    </div>
                );
            })}
        </footer>
    );
};

export default BottomNavBar;

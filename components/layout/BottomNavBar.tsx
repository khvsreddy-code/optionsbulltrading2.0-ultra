import React from 'react';
import { Home, PieChart, Swap, Briefcase, User } from '../common/Icons';
import type { View } from '../../types';

interface BottomNavBarProps {
    activeView: View;
    onTabChange: (path: string) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, onTabChange }) => {
    const navItems = [
        { label: 'Home', icon: Home, path: '/home' },
        { label: 'Learn', icon: PieChart, path: '/learning' },
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

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-30 h-24 bg-transparent">
             <div className="relative h-full w-full bg-white/80 backdrop-blur-lg border-t border-border-color flex justify-around items-center pt-2">
                {navItems.map((item) => {
                    const isActive = activeViewsMap[item.path]?.includes(activeView);
                    
                    if (item.isCentral) {
                        return (
                             <div 
                                key={item.label}
                                className="-mt-12 z-20"
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
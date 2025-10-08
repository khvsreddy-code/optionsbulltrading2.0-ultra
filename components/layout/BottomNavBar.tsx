import React from 'react';
import { BookOpen, Target, CandlestickChart, User, Settings } from '../common/Icons';
import type { View } from '../../types';

interface BottomNavBarProps {
    activeTab: View;
    onTabChange: (view: View) => void;
    onMenuClick: () => void; // Kept for potential future use, though Settings now has its own tab
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
    // Updated navItems to match the screenshot design: Learn, Games, Practice, Profile, Settings
    const navItems = [
        { label: 'Learn', icon: BookOpen, view: 'learningHome' as View },
        { label: 'Games', icon: Target, view: 'home' as View }, // Placeholder view for Games
        { label: 'Practice', icon: CandlestickChart, view: 'practice' as View },
        { label: 'Profile', icon: User, view: 'profile' as View },
        { label: 'Settings', icon: Settings, view: 'home' as View }, // Placeholder view for Settings
    ];

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E] z-30 border-t border-slate-700/50 flex justify-around items-center h-16 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.2)]">
            {navItems.map((item) => {
                const isActive = activeTab === item.view;
                return (
                    <div 
                        key={item.label}
                        className="flex flex-col items-center justify-center h-full w-full cursor-pointer transition-transform duration-150 ease-in-out transform active:scale-95"
                        onClick={() => item.view && onTabChange(item.view)}
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
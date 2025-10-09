import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { Bell, User as UserIcon, Menu } from '../common/Icons';
import type { View } from '../../types';

interface HeaderProps {
    user: SupabaseUser | null;
    onNavigate: (path: string) => void;
    onMenuClick: () => void;
    activeView: View;
}

const viewTitles: { [key in View]?: string } = {
    home: 'Home',
    learningHome: 'Learning Library',
    learningChapter: 'Lesson',
    bullishPatternsList: 'Bullish Patterns',
    bearishPatternsList: 'Bearish Patterns',
    technicalIndicatorsList: 'Technical Indicators',
    fundamentalAnalysisList: 'Fundamental Analysis',
    patternDetail: 'Lesson Detail',
    profile: 'My Profile',
};


const Header: React.FC<HeaderProps> = ({ user, onNavigate, onMenuClick, activeView }) => {
    const title = viewTitles[activeView] || 'OptionsBull';

    return (
        <header className="bg-card p-4 border-b border-border sticky top-0 z-30">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button 
                        onClick={onMenuClick} 
                        className="md:hidden p-1 mr-3 text-text-secondary"
                        aria-label="Open navigation menu"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="font-bold text-xl text-text-main">{title}</h1>
                </div>
                
                <div className="flex items-center space-x-2">
                    <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border">
                        <Bell size={20} className="text-text-secondary" />
                    </button>
                     <button onClick={() => onNavigate('/profile')} className="relative w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border">
                        <UserIcon size={20} className="text-text-secondary" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
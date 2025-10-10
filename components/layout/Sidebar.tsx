import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { Home, BookOpen, Swap, Briefcase, SignOut, X, DollarSign, Sparkles, MessageSquare } from '../common/Icons';
import type { View } from '../../types';
import { signOutUser } from '../../services/authService';

interface SidebarProps {
    user: SupabaseUser | null;
    onNavigate: (path: string) => void;
    activeView: View;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onNavigate, activeView, isOpen, setIsOpen }) => {
    const userName = user?.user_metadata?.full_name || 'Trader';
    const userEmail = user?.email;
    const userAvatar = user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${userName}&background=53AC53&color=fff`;

    const mainNavItems = [
        { label: 'Home', icon: Home, path: '/home', views: ['home'] },
        { label: 'Learn', icon: BookOpen, path: '/learning', views: ['learningHome', 'learningChapter', 'learningModuleDetail', 'bullishPatternsList', 'bearishPatternsList', 'patternDetail', 'technicalIndicatorsList', 'fundamentalAnalysisList'] },
        { label: 'Pricing', icon: DollarSign, path: '/pricing', views: ['pricing'] },
        { label: 'Portfolio', icon: Briefcase, path: '/home', views: [] }, // Placeholder
    ];

    const aiNavItems = [
        { label: 'AI Dashboard', icon: Sparkles, path: '/finance', views: ['finance'] },
        { label: 'AI Chat', icon: MessageSquare, path: '/chat', views: ['chat'] },
    ];
    
    const handleNavigation = (path: string) => {
        onNavigate(path);
        setIsOpen(false);
    };

    return (
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
                 <div className="flex items-center space-x-2">
                    <img
                        src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/Gemini_Generated_Image_e6q469e6q469e6q4.png"
                        alt="OptionsBull Logo"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-bold text-lg text-text-main">Options Bull Trading</span>
                </div>
                 <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-text-secondary">
                    <X size={20} />
                </button>
            </div>

            {/* Profile Section */}
            <div 
                onClick={() => handleNavigation('/profile')}
                className="p-4 flex items-center space-x-3 cursor-pointer hover:bg-background"
            >
                <img src={userAvatar} alt="User Avatar" className="w-12 h-12 rounded-full" />
                <div className="overflow-hidden">
                    <p className="font-semibold text-text-main truncate">{userName}</p>
                    <p className="text-sm text-text-secondary break-all">{userEmail}</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-grow p-4">
                <div className="space-y-2">
                    {mainNavItems.map(item => {
                        const isActive = item.views.includes(activeView);
                        return (
                            <button 
                                key={item.label}
                                onClick={() => handleNavigation(item.path)}
                                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left font-semibold transition-colors ${isActive ? 'bg-primary-light text-primary' : 'text-text-secondary hover:bg-background hover:text-text-main'}`}
                            >
                                <item.icon size={22} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>
                
                <div className="pt-6">
                    <h3 className="px-3 mb-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">AI Tools</h3>
                    <div className="space-y-2">
                         {aiNavItems.map(item => {
                            const isActive = item.views.includes(activeView);
                            return (
                                <button 
                                    key={item.label}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left font-semibold transition-colors ${isActive ? 'bg-primary-light text-primary' : 'text-text-secondary hover:bg-background hover:text-text-main'}`}
                                >
                                    <item.icon size={22} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="pt-6">
                     <button 
                        onClick={() => handleNavigation('/practice')}
                        className="w-full flex items-center justify-center p-3 space-x-3 text-white font-semibold rounded-lg bg-primary hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30 button-press-feedback"
                    >
                        <Swap size={20} />
                        <span>Paper Trading</span>
                    </button>
                </div>
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-border">
                <button 
                    onClick={signOutUser}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg text-left font-semibold text-text-secondary hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                    <SignOut size={22} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
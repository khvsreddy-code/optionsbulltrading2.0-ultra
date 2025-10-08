import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { User, PieChart, Grid, Layers, Star, Settings, HelpCircle, Shield, FileText, ChevronRight, Sun, SignOut, Moon } from '../common/Icons';
import { signOutUser } from '../../services/authService';

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    user: SupabaseUser | null;
    onNavigate: (path: string) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, user, onNavigate, theme, toggleTheme }) => {
    const userEmail = user?.user_metadata?.full_name || user?.email || 'Guest User';
    const userAvatar = user?.user_metadata?.avatar_url;
    
    const handleNavigation = (path: string | null) => {
        if (!path) return;
        onNavigate(path);
        onClose();
    };

    const items: { name: string; icon: React.FC<any>; path: string | null }[] = [
        { name: 'My Plans', icon: Star, path: null },
        { name: 'Pricing', icon: FileText, path: '/pricing' },
        { name: 'Settings', icon: Settings, path: null },
        { name: 'Policies', icon: Shield, path: '/policies' },
    ];

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                onClick={onClose}
            ></div>
            
            <div className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-800 z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                    <div className="flex items-center space-x-3">
                        <img 
                            src={userAvatar || `https://ui-avatars.com/api/?name=${userEmail}&background=0D8ABC&color=fff`} 
                            alt="User Avatar" 
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="overflow-hidden">
                            <p className="font-semibold text-base truncate text-gray-800 dark:text-slate-200">{userEmail}</p>
                            <p className="text-xs text-gray-500 dark:text-slate-400">Guest User</p>
                        </div>
                    </div>
                     <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 my-3">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{width: '28%'}}></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-800 dark:text-slate-200">Subscribe Now</span>
                        <button 
                            onClick={() => handleNavigation('/pricing')}
                            className="px-5 py-1.5 border border-blue-600 text-blue-600 text-sm font-semibold rounded-md hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:text-blue-400 dark:border-blue-400 transition">
                            Subscribe
                        </button>
                    </div>
                </div>

                <nav className="flex-grow overflow-y-auto">
                    <ul>
                        {items.map((item) => (
                             <li key={item.name} className="border-b dark:border-slate-700 last:border-0">
                                <button 
                                    onClick={() => handleNavigation(item.path)}
                                    disabled={!item.path}
                                    className="flex justify-between items-center p-4 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="flex items-center">
                                        <item.icon size={20} className="mr-4 text-gray-600 dark:text-slate-400" />
                                        <span>{item.name}</span>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-400 dark:text-slate-500" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <button 
                        onClick={signOutUser}
                        className="flex items-center text-gray-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-500"
                    >
                        <SignOut size={20} className="mr-2" />
                        <span className="font-semibold">Logout</span>
                    </button>
                    {/* NEW THEME TOGGLE */}
                    <button
                        onClick={toggleTheme}
                        className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent p-0.5 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
                            theme === 'dark' ? 'bg-slate-600 focus:ring-slate-500' : 'bg-blue-500 focus:ring-blue-400'
                        }`}
                        role="switch"
                        aria-checked={theme === 'dark'}
                        aria-label="Toggle theme"
                    >
                        <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
                                theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        >
                            {theme === 'dark' ? (
                                <Moon size={14} className="text-slate-600" />
                            ) : (
                                <Sun size={14} className="text-yellow-500" />
                            )}
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default SideDrawer;

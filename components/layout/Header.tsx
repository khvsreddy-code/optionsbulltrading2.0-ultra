import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { Bell } from '../common/Icons';

interface HeaderProps {
    user: SupabaseUser | null;
    onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate }) => {
    const userName = user?.user_metadata?.full_name || 'Trader';
    const userAvatar = user?.user_metadata?.avatar_url;

    return (
        <header className="bg-background p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <button onClick={() => onNavigate('/profile')}>
                        <img 
                            src={userAvatar || `https://ui-avatars.com/api/?name=${userName}&background=7065F0&color=fff`} 
                            alt="User Avatar" 
                            className="w-10 h-10 rounded-full"
                        />
                    </button>
                    <div>
                        <p className="text-sm text-text-secondary">Welcome back</p>
                        <p className="font-bold text-text-main text-lg">{userName}</p>
                    </div>
                </div>
                
                <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white border border-border-color">
                    <Bell size={20} className="text-text-secondary" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
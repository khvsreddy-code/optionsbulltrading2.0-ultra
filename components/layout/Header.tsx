import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { Bell, User as UserIcon } from '../common/Icons';

interface HeaderProps {
    user: SupabaseUser | null;
    onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate }) => {
    const userName = user?.user_metadata?.full_name || 'Trader';

    return (
        <header className="bg-card p-4 border-b border-border">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl text-text-main">Welcome, {userName.split(' ')[0]}</h1>
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
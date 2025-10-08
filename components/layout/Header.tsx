import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { Bell, User } from '../common/Icons';

interface HeaderProps {
    user: SupabaseUser | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'User';

    return (
        <header className="sticky top-0 z-20 bg-white dark:bg-slate-800 shadow-sm p-3 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
                {/* App Name */}
                <div className="flex items-center overflow-hidden">
                    <span className="text-lg font-semibold text-gray-800 dark:text-slate-200 truncate">
                        Welcome, {userName}
                    </span>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                        <Bell size={22} className="text-gray-600 dark:text-slate-400" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                        <User size={22} className="text-gray-600 dark:text-slate-400" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
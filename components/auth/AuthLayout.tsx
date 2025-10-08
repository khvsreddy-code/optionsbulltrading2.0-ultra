import React from 'react';
import OptionsbullLogo from '../common/OptionsbullLogo';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 antialiased flex flex-col justify-center items-center p-4 space-y-6">
            
            <OptionsbullLogo />

            <div className="w-full max-w-md mx-auto text-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100">
                    Welcome to
                    <span className="block">Optionsbulltrading</span>
                </h1>
                <p className="text-md text-gray-600 dark:text-slate-400 mt-2 mb-6">
                    Your journey to financial mastery starts here.
                </p>
                
                <div className="bg-white dark:bg-slate-800 p-6 rounded-[1.75rem] shadow-xl dark:shadow-none w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
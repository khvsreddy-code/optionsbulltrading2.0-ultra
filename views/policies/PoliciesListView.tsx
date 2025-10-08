import React from 'react';
import { ChevronRight } from '../../components/common/Icons';

interface PoliciesListViewProps {
    onNavigate: (path: string) => void;
}

const PoliciesListView: React.FC<PoliciesListViewProps> = ({ onNavigate }) => {
    const policies: { name: string; path: string }[] = [
        { name: 'Cancellation & Refunds', path: '/policies/cancellation' },
        { name: 'Terms and Conditions', path: '/policies/terms' },
        { name: 'Shipping Policy', path: '/policies/shipping' },
        { name: 'Privacy Policy', path: '/policies/privacy' },
        { name: 'Contact Us', path: '/policies/contact' },
    ];

    return (
        <div className="font-sans antialiased text-gray-900 bg-gray-50 dark:bg-slate-900 min-h-screen">
            <header className="sticky top-0 z-20 bg-white dark:bg-slate-800 shadow-sm p-3 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center">
                    <button onClick={() => onNavigate('/home')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700" aria-label="Go back to home">
                        <ChevronRight size={22} className="text-gray-600 dark:text-slate-400 transform rotate-180" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-800 dark:text-slate-200 ml-2">Our Policies</h1>
                </div>
            </header>
            <main className="p-4">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                    <ul>
                        {policies.map((policy, index) => (
                            <li key={policy.name} className={`${index < policies.length - 1 ? 'border-b border-gray-200 dark:border-slate-700' : ''}`}>
                                <button onClick={() => onNavigate(policy.path)} className="w-full text-left flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-150">
                                    <span className="text-gray-800 dark:text-slate-200 font-medium">{policy.name}</span>
                                    <ChevronRight size={18} className="text-gray-400 dark:text-slate-500" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default PoliciesListView;

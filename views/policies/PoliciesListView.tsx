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
        <div className="font-sans antialiased text-text-main bg-background min-h-screen">
            <header className="sticky top-0 z-20 bg-card shadow-sm p-3 border-b border-border">
                <div className="flex items-center">
                    <button onClick={() => onNavigate('/home')} className="p-2 rounded-full hover:bg-background" aria-label="Go back to home">
                        <ChevronRight size={22} className="text-text-secondary transform rotate-180" />
                    </button>
                    <h1 className="text-lg font-semibold text-text-main ml-2">Our Policies</h1>
                </div>
            </header>
            <main className="p-4">
                <div className="bg-card rounded-lg shadow-sm border border-border">
                    <ul>
                        {policies.map((policy, index) => (
                            <li key={policy.name} className={`${index < policies.length - 1 ? 'border-b border-border' : ''}`}>
                                <button onClick={() => onNavigate(policy.path)} className="w-full text-left flex justify-between items-center p-4 hover:bg-background transition-colors duration-150">
                                    <span className="text-text-main font-medium">{policy.name}</span>
                                    <ChevronRight size={18} className="text-text-secondary" />
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
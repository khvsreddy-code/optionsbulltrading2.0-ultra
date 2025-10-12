import React from 'react';
import { ChevronRight } from '../common/Icons';

interface PolicyPageLayoutProps {
    title: string;
    onNavigate: (path: string) => void;
    children: React.ReactNode;
}

const PolicyPageLayout: React.FC<PolicyPageLayoutProps> = ({ title, onNavigate, children }) => {
    return (
        <div className="font-sans antialiased text-text-main bg-background min-h-screen flex flex-col">
            <header className="sticky top-0 z-20 bg-card shadow-sm p-3 border-b border-border">
                <div className="flex items-center">
                    <button onClick={() => onNavigate('/policies')} className="p-2 rounded-full hover:bg-background" aria-label="Go back to policies list">
                        <ChevronRight size={22} className="text-text-secondary transform rotate-180" />
                    </button>
                    <h1 className="text-lg font-semibold text-text-main ml-2">{title}</h1>
                </div>
            </header>
            <main className="p-4 prose dark:prose-invert max-w-4xl mx-auto flex-grow prose-p:text-text-secondary prose-h2:text-text-main prose-h3:text-text-main prose-strong:text-text-main prose-li:text-text-secondary">
                {children}
            </main>
            <footer className="bg-card border-t border-border mt-8">
                <div className="max-w-4xl mx-auto p-4 text-sm text-text-secondary">
                    <h4 className="font-semibold text-text-main">Optionsbulltrading Inc.</h4>
                    <address className="not-italic">
                        123 Trading Avenue<br/>
                        Financial District, Mumbai, 400001<br/>
                        India
                    </address>
                    <div className="mt-2">
                        <p><strong>Email:</strong> <a href="mailto:Hemanthwork240@gmail.com" className="text-primary hover:underline">Hemanthwork240@gmail.com</a></p>
                        <p><strong>Phone:</strong> <a href="tel:+919951373380" className="text-primary hover:underline">+91 9951373380</a></p>
                    </div>
                    <p className="mt-4 text-xs">
                        © {new Date().getFullYear()} Optionsbulltrading Inc. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default PolicyPageLayout;
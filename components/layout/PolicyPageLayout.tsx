import React from 'react';
import { ChevronRight } from '../common/Icons';

interface PolicyPageLayoutProps {
    title: string;
    onNavigate: (path: string) => void;
    children: React.ReactNode;
}

const PolicyPageLayout: React.FC<PolicyPageLayoutProps> = ({ title, onNavigate, children }) => {
    return (
        <div className="font-sans antialiased text-gray-800 bg-gray-50 min-h-screen flex flex-col">
            <header className="sticky top-0 z-20 bg-white shadow-sm p-3 border-b border-gray-200">
                <div className="flex items-center">
                    <button onClick={() => onNavigate('/policies')} className="p-2 rounded-full hover:bg-gray-100" aria-label="Go back to policies list">
                        <ChevronRight size={22} className="text-gray-600 transform rotate-180" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-800 ml-2">{title}</h1>
                </div>
            </header>
            <main className="p-4 prose max-w-4xl mx-auto flex-grow">
                {children}
            </main>
            <footer className="bg-white border-t border-gray-200 mt-8">
                <div className="max-w-4xl mx-auto p-4 text-sm text-gray-600">
                    <h4 className="font-semibold text-gray-800">Optionsbulltrading Inc.</h4>
                    <address className="not-italic">
                        123 Trading Avenue<br/>
                        Financial District, Mumbai, 400001<br/>
                        India
                    </address>
                    <div className="mt-2">
                        <p><strong>Email:</strong> <a href="mailto:Hemanthwork240@gmail.com" className="text-primary-dark hover:underline">Hemanthwork240@gmail.com</a></p>
                        <p><strong>Phone:</strong> <a href="tel:+919951373380" className="text-primary-dark hover:underline">+91 9951373380</a></p>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">
                        © {new Date().getFullYear()} Optionsbulltrading Inc. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default PolicyPageLayout;
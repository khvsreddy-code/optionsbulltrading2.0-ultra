import React, { useState } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { ChevronRight, TrendingUp } from '../components/common/Icons';
import { curatedStocks } from '../data/curatedStocks';
import Sparkline from '../components/home/Sparkline';

interface HomeViewProps {
    onNavigate: (path: string) => void;
    user: SupabaseUser | null;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('Stocks');

    const assetCards = curatedStocks.slice(0, 2);
    const assetList = curatedStocks.slice(0, 4);

    return (
        <div className="p-4 space-y-6">
            {/* Portfolio Summary Card */}
            <div className="pro-card p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-text-secondary">My portfolio</p>
                        <p className="text-3xl font-bold text-text-main mt-1">₹1,00,021.31</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-text-secondary">Profit</p>
                        <div className="flex items-center mt-1 text-green-500 font-semibold">
                            <TrendingUp size={16} className="mr-1" />
                            <span>+0.18%</span>
                        </div>
                         <p className="text-sm text-text-secondary font-semibold">+₹21.31</p>
                    </div>
                </div>
            </div>

            {/* My Assets Section */}
            <div>
                <h2 className="text-xl font-bold text-text-main mb-3">My Assets</h2>
                <div className="grid grid-cols-2 gap-4">
                    {assetCards.map(asset => (
                        <div key={asset.instrument_key} className="pro-card p-4">
                            <div className="flex items-center space-x-2 mb-3">
                                <div className="w-8 h-8 flex items-center justify-center bg-primary-light rounded-full">
                                    <asset.icon size={18} className="text-primary" />
                                </div>
                                <span className="font-bold text-text-main">{asset.tradingsymbol}</span>
                            </div>
                            <div className="h-10 -mx-2">
                                <Sparkline />
                            </div>
                            <div className="mt-3">
                                <p className="font-bold text-text-main">₹{asset.instrument_key.includes('BTC') ? '63,920.34' : '2,885.50'}</p>
                                <p className="text-sm text-green-500 font-semibold">+2.37%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabbed Asset List */}
            <div>
                <div className="flex items-center space-x-4 border-b border-border-color mb-4">
                    {['Stocks', 'Mutual funds', 'Gold'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 font-semibold transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="space-y-3">
                    {assetList.map(asset => (
                        <div key={asset.instrument_key} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-100">
                             <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 flex items-center justify-center bg-primary-light rounded-full">
                                    <asset.icon size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="font-bold text-text-main">{asset.tradingsymbol}</p>
                                    <p className="text-sm text-text-secondary">{asset.name.split(' ')[0]}</p>
                                </div>
                            </div>
                            <div className="w-20 h-8 -mx-2">
                                <Sparkline isPositive={Math.random() > 0.5}/>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-text-main">₹{asset.instrument_key.includes('BTC') ? '63,920.34' : '2,885.50'}</p>
                                <p className={`text-sm font-semibold ${Math.random() > 0.5 ? 'text-green-500' : 'text-red-500'}`}>
                                    {Math.random() > 0.5 ? '+' : '-'}{ (1 + Math.random() * 2).toFixed(2) }%
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeView;
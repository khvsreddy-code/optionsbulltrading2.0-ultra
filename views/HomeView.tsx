import React from 'react';
import IconLink from '../components/home/IconLink';
import { Telegram, BookOpen, Clock, ChevronRight, Zap, Star } from '../components/common/Icons';

interface HomeViewProps {
    onNavigate: (path: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {

    return (
        <div className="bg-sky-50 dark:bg-slate-900 font-sans p-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* Hero Card: Market Simulator */}
                <div style={{ animationDelay: '100ms' }} className="animate-reveal-in col-span-1 md:col-span-4 bg-white dark:bg-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between pro-card border border-transparent dark:border-slate-700">
                    <div className="flex-1 mb-4 md:mb-0 md:mr-6">
                        <div className="flex items-center mb-2">
                            <Zap size={20} className="text-blue-500 dark:text-blue-400 mr-2"/>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Market Simulator</h2>
                        </div>
                        <p className="text-gray-600 dark:text-slate-400">
                            Practice trading with real-time simulated data. Hone your skills and test strategies in a risk-free environment.
                        </p>
                    </div>
                    <button 
                        onClick={() => onNavigate('/practice')}
                        className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl button-press-feedback hover:bg-blue-700 transition flex items-center justify-center">
                        Start Practicing <ChevronRight size={18} className="ml-2" />
                    </button>
                </div>

                {/* Quick Actions */}
                <div style={{ animationDelay: '200ms' }} className="animate-reveal-in col-span-1 md:col-span-4 p-4 bg-white dark:bg-slate-800 rounded-3xl pro-card border border-transparent dark:border-slate-700">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <IconLink 
                            title="Premium Plans" 
                            icon={Star} 
                            onClick={() => onNavigate('/pricing')} 
                        />
                        <IconLink 
                            title="Free Telegram" 
                            icon={Telegram} 
                            href="https://t.me/optionsbulltradingtelugu"
                        />
                        <IconLink 
                            title="Learning Library" 
                            icon={BookOpen}
                            onClick={() => onNavigate('/learning')} 
                        />
                        <IconLink 
                            title="Daily Analysis" 
                            icon={Clock} 
                        />
                    </div>
                </div>

                {/* Learning Library Card */}
                <div style={{ animationDelay: '300ms' }} className="animate-reveal-in col-span-1 md:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 pro-card border border-transparent dark:border-slate-700">
                     <h2 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-4">Master the Markets</h2>
                     <div className="space-y-3">
                         <button onClick={() => onNavigate('/learning')} className="w-full text-left p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg flex justify-between items-center hover:bg-slate-200 dark:hover:bg-slate-700 transition button-press-feedback">
                             <span className="font-semibold text-gray-700 dark:text-slate-200">The Basics of Stocks</span>
                             <ChevronRight size={18} className="text-slate-400"/>
                         </button>
                         <button onClick={() => onNavigate('/learning/bullish')} className="w-full text-left p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg flex justify-between items-center hover:bg-slate-200 dark:hover:bg-slate-700 transition button-press-feedback">
                             <span className="font-semibold text-gray-700 dark:text-slate-200">Bullish Candlesticks</span>
                             <ChevronRight size={18} className="text-slate-400"/>
                         </button>
                          <button onClick={() => onNavigate('/learning/bearish')} className="w-full text-left p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg flex justify-between items-center hover:bg-slate-200 dark:hover:bg-slate-700 transition button-press-feedback">
                             <span className="font-semibold text-gray-700 dark:text-slate-200">Bearish Candlesticks</span>
                             <ChevronRight size={18} className="text-slate-400"/>
                         </button>
                         <button onClick={() => onNavigate('/learning/indicators')} className="w-full text-left p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg flex justify-between items-center hover:bg-slate-200 dark:hover:bg-slate-700 transition button-press-feedback">
                             <span className="font-semibold text-gray-700 dark:text-slate-200">Technical Indicators</span>
                             <ChevronRight size={18} className="text-slate-400"/>
                         </button>
                          <button onClick={() => onNavigate('/learning/fundamental')} className="w-full text-left p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg flex justify-between items-center hover:bg-slate-200 dark:hover:bg-slate-700 transition button-press-feedback">
                             <span className="font-semibold text-gray-700 dark:text-slate-200">Fundamental Analysis</span>
                             <ChevronRight size={18} className="text-slate-400"/>
                         </button>
                     </div>
                </div>

                {/* Upcoming Events Card */}
                 <div style={{ animationDelay: '400ms' }} className="animate-reveal-in col-span-1 md:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 flex flex-col pro-card border border-transparent dark:border-slate-700">
                     <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-4">
                         <img src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/5694a6db-f12e-4b08-9e39-81b9de02700e.jpg" alt="Stock Events" className="w-full h-full object-cover"/>
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <h3 className="absolute bottom-3 left-3 text-white text-xl font-bold">Upcoming Stock Events</h3>
                     </div>
                     <p className="text-gray-600 dark:text-slate-400 flex-grow">
                         Stay ahead of the market with insights on upcoming earnings reports, economic data releases, and major corporate events.
                     </p>
                      <button className="mt-4 w-full text-left p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg flex justify-between items-center hover:bg-slate-200 dark:hover:bg-slate-700 transition button-press-feedback">
                         <span className="font-semibold text-gray-700 dark:text-slate-200">View Calendar</span>
                         <ChevronRight size={18} className="text-slate-400"/>
                     </button>
                 </div>
            </div>
        </div>
    );
};

export default HomeView;
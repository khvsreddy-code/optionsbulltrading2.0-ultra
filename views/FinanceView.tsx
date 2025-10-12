import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Search, Bell, TrendingUp, TrendingDown, Plus, ChevronRight } from '../components/common/Icons';
import Sparkline from '../components/home/Sparkline';

// --- TYPE DEFINITIONS for Gemini Response ---
interface MarketIndex { name: string; value: string; change: string; changePercent: string; isPositive: boolean; }
interface SummaryItem { title: string; summary: string; }
interface StockItem { name: string; ticker: string; price: string; changePercent: string; isPositive: boolean; }
interface CryptoItem { name: string; ticker: string; price: string; changePercent: string; isPositive: boolean; }

interface MarketData {
    marketIndices: MarketIndex[];
    marketSummary: SummaryItem[];
    watchlist: StockItem[];
    topGainers: StockItem[];
    popularCryptos: CryptoItem[];
}

// --- SKELETON LOADER COMPONENTS ---
const SkeletonText: React.FC<{ width: string }> = ({ width }) => <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${width}`}></div>;
const SkeletonCard: React.FC<{ height: string }> = ({ height }) => <div className={`bg-card p-4 rounded-xl shadow-sm animate-pulse ${height}`}></div>;

// --- UI COMPONENTS ---
const MarketIndexCard: React.FC<{ index: MarketIndex }> = ({ index }) => {
    const colorClass = index.isPositive ? 'text-green-600' : 'text-red-500';
    const Icon = index.isPositive ? TrendingUp : TrendingDown;
    return (
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex-1">
            <div className="flex items-center justify-between">
                <p className="font-bold text-sm text-text-main">{index.name}</p>
                <div className={`flex items-center text-sm font-semibold ${colorClass}`}>
                    <Icon size={16} className="mr-1" />
                    {index.changePercent}
                </div>
            </div>
            <p className="text-2xl font-bold text-text-main mt-2">{index.value}</p>
            <div className="h-10 mt-2">
                <Sparkline isPositive={index.isPositive} />
            </div>
        </div>
    );
};

const StockListItem: React.FC<{ stock: StockItem; icon?: React.ReactNode }> = ({ stock, icon }) => {
    const colorClass = stock.isPositive ? 'text-green-600' : 'text-red-500';
    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
                {icon && <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center mr-3">{icon}</div>}
                <div>
                    <p className="font-semibold text-sm text-text-main">{stock.name}</p>
                    <p className="text-xs text-text-secondary">{stock.ticker}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-semibold text-sm text-text-main">{stock.price}</p>
                <p className={`font-semibold text-xs ${colorClass}`}>{stock.changePercent}</p>
            </div>
        </div>
    );
};


const FinanceView: React.FC<{ onNavigate: (path: string) => void; }> = ({ onNavigate }) => {
    const [marketData, setMarketData] = useState<MarketData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                if (!process.env.API_KEY) {
                    throw new Error("API_KEY is not configured.");
                }
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

                const marketDataSchema = {
                    type: Type.OBJECT,
                    properties: {
                        marketIndices: {
                            type: Type.ARRAY, description: "List of 4 major market indices: NIFTY 50, S&P BSE SENSEX, NIFTY BANK, and Bitcoin.",
                            items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, value: { type: Type.STRING }, change: { type: Type.STRING }, changePercent: { type: Type.STRING }, isPositive: { type: Type.BOOLEAN } } }
                        },
                        marketSummary: {
                            type: Type.ARRAY, description: "A detailed market summary with 4-6 paragraphs, each with a title and summary text.",
                            items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, summary: { type: Type.STRING } } }
                        },
                        watchlist: {
                            type: Type.ARRAY, description: "A list of 4 popular, large-cap Indian stocks for a default watchlist.",
                            items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, ticker: { type: Type.STRING }, price: { type: Type.STRING }, changePercent: { type: Type.STRING }, isPositive: { type: Type.BOOLEAN } } }
                        },
                        topGainers: {
                            type: Type.ARRAY, description: "A list of 1-2 top gaining stocks for the day.",
                            items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, ticker: { type: Type.STRING }, price: { type: Type.STRING }, changePercent: { type: Type.STRING }, isPositive: { type: Type.BOOLEAN } } }
                        },
                        popularCryptos: {
                            type: Type.ARRAY, description: "A list of 4 major cryptocurrencies: Bitcoin, Ethereum, Solana, and Ripple (XRP).",
                            items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, ticker: { type: Type.STRING }, price: { type: Type.STRING }, changePercent: { type: Type.STRING }, isPositive: { type: Type.BOOLEAN } } }
                        }
                    }
                };

                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: "Act as a world-class financial analyst. Provide a comprehensive, up-to-date market overview for today focusing on the Indian markets (NSE, BSE) but also including major global indices and cryptocurrencies. Your response must be in a JSON format that strictly adheres to the provided schema. Populate all fields with realistic, current-style data and analysis. The market summary should be insightful and cover recent trends, key sector movements, and the overall market sentiment.",
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: marketDataSchema,
                    },
                });
                
                const data = JSON.parse(response.text);
                setMarketData(data);

            } catch (err) {
                console.error("Error fetching financial data from Gemini:", err);
                setError(err instanceof Error ? err.message : "An unknown error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchMarketData();
    }, []);
    
    const renderLoadingState = () => (
        <main className="max-w-screen-xl mx-auto p-4 lg:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <SkeletonCard height="h-32" />
                        <SkeletonCard height="h-32" />
                        <SkeletonCard height="h-32" />
                        <SkeletonCard height="h-32" />
                    </div>
                    <div className="bg-card p-6 rounded-xl shadow-sm space-y-6">
                        <SkeletonText width="w-1/3" />
                        <div className="space-y-2"><SkeletonText width="w-full" /><SkeletonText width="w-5/6" /></div>
                        <div className="space-y-2"><SkeletonText width="w-full" /><SkeletonText width="w-full" /><SkeletonText width="w-3/4" /></div>
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <SkeletonCard height="h-48" />
                    <SkeletonCard height="h-32" />
                    <SkeletonCard height="h-48" />
                </div>
            </div>
        </main>
    );

    if (loading) {
        return (
            <div className="bg-background min-h-screen font-sans">
                <header className="bg-card border-b border-border p-4">
                     <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                         <div className="text-sm font-semibold text-text-secondary">AI Finance &gt; Market Overview</div>
                         <div className="w-full max-w-md h-10 bg-background rounded-lg animate-pulse"></div>
                     </div>
                </header>
                {renderLoadingState()}
            </div>
        );
    }
    
    if (error) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-center p-4">
            <div>
                <h2 className="text-xl font-bold text-red-600">Failed to Load Market Data</h2>
                <p className="text-text-secondary mt-2">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-primary text-white font-semibold rounded-lg">Retry</button>
            </div>
        </div>
    }

    return (
        <div className="bg-background min-h-screen font-sans text-text-main">
            <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
                <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => onNavigate('/home')} className="p-2 -ml-2 rounded-full hover:bg-background" aria-label="Go back to home">
                            <ChevronRight size={22} className="text-text-secondary transform rotate-180" />
                        </button>
                        <p className="text-sm font-semibold text-text-secondary hidden md:block">AI Finance &gt; Market Overview</p>
                    </div>

                    <div className="relative w-full max-w-md">
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input type="text" placeholder="Search for companies, tickers, or crypto" className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>

                    <div className="hidden md:flex items-center space-x-2">
                        <button className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-background text-sm font-semibold text-text-main"><Bell size={16}/><span>Price Alert</span></button>
                    </div>
                </div>
            </header>
            
            <main className="max-w-screen-xl mx-auto p-4 lg:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center space-x-4">
                             <div className="flex items-center p-1 bg-border rounded-lg">
                                 <button className="px-3 py-1 bg-card rounded-md text-sm font-semibold shadow-sm text-text-main">India Markets</button>
                                 <button className="px-3 py-1 text-text-secondary rounded-md text-sm font-semibold">Crypto</button>
                            </div>
                            <p className="text-sm text-text-secondary">Market Closed</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {marketData?.marketIndices.map(index => <MarketIndexCard key={index.name} index={index} />)}
                        </div>

                        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                            <h2 className="text-lg font-bold mb-4">Market Summary</h2>
                            <div className="space-y-4">
                                {marketData?.marketSummary.map(item => (
                                    <div key={item.title}>
                                        <h3 className="font-bold text-md mb-1">{item.title}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">{item.summary}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-card p-2 rounded-xl border border-border shadow-sm">
                            <input type="text" placeholder="Ask any question about finance" className="w-full bg-transparent p-2 focus:outline-none placeholder-text-secondary" />
                        </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                         <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                            <h2 className="text-lg font-bold mb-2">Create Watchlist</h2>
                             <div className="divide-y divide-border">
                                {marketData?.watchlist.map(stock => (
                                    <div key={stock.ticker} className="flex items-center justify-between py-2 group">
                                        <StockListItem stock={stock} icon={<div className="font-bold text-text-secondary text-xs">{stock.name.charAt(0)}</div>} />
                                        <button className="p-1.5 rounded-full bg-background text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity"><Plus size={16} /></button>
                                    </div>
                                ))}
                             </div>
                        </div>
                        
                        <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                            <h2 className="text-lg font-bold mb-2">Top Gainers</h2>
                             <div className="divide-y divide-border">
                                {marketData?.topGainers.map(stock => <StockListItem key={stock.ticker} stock={stock} icon={<div className="font-bold text-text-secondary text-xs">{stock.name.charAt(0)}</div>} />)}
                            </div>
                        </div>

                        <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                            <h2 className="text-lg font-bold mb-2">Popular Cryptocurrencies</h2>
                             <div className="divide-y divide-border">
                                {marketData?.popularCryptos.map(crypto => <StockListItem key={crypto.ticker} stock={crypto} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FinanceView;
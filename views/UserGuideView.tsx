import React from 'react';
import { ChevronRight } from '../components/common/Icons';

interface UserGuideViewProps {
    onNavigate: (path: string) => void;
}

const UserGuideView: React.FC<UserGuideViewProps> = ({ onNavigate }) => {
    return (
        <div className="bg-background min-h-screen font-sans text-text-main">
            <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-sm shadow-sm p-3 border-b border-border">
                <div className="max-w-4xl mx-auto flex items-center">
                    <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-background" aria-label="Go back">
                        <ChevronRight size={22} className="text-text-secondary transform rotate-180" />
                    </button>
                    <h1 className="text-lg font-semibold text-text-main ml-2">Application User Guide</h1>
                </div>
            </header>
            <main className="p-4 md:p-6 prose dark:prose-invert max-w-4xl mx-auto prose-p:text-text-secondary prose-h2:text-text-main prose-h3:text-text-main prose-strong:text-text-main prose-li:text-text-secondary prose-headings:font-bold">
                <h1>Welcome to OptionsBullTrading!</h1>
                <p>This guide will walk you through all the features of your new trading education platform, helping you get the most out of your journey to becoming a profitable trader.</p>

                <h2>1. The Dashboard: Your Command Center</h2>
                <p>The first screen you see after logging in is your personal dashboard. It's designed to give you quick access to all the most important features of the app.</p>
                <h3>Quick Actions</h3>
                <ul>
                    <li><strong>Free Group:</strong> Join our free Telegram group to connect with other traders.</li>
                    <li><strong>Library:</strong> Jump straight into the Learning Library to continue your studies.</li>
                    <li><strong>Web Sharing:</strong> Share the app with your friends.</li>
                    <li><strong>Subscribe Button:</strong> Your gateway to our premium subscription plans. This button features a live-scrolling candlestick animation.</li>
                </ul>
                <h3>Paper Trading</h3>
                <p>The large card in the middle of the dashboard is your direct link to the <strong>Market Simulator</strong>. This is where you can practice trading with virtual money in a risk-free environment.</p>
                <h3>Learning Library & AI Quiz</h3>
                <p>Below the main cards, you'll find quick links to all our learning modules and a card that takes you directly to the <strong>AI Smart Quiz</strong> to test your knowledge.</p>
                <h3>Your Progress</h3>
                <p>At the bottom of the dashboard, you'll find a summary of your progress, including lessons learned, tests passed, and your paper trading performance.</p>

                <h2>2. The Learning Library: Master the Markets</h2>
                <p>Accessible from the sidebar or the dashboard, the Learning Library is your structured curriculum for mastering the art of trading.</p>
                <ul>
                    <li><strong>Module 1: Basics:</strong> Start here to learn the fundamental concepts of stocks and markets.</li>
                    <li><strong>Bullish & Bearish Candlesticks:</strong> Dive deep into individual candlestick patterns to understand market psychology.</li>
                    <li><strong>Technical & Fundamental Analysis:</strong> Explore comprehensive libraries of indicators and analytical techniques.</li>
                </ul>
                <p>Click on any lesson to read the content. At the bottom of each lesson, you can click <strong>"Mark as Complete"</strong> to update your progress, which will be reflected on your dashboard.</p>

                <h2>3. The Market Simulator: Practice Makes Perfect</h2>
                <p>The Market Simulator is a high-fidelity environment that lets you trade with ₹1,00,000 of virtual cash using realistic, simulated market data for Bitcoin (BTCUSDT).</p>
                <h3>The Chart Interface</h3>
                <ul>
                    <li><strong>Selecting an Instrument:</strong> While BTCUSDT is the primary focus, you can see other instruments that will be available soon.</li>
                    <li><strong>Changing Timeframes:</strong> Use the buttons (1m, 5m, 15m, etc.) to change the chart's time resolution.</li>
                    <li><strong>Placing Trades:</strong> Use the prominent <strong>BUY</strong> and <strong>SELL</strong> buttons to open the order dialog. Enter your desired quantity and place a market order.</li>
                </ul>
                <h3>Managing Your Portfolio</h3>
                <p>At the bottom of the screen, you'll see a collapsed portfolio bar showing your key stats like Equity and P&L. <strong>Click this bar to expand the full portfolio panel.</strong></p>
                <ul>
                    <li><strong>Positions Tab:</strong> View all your open trades, including quantity, average price, and real-time P&L. You can click the "Close" button here to manage or close a position.</li>
                    <li><strong>History Tab:</strong> Review all your completed trades to analyze your performance.</li>
                    <li><strong>Resetting & Managing Funds:</strong> In the top right of the expanded panel, you can use the refresh icon to reset your entire portfolio back to its initial state. Use the pencil icon next to "Equity" to manually set your portfolio's cash value.</li>
                </ul>

                <h2>4. AI-Powered Features: Your Smart Assistant</h2>
                <p>This app integrates powerful AI features to enhance your learning and market analysis.</p>
                <h3>Live Market Assistant (AI Chat)</h3>
                <p>Navigate to "AI Chat" in the sidebar. Tap the microphone icon to start a real-time voice conversation with our AI trading coach. You can ask it to explain complex topics, discuss market sentiment, or walk through a trading scenario.</p>
                <h3>AI Finance Dashboard</h3>
                <p>The "AI Dashboard" provides a comprehensive, AI-generated overview of the current market, including major indices, market summaries, top gainers, and popular cryptocurrencies.</p>
                <h3>AI Smart Quiz</h3>
                <p>Accessed from the dashboard, the AI Smart Quiz allows you to test your knowledge on specific topics. The AI will generate a unique set of questions for you based on the category you choose.</p>

                <h2>5. Managing Your Profile & Settings</h2>
                <h3>Your Profile</h3>
                <p>Click on your user profile at the top of the sidebar to go to the Profile View. Here, you can:</p>
                <ul>
                    <li>View your subscription status.</li>
                    <li>Update your name and profile picture.</li>
                    <li>Access the app's policies (Privacy, Terms, etc.).</li>
                    <li>Log out of your account.</li>
                </ul>
                <h3>Dark/Light Mode</h3>
                <p>At the bottom of the sidebar, you'll find a Sun/Moon icon. Click this toggle to instantly switch the entire application between light and dark themes to suit your preference.</p>
            </main>
        </div>
    );
};

export default UserGuideView;
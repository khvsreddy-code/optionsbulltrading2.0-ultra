import React, { useState, useEffect } from 'react';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from './services/supabaseClient';
import type { View } from './types';

// Layout components
import Header from './components/layout/Header';
import BottomNavBar from './components/layout/BottomNavBar';
import SideDrawer from './components/layout/SideDrawer';

// View components
import HomeView from './views/HomeView';
import PricingView from './views/PricingView';
import PoliciesListView from './views/policies/PoliciesListView';
import CancellationRefundPolicyView from './views/policies/CancellationRefundPolicyView';
import TermsAndConditionsView from './views/policies/TermsAndConditionsView';
import ShippingPolicyView from './views/policies/ShippingPolicyView';
import PrivacyPolicyView from './views/policies/PrivacyPolicyView';
import ContactUsView from './views/policies/ContactUsView';
import LearningHomeView from './views/learning/LearningHomeView';
import LearningChapterView from './views/learning/LearningChapterView';
import PracticeView from './views/PracticeView';
import BullishPatternsListView from './views/learning/BullishPatternsListView';
import BearishPatternsListView from './views/learning/BearishPatternsListView';
import PatternDetailView from './views/learning/PatternDetailView';


// Auth components
import AuthLayout from './components/auth/AuthLayout';
import LoginScreen from './components/auth/LoginScreen';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<View>('home');
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
    const [activePatternId, setActivePatternId] = useState<string | null>(null);
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme');
        // Default to dark theme for the new look
        return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'dark';
    });

    useEffect(() => {
        // Apply theme class to the root element
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        // Using an async function inside useEffect to handle session fetching robustly.
        const fetchSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();

                // If Supabase returns an error, log it.
                if (error) {
                    console.error("Error fetching session:", error.message);
                }
                
                setSession(session);
                setUser(session?.user ?? null);
            } catch (error) {
                // Catch any other network-related or unexpected errors.
                console.error("An unexpected error occurred while fetching the session:", error);
            } finally {
                // IMPORTANT: Always stop loading, regardless of success or failure.
                setLoading(false);
            }
        };
        
        fetchSession();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (_event === 'SIGNED_IN') {
                setView('home'); // Reset to home view on sign-in
            }
        });

        // Cleanup subscription on unmount
        return () => subscription.unsubscribe();
    }, []);

    const handleNavigate = (newView: View, params?: { chapterId?: string; patternId?: string }) => {
        setView(newView);
        if (newView === 'learningChapter' && params?.chapterId) {
            setActiveChapterId(params.chapterId);
        } else if (newView !== 'learningChapter') {
            setActiveChapterId(null);
        }

        if (newView === 'patternDetail' && params?.patternId) {
            setActivePatternId(params.patternId);
        } else if (newView !== 'patternDetail') {
            setActivePatternId(null);
        }
        window.scrollTo(0, 0); // Scroll to top on navigation
        setDrawerOpen(false); // Close drawer on navigation
    };

    const renderView = () => {
        switch (view) {
            case 'home':
                return <HomeView onNavigate={handleNavigate} />;
            case 'pricing':
                return <PricingView onNavigate={handleNavigate} user={user} />;
            case 'policiesList':
                return <PoliciesListView onNavigate={handleNavigate} />;
            case 'cancellation':
                return <CancellationRefundPolicyView onNavigate={handleNavigate} />;
            case 'terms':
                return <TermsAndConditionsView onNavigate={handleNavigate} />;
            case 'shipping':
                return <ShippingPolicyView onNavigate={handleNavigate} />;
            case 'privacy':
                return <PrivacyPolicyView onNavigate={handleNavigate} />;
            case 'contact':
                return <ContactUsView onNavigate={handleNavigate} />;
            case 'learningHome':
                return <LearningHomeView onNavigate={handleNavigate} />;
            case 'learningChapter':
                return <LearningChapterView onNavigate={handleNavigate} chapterId={activeChapterId} />;
            case 'bullishPatternsList':
                return <BullishPatternsListView onNavigate={handleNavigate} />;
            case 'bearishPatternsList':
                return <BearishPatternsListView onNavigate={handleNavigate} />;
            case 'patternDetail':
                return <PatternDetailView onNavigate={handleNavigate} patternId={activePatternId} />;
            case 'practice':
                return <PracticeView onNavigate={handleNavigate} theme={theme} />;
            case 'profile':
                return <HomeView onNavigate={handleNavigate} />; // Placeholder for Profile view
            default:
                return <HomeView onNavigate={handleNavigate} />;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-sky-50 dark:bg-slate-900">
                <svg className="animate-spin h-8 w-8 text-blue-500 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }
    
    if (!session) {
        return (
            <AuthLayout>
                <LoginScreen />
            </AuthLayout>
        );
    }
    
    // For certain views, we use a different layout without the standard header/navbar
    const noLayoutViews: View[] = ['learningHome', 'learningChapter', 'practice', 'bullishPatternsList', 'bearishPatternsList', 'patternDetail'];
    if (noLayoutViews.includes(view)) {
        return renderView();
    }

    return (
        <div className="relative min-h-screen bg-sky-50 dark:bg-slate-900 font-sans transition-colors duration-300">
            <SideDrawer
                isOpen={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}
                user={user}
                onNavigate={handleNavigate}
                theme={theme}
                toggleTheme={toggleTheme}
            />
            <div className="flex flex-col min-h-screen">
                <Header user={user} />
                <main className="flex-grow pb-16">
                    {renderView()}
                </main>
                <BottomNavBar
                    activeTab={view}
                    onTabChange={handleNavigate}
                    onMenuClick={() => setDrawerOpen(true)}
                />
            </div>
        </div>
    );
};

export default App;
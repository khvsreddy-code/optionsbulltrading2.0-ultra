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
import TechnicalIndicatorsListView from './views/learning/TechnicalIndicatorsListView';


// Auth components
import AuthLayout from './components/auth/AuthLayout';
import LoginScreen from './components/auth/LoginScreen';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    
    // --- NEW: Routing State Management ---
    const [location, setLocation] = useState(window.location.hash.slice(1) || '/home');

    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme');
        return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'dark';
    });

    useEffect(() => {
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
    
    // --- NEW: Effect to handle browser history events ---
    useEffect(() => {
        const handleHashChange = () => {
            setLocation(window.location.hash.slice(1) || '/home');
            window.scrollTo(0, 0); // Scroll to top on navigation
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);


    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) console.error("Error fetching session:", error.message);
                setSession(session);
                setUser(session?.user ?? null);
            } catch (error) {
                console.error("An unexpected error occurred while fetching the session:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (_event === 'SIGNED_IN') {
                handleNavigate('/home'); // Reset to home view on sign-in
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // --- NEW: Path-based navigation function ---
    const handleNavigate = (path: string) => {
        window.location.hash = path;
        setDrawerOpen(false); // Close drawer on navigation
    };
    
    // --- NEW: Derive view and params from the location state ---
    const parseLocation = () => {
        const parts = location.split('/').filter(Boolean);
        let view: View = 'home';
        let activeChapterId: string | null = null;
        let activePatternId: string | null = null;

        if (parts[0] === 'pricing') view = 'pricing';
        else if (parts[0] === 'practice') view = 'practice';
        else if (parts[0] === 'profile') view = 'profile';
        else if (parts[0] === 'policies') {
            switch (parts[1]) {
                case 'cancellation': view = 'cancellation'; break;
                case 'terms': view = 'terms'; break;
                case 'shipping': view = 'shipping'; break;
                case 'privacy': view = 'privacy'; break;
                case 'contact': view = 'contact'; break;
                default: view = 'policiesList';
            }
        } else if (parts[0] === 'learning') {
            if (parts.length === 1) view = 'learningHome';
            else if (parts[1] === 'chapter' && parts[2]) {
                view = 'learningChapter';
                activeChapterId = parts[2];
            } else if (parts[1] === 'bullish') view = 'bullishPatternsList';
            else if (parts[1] === 'bearish') view = 'bearishPatternsList';
            else if (parts[1] === 'indicators') view = 'technicalIndicatorsList';
            else if (parts[1] === 'pattern' && parts[2]) {
                view = 'patternDetail';
                activePatternId = parts[2];
            } else view = 'learningHome';
        } else {
            view = 'home';
        }
        return { view, activeChapterId, activePatternId };
    };

    const { view, activeChapterId, activePatternId } = parseLocation();


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
            case 'technicalIndicatorsList':
                return <TechnicalIndicatorsListView onNavigate={handleNavigate} />;
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
    
    const noLayoutViews: View[] = ['learningHome', 'learningChapter', 'practice', 'bullishPatternsList', 'bearishPatternsList', 'patternDetail', 'policiesList', 'cancellation', 'terms', 'shipping', 'privacy', 'contact', 'technicalIndicatorsList'];
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
                    activeView={view}
                    onTabChange={handleNavigate}
                    onMenuClick={() => setDrawerOpen(true)}
                />
            </div>
        </div>
    );
};

export default App;
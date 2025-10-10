import React, { useState, useEffect, lazy, Suspense } from 'react';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from './services/supabaseClient';
import type { View } from './types';

// Layout components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import ProfileView from './views/ProfileView'; // Import the actual ProfileView

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
import FundamentalAnalysisListView from './views/learning/FundamentalAnalysisListView';
import LearningModuleDetailView from './views/learning/LearningModuleDetailView';
import ChatView from './views/ChatView';
import { Star } from './components/common/Icons';

// Auth components
import AuthLayout from './components/auth/AuthLayout';
import LoginScreen from './components/auth/LoginScreen';

// Lazily load quiz components to prevent startup crash
const QuizView = lazy(() => import('./views/quiz/QuizView'));
const QuizResultsView = lazy(() => import('./views/quiz/QuizResultsView'));


const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center min-h-screen bg-background">
        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);


const App: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const [location, setLocation] = useState(window.location.hash.slice(1) || '/home');

    useEffect(() => {
        const handleHashChange = () => {
            setLocation(window.location.hash.slice(1) || '/home');
            window.scrollTo(0, 0);
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
                handleNavigate('/home');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleNavigate = (path: string) => {
        window.location.hash = path;
        setIsSidebarOpen(false); // Close sidebar on navigation
    };
    
    const parseLocation = () => {
        const parts = location.split('/').filter(Boolean);
        let view: View = 'home';
        let activeChapterId: string | null = null;
        let activePatternId: string | null = null;
        let activeModuleId: string | null = null;

        if (parts[0] === 'pricing') view = 'pricing';
        else if (parts[0] === 'practice') view = 'practice';
        else if (parts[0] === 'profile') view = 'profile';
        else if (parts[0] === 'chat') view = 'chat';
        else if (parts[0] === 'quiz') {
            if (parts[1] === 'results') view = 'quizResults';
            else view = 'quiz';
        }
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
            else if (parts[1] === 'module' && parts[2]) {
                view = 'learningModuleDetail';
                activeModuleId = parts[2];
            } else if (parts[1] === 'chapter' && parts[2]) {
                view = 'learningChapter';
                activeChapterId = parts[2];
            } else if (parts[1] === 'bullish') view = 'bullishPatternsList';
            else if (parts[1] === 'bearish') view = 'bearishPatternsList';
            else if (parts[1] === 'indicators') view = 'technicalIndicatorsList';
            else if (parts[1] === 'fundamental') view = 'fundamentalAnalysisList';
            else if (parts[1] === 'pattern' && parts[2]) {
                view = 'patternDetail';
                activePatternId = parts[2];
            } else view = 'learningHome';
        } else {
            view = 'home';
        }
        return { view, activeChapterId, activePatternId, activeModuleId };
    };

    const { view, activeChapterId, activePatternId, activeModuleId } = parseLocation();


    const renderView = () => {
        return (
            <div key={view}>
                {(() => {
                    switch (view) {
                        case 'home':
                            return <HomeView onNavigate={handleNavigate} user={user} />;
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
                        case 'learningModuleDetail':
                             return <LearningModuleDetailView onNavigate={handleNavigate} moduleId={activeModuleId} />;
                        case 'learningChapter':
                            return <LearningChapterView onNavigate={handleNavigate} chapterId={activeChapterId} />;
                        case 'bullishPatternsList':
                            return <BullishPatternsListView onNavigate={handleNavigate} />;
                        case 'bearishPatternsList':
                            return <BearishPatternsListView onNavigate={handleNavigate} />;
                        case 'technicalIndicatorsList':
                            return <TechnicalIndicatorsListView onNavigate={handleNavigate} />;
                        case 'fundamentalAnalysisList':
                            return <FundamentalAnalysisListView onNavigate={handleNavigate} />;
                        case 'patternDetail':
                            return <PatternDetailView onNavigate={handleNavigate} patternId={activePatternId} />;
                        case 'practice':
                            return <PracticeView onNavigate={handleNavigate} theme={'dark'} />; // Keep simulator dark
                        case 'profile':
                            return <ProfileView user={user} onNavigate={handleNavigate} />;
                        case 'chat':
                            return <ChatView onNavigate={handleNavigate} />;
                        case 'quiz':
                            return <Suspense fallback={<LoadingSpinner />}><QuizView onNavigate={handleNavigate} /></Suspense>;
                        case 'quizResults':
                            return <Suspense fallback={<LoadingSpinner />}><QuizResultsView onNavigate={handleNavigate} /></Suspense>;
                        default:
                            return <HomeView onNavigate={handleNavigate} user={user} />;
                    }
                })()}
            </div>
        );
    };

    if (loading) {
        return <LoadingSpinner />;
    }
    
    if (!session) {
        return (
            <AuthLayout>
                <LoginScreen />
            </AuthLayout>
        );
    }
    
    // Views that have their own full-page layout
    const noLayoutViews: View[] = ['practice', 'policiesList', 'cancellation', 'terms', 'shipping', 'privacy', 'contact', 'pricing', 'quiz', 'quizResults', 'chat'];
    if (noLayoutViews.includes(view)) {
        return renderView();
    }

    return (
        <div className="relative min-h-screen bg-background font-sans md:flex">
            {/* Mobile Sidebar Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            <Sidebar
                user={user}
                onNavigate={handleNavigate}
                activeView={view}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            <div className="flex-1 md:ml-64 flex flex-col">
                <Header 
                    user={user} 
                    onNavigate={handleNavigate}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />
                <main className="flex-grow">
                    {renderView()}
                </main>
            </div>
            
            <button
                onClick={() => handleNavigate('/chat')}
                className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-transform transform hover:scale-110 button-press-feedback"
                aria-label="Open AI Assistant"
            >
                <Star size={28} />
            </button>
        </div>
    );
};

export default App;
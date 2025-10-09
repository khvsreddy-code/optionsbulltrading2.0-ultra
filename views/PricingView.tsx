import React, { useRef, useEffect } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import PricingCard from '../components/pricing/PricingCard';
// FIX: Use a standard ES module import for animejs.
import anime from 'animejs';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PricingViewProps {
    onNavigate: (path: string) => void;
    user: SupabaseUser | null;
}

const plans = [
    {
        title: '1 month plan',
        price: 2999,
    },
    {
        title: '3 month plan',
        price: 8997,
        highlight: true,
    },
];

const PricingView: React.FC<PricingViewProps> = ({ onNavigate, user }) => {
    const viewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (viewRef.current) {
            anime({
                targets: viewRef.current.querySelectorAll('.anim-child'),
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(150),
                duration: 700,
                easing: 'easeOutCubic'
            });
        }
    }, []);
    
    const handleSubscribe = (plan: { title: string; price: number }) => {
        if (!user) {
            alert('Please sign in to subscribe.');
            return;
        }

        const options = {
            key: 'rzp_test_RQ5XAtXLTbM4dL', 
            amount: plan.price * 100, 
            currency: 'INR',
            name: 'Optionsbulltrading Inc.',
            description: `Subscription for ${plan.title}`,
            image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/Gemini_Generated_Image_e6q469e6q469e6q4.png',
            handler: function (response: any) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                console.log('Payment Response:', response);
            },
            prefill: {
                name: user.user_metadata?.full_name || 'Valued Customer',
                email: user.email,
                contact: '' 
            },
            notes: {
                plan_title: plan.title,
                user_id: user.id,
            },
            theme: {
                color: '#53AC53'
            }
        };
        
        if (window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.open();
        } else {
            alert('Payment gateway could not be loaded. Please check your connection and try again.');
        }
    };

    return (
        <div ref={viewRef} className="relative text-text-main min-h-screen flex flex-col items-center justify-center p-4 bg-background">
            <button 
                onClick={() => onNavigate('/home')}
                className="absolute top-4 left-4 z-20 text-text-secondary font-semibold text-sm hover:underline anim-child"
            >
                &lt; Back to Home
            </button>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <header className="anim-child">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight text-text-main">Plans for every level of ambition</h1>
                    <p className="text-lg text-text-secondary mt-2">Start your journey to becoming a pro trader.</p>
                </header>

                <main className="mt-12 w-full">
                    <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 max-w-2xl mx-auto">
                        {plans.map(plan => (
                            <div className="anim-child w-full" key={plan.title}>
                                <PricingCard plan={plan} onSubscribe={handleSubscribe} />
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PricingView;
import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import PricingCard from '../components/pricing/PricingCard';

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
    },
];

const PricingView: React.FC<PricingViewProps> = ({ onNavigate, user }) => {
    
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
                color: '#0094D3'
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
        <div className="relative text-white min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-[#0e1121]">
            <div className="stars" aria-hidden="true"></div>
            <div className="twinkling" aria-hidden="true"></div>
            
            <button 
                onClick={() => onNavigate('/home')}
                className="absolute top-4 left-4 z-20 text-white font-semibold text-sm hover:underline"
            >
                &lt; Back to Home
            </button>

            <div className="relative z-10 max-w-7xl mx-auto text-center">
                <header>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">Plans for every level</h1>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">of ambition</h1>
                </header>

                <main className="mt-12">
                    <div className="flex flex-row items-stretch justify-center gap-2 md:gap-6">
                        {plans.map(plan => (
                            <PricingCard key={plan.title} plan={plan} onSubscribe={handleSubscribe} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PricingView;

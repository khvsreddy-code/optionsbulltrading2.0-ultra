import React, { useRef, useEffect, useState } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import PricingCard from '../components/pricing/PricingCard';
import PaymentCancelledDialog from '../components/pricing/PaymentCancelledDialog';
// FIX: Correctly import animejs to handle module interoperability issues.
import * as animejs from 'animejs';
const anime = (animejs as any).default;
import { supabase } from '../services/supabaseClient';
import { RAZORPAY_KEY_ID } from '../env';

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
        title: 'Basic Plan (1 Month)',
        price: 10,
        duration: 1, // Duration in months
        description: [
            'Access to premium learning and courses',
            'Access to daily chart analysis',
            'Access to upcoming stock events',
        ]
    },
    {
        title: 'Value Plan (3 Months)',
        price: 20,
        duration: 3,
        highlight: true,
        description: [
            'Access to every Basic Plan benefit',
            '24/7 live support',
            'Access to live post market and pre market news and reports',
            'Access to live market streaming',
        ]
    },
];

const PricingView: React.FC<PricingViewProps> = ({ onNavigate, user }) => {
    const viewRef = useRef<HTMLDivElement>(null);
    const [isCancelledDialogOpen, setIsCancelledDialogOpen] = useState(false);
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

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
    
    const handleSubscribe = async (plan: { title: string; price: number, duration: number }) => {
        if (!user) {
            alert('Please sign in to subscribe.');
            onNavigate('/home');
            return;
        }
        
        setLoadingPlan(plan.title);

        try {
            // Step 1: Create a secure order on the backend
            const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
                body: { 
                    amount: plan.price * 100, // Amount must be in paise
                    receipt: `receipt_user_${user.id}_${Date.now()}`,
                    key_id: RAZORPAY_KEY_ID, // Pass the public key ID to the function
                },
            });
            
            if (orderError) {
                console.error('Edge function returned an error:', orderError);
                // Try to extract a more specific error message from the function's response.
                let detailMessage = 'Please check the function logs in your Supabase dashboard for details.';
                if (orderError.context && typeof orderError.context === 'object' && 'error' in orderError.context) {
                    detailMessage = (orderError.context as any).error;
                }
                alert(`Could not initiate payment. The server-side function failed with the following message: "${detailMessage}"`);
                setLoadingPlan(null);
                return;
            }

            if (!orderData || !orderData.id) {
                console.error('Error creating Razorpay order: Invalid data returned from server', orderData);
                alert(`Could not initiate payment. The server did not return a valid order ID.`);
                setLoadingPlan(null);
                return;
            }

            // Step 2: Open Razorpay checkout with the secure order_id
            const options = {
                key: RAZORPAY_KEY_ID,
                amount: plan.price * 100, 
                currency: 'INR',
                name: 'Optionsbulltrading Inc.',
                description: `Subscription for ${plan.title}`,
                image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/Gemini_Generated_Image_e6q469e6q469e6q4.png',
                order_id: orderData.id,
                handler: async function (response: any) {
                    try {
                        // Step 3: Verify the payment on the backend
                        const { error: verificationError } = await supabase.functions.invoke('verify-payment', {
                            body: {
                                razorpay_payment_id: response.razorpay_payment_id,
                                order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                plan_duration_months: plan.duration,
                            },
                        });

                        if (verificationError) {
                            alert(`Payment verification failed: ${verificationError.message}`);
                        } else {
                            alert('Payment successful! Your subscription is now active.');
                            // On successful payment, redirect to the Telegram link.
                            window.location.href = 'https://t.me/+rbWNf4Ig_3o4MDA1';
                        }
                    } catch (verificationError: any) {
                         alert(`An error occurred during payment verification: ${verificationError.message}`);
                    } finally {
                        setLoadingPlan(null);
                    }
                },
                prefill: {
                    name: user.user_metadata?.full_name || 'Valued Customer',
                    email: user.email,
                },
                theme: {
                    color: '#53AC53'
                },
                modal: {
                    ondismiss: function() {
                        // Show cancelled dialog if user closes the modal
                        setIsCancelledDialogOpen(true);
                        setLoadingPlan(null);
                    }
                }
            };
            
            if (window.Razorpay) {
                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                alert('Payment gateway could not be loaded. Please check your connection and try again.');
                setLoadingPlan(null);
            }
        } catch (error: any) {
            console.error("Subscription process error:", error);
            alert(`An unexpected error occurred: ${error.message}`);
            setLoadingPlan(null);
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
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight text-text-main">Choose Your Plan</h1>
                    <p className="text-lg text-text-secondary mt-2">Start your journey to becoming a profitable trader today.</p>
                </header>

                <main className="mt-12 w-full">
                    <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 max-w-4xl mx-auto">
                        {plans.map(plan => (
                            <div className="anim-child w-full" key={plan.title}>
                                <PricingCard 
                                    plan={plan} 
                                    onSubscribe={handleSubscribe} 
                                    isLoading={loadingPlan === plan.title}
                                />
                            </div>
                        ))}
                    </div>
                </main>
            </div>
            
            <PaymentCancelledDialog 
                isOpen={isCancelledDialogOpen} 
                onClose={() => setIsCancelledDialogOpen(false)} 
            />
        </div>
    );
};

export default PricingView;
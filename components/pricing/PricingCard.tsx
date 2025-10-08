import React from 'react';

interface PricingPlan {
    title: string;
    price: number;
    highlight?: boolean;
}

interface PricingCardProps {
    plan: PricingPlan;
    onSubscribe: (plan: PricingPlan) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSubscribe }) => {
    return (
        <div className={`flex-1 flex flex-col justify-between min-w-0 bg-card p-6 rounded-2xl border-2 ${plan.highlight ? 'border-primary' : 'border-border'} transition-transform duration-300 hover:-translate-y-2 pro-card`}>
            <div>
                <h3 className="text-lg md:text-xl font-semibold text-text-main">{plan.title}</h3>
                <div className="mt-4">
                    <span className="text-3xl md:text-5xl font-bold text-text-main">₹{plan.price.toLocaleString('en-IN')}</span>
                </div>
            </div>
            <button 
                onClick={() => onSubscribe(plan)}
                className={`w-full py-2 md:py-3 mt-6 text-center font-semibold rounded-lg transition button-press-feedback text-sm md:text-base ${plan.highlight ? 'bg-primary text-white hover:bg-primary/90' : 'bg-primary-light text-primary hover:bg-blue-200'}`}>
                Subscribe
            </button>
        </div>
    );
};

export default PricingCard;
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
        <div className={`flex-1 flex flex-col justify-between min-w-0 bg-[#1c1f30]/50 p-3 md:p-6 rounded-[1.75rem] border ${plan.highlight ? 'border-purple-500' : 'border-gray-700'} transition-transform duration-300 hover:-translate-y-2`}>
            <div>
                <h3 className="text-lg md:text-xl font-semibold text-white">{plan.title}</h3>
                <div className="mt-4">
                    <span className="text-3xl md:text-5xl font-bold text-white">₹{plan.price.toLocaleString('en-IN')}</span>
                </div>
            </div>
            <button 
                onClick={() => onSubscribe(plan)}
                className="w-full py-2 md:py-3 mt-6 text-center font-semibold bg-white text-gray-900 rounded-lg transition button-press-feedback hover:bg-gray-200 text-sm md:text-base">
                Subscribe
            </button>
        </div>
    );
};

export default PricingCard;
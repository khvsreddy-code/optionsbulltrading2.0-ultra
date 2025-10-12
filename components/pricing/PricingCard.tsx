import React from 'react';
import { CheckCircle } from '../common/Icons';

interface PricingCardProps {
    plan: any;
    onSubscribe: (plan: any) => void;
    isLoading: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSubscribe, isLoading }) => {
    return (
        <div className={`flex-1 flex flex-col justify-between min-w-0 bg-card p-6 rounded-2xl border-2 ${plan.highlight ? 'border-primary' : 'border-border'} transition-transform duration-300 hover:-translate-y-2 pro-card`}>
            <div>
                <h3 className="text-lg md:text-xl font-semibold text-text-main">{plan.title}</h3>
                <div className="mt-4 flex items-baseline gap-x-2">
                    <span className="text-3xl md:text-5xl font-bold text-text-main">₹{plan.price.toLocaleString('en-IN')}</span>
                    {plan.originalPrice && (
                        <span className="text-lg md:text-xl font-medium text-text-secondary line-through">₹{plan.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                </div>
                 <ul className="mt-6 space-y-3 text-left">
                    {plan.description.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle size={20} className="text-primary flex-shrink-0 mr-3 mt-0.5" />
                            <span className="text-text-secondary">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <button 
                onClick={() => onSubscribe(plan)}
                disabled={isLoading}
                className={`w-full py-2 md:py-3 mt-8 text-center font-semibold rounded-lg transition button-press-feedback text-sm md:text-base ${plan.highlight ? 'bg-primary text-white hover:bg-primary/90' : 'bg-primary-light text-primary hover:bg-blue-200'} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                    </div>
                ) : 'Subscribe'}
            </button>
        </div>
    );
};

export default PricingCard;
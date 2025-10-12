import React from 'react';
import type { Portfolio } from '../../types';
import { ChevronUp } from '../common/Icons';

interface PortfolioBarProps {
  portfolio: Portfolio;
  onOpen: () => void;
}

const PortfolioBar: React.FC<PortfolioBarProps> = ({ portfolio, onOpen }) => {
    const totalPnl = portfolio.positions.reduce((acc, pos) => acc + pos.pnl, 0);
    const pnlColor = totalPnl >= 0 ? 'text-green-500' : 'text-red-500';

    return (
        <div className="flex-shrink-0 bg-background border-t border-border">
            <button 
                onClick={onOpen}
                className="w-full h-full flex items-center justify-between px-4 py-3"
                aria-label="Open portfolio details"
            >
                <div className="flex items-center space-x-6">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-sm text-text-secondary">Equity</span>
                        <span className="font-semibold font-mono text-base text-text-main">
                            ₹{portfolio.totalValue.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                    </div>
                     <div className="flex items-baseline space-x-2">
                        <span className="text-sm text-text-secondary">P&L</span>
                        <span className={`font-semibold font-mono text-base ${pnlColor}`}>
                            {(totalPnl >= 0 ? '+' : '') + totalPnl.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                    </div>
                </div>
                <div className="flex items-center text-text-main">
                    <ChevronUp size={24} />
                </div>
            </button>
        </div>
    );
};

export default PortfolioBar;
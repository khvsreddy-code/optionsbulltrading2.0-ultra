import React from 'react';
import type { Portfolio } from '../../types';
import { Pencil } from '../common/Icons';

interface PortfolioDisplayProps {
    portfolio: Portfolio;
    onManageFunds: () => void;
}

const PortfolioDisplay: React.FC<PortfolioDisplayProps> = ({ portfolio, onManageFunds }) => {
    const totalPnl = portfolio.positions.reduce((acc, pos) => acc + pos.pnl, 0);
    const pnlColor = totalPnl >= 0 ? 'text-green-500' : 'text-red-500';

    const StatItem: React.FC<{ label: string; value: string; color?: string; isCurrency?: boolean }> = ({ label, value, color, isCurrency = true }) => (
        <div className="flex items-baseline space-x-2">
            <span className="text-xs text-text-secondary">{label}</span>
            <span className={`font-semibold font-mono text-sm ${color || 'text-text-main'}`}>
                {isCurrency && '₹'}{value}
            </span>
        </div>
    );

    return (
        <div className="flex items-center space-x-4">
             <div className="flex items-center">
                <StatItem 
                    label="Equity" 
                    value={portfolio.totalValue.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})} 
                />
                 <button 
                    onClick={onManageFunds} 
                    className="ml-1.5 p-1 rounded-full text-slate-500 hover:bg-background hover:text-text-main transition-colors"
                    aria-label="Manage portfolio funds"
                >
                    <Pencil size={12} />
                </button>
            </div>
            <StatItem 
                label="Cash" 
                value={portfolio.cash.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})} 
            />
            <StatItem 
                label="P&L" 
                value={(totalPnl >= 0 ? '+' : '') + totalPnl.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                color={pnlColor}
            />
        </div>
    );
};

export default PortfolioDisplay;
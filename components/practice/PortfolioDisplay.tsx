import React from 'react';
import type { Portfolio } from '../../types';

interface PortfolioDisplayProps {
    portfolio: Portfolio;
}

const PortfolioDisplay: React.FC<PortfolioDisplayProps> = ({ portfolio }) => {
    const totalPnl = portfolio.positions.reduce((acc, pos) => acc + pos.pnl, 0);
    const pnlColor = totalPnl >= 0 ? 'text-green-500' : 'text-red-500';

    return (
        <div className="p-4 space-y-4">
            <div>
                <h3 className="text-sm font-medium text-slate-400">Total Equity</h3>
                <p className="text-2xl font-bold text-white">₹{portfolio.totalValue.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <h4 className="text-slate-400">Available Cash</h4>
                    <p className="text-white font-semibold">₹{portfolio.cash.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
                <div>
                    <h4 className="text-slate-400">Total P&L</h4>
                    <p className={`font-semibold ${pnlColor}`}>{totalPnl >= 0 ? '+' : ''}₹{totalPnl.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDisplay;

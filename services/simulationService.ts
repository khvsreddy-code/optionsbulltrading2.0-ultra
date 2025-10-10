import type { Order, Portfolio, Position, Trade } from '../types';
import { updateUserPnl } from './profileService';

const INITIAL_CASH = 100000; // Start with ₹1,00,000

export const createInitialPortfolio = (): Portfolio => ({
  cash: INITIAL_CASH,
  positions: [],
  totalValue: INITIAL_CASH,
  orders: [],
  trades: [],
});

/**
 * Executes a trade order and updates the portfolio. This version is re-architected to
 * handle both LONG and SHORT positions and generate detailed trade logs on close.
 * @param portfolio The current portfolio state.
 * @param order The order to be executed.
 * @param executionPrice The price at which the order is executed.
 * @returns The new, updated portfolio state.
 */
export const executeOrder = (portfolio: Portfolio, order: Order, executionPrice: number): Portfolio => {
    const newPortfolio = JSON.parse(JSON.stringify(portfolio));
    const { instrument, side, quantity } = order;
    const orderValue = quantity * executionPrice;

    const positionIndex = newPortfolio.positions.findIndex(
        (p: Position) => p.instrument.instrument_key === instrument.instrument_key
    );
    let existingPosition: Position | undefined = positionIndex > -1 ? newPortfolio.positions[positionIndex] : undefined;

    // --- LOGIC FOR CREATING TRADE RECORDS ON CLOSE ---
    if (existingPosition) {
        const isClosingLong = side === 'SELL' && existingPosition.quantity > 0;
        const isClosingShort = side === 'BUY' && existingPosition.quantity < 0;

        if (isClosingLong || isClosingShort) {
            const closedQty = Math.min(quantity, Math.abs(existingPosition.quantity));
            const realizedPnl = (executionPrice - existingPosition.averagePrice) * (isClosingLong ? closedQty : -closedQty);

            const newTrade: Trade = {
                id: `trade_${Date.now()}`,
                instrument: existingPosition.instrument,
                side: isClosingLong ? 'LONG' : 'SHORT',
                quantity: closedQty,
                entryPrice: existingPosition.averagePrice,
                exitPrice: executionPrice,
                realizedPnl: realizedPnl,
                entryTime: existingPosition.createdAt,
                exitTime: Date.now() / 1000,
            };
            newPortfolio.trades.unshift(newTrade);
            
            // NEW: Update persistent P&L in Supabase
            updateUserPnl(newTrade.realizedPnl);
        }
    }
    // --- END OF TRADE LOGIC ---


    if (!existingPosition) {
        // --- OPENING A NEW POSITION ---
        if (side === 'BUY') {
            if (newPortfolio.cash < orderValue) {
                console.error("Not enough cash for buy order.");
                return portfolio;
            }
            newPortfolio.cash -= orderValue;
            newPortfolio.positions.push({
                instrument: instrument,
                quantity: quantity, // Positive quantity for LONG
                averagePrice: executionPrice,
                lastPrice: executionPrice,
                pnl: 0, pnlPercent: 0,
                createdAt: Date.now() / 1000, // NEW
            });
        } else { // SELL (to open a short position)
            newPortfolio.cash += orderValue;
            newPortfolio.positions.push({
                instrument: instrument,
                quantity: -quantity, // Negative quantity for SHORT
                averagePrice: executionPrice,
                lastPrice: executionPrice,
                pnl: 0, pnlPercent: 0,
                createdAt: Date.now() / 1000, // NEW
            });
        }
    } else {
        // --- MODIFYING AN EXISTING POSITION ---
        const currentQty = existingPosition.quantity;

        if (side === 'BUY') {
            if (currentQty > 0) { // Add to a LONG position
                if (newPortfolio.cash < orderValue) return portfolio;
                const currentTotalValue = existingPosition.averagePrice * currentQty;
                const newTotalQuantity = currentQty + quantity;
                existingPosition.averagePrice = (currentTotalValue + orderValue) / newTotalQuantity;
                existingPosition.quantity = newTotalQuantity;
                newPortfolio.cash -= orderValue;
            } else { // Buy to cover/reduce a SHORT position
                newPortfolio.cash -= orderValue; // Paying to buy back shares
                existingPosition.quantity += quantity;
            }
        } else { // SELL
            if (currentQty > 0) { // Sell to reduce/close a LONG position
                newPortfolio.cash += orderValue;
                existingPosition.quantity -= quantity;
            } else { // Add to a SHORT position
                const currentTotalValue = existingPosition.averagePrice * Math.abs(currentQty);
                const newTotalQuantity = Math.abs(currentQty) + quantity;
                existingPosition.averagePrice = (currentTotalValue + orderValue) / newTotalQuantity;
                existingPosition.quantity -= quantity;
                newPortfolio.cash += orderValue;
            }
        }

        existingPosition.lastPrice = executionPrice;

        // If position is closed (quantity is 0), remove it from the array
        if (existingPosition.quantity === 0) {
            newPortfolio.positions.splice(positionIndex, 1);
        }
    }

    const executedOrder: Order = { 
        ...order, 
        status: 'EXECUTED', 
        executedAt: Date.now() / 1000, 
        executedPrice: executionPrice 
    };
    newPortfolio.orders.unshift(executedOrder);

    // Recalculate portfolio value immediately after the transaction
    return updatePortfolioValue(newPortfolio);
};


export const updatePortfolioValue = (portfolio: Portfolio, livePrices?: { [instrumentKey: string]: number }): Portfolio => {
    let positionsValue = 0;
    
    const newPortfolio = JSON.parse(JSON.stringify(portfolio));

    newPortfolio.positions.forEach((pos: Position) => {
        const currentPrice = livePrices && livePrices[pos.instrument.instrument_key] !== undefined ? livePrices[pos.instrument.instrument_key] : pos.lastPrice;
        
        // BUG FIX: Ensure all values are treated as numbers to prevent calculation errors.
        pos.lastPrice = Number(currentPrice);
        const priceDiff = Number(currentPrice) - Number(pos.averagePrice);
        const quantity = Number(pos.quantity);
        
        pos.pnl = priceDiff * quantity;
        
        // BUG FIX: Use Math.abs(quantity) for invested value to correctly calculate P&L % for short positions.
        const investedValue = Number(pos.averagePrice) * Math.abs(quantity);
        pos.pnlPercent = investedValue > 0 ? (pos.pnl / investedValue) * 100 : 0;

        positionsValue += pos.lastPrice * quantity;
    });

    newPortfolio.totalValue = newPortfolio.cash + positionsValue;
    return newPortfolio;
};

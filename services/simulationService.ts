import type { Order, Portfolio, Position } from '../types';

const INITIAL_CASH = 100000; // Start with ₹1,00,000

export const createInitialPortfolio = (): Portfolio => ({
  cash: INITIAL_CASH,
  positions: [],
  totalValue: INITIAL_CASH,
  orders: [],
});

/**
 * Executes a trade order and updates the portfolio. This version is re-architected to
 * handle both LONG and SHORT positions using a signed quantity.
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
            });
        } else { // SELL (to open a short position)
            newPortfolio.cash += orderValue;
            newPortfolio.positions.push({
                instrument: instrument,
                quantity: -quantity, // Negative quantity for SHORT
                averagePrice: executionPrice,
                lastPrice: executionPrice,
                pnl: 0, pnlPercent: 0,
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
        
        pos.lastPrice = currentPrice;
        // P&L calculation works for both long (positive qty) and short (negative qty)
        pos.pnl = (currentPrice - pos.averagePrice) * pos.quantity;
        
        // Correct P&L Percentage calculation for both long and short positions
        const investedValue = pos.averagePrice * Math.abs(pos.quantity);
        pos.pnlPercent = investedValue > 0 ? (pos.pnl / investedValue) * 100 : 0;

        // The market value of a position contributes to the total equity.
        // For shorts, this correctly subtracts the current value from the cash received.
        positionsValue += currentPrice * pos.quantity;
    });

    newPortfolio.totalValue = newPortfolio.cash + positionsValue;
    return newPortfolio;
};
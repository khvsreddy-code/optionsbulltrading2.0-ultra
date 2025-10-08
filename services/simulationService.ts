import type { Order, Portfolio, Position } from '../types';

const INITIAL_CASH = 100000; // Start with ₹1,00,000

export const createInitialPortfolio = (): Portfolio => ({
  cash: INITIAL_CASH,
  positions: [],
  totalValue: INITIAL_CASH,
  orders: [],
});

/**
 * Executes a trade order and updates the portfolio. This version is refactored for clarity,
 * correctly handles adding to existing positions, and immediately updates position prices.
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

    if (side === 'BUY') {
        if (newPortfolio.cash < orderValue) {
            console.error("Not enough cash for buy order.");
            return portfolio; // Not enough funds, return original state
        }
        newPortfolio.cash -= orderValue;

        if (existingPosition) {
            // Add to existing position
            const currentTotalValue = existingPosition.averagePrice * existingPosition.quantity;
            const newTotalQuantity = existingPosition.quantity + quantity;
            existingPosition.averagePrice = (currentTotalValue + orderValue) / newTotalQuantity;
            existingPosition.quantity = newTotalQuantity;
            existingPosition.lastPrice = executionPrice; // Update last price immediately
        } else {
            // Create new position
            newPortfolio.positions.push({
                instrument: instrument,
                quantity: quantity,
                averagePrice: executionPrice,
                lastPrice: executionPrice,
                pnl: 0,
            });
        }
    } else { // SELL
        if (!existingPosition || existingPosition.quantity < quantity) {
            console.error("Not enough shares to sell or position does not exist.");
            return portfolio; // Can't sell what you don't own
        }
        
        newPortfolio.cash += orderValue;
        existingPosition.quantity -= quantity;
        existingPosition.lastPrice = executionPrice; // Update last price immediately

        if (existingPosition.quantity === 0) {
            // Remove position if all shares are sold
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
        pos.pnl = (currentPrice - pos.averagePrice) * pos.quantity;
        positionsValue += currentPrice * pos.quantity;
    });

    newPortfolio.totalValue = newPortfolio.cash + positionsValue;
    return newPortfolio;
};
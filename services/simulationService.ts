import type { Order, Portfolio, Position, OrderSide, OrderType, Instrument } from '../types';

const INITIAL_CASH = 100000; // Start with ₹1,00,000

export const createInitialPortfolio = (): Portfolio => ({
  cash: INITIAL_CASH,
  positions: [],
  totalValue: INITIAL_CASH,
  orders: [],
});

export const executeOrder = (portfolio: Portfolio, order: Order, executionPrice: number): Portfolio => {
    const newPortfolio = JSON.parse(JSON.stringify(portfolio));
    const orderCost = order.quantity * executionPrice;

    if (order.side === 'BUY') {
        if (newPortfolio.cash < orderCost) {
            console.error("Not enough cash to execute buy order.");
            // Mark order as failed/cancelled if we had such a status
            return portfolio; // Return original portfolio
        }
        newPortfolio.cash -= orderCost;

        const existingPositionIndex = newPortfolio.positions.findIndex(
            (p: Position) => p.instrument.instrument_key === order.instrument.instrument_key
        );

        if (existingPositionIndex > -1) {
            const pos = newPortfolio.positions[existingPositionIndex];
            const newTotalValue = pos.averagePrice * pos.quantity + orderCost;
            pos.quantity += order.quantity;
            pos.averagePrice = newTotalValue / pos.quantity;
        } else {
            newPortfolio.positions.push({
                instrument: order.instrument,
                quantity: order.quantity,
                averagePrice: executionPrice,
                lastPrice: executionPrice,
                pnl: 0,
            });
        }
    } else { // SELL
        const existingPositionIndex = newPortfolio.positions.findIndex(
            (p: Position) => p.instrument.instrument_key === order.instrument.instrument_key
        );
        if (existingPositionIndex === -1 || newPortfolio.positions[existingPositionIndex].quantity < order.quantity) {
             console.error("Cannot sell more shares than owned.");
             return portfolio;
        }

        newPortfolio.cash += orderCost;
        const pos = newPortfolio.positions[existingPositionIndex];
        pos.quantity -= order.quantity;

        // If all shares are sold, remove the position
        if (pos.quantity === 0) {
            newPortfolio.positions.splice(existingPositionIndex, 1);
        }
    }

    // Update order status
    // FIX: Corrected object property assignment. The property is 'executedPrice' and the value comes from the 'executionPrice' variable.
    const executedOrder = { ...order, status: 'EXECUTED', executedAt: Date.now() / 1000, executedPrice: executionPrice };
    newPortfolio.orders.unshift(executedOrder); // Add to beginning of orders list

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
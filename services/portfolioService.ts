import { supabase } from './supabaseClient';
import type { Portfolio } from '../types';
import { createInitialPortfolio } from './simulationService';

// The structure of the data returned from the service
interface PortfolioLoadResult {
    portfolio: Portfolio;
    lastUpdated: string;
}

/**
 * Loads the user's portfolio from Supabase.
 * If no portfolio exists, creates and saves an initial one.
 * @returns {Promise<PortfolioLoadResult>} The user's portfolio and the last updated timestamp.
 * @throws Will throw an error if the database call fails.
 */
export const loadPortfolio = async (): Promise<PortfolioLoadResult> => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            // No user logged in, return a temporary initial portfolio for guest sessions
            console.warn("No user session found. Using a temporary portfolio.");
            return { portfolio: createInitialPortfolio(), lastUpdated: new Date().toISOString() };
        }

        const { data, error } = await supabase
            .from('simulator_portfolios')
            .select('portfolio_data, updated_at')
            .eq('user_id', user.id)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 means no row was found
            console.error('Error loading portfolio:', error);
            throw error; // Propagate the error
        }

        if (data && data.portfolio_data) {
            // Portfolio found, return it
            return { portfolio: data.portfolio_data as Portfolio, lastUpdated: data.updated_at };
        } else {
            // No portfolio found for this user, create a new one
            console.log("No existing portfolio found. Creating a new one.");
            const initialPortfolio = createInitialPortfolio();
            const { error: insertError } = await supabase
                .from('simulator_portfolios')
                .insert({
                    user_id: user.id,
                    portfolio_data: initialPortfolio,
                });
            
            if (insertError) {
                console.error('Error creating initial portfolio:', insertError);
                throw insertError; // Propagate the error
            }
            return { portfolio: initialPortfolio, lastUpdated: new Date().toISOString() };
        }
    } catch (e) {
        console.error('An unexpected error occurred in loadPortfolio:', e);
        // Re-throw a user-friendly error so the UI can handle it
        throw new Error("Failed to load your portfolio from the database. Please check your connection and refresh.");
    }
};


/**
 * Saves the user's portfolio to Supabase.
 * @param {Portfolio} portfolio - The portfolio object to save.
 */
export const savePortfolio = async (portfolio: Portfolio): Promise<void> => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            // Cannot save if no user is logged in
            return;
        }
        
        const { error } = await supabase
            .from('simulator_portfolios')
            .upsert({
                user_id: user.id,
                portfolio_data: portfolio,
                updated_at: new Date().toISOString()
            });

        if (error) {
            console.error('Error saving portfolio:', error);
        }
    } catch (e) {
        console.error('An unexpected error occurred in savePortfolio:', e);
    }
};
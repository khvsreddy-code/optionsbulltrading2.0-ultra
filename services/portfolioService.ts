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
 * This function now performs strict session validation to prevent data loss.
 * @returns {Promise<PortfolioLoadResult>} The user's portfolio and the last updated timestamp.
 * @throws Will throw an error if the session is invalid or the database call fails.
 */
export const loadPortfolio = async (): Promise<PortfolioLoadResult> => {
    try {
        // Step 1: Perform a strict, explicit check for a valid session.
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.error("Authentication error during portfolio load:", sessionError);
            // Throw a specific error if auth fails. This prevents the "guest portfolio" issue and data loss.
            throw new Error("Your session is invalid. Please refresh the page or try logging in again.");
        }

        const user = session.user;

        // Step 2: Attempt to fetch the existing portfolio.
        const { data, error } = await supabase
            .from('simulator_portfolios')
            .select('portfolio_data, updated_at')
            .eq('user_id', user.id)
            .single();

        // Handle database errors (but allow 'not found' errors).
        if (error && error.code !== 'PGRST116') { // PGRST116 means no row was found
            console.error('Error loading portfolio from database:', error);
            throw error; 
        }

        // Step 3: If a portfolio exists, return it.
        if (data && data.portfolio_data) {
            return { portfolio: data.portfolio_data as Portfolio, lastUpdated: data.updated_at };
        } 
        
        // Step 4: If no portfolio exists, create and save a new one.
        else {
            console.log("No existing portfolio found for user. Creating a new one.");
            const initialPortfolio = createInitialPortfolio();
            const { error: insertError } = await supabase
                .from('simulator_portfolios')
                .insert({
                    user_id: user.id,
                    portfolio_data: initialPortfolio,
                });
            
            if (insertError) {
                console.error('Error creating initial portfolio:', insertError);
                throw insertError; 
            }
            return { portfolio: initialPortfolio, lastUpdated: new Date().toISOString() };
        }
    } catch (e) {
        console.error('An unexpected error occurred in loadPortfolio:', e);
        // Pass a more specific error message to the UI if available.
        throw new Error(e.message || "Failed to load your portfolio from the database. Please check your connection and refresh.");
    }
};


/**
 * Saves the user's portfolio to Supabase with improved session checking.
 * @param {Portfolio} portfolio - The portfolio object to save.
 */
export const savePortfolio = async (portfolio: Portfolio): Promise<void> => {
    try {
        // Perform a strict session check before attempting to save.
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("Cannot save portfolio, no valid user session found.", sessionError);
            return; // Fail silently to not interrupt user with errors on background saves.
        }
        
        const user = session.user;

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

import { supabase } from './supabaseClient';
import { learningCurriculum } from '../data/learningContent';

const PROGRESS_STORAGE_KEY = 'optionsbull_learning_progress';

// Type for progress data
export type ProgressData = {
    [subChapterId: string]: boolean;
};

/**
 * Retrieves all learning progress data from localStorage.
 * @returns {ProgressData} An object mapping sub-chapter IDs to their completion status.
 */
export const getProgressData = (): ProgressData => {
    try {
        const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error("Error reading progress from localStorage", error);
        return {};
    }
};

/**
 * Checks if a specific sub-chapter has been marked as complete.
 * @param {string} subChapterId - The ID of the sub-chapter to check.
 * @returns {boolean} True if the sub-chapter is complete, false otherwise.
 */
export const isSubChapterComplete = (subChapterId: string): boolean => {
    const progress = getProgressData();
    return !!progress[subChapterId];
};

/**
 * Toggles the completion status for a sub-chapter and saves it to localStorage.
 * Dispatches a custom event to notify the app of the change.
 * @param {string} subChapterId - The ID of the sub-chapter to update.
 */
export const toggleSubChapterCompletion = (subChapterId: string): void => {
    const progress = getProgressData();
    progress[subChapterId] = !progress[subChapterId];
    try {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
        // Dispatch a custom event to notify other components of the change
        window.dispatchEvent(new CustomEvent('progressUpdated'));
    } catch (error) {
        console.error("Error saving progress to localStorage", error);
    }
};

/**
 * Calculates the number of completed sub-chapters for a given main chapter.
 * @param {string} chapterId - The ID of the main chapter.
 * @returns {number} The count of completed sub-chapters.
 */
export const getCompletedCountForChapter = (chapterId: string): number => {
    const chapter = learningCurriculum.find(c => c.id === chapterId);
    if (!chapter || !chapter.subChapters || chapter.subChapters.length === 0) {
        return 0;
    }

    const progress = getProgressData();
    return chapter.subChapters.filter(sc => progress[sc.id]).length;
};


/**
 * Fetches user-specific statistics like total P&L from the Supabase 'profiles' table.
 * @returns {Promise<{totalPnl: number}>} An object containing user stats.
 */
export const getUserStats = async (): Promise<{ totalPnl: number }> => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.log("No user session found for fetching stats.");
            return { totalPnl: 0 };
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('total_pnl')
            .eq('id', user.id)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116: row not found
            console.error("Error fetching user profile for stats:", error);
            return { totalPnl: 0 };
        }

        return { totalPnl: data?.total_pnl || 0 };
    } catch (e) {
        console.error("Unexpected error in getUserStats:", e);
        return { totalPnl: 0 };
    }
};

/**
 * Updates the user's total P&L in the Supabase 'profiles' table by a given amount.
 * Uses an RPC call for an atomic increment to prevent race conditions.
 * @param {number} pnlChange - The profit or loss from a closed trade.
 */
export const updateUserPnl = async (pnlChange: number): Promise<void> => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.log("No user session found for updating P&L.");
            return;
        }

        // We assume an RPC function `increment_pnl` exists in Supabase.
        // SQL: create function increment_pnl(user_id_in uuid, pnl_increment numeric) ...
        const { error } = await supabase.rpc('increment_pnl', {
            user_id_in: user.id,
            pnl_increment: pnlChange
        });

        if (error) {
            console.error("Error updating user P&L:", error);
        }
    } catch (e) {
        console.error("Unexpected error in updateUserPnl:", e);
    }
};
import { supabase } from './supabaseClient';
import { learningCurriculum } from '../data/learningContent';
import { bullishPatterns } from '../data/learning/bullishPatternsContent';
import { bearishPatterns } from '../data/learning/bearishPatternsContent';
import { technicalIndicators } from '../data/learning/technicalIndicatorsContent';
import { fundamentalAnalysisTopics } from '../data/learning/fundamentalAnalysisContent';

const PROGRESS_STORAGE_KEY = 'optionsbull_learning_progress';
// NEW: Storage key for test results
const TESTS_PROGRESS_STORAGE_KEY = 'optionsbull_tests_progress';

// Type for progress data
export type ProgressData = {
    [lessonId: string]: boolean;
};

// NEW: Type for test progress
export type TestProgressData = {
    [testId: string]: boolean; // true for passed
};


/**
 * Retrieves all learning progress data from localStorage.
 * @returns {ProgressData} An object mapping lesson IDs to their completion status.
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

// NEW: Function to get test progress data
const getTestProgressData = (): TestProgressData => {
    try {
        const data = localStorage.getItem(TESTS_PROGRESS_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error("Error reading test progress from localStorage", error);
        return {};
    }
};


/**
 * Checks if a specific lesson has been marked as complete.
 * @param {string} lessonId - The ID of the lesson to check.
 * @returns {boolean} True if the lesson is complete, false otherwise.
 */
export const isSubChapterComplete = (lessonId: string): boolean => {
    const progress = getProgressData();
    return !!progress[lessonId];
};

/**
 * Toggles the completion status for a lesson and saves it to localStorage.
 * Dispatches a custom event to notify the app of the change.
 * @param {string} lessonId - The ID of the lesson to update.
 */
export const toggleSubChapterCompletion = (lessonId: string): void => {
    const progress = getProgressData();
    progress[lessonId] = !progress[lessonId];
    try {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
        // Dispatch a custom event to notify other components of the change
        window.dispatchEvent(new CustomEvent('progressUpdated'));
    } catch (error) {
        console.error("Error saving progress to localStorage", error);
    }
};

/**
 * NEW: Calculates the total number of completed lessons across all modules.
 * @returns {number} The total count of completed lessons.
 */
export const getTotalCompletedLessons = (): number => {
    const progressData = getProgressData();
    // Simply count the number of 'true' entries.
    return Object.values(progressData).filter(Boolean).length;
};

/**
 * NEW: Calculates the total number of passed tests.
 * @returns {number} The total count of passed tests.
 */
export const getTestsPassedCount = (): number => {
    const testProgress = getTestProgressData();
    return Object.values(testProgress).filter(Boolean).length;
};

// NEW: (Placeholder for future use) Marks a test as passed.
export const markTestAsPassed = (testId: string): void => {
    const testProgress = getTestProgressData();
    testProgress[testId] = true;
    try {
        localStorage.setItem(TESTS_PROGRESS_STORAGE_KEY, JSON.stringify(testProgress));
        window.dispatchEvent(new CustomEvent('testProgressUpdated'));
    } catch (error) {
        console.error("Error saving test progress to localStorage", error);
    }
};


/**
 * NEW: Calculates completion counts for any given module.
 * @param {string} moduleId - The ID of the main module (e.g., 'ch1', 'ch3').
 * @returns {{completed: number, total: number}} The completed and total lesson counts.
 */
export const getModuleLessonCounts = (moduleId: string): { completed: number; total: number } => {
    let lessons: { id: string }[] = [];

    switch (moduleId) {
        case 'ch1':
            const basicsModule = learningCurriculum.find(c => c.id === 'ch1');
            lessons = basicsModule?.subChapters || [];
            break;
        case 'ch3':
            lessons = bullishPatterns;
            break;
        case 'ch4':
            lessons = bearishPatterns;
            break;
        case 'ch5':
            lessons = technicalIndicators;
            break;
        case 'ch6':
            lessons = fundamentalAnalysisTopics;
            break;
        default:
            return { completed: 0, total: 0 };
    }

    if (lessons.length === 0) {
        return { completed: 0, total: 0 };
    }

    const progress = getProgressData();
    const completed = lessons.filter(lesson => progress[lesson.id]).length;
    
    return { completed, total: lessons.length };
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
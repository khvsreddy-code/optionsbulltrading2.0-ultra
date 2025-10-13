
import { supabase } from './supabaseClient';
import { setProfileData } from './profileService';

import { learningCurriculum } from '../data/learningContent';
import { bullishPatterns } from '../data/learning/bullishPatternsContent';
import { bearishPatterns } from '../data/learning/bearishPatternsContent';
import { technicalIndicators } from '../data/learning/technicalIndicatorsContent';
import { fundamentalAnalysisTopics } from '../data/learning/fundamentalAnalysisContent';

const TESTS_PROGRESS_STORAGE_KEY = 'optionsbull_tests_progress';

// Type for test progress
export type TestProgressData = {
    [testId: string]: boolean; // true for passed
};

/**
 * DEFINITIVE FIX: Toggles the completion status for a lesson using a safe, partial upsert.
 * This non-destructive "read-modify-write" pattern prevents overwriting other profile data like the user's role.
 * @param {string} lessonId - The ID of the lesson to update.
 */
export const toggleSubChapterCompletion = async (lessonId: string): Promise<void> => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No session for toggleSubChapterCompletion");
            return;
        }

        // Step 1: READ only the necessary data.
        const { data: currentProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('progress_data')
            .eq('id', session.user.id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // Allow 'not found' error.
            throw fetchError;
        }

        // Step 2: MODIFY the progress data locally.
        const newProgress = { ...(currentProfile?.progress_data || {}) };
        newProgress[lessonId] = !newProgress[lessonId]; // Toggle the state.
        
        // Step 3 & 4: UPSERT only the changed data columns, leaving other columns (like 'role') untouched.
        const { data: updatedProfile, error: upsertError } = await supabase
            .from('profiles')
            .upsert({
                id: session.user.id, // The key for the upsert operation
                progress_data: newProgress,
                updated_at: new Date().toISOString(),
            })
            .select('*')
            .single();
            
        if (upsertError) throw upsertError;
        
        // Step 5: Update the central store with the guaranteed fresh full profile.
        if (updatedProfile) {
            setProfileData(updatedProfile);
        }
        
    } catch (error) {
        console.error("Error in toggleSubChapterCompletion:", error);
    }
};


// --- LOCAL STORAGE based functions for Quiz ---
const getTestProgressData = (): TestProgressData => {
    try {
        const data = localStorage.getItem(TESTS_PROGRESS_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error("Error reading test progress from localStorage", error);
        return {};
    }
};

export const getTestsPassedCount = (): number => {
    const testProgress = getTestProgressData();
    return Object.values(testProgress).filter(Boolean).length;
};

export const markTestAsPassed = (testId: string): void => {
    const testProgress = getTestProgressData();
    testProgress[testId] = true;
    try {
        localStorage.setItem(TESTS_PROGRESS_STORAGE_KEY, JSON.stringify(testProgress));
    } catch (error) {
        console.error("Error saving test progress to localStorage", error);
    }
};


// --- STATIC DATA calculation function ---
export const getTotalLessonCount = (): number => {
    const basicsLessons = learningCurriculum.find(c => c.id === 'ch1')?.subChapters.length || 0;
    const bullishLessons = bullishPatterns.length;
    const bearishLessons = bearishPatterns.length;
    const indicatorLessons = technicalIndicators.length;
    const fundamentalLessons = fundamentalAnalysisTopics.length;

    return basicsLessons + bullishLessons + bearishLessons + indicatorLessons + fundamentalLessons;
};

/**
 * DEFINITIVE FIX: Updates the user's total realized P&L using a safe, partial upsert.
 * This non-destructive approach ensures that only the 'total_pnl' field is modified,
 * preserving all other profile data such as the user's role.
 * @param {number} pnl - The P&L from the latest trade (can be positive or negative).
 */
export const updateUserPnl = async (pnl: number): Promise<void> => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No session for updateUserPnl");
            return;
        }
        
        // Step 1: READ only the PNL data.
        const { data: currentProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('total_pnl')
            .eq('id', session.user.id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // Allow 'not found' error.
            throw fetchError;
        }

        // Step 2: Calculate the new PNL.
        const newPnl = (currentProfile?.total_pnl || 0) + pnl;

        // Step 3 & 4: UPSERT only the changed data columns.
        const { data: updatedProfile, error: upsertError } = await supabase
            .from('profiles')
            .upsert({
                id: session.user.id,
                total_pnl: newPnl,
                updated_at: new Date().toISOString(),
            })
            .select('*')
            .single();
            
        if (upsertError) {
            console.error("Error updating user PNL:", upsertError);
            return;
        }
        
        // Step 5: Update the central store with the guaranteed fresh full profile.
        if (updatedProfile) {
            setProfileData(updatedProfile);
        }
    } catch (e) {
        console.error("Unexpected error in updateUserPnl:", e);
    }
};


import { supabase } from './supabaseClient';
import { setProfileData, getProfileState } from './profileService';

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
 * DEFINITIVE FIX: Toggles lesson completion using a safe, optimistic update pattern.
 * It reads the profile from the local state, writes only the changed data to the DB,
 * and then updates the local state directly, preventing any possibility of overwriting the role.
 * @param {string} lessonId - The ID of the lesson to update.
 */
export const toggleSubChapterCompletion = async (lessonId: string): Promise<void> => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No session for toggleSubChapterCompletion");
            return;
        }

        const currentProfile = getProfileState();
        if (!currentProfile) {
            console.error("Profile not loaded in state, cannot toggle completion.");
            return;
        }
        
        // Step 1: MODIFY the progress data locally.
        const newProgress = { ...(currentProfile.progress_data || {}) };
        newProgress[lessonId] = !newProgress[lessonId];
        
        // Step 2: UPDATE only the changed data in the database. This is non-destructive.
        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                progress_data: newProgress,
                updated_at: new Date().toISOString(),
            })
            .eq('id', session.user.id);
            
        if (updateError) {
            console.error("Failed to update lesson completion in DB:", updateError);
            // Optionally revert UI change here if needed, but for now we log the error.
            return;
        }
        
        // Step 3: Update the central state store optimistically.
        setProfileData({
            ...currentProfile,
            progress_data: newProgress,
        });
        
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
 * DEFINITIVE FIX: Updates the user's P&L using a safe, optimistic update pattern.
 * It reads from local state, writes only the 'total_pnl' to the DB, and updates
 * the local state directly, ensuring the user's role is never touched or overwritten.
 * @param {number} pnl - The P&L from the latest trade (can be positive or negative).
 */
export const updateUserPnl = async (pnl: number): Promise<void> => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No session for updateUserPnl");
            return;
        }
        
        const currentProfile = getProfileState();
        if (!currentProfile) {
            console.error("Profile not loaded in state, cannot update PNL.");
            return;
        }

        const newPnl = (currentProfile.total_pnl || 0) + pnl;

        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                total_pnl: newPnl,
                updated_at: new Date().toISOString(),
            })
            .eq('id', session.user.id);
            
        if (updateError) {
            console.error("Error updating user PNL in DB:", updateError);
            return;
        }
        
        // Optimistically update the central state
        setProfileData({
            ...currentProfile,
            total_pnl: newPnl,
        });

    } catch (e) {
        console.error("Unexpected error in updateUserPnl:", e);
    }
};

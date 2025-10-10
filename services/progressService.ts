
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

// This file is now for WRITE operations or STATIC calculations.
// READ operations on profile data should happen in components via the useProfileData hook.


/**
 * Toggles the completion status for a lesson and saves it to Supabase.
 * This version is architected to use `upsert` to be robust for new users,
 * fixing the primary progress-saving bug.
 * @param {string} lessonId - The ID of the lesson to update.
 */
export const toggleSubChapterCompletion = async (lessonId: string): Promise<void> => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No session for toggleSubChapterCompletion");
            return;
        }

        // 1. Fetch the LATEST progress data to handle the toggle logic correctly.
        const { data: currentProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('progress_data')
            .eq('id', session.user.id)
            .single();
        
        // Allow 'not found' error, as this is a valid state for a new user.
        if (fetchError && fetchError.code !== 'PGRST116') { 
            throw fetchError;
        }

        const currentProgress = currentProfile?.progress_data || {};
        
        // 2. Calculate the new state.
        const newProgress = {
            ...currentProgress,
            [lessonId]: !currentProgress[lessonId], // Toggle the state.
        };

        // 3. Use UPSERT instead of UPDATE. This is the critical bug fix.
        // It will create the profile with the first progress data if it doesn't exist.
        const { data: updatedProfile, error: upsertError } = await supabase
            .from('profiles')
            .upsert({ 
                id: session.user.id, 
                progress_data: newProgress 
            })
            .select('*') // Select the full, potentially newly created, profile
            .single();
            
        if (upsertError) throw upsertError;
        
        // 4. Directly update the central store with the guaranteed fresh data from the upsert.
        if (updatedProfile) {
            setProfileData({
                total_pnl: updatedProfile.total_pnl || 0,
                progress_data: updatedProfile.progress_data || {},
                subscription_status: updatedProfile.subscription_status || 'free',
                subscription_expires_at: updatedProfile.subscription_expires_at || null,
            });
        }
        
    } catch (error) {
        console.error("Error saving progress to Supabase", error);
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

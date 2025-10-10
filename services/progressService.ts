import { supabase } from './supabaseClient';
import { setProfileData, ProfileData } from './profileService';

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
 * DEFINITIVE FIX: Toggles the completion status for a lesson using a robust, full-object
 * "read-modify-write" pattern. This prevents data loss and avoids race conditions.
 * @param {string} lessonId - The ID of the lesson to update.
 */
export const toggleSubChapterCompletion = async (lessonId: string): Promise<void> => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No session for toggleSubChapterCompletion");
            return;
        }

        // Step 1: READ the entire latest profile.
        const { data: currentProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // Allow 'not found' for new users.
            throw fetchError;
        }

        // Step 2: MODIFY the progress data on the full profile object.
        const profileToUpdate: ProfileData = currentProfile || {
            id: session.user.id,
            total_pnl: 0,
            progress_data: {},
            subscription_status: 'free',
            subscription_expires_at: null,
        };
        
        const newProgress = { ...(profileToUpdate.progress_data || {}) };
        newProgress[lessonId] = !newProgress[lessonId]; // Toggle the state.
        
        profileToUpdate.progress_data = newProgress;
        profileToUpdate.updated_at = new Date().toISOString();


        // Step 3 & 4: UPSERT the entire object and get it back with .select().
        const { data: updatedProfile, error: upsertError } = await supabase
            .from('profiles')
            .upsert(profileToUpdate)
            .select('*')
            .single();
            
        if (upsertError) throw upsertError;
        
        // Step 5: Update the central store with the guaranteed fresh data.
        if (updatedProfile) {
            setProfileData(updatedProfile);
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
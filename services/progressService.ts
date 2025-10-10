import { supabase } from './supabaseClient';
import { getProfileData, invalidateUserProfileCache } from './profileService'; // <-- Import the new central function & invalidator

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

// Function to get test progress data (remains local for now)
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
 * @returns {Promise<boolean>} A promise that resolves to true if the lesson is complete.
 */
export const isSubChapterComplete = async (lessonId: string): Promise<boolean> => {
    const profile = await getProfileData();
    return !!profile.progress_data[lessonId];
};

/**
 * Toggles the completion status for a lesson and saves it to Supabase.
 * @param {string} lessonId - The ID of the lesson to update.
 */
export const toggleSubChapterCompletion = async (lessonId: string): Promise<void> => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No session for toggleSubChapterCompletion");
            return;
        }

        const currentProfile = await getProfileData();
        const newProgress = {
            ...currentProfile.progress_data,
            [lessonId]: !currentProfile.progress_data[lessonId],
        };

        const { error } = await supabase
            .from('profiles')
            .update({ progress_data: newProgress })
            .eq('id', session.user.id);
            
        if (error) throw error;
        
        invalidateUserProfileCache(); // Invalidate the cache to force a fresh fetch next time
        window.dispatchEvent(new CustomEvent('progressUpdated')); // Notify already-mounted components to refetch
    } catch (error) {
        console.error("Error saving progress to Supabase", error);
    }
};

/**
 * Calculates the total number of completed lessons.
 * @returns {Promise<number>} A promise that resolves to the total count of completed lessons.
 */
export const getTotalCompletedLessons = async (): Promise<number> => {
    const profile = await getProfileData();
    return Object.values(profile.progress_data).filter(Boolean).length;
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
        window.dispatchEvent(new CustomEvent('testProgressUpdated'));
    } catch (error) {
        console.error("Error saving test progress to localStorage", error);
    }
};

export const getTotalLessonCount = (): number => {
    const basicsLessons = learningCurriculum.find(c => c.id === 'ch1')?.subChapters.length || 0;
    const bullishLessons = bullishPatterns.length;
    const bearishLessons = bearishPatterns.length;
    const indicatorLessons = technicalIndicators.length;
    const fundamentalLessons = fundamentalAnalysisTopics.length;

    return basicsLessons + bullishLessons + bearishLessons + indicatorLessons + fundamentalLessons;
};

/**
 * Calculates completion counts for any given module.
 * @param {string} moduleId - The ID of the main module (e.g., 'ch1', 'ch3').
 * @returns {Promise<{completed: number, total: number}>} A promise resolving to completed/total counts.
 */
export const getModuleLessonCounts = async (moduleId: string): Promise<{ completed: number; total: number }> => {
    let lessons: { id: string }[] = [];

    switch (moduleId) {
        case 'ch1':
            lessons = learningCurriculum.find(c => c.id === 'ch1')?.subChapters || [];
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

    const profile = await getProfileData();
    const completed = lessons.filter(lesson => profile.progress_data[lesson.id]).length;
    
    return { completed, total: lessons.length };
};

// getUserStats and updateUserPnl have been moved to profileService.ts
// to consolidate all direct 'profiles' table interactions.
export { getProfileData, updateUserPnl } from './profileService';
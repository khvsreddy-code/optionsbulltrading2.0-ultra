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

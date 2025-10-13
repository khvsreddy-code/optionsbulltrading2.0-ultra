
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export interface ProfileData {
    id?: string;
    total_pnl: number;
    progress_data: { [lessonId: string]: boolean };
    subscription_status: 'free' | 'premium';
    subscription_expires_at: string | null;
    updated_at?: string;
    role?: 'user' | 'admin';
}

const defaultProfile: ProfileData = {
    total_pnl: 0,
    progress_data: {},
    subscription_status: 'free',
    subscription_expires_at: null,
    role: 'user',
};

// --- RE-ENGINEERED STATE MANAGEMENT LOGIC to prevent race conditions ---

let profileState: ProfileData | null = null;
let fetchStatus: 'idle' | 'loading' | 'loaded' = 'idle';
const listeners = new Set<() => void>();

const notify = () => {
    listeners.forEach(listener => listener());
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
};

export const setProfileData = (newProfile: ProfileData) => {
    profileState = newProfile;
    fetchStatus = 'loaded';
    notify();
};

export const clearProfileData = () => {
    profileState = null;
    fetchStatus = 'idle';
    notify();
};

/**
 * A robust, read-only function to fetch the user profile from the database.
 * It retries a few times to wait for a backend trigger to create the profile for a new user.
 * It NEVER writes or creates a profile, preventing role overwrites.
 * @param {string} userId - The ID of the user to fetch.
 * @param {number} retries - The number of retry attempts.
 * @returns {Promise<ProfileData | null>} The user's profile data or null if not found after retries.
 */
const fetchWithRetry = async (userId: string, retries: number): Promise<ProfileData | null> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (data) {
        return data as ProfileData;
    }

    // If profile not found, it might be a new user and the backend trigger is delayed.
    if (error && error.code === 'PGRST116' && retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms
        return fetchWithRetry(userId, retries - 1);
    }

    if (error && error.code !== 'PGRST116') {
        throw error; // A real database error occurred
    }

    // After all retries, if still not found, return null.
    return null;
};

/**
 * Fetches the complete profile for the currently authenticated user from Supabase.
 * This is now a READ-ONLY operation from the client's perspective to prevent data corruption.
 */
const fetchProfileFromDB = async (): Promise<ProfileData> => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No valid session for fetchProfileFromDB");
            return defaultProfile;
        }
        
        const userId = session.user.id;
        const profileData = await fetchWithRetry(userId, 3); // Retry 3 times over 1.5 seconds

        if (profileData) {
            return profileData;
        }

        // CRITICAL: If the profile is still not found, it indicates a backend issue
        // (e.g., the new user trigger failed). The client MUST NOT attempt to fix this
        // by creating a profile, as that was the source of the role-overwrite bug.
        // We log a clear error and return a temporary default profile to prevent the app
        // from crashing, but crucially, WE DO NOT WRITE ANYTHING to the database.
        console.error(
            `CRITICAL: Profile for user ${userId} not found after multiple retries. ` +
            `This may indicate a failed backend trigger for new user creation. ` +
            `Falling back to a temporary default profile to prevent a crash. The user's role and data will be incorrect until the backend profile is created.`
        );
        return { ...defaultProfile, id: userId };

    } catch (e) {
        console.error("Fatal error in fetchProfileFromDB:", e);
        return defaultProfile;
    }
};


export const forceRefetchProfileData = async () => {
    fetchStatus = 'loading';
    profileState = await fetchProfileFromDB();
    fetchStatus = 'loaded';
    notify();
};

export const useProfileData = (): ProfileData | null => {
    const [profile, setProfile] = useState(profileState);

    useEffect(() => {
        const unsubscribe = subscribe(() => {
            setProfile(profileState);
        });

        if (fetchStatus === 'idle') {
            forceRefetchProfileData();
        } else {
            setProfile(profileState);
        }
        
        return () => {
            unsubscribe();
        };
    }, []);

    return profile;
};

export const getProfileData = async (): Promise<ProfileData> => {
    if (fetchStatus === 'loaded' && profileState) {
        return profileState;
    }
    await forceRefetchProfileData();
    return profileState!;
};

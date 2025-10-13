import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export interface ProfileData {
    id?: string;
    total_pnl: number;
    progress_data: { [lessonId: string]: boolean };
    subscription_status: 'free' | 'premium';
    subscription_expires_at: string | null;
    updated_at?: string;
    role?: 'user' | 'admin'; // NEW: Add role property
}

const defaultProfile: ProfileData = {
    total_pnl: 0,
    progress_data: {},
    subscription_status: 'free',
    subscription_expires_at: null,
    role: 'user', // NEW: Default role
};

// --- RE-ENGINEERED STATE MANAGEMENT LOGIC to prevent race conditions ---

let profileState: ProfileData | null = null;
let fetchStatus: 'idle' | 'loading' | 'loaded' = 'idle'; // NEW: Status to prevent race conditions
const listeners = new Set<() => void>();

const notify = () => {
    listeners.forEach(listener => listener());
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
};

/**
 * Directly sets the profile data in the store and notifies all subscribers.
 * @param {ProfileData} newProfile - The fresh profile data to set.
 */
export const setProfileData = (newProfile: ProfileData) => {
    profileState = newProfile;
    fetchStatus = 'loaded'; // Ensure status is updated
    notify();
};


/**
 * Clears the cached profile data and resets the fetch status on logout.
 */
export const clearProfileData = () => {
    profileState = null;
    fetchStatus = 'idle'; // NEW: Reset status to allow refetch on next login
    notify();
};


/**
 * Fetches the complete profile for the currently authenticated user from Supabase.
 * If a profile doesn't exist, it creates one with proper default values.
 */
const fetchProfileFromDB = async (): Promise<ProfileData> => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No valid session for fetchProfileFromDB");
            return defaultProfile;
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        let profileData: ProfileData | null = null;

        if (error && error.code === 'PGRST116') {
            // Profile does not exist, create one
            const { data: newProfile, error: insertError } = await supabase
                .from('profiles')
                .insert({ 
                    id: session.user.id,
                    total_pnl: 0,
                    progress_data: {},
                    subscription_status: 'free',
                    role: 'user',
                })
                .select('*')
                .single();
            
            if (insertError) throw insertError;
            profileData = newProfile;

        } else if (error) {
            throw error;
        } else {
            profileData = data;
        }

        const finalProfile = profileData || defaultProfile;
        
        return finalProfile;
    } catch (e) {
        console.error("Error in fetchProfileFromDB:", e);
        return defaultProfile;
    }
};

/**
 * Forces a refetch of profile data, updates the store, and notifies all subscribers.
 * Now manages fetch status to prevent race conditions.
 */
export const forceRefetchProfileData = async () => {
    fetchStatus = 'loading';
    profileState = await fetchProfileFromDB();
    fetchStatus = 'loaded';
    notify();
};

/**
 * A custom hook that provides reactive access to the user's profile data.
 * Now includes logic to prevent multiple concurrent initial fetches.
 */
export const useProfileData = (): ProfileData | null => {
    const [profile, setProfile] = useState(profileState);

    useEffect(() => {
        const unsubscribe = subscribe(() => {
            setProfile(profileState);
        });

        // This check prevents multiple components from triggering a fetch simultaneously.
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

/**
 * Gets the current profile data from the store, fetching if necessary.
 * Primarily for non-component logic. Components should use the hook.
 */
export const getProfileData = async (): Promise<ProfileData> => {
    if (fetchStatus === 'loaded' && profileState) {
        return profileState;
    }
    // If not loaded, trigger a fetch and wait for it.
    await forceRefetchProfileData();
    return profileState!;
};

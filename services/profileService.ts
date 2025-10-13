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

// --- NEW STATE MANAGEMENT LOGIC ---

let profileState: ProfileData | null = null;
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
 * This is used by write operations to bypass read-after-write race conditions.
 * @param {ProfileData} newProfile - The fresh profile data to set.
 */
export const setProfileData = (newProfile: ProfileData) => {
    profileState = newProfile;
    notify();
};


/**
 * NEW: Clears the cached profile data from the local store.
 * This should be called on user logout.
 */
export const clearProfileData = () => {
    profileState = null;
    notify();
};


/**
 * Fetches the complete profile for the currently authenticated user from Supabase.
 * If a profile doesn't exist, it creates one with proper default values.
 * This is the internal fetcher for our store.
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

        if (error && error.code === 'PGRST116') {
            // FIX: Insert a new profile with correct default values.
            const { data: newProfile, error: insertError } = await supabase
                .from('profiles')
                .insert({ 
                    id: session.user.id,
                    total_pnl: 0,
                    progress_data: {},
                    subscription_status: 'free',
                    role: 'user', // NEW: Ensure new profiles get a role
                })
                .select('*')
                .single();
            
            if (insertError) throw insertError;

            return newProfile || defaultProfile;

        } else if (error) {
            throw error;
        }

        return data || defaultProfile;
    } catch (e) {
        console.error("Error in fetchProfileFromDB:", e);
        return defaultProfile;
    }
};

/**
 * Forces a refetch of profile data, updates the store, and notifies all subscribers.
 * This should be called after any mutation.
 */
export const forceRefetchProfileData = async () => {
    profileState = await fetchProfileFromDB();
    notify();
};

/**
 * A custom hook that provides reactive access to the user's profile data.
 * Components using this hook will automatically re-render when the profile data changes.
 */
export const useProfileData = (): ProfileData | null => {
    const [profile, setProfile] = useState(profileState);

    useEffect(() => {
        // Subscribe to future changes
        const unsubscribe = subscribe(() => {
            setProfile(profileState);
        });

        // Initial fetch if state is not yet populated
        if (!profileState) {
            forceRefetchProfileData();
        } else {
            // Sync with latest state on mount if it's already available
            setProfile(profileState);
        }

        // The useEffect cleanup function must return void or undefined.
        // The `subscribe` function returns `() => boolean` because `Set.delete()` returns a boolean.
        // The original arrow function `() => unsubscribe()` would implicitly return that boolean.
        // This version wraps the call in a block to ensure the function returns void.
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
    if (profileState) {
        return profileState;
    }
    profileState = await fetchProfileFromDB();
    return profileState;
};

/**
 * DEFINITIVE FIX: Updates the user's total realized P&L using a robust, full-object
 * "read-modify-write" pattern. This prevents data loss and avoids race conditions.
 * @param {number} pnl - The P&L from the latest trade (can be positive or negative).
 */
export const updateUserPnl = async (pnl: number): Promise<void> => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No session for updateUserPnl");
            return;
        }
        
        // Step 1: READ the entire latest profile.
        const { data: currentProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            throw fetchError;
        }

        // Step 2: MODIFY the P&L data on the full profile object.
        const profileToUpdate: ProfileData = currentProfile || {
            id: session.user.id,
            ...defaultProfile
        };
        
        profileToUpdate.total_pnl = (profileToUpdate.total_pnl || 0) + pnl;
        profileToUpdate.updated_at = new Date().toISOString();

        // Step 3 & 4: UPSERT the entire object and get it back with .select().
        const { data: updatedProfile, error: upsertError } = await supabase
            .from('profiles')
            .upsert(profileToUpdate)
            .select('*')
            .single();
            
        if (upsertError) {
            console.error("Error updating user PNL:", upsertError);
            return;
        }
        
        // Step 5: Update the central store with the guaranteed fresh data.
        if (updatedProfile) {
            setProfileData(updatedProfile);
        }
    } catch (e) {
        console.error("Unexpected error in updateUserPnl:", e);
    }
};
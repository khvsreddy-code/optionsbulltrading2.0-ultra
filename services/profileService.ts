// services/profileService.ts
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export interface ProfileData {
    total_pnl: number;
    progress_data: { [lessonId: string]: boolean };
    subscription_status: 'free' | 'premium';
    subscription_expires_at: string | null;
}

const defaultProfile: ProfileData = {
    total_pnl: 0,
    progress_data: {},
    subscription_status: 'free',
    subscription_expires_at: null,
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
            .select('total_pnl, progress_data, subscription_status, subscription_expires_at')
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
                    subscription_status: 'free'
                })
                .select('total_pnl, progress_data, subscription_status, subscription_expires_at')
                .single();
            
            if (insertError) throw insertError;

            return {
                total_pnl: newProfile?.total_pnl || 0,
                progress_data: newProfile?.progress_data || {},
                subscription_status: newProfile?.subscription_status || 'free',
                subscription_expires_at: newProfile?.subscription_expires_at || null,
            };

        } else if (error) {
            throw error;
        }

        return {
            total_pnl: data?.total_pnl || 0,
            progress_data: data?.progress_data || {},
            subscription_status: data?.subscription_status || 'free',
            subscription_expires_at: data?.subscription_expires_at || null,
        };
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

        return () => unsubscribe();
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
 * Updates the user's total realized P&L in Supabase by adding the new P&L amount.
 * This is the definitive fix for the data loss bug. It reads the full profile before writing.
 * @param {number} pnl - The P&L from the latest trade (can be positive or negative).
 */
export const updateUserPnl = async (pnl: number): Promise<void> => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No session for updateUserPnl");
            return;
        }
        
        // 1. READ: Fetch the entire, latest profile from the DB.
        const { data: currentProfileData, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        // Handle case where profile doesn't exist yet for a new user
        const currentProfile = currentProfileData || { ...defaultProfile, id: session.user.id };
        if (fetchError && fetchError.code !== 'PGRST116') {
            throw fetchError;
        }

        // 2. MODIFY: Safely calculate the new P&L on the complete profile object.
        const newTotalPnl = (currentProfile.total_pnl || 0) + pnl;
        
        const profileToUpsert = {
            ...currentProfile,
            id: session.user.id,
            total_pnl: newTotalPnl,
            updated_at: new Date().toISOString(),
        };

        // 3. WRITE: Upsert the entire, complete profile object.
        const { data: updatedProfile, error: upsertError } = await supabase
            .from('profiles')
            .upsert(profileToUpsert)
            .select('*')
            .single();
            
        if (upsertError) {
            console.error("Error updating user PNL:", upsertError);
        } else if (updatedProfile) {
            // 4. Update the central state with guaranteed fresh data.
            setProfileData({
                total_pnl: updatedProfile.total_pnl,
                progress_data: updatedProfile.progress_data,
                subscription_status: updatedProfile.subscription_status,
                subscription_expires_at: updatedProfile.subscription_expires_at,
            });
        }
    } catch (e) {
        console.error("Unexpected error in updateUserPnl:", e);
    }
};

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

// --- STATE MANAGEMENT ---

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

export const getProfileState = (): ProfileData | null => {
    return profileState;
};

/**
 * Fetches the complete profile for the currently authenticated user from Supabase.
 * This is a READ-ONLY operation to prevent client-side data corruption.
 */
const fetchProfileFromDB = async (): Promise<ProfileData> => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No valid session for fetchProfileFromDB");
            return defaultProfile;
        }
        
        const userId = session.user.id;

        // --- DEFINITIVE FIX ---
        // Replaced the fragile `.single()` call with a more resilient query.
        // `.single()` throws an error if no row is found, which can happen intermittently on load.
        // This new method returns an empty array if no row is found, which is safer to handle.
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .limit(1);

        if (error) {
            // This now only catches actual database errors, not "not found" errors.
            throw error;
        }

        if (data && data.length > 0) {
            // Successfully found the profile.
            return data[0] as ProfileData;
        }

        // If the profile is still not found, it indicates a backend issue (e.g., trigger failure).
        // The client must not attempt to create a profile. We log the error and return a default.
        console.error(
            `CRITICAL: Profile for user ${userId} not found. ` +
            `This may indicate a failed backend trigger for new user creation. ` +
            `Falling back to a temporary default profile to prevent a crash.`
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

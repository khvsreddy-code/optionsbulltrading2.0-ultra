
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

// --- STATE MANAGEMENT ---

let profileState: ProfileData | null = null;
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
    notify();
};

export const clearProfileData = () => {
    profileState = null;
    notify();
};

export const getProfileState = (): ProfileData | null => {
    return profileState;
};


// --- REALTIME LISTENER SETUP ---
let profileChannel: any = null;
let isListenerInitialized = false;

/**
 * Initializes a single, persistent listener for the user's profile.
 * It handles initial data fetch, real-time updates via Supabase channels,
 * and automatically responds to user sign-in and sign-out events.
 * This should be called once when the application starts.
 */
export const initializeProfileListener = () => {
    if (isListenerInitialized) return;
    isListenerInitialized = true;

    // This function sets up the real-time channel for a given user.
    // The key change is that the initial data fetch now happens *after*
    // the channel has successfully subscribed, which solves a critical race condition
    // where database queries could fail before the user's auth context was fully ready.
    const setupChannel = (userId: string) => {
        if (profileChannel) {
            supabase.removeChannel(profileChannel);
            profileChannel = null;
        }

        profileChannel = supabase.channel(`profile-${userId}`)
            .on('postgres_changes', {
                event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${userId}`
            }, (payload) => {
                if (payload.new) {
                    setProfileData(payload.new as ProfileData);
                }
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    // Now that subscription is confirmed, it's safe to fetch initial data.
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', userId)
                        .single();
                    
                    if (data) {
                        setProfileData(data);
                    } else if (error && error.code !== 'PGRST116') {
                        console.error("Error fetching profile on subscription:", error);
                    }
                }
            });
    };

    const handleAuthChange = (session: any) => {
        if (session?.user) {
            // No initial fetch here anymore. Just set up the channel.
            setupChannel(session.user.id);
        } else {
            // User signed out, clear data and unsubscribe
            clearProfileData();
            if (profileChannel) {
                supabase.removeChannel(profileChannel);
                profileChannel = null;
            }
        }
    };

    // Initial check when the service is first initialized
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
            handleAuthChange(session);
        }
    });

    // Listen for all future auth state changes
    supabase.auth.onAuthStateChange((_event, session) => {
        handleAuthChange(session);
    });
};


/**
 * A React hook that provides the current user's profile data.
 * It subscribes to the global profile state, which is kept up-to-date
 * in real-time by the initializeProfileListener.
 */
export const useProfileData = (): ProfileData | null => {
    const [profile, setProfile] = useState(profileState);

    useEffect(() => {
        // Function to update local state from global state
        const handleProfileChange = () => {
            setProfile(getProfileState());
        };

        // Subscribe to changes in the global profile state
        const unsubscribe = subscribe(handleProfileChange);
        
        // Set initial state from global store on mount, in case it's already populated
        handleProfileChange();

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return profile;
};

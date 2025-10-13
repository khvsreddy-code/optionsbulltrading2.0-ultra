
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

    const setupChannel = (userId: string) => {
        // Clean up existing channel if it's for a different user or doesn't exist
        if (profileChannel && profileChannel.topic !== `realtime:public:profiles:id=eq.${userId}`) {
            supabase.removeChannel(profileChannel);
            profileChannel = null;
        }

        if (!profileChannel) {
            profileChannel = supabase.channel(`profile-${userId}`)
                .on('postgres_changes', {
                    event: '*',
                    schema: 'public',
                    table: 'profiles',
                    filter: `id=eq.${userId}`
                }, (payload) => {
                    // On any change (INSERT for new users, UPDATE for existing), update the global state
                    if (payload.new) {
                        setProfileData(payload.new as ProfileData);
                    }
                })
                .subscribe();
        }
    };

    const handleAuthChange = async (session: any) => {
        if (session?.user) {
            const userId = session.user.id;
            
            // Perform initial fetch to get data immediately on load
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (data) {
                setProfileData(data);
            } else if (error && error.code !== 'PGRST116') { // PGRST116 = row not found
                console.error("Error fetching initial profile:", error);
            }
            // If profile is not found, we don't set a default. We wait for the realtime
            // INSERT event from the backend trigger, which solves the race condition.

            // Set up the realtime channel for this user
            setupChannel(userId);
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
        handleAuthChange(session);
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
        const unsubscribe = subscribe(() => {
            setProfile(profileState);
        });
        
        // Set initial state from global store on mount
        setProfile(profileState);

        return () => unsubscribe();
    }, []);

    return profile;
};

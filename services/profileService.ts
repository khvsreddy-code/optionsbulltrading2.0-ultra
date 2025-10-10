// services/profileService.ts
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

// --- NEW CACHING LOGIC ---
let userProfileCache: ProfileData | null = null;

/**
 * Invalidates the local user profile cache.
 * Should be called after any mutation to the profile data (e.g., updating progress, P&L, subscription).
 */
export const invalidateUserProfileCache = () => {
    userProfileCache = null;
};
// --- END NEW CACHING LOGIC ---


/**
 * Fetches the complete profile for the currently authenticated user.
 * If a profile doesn't exist, it creates one. This function now uses a cache.
 * @returns {Promise<ProfileData>} A promise that resolves to the user's complete profile data.
 */
export const getProfileData = async (): Promise<ProfileData> => {
    if (userProfileCache) {
        return userProfileCache;
    }
    
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No valid session for getProfileData");
            invalidateUserProfileCache();
            return defaultProfile;
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('total_pnl, progress_data, subscription_status, subscription_expires_at')
            .eq('id', session.user.id)
            .single();

        if (error && error.code === 'PGRST116') { // Case: Profile does not exist, create it.
            console.log("No profile found, creating a new one for user:", session.user.id);
            const { data: newProfile, error: insertError } = await supabase
                .from('profiles')
                .insert({ id: session.user.id })
                .select('total_pnl, progress_data, subscription_status, subscription_expires_at')
                .single();
            
            if (insertError) {
                console.error("Error creating new profile:", insertError);
                invalidateUserProfileCache();
                return defaultProfile; 
            }

            const createdProfileData = {
                total_pnl: newProfile?.total_pnl || 0,
                progress_data: newProfile?.progress_data || {},
                subscription_status: newProfile?.subscription_status || 'free',
                subscription_expires_at: newProfile?.subscription_expires_at || null,
            };
            userProfileCache = createdProfileData;
            return createdProfileData;

        } else if (error) { // Case: Other database error
            console.error("Error fetching user profile:", error);
            invalidateUserProfileCache();
            return defaultProfile;
        }

        // Case: Profile exists, return its data
        const profileData = {
            total_pnl: data?.total_pnl || 0,
            progress_data: data?.progress_data || {},
            subscription_status: data?.subscription_status || 'free',
            subscription_expires_at: data?.subscription_expires_at || null,
        };
        userProfileCache = profileData;
        return profileData;
    } catch (e) {
        console.error("Unexpected error in getProfileData:", e);
        invalidateUserProfileCache();
        return defaultProfile;
    }
};

/**
 * Updates the user's total realized P&L in Supabase by adding the new P&L amount.
 * @param {number} pnl - The P&L from the latest trade (can be positive or negative).
 */
export const updateUserPnl = async (pnl: number): Promise<void> => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
            console.warn("No session for updateUserPnl");
            return;
        }

        const currentProfile = await getProfileData();
        const newTotalPnl = (currentProfile.total_pnl || 0) + pnl;

        const { error } = await supabase
            .from('profiles')
            .update({ total_pnl: newTotalPnl })
            .eq('id', session.user.id);
            
        if (error) {
            console.error("Error updating user PNL:", error);
        } else {
            invalidateUserProfileCache();
            window.dispatchEvent(new CustomEvent('subscriptionUpdated'));
        }

    } catch (e) {
        console.error("Unexpected error in updateUserPnl:", e);
    }
};
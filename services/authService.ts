
import { supabase } from './supabaseClient';
// FIX: Updated Supabase type import to resolve module export errors.
import type { User } from '@supabase/auth-js';

/**
 * Initiates the Google Sign-In process using a popup window.
 * This function gets an OAuth URL from Supabase and opens it.
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // We tell Supabase to give us the URL instead of redirecting automatically.
      skipBrowserRedirect: true,
      // The redirectTo option has been removed. Supabase will now use the default
      // Site URL from the project's Auth settings, which is the correct and robust way
      // to handle OAuth redirects and fixes the "invalid_request" error.
    }
  });

  if (error) {
    console.error("Google Sign-In error:", error);
    alert(`Error signing in with Google: ${error.message}`);
    return;
  }
  
  if (data.url) {
    // Open the authentication URL in a new popup window.
    window.open(data.url, '_blank', 'width=600,height=800,popup');
  }
}

/**
 * Handles user sign-out from Supabase.
 */
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign out error:", error);
    alert(`Error signing out: ${error.message}`);
  }
}

/**
 * Updates the user's profile metadata in Supabase Auth.
 */
export async function updateUserProfile(userId: string, data: { [key: string]: any }) {
    const { data: { user }, error } = await supabase.auth.updateUser({ data });
    return { user, error };
}


/**
 * Uploads a new avatar image to Supabase Storage.
 */
export async function uploadAvatar(userId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase
      .storage
      .from('app images') // Ensure this bucket exists and has correct policies
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
        return { publicURL: null, error: uploadError };
    }

    const { data } = supabase
      .storage
      .from('app images')
      .getPublicUrl(filePath);
      
    return { publicURL: data.publicUrl, error: null };
}
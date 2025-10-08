import { supabase } from './supabaseClient';

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
      // This is where Google will redirect the user back to after authentication.
      redirectTo: window.location.origin,
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
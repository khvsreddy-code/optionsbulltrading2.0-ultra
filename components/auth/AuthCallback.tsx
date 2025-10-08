import React, { useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';

/**
 * This component is rendered exclusively in the OAuth popup window.
 * Its sole responsibility is to handle the authentication callback from Supabase
 * and then close itself once the session is established.
 */
const AuthCallback: React.FC = () => {
  useEffect(() => {
    // The Supabase client automatically detects auth details from the URL.
    // We listen for the 'SIGNED_IN' event, which fires after the session
    // is processed and stored in localStorage.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        // The main application window's onAuthStateChange listener will now
        // detect the new session from localStorage and update its state.
        // Our job in the popup is done, so we can close it.
        window.close();
      }
    });

    // Cleanup the subscription when the component unmounts.
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Display a user-friendly loading message while the process completes.
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'Inter, sans-serif',
      color: '#4b5563',
      backgroundColor: '#f9fafb',
      padding: '2rem',
      textAlign: 'center'
    }}>
        <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      <h1 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem'}}>
          Authenticating...
      </h1>
      <p style={{color: '#6b7280'}}>
          Please wait while we securely sign you in. This window will close automatically.
      </p>
    </div>
  );
};

export default AuthCallback;
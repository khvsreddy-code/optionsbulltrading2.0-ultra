import React, { useState } from 'react';
import { GoogleIcon } from '../common/Icons';
import { signInWithGoogle } from '../../services/authService';

const LoginScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Sign in failed", error);
            setLoading(false);
        }
        // Set a timeout to reset loading state in case the popup is blocked or closed manually
        setTimeout(() => setLoading(false), 5000);
    };

    return (
        <div>
            <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full h-14 flex items-center justify-center bg-white border border-border text-gray-900 font-semibold rounded-2xl transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed button-press-feedback"
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <>
                        <GoogleIcon size={24} className="mr-3" />
                        Sign In with Google
                    </>
                )}
            </button>
        </div>
    );
};

export default LoginScreen;
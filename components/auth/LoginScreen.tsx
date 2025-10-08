import React, { useState } from 'react';
import { GoogleIcon } from '../common/Icons';
import { signInWithGoogle } from '../../services/authService';

const LoginScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        await signInWithGoogle();
        // Add a timeout to re-enable the button in case the popup is blocked
        setTimeout(() => setLoading(false), 3000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-2 text-center">
                Welcome Back!
            </h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-8 text-center">
                Sign in to access your courses.
            </p>

            <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full h-12 flex items-center justify-center text-gray-700 dark:text-slate-200 font-semibold rounded-lg transition-colors bg-white hover:bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600 border border-gray-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 text-gray-700 dark:text-slate-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <>
                        <GoogleIcon size={22} className="mr-3" />
                        Continue with Google
                    </>
                )}
            </button>
        </div>
    );
};

export default LoginScreen;
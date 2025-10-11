import React, { useState } from 'react';
import { GoogleIcon } from '../common/Icons';
import { signInWithGoogle } from '../../services/authService';

const LoginScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        // Login functionality is temporarily disabled per user request.
        // To re-enable, uncomment the following lines:
        // setLoading(true);
        // await signInWithGoogle();
        // setTimeout(() => setLoading(false), 3000);
    };

    return (
        <div>
            <button
                onClick={handleGoogleSignIn}
                disabled={true} // Login is disabled
                className="w-full h-14 flex items-center justify-center text-white font-semibold rounded-2xl transition-colors bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed button-press-feedback"
            >
                Login Temporarily Disabled
            </button>
        </div>
    );
};

export default LoginScreen;
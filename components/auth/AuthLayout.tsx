import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background antialiased flex flex-col justify-center items-center p-6 text-center">
            
            {/* Centered Content */}
            <div className="flex flex-col items-center">
                
                {/* App Title and Subtitle */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-text-main">OptionsBullTrading</h1>
                    <p className="text-lg text-text-secondary mt-1">everything you need to be a trader</p>
                </div>

                {/* Illustration */}
                <div className="mb-8">
                    <img 
                        src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/Gemini_Generated_Image_e6q469e6q469e6q4.png" 
                        alt="Optionsbulltrading Logo"
                        className="w-48 h-48 rounded-full object-cover shadow-lg"
                    />
                </div>

                {/* Text and Button Content */}
                <div className="w-full max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-text-main">
                        Your Modern Stock Market Journey
                    </h2>
                    <p className="text-md text-text-secondary mt-2 mb-8">
                        Elevate Your Trading Beyond Expectations
                    </p>
                    
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
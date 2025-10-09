import React, { useRef, useEffect } from 'react';
// FIX: Use a standard ES module import for animejs.
import anime from 'animejs';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const layoutRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (layoutRef.current) {
            const title = layoutRef.current.querySelector('.auth-title');
            const subtitle = layoutRef.current.querySelector('.auth-subtitle');
            const image = layoutRef.current.querySelector('.auth-image');
            const content = layoutRef.current.querySelector('.auth-content-area');

            anime.timeline({
                easing: 'easeOutExpo',
                duration: 800
            })
            .add({
                targets: image,
                scale: [0, 1],
                rotate: '1turn',
                duration: 1200,
            })
            .add({
                targets: [title, subtitle],
                opacity: [0, 1],
                translateY: [-25, 0],
                delay: anime.stagger(150),
            }, '-=800')
            .add({
                targets: content,
                opacity: [0, 1],
                translateY: [25, 0],
            }, '-=600');
        }
    }, []);

    return (
        <div ref={layoutRef} className="min-h-screen bg-background antialiased flex flex-col justify-center items-center p-6 text-center">
            
            {/* Centered Content */}
            <div className="flex flex-col items-center">
                
                {/* App Title and Subtitle */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-text-main auth-title">OptionsBullTrading</h1>
                    <p className="text-lg text-text-secondary mt-1 auth-subtitle">everything you need to be a trader</p>
                </div>

                {/* Illustration */}
                <div className="mb-8">
                    <img 
                        src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/Gemini_Generated_Image_e6q469e6q469e6q4.png" 
                        alt="Optionsbulltrading Logo"
                        className="w-48 h-48 rounded-full object-cover shadow-lg auth-image"
                    />
                </div>

                {/* Text and Button Content */}
                <div className="w-full max-w-md mx-auto auth-content-area">
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
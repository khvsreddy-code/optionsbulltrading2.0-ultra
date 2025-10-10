import React, { useRef, useEffect } from 'react';
import anime from 'animejs';

interface CompletionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    nextLessonTitle: string;
}

const CompletionIcon: React.FC = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#E8F5E9"/>
        <path d="M16.5 8.5L10.5 14.5L7.5 11.5" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C13.59 22 15.11 21.66 16.5 21" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);


const CompletionDialog: React.FC<CompletionDialogProps> = ({ isOpen, onClose, onNext, nextLessonTitle }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            anime.timeline({ easing: 'easeOutExpo' })
                .add({
                    targets: overlayRef.current,
                    opacity: [0, 1],
                    duration: 300
                })
                .add({
                    targets: cardRef.current,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    scale: [0.9, 1],
                    duration: 400
                }, '-=200');
        }
    }, [isOpen]);

    const handleClose = () => {
        anime.timeline({ easing: 'easeInExpo', duration: 250 })
            .add({
                targets: cardRef.current,
                opacity: 0,
                translateY: 10,
                scale: 0.95,
            })
            .add({
                targets: overlayRef.current,
                opacity: 0,
                complete: onClose
            }, '-=200');
    };
    
    if (!isOpen) return null;

    return (
        <div ref={overlayRef} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div ref={cardRef} className="bg-card rounded-2xl shadow-xl w-full max-w-sm text-text-main border border-border overflow-hidden transform-gpu">
                <div className="p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 mb-4">
                        <CompletionIcon />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
                    <p className="text-text-secondary">
                        Great job! Next up: <strong>Back to Library</strong>
                    </p>
                </div>
                <div className="p-4 bg-background border-t border-border grid grid-cols-2 gap-3">
                     <button 
                        onClick={handleClose} 
                        className="w-full p-3 bg-card rounded-lg font-semibold button-press-feedback hover:bg-border transition-colors border border-border"
                    >
                        Stay Here
                    </button>
                    <button 
                        onClick={onNext} 
                        className="w-full p-3 bg-primary text-white rounded-lg font-semibold button-press-feedback hover:bg-primary-dark transition-colors"
                    >
                        Let's Go!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompletionDialog;
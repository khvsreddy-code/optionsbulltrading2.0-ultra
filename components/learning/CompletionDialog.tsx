import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import { Trophy, X } from '../common/Icons';

interface CompletionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    nextLessonTitle: string;
}

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
                <div className="p-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-light border-2 border-primary mb-4">
                        <Trophy size={32} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
                    <p className="text-text-secondary mb-6">
                        Great job! Next up: <strong className="text-text-main">{nextLessonTitle}</strong>
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
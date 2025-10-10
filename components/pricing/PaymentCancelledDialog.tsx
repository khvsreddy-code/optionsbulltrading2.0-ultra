import React, { useRef, useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { X } from '../common/Icons';

interface PaymentCancelledDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaymentCancelledDialog: React.FC<PaymentCancelledDialogProps> = ({ isOpen, onClose }) => {
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
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 border-2 border-red-500/30 mb-4">
                        <X size={32} className="text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Payment Cancelled</h2>
                    <p className="text-text-secondary">
                        It looks like the payment process was not completed. Please try again if you'd like to subscribe.
                    </p>
                </div>
                <div className="p-4 bg-background border-t border-border">
                    <button 
                        onClick={handleClose} 
                        className="w-full p-3 bg-primary text-white rounded-lg font-semibold button-press-feedback hover:bg-primary-dark transition-colors"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelledDialog;
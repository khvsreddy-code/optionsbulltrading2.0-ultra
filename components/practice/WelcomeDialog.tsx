import React from 'react';
import { Zap } from '../common/Icons';

interface WelcomeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm text-text-main border border-border overflow-hidden">
        <div className="p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-light border-2 border-primary mb-4">
                <Zap size={32} className="text-primary" />
            </div>
          <h2 className="text-2xl font-bold mb-2">Welcome to the Simulator!</h2>
          <p className="text-text-secondary mb-6">
            This is your risk-free sandbox to practice trading with real-time simulated data. Test your strategies, learn the tools, and build confidence before entering the real market.
          </p>
        </div>
        <div className="p-4 bg-background/50 border-t border-border">
          <button 
            onClick={onClose} 
            className="w-full p-3 bg-primary text-white rounded-lg font-semibold button-press-feedback hover:bg-primary-dark transition-colors"
          >
            Let's Go!
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDialog;
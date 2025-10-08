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
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeInUp"
      style={{ animationDuration: '0.3s' }}
    >
      <div className="bg-slate-800 rounded-2xl shadow-xl w-full max-w-sm text-white border border-slate-700 overflow-hidden">
        <div className="p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 border-2 border-blue-400 mb-4">
                <Zap size={32} className="text-blue-300" />
            </div>
          <h2 className="text-2xl font-bold mb-2">Welcome to the Simulator!</h2>
          <p className="text-slate-300 mb-6">
            This is your risk-free sandbox to practice trading with real-time simulated data. Test your strategies, learn the tools, and build confidence before entering the real market.
          </p>
        </div>
        <div className="p-4 bg-slate-900/50 border-t border-slate-700">
          <button 
            onClick={onClose} 
            className="w-full p-3 bg-blue-600 rounded-lg font-semibold button-press-feedback hover:bg-blue-500 transition-colors"
          >
            Let's Go!
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDialog;
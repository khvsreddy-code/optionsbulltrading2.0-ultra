import React from 'react';
import { ChevronRight } from '../common/Icons';
import type { View } from '../../types';

interface SimulatorHeaderProps {
  onNavigate: (view: View) => void;
  title: string;
}

const SimulatorHeader: React.FC<SimulatorHeaderProps> = ({ onNavigate, title }) => {
  return (
    <header className="flex-shrink-0 bg-[#131722] border-b border-[#2A2E39] p-2 flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={() => onNavigate('home')} className="p-2 rounded-full hover:bg-slate-700 mr-2" aria-label="Go back to home">
            <ChevronRight size={22} className="text-slate-400 transform rotate-180" />
        </button>
        <h1 className="text-lg font-semibold text-white">{title}</h1>
      </div>
    </header>
  );
};

export default SimulatorHeader;
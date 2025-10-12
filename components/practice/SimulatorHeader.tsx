import React from 'react';
import { ChevronRight } from '../common/Icons';

interface SimulatorHeaderProps {
  onNavigate: (path: string) => void;
  title: string;
}

const SimulatorHeader: React.FC<SimulatorHeaderProps> = ({ onNavigate, title }) => {
  return (
    <header className="flex-shrink-0 bg-background border-b border-border p-2 flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={() => onNavigate('/home')} className="p-2 rounded-full hover:bg-card mr-2" aria-label="Go back to home">
            <ChevronRight size={22} className="text-text-secondary transform rotate-180" />
        </button>
        <h1 className="text-lg font-semibold text-text-main">{title}</h1>
      </div>
    </header>
  );
};

export default SimulatorHeader;
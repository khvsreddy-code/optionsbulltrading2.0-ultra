import React from 'react';
import { ChevronRight } from '../common/Icons';

interface SimulatorHeaderProps {
  title: string;
}

const SimulatorHeader: React.FC<SimulatorHeaderProps> = ({ title }) => {
  return (
    <header className="flex-shrink-0 bg-background border-b border-border p-2 flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-card mr-2" aria-label="Go back">
            <ChevronRight size={22} className="text-text-secondary transform rotate-180" />
        </button>
        <h1 className="text-lg font-semibold text-text-main">{title}</h1>
      </div>
    </header>
  );
};

export default SimulatorHeader;
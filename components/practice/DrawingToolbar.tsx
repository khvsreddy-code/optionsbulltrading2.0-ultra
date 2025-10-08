import React from 'react';
import { Crosshair, TrendLine, HorizontalLine, FibRetracement, Brush, TextIcon, Eraser, Trash } from '../common/Icons';

export type DrawingTool = 'crosshair' | 'trendline' | 'horizontal' | 'fib' | 'brush' | 'text' | 'eraser' | 'trash' | null;

interface DrawingToolbarProps {
  activeTool: DrawingTool;
  onToolSelect: (tool: DrawingTool) => void;
}

const DrawingToolbar: React.FC<DrawingToolbarProps> = ({ activeTool, onToolSelect }) => {
  const tools = [
    { id: 'crosshair', label: 'Crosshair', icon: Crosshair },
    { id: 'trendline', label: 'Trend Line', icon: TrendLine },
    { id: 'horizontal', label: 'Horizontal Line', icon: HorizontalLine },
    { id: 'fib', label: 'Fib Retracement', icon: FibRetracement },
    { id: 'brush', label: 'Brush', icon: Brush },
    { id: 'text', label: 'Text', icon: TextIcon },
    { id: 'eraser', label: 'Eraser', icon: Eraser },
    { id: 'trash', label: 'Delete Drawings', icon: Trash },
  ];

  return (
    <div className="absolute top-4 left-2 z-20 bg-[#1C2127] border border-[#2A2E39] rounded-lg p-1 flex flex-col items-center space-y-1">
      {tools.map(tool => (
        <button
          key={tool.id}
          onClick={() => onToolSelect(tool.id as DrawingTool)}
          title={tool.label}
          className={`p-2 rounded-md transition-colors ${
            activeTool === tool.id
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:bg-slate-700 hover:text-white'
          }`}
        >
          <tool.icon size={20} />
        </button>
      ))}
    </div>
  );
};

export default DrawingToolbar;
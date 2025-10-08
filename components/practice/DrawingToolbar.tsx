import React from 'react';
import { Crosshair, TrendLine, HorizontalLine, FibRetracement, Brush, TextIcon, Eraser, Trash } from '../common/Icons';

export type DrawingTool = 'crosshair' | 'trendline' | 'horizontal' | 'fib' | 'brush' | 'text' | 'eraser' | 'trash' | null;

interface DrawingToolbarProps {
  activeTool: DrawingTool;
  onToolSelect: (tool: DrawingTool) => void;
}

const DrawingToolbar: React.FC<DrawingToolbarProps> = ({ activeTool, onToolSelect }) => {
  const tools = [
    { id: 'crosshair', icon: Crosshair, enabled: true, description: 'Show crosshair pointer' },
    { id: 'trendline', icon: TrendLine, enabled: false, description: 'Draw a trend line' },
    { id: 'horizontal', icon: HorizontalLine, enabled: true, description: 'Draw a horizontal line' },
    { id: 'fib', icon: FibRetracement, enabled: false, description: 'Draw Fibonacci Retracement' },
    { id: 'brush', icon: Brush, enabled: false, description: 'Freeform drawing' },
    { id: 'text', icon: TextIcon, enabled: false, description: 'Add text annotation' },
    { id: 'eraser', icon: Eraser, enabled: false, description: 'Erase individual drawings' },
    { id: 'trash', icon: Trash, enabled: true, description: 'Delete all drawings' },
  ];

  return (
    <div className="absolute top-4 left-2 z-20 bg-[#1C2127] border border-[#2A2E39] rounded-lg p-1 flex flex-col items-center space-y-1">
      {tools.map(tool => (
        <div key={tool.id} className="relative group flex items-center">
            <button
              onClick={() => tool.enabled && onToolSelect(tool.id as DrawingTool)}
              aria-label={tool.description}
              disabled={!tool.enabled}
              className={`p-2 rounded-md transition-colors ${
                activeTool === tool.id
                  ? 'bg-blue-600 text-white'
                  : tool.enabled
                  ? 'text-slate-400 hover:bg-slate-700 hover:text-white'
                  : 'text-slate-600 cursor-not-allowed'
              }`}
            >
              <tool.icon size={20} />
            </button>
            <div
              className="absolute left-full ml-3 w-max bg-slate-900 text-white text-xs font-semibold rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg border border-slate-700"
              role="tooltip"
            >
              {tool.description} {!tool.enabled && <span className="text-yellow-400 font-normal"> (Coming Soon)</span>}
            </div>
        </div>
      ))}
    </div>
  );
};

export default DrawingToolbar;
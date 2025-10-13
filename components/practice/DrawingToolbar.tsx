import React from 'react';
import { Crosshair, TrendLine, HorizontalLine, Eraser } from '../common/Icons';
import type { DrawingTool } from '../../views/PracticeView';

interface DrawingToolbarProps {
    activeTool: DrawingTool;
    onSelectTool: (tool: DrawingTool) => void;
    onClearDrawings: () => void;
}

const tools = [
    { id: 'cursor', icon: Crosshair, label: 'Cursor' },
    { id: 'trendline', icon: TrendLine, label: 'Trend Line' },
    { id: 'horizontal', icon: HorizontalLine, label: 'Horizontal Line' },
];

const DrawingToolbar: React.FC<DrawingToolbarProps> = ({ activeTool, onSelectTool, onClearDrawings }) => {
    return (
        <div className="flex items-center space-x-1 bg-card border border-border rounded-lg p-1">
            {tools.map(tool => (
                <button
                    key={tool.id}
                    onClick={() => onSelectTool(tool.id as DrawingTool)}
                    className={`p-2 rounded-md transition-colors ${activeTool === tool.id ? 'bg-primary text-white' : 'text-text-secondary hover:bg-background'}`}
                    aria-label={tool.label}
                    title={tool.label}
                >
                    <tool.icon size={20} />
                </button>
            ))}
            <div className="w-px h-6 bg-border mx-1"></div>
            <button
                onClick={() => {
                    onClearDrawings();
                    onSelectTool('cursor');
                }}
                className="p-2 rounded-md text-text-secondary hover:bg-background"
                aria-label="Clear All Drawings"
                title="Clear All Drawings"
            >
                <Eraser size={20} />
            </button>
        </div>
    );
};

export default DrawingToolbar;
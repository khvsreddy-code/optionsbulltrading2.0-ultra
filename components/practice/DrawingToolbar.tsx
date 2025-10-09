import React, { useState, useRef, useEffect } from 'react';
import type { OrderSide, DrawingTool } from '../../types';
import { Crosshair, TrendLine, Rectangle, Circle, Brush, Magnet, Trash, HorizontalLine, FibRetracement, ChevronRight } from '../common/Icons';

interface Tool {
  id: DrawingTool;
  label: string;
  icon: React.FC<any>;
}

interface ToolGroup {
  id: string;
  label: string;
  tools: Tool[];
}

const toolGroups: ToolGroup[] = [
    { id: 'cursors', label: 'Cursors', tools: [
        { id: 'crosshair', label: 'Crosshair', icon: Crosshair },
    ]},
    { id: 'trendlines', label: 'Trend Line Tools', tools: [
        { id: 'trendline', label: 'Trend Line', icon: TrendLine },
        { id: 'horizontal-line', label: 'Horizontal Line', icon: HorizontalLine },
    ]},
    { id: 'fib', label: 'Gann and Fibonacci Tools', tools: [
        { id: 'fib-retracement', label: 'Fib Retracement', icon: FibRetracement },
    ]},
    { id: 'shapes', label: 'Geometric Shapes', tools: [
        { id: 'rectangle', label: 'Rectangle', icon: Rectangle },
        { id: 'circle', label: 'Circle', icon: Circle },
    ]},
    { id: 'drawing', label: 'Annotation Tools', tools: [
        { id: 'brush', label: 'Brush', icon: Brush },
    ]}
];

interface DrawingToolbarProps {
  activeTool: DrawingTool | null;
  onToolSelect: (tool: DrawingTool) => void;
  color: string;
  onColorChange: (color: string) => void;
  lineWidth: number;
  onLineWidthChange: (width: number) => void;
  isMagnetOn: boolean;
  onMagnetToggle: () => void;
  onClear: () => void;
  onTradeButtonClick: (side: OrderSide) => void;
}


const DrawingToolbar: React.FC<DrawingToolbarProps> = ({
  activeTool, onToolSelect, color, onColorChange,
  lineWidth, onLineWidthChange, isMagnetOn, onMagnetToggle,
  onClear, onTradeButtonClick
}) => {
  const [openFlyout, setOpenFlyout] = useState<string | null>(null);
  const [selectedTools, setSelectedTools] = useState<Record<string, DrawingTool>>(
    toolGroups.reduce((acc, group) => ({ ...acc, [group.id]: group.tools[0].id }), {})
  );

  const handleToolSelect = (group: ToolGroup, toolId: DrawingTool) => {
    onToolSelect(toolId);
    setSelectedTools(prev => ({ ...prev, [group.id]: toolId }));
    setOpenFlyout(null);
  };
  
  const getGroupIcon = (group: ToolGroup) => {
    const selectedToolId = selectedTools[group.id];
    return group.tools.find(t => t.id === selectedToolId)?.icon || group.tools[0].icon;
  }

  return (
    <div className="practice-toolbar">
      <div className="toolbar-section">
        <h3>Trade</h3>
        <div className="flex gap-2">
            <button
                onClick={() => onTradeButtonClick('BUY')}
                className="flex-1 p-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors"
            >
                BUY
            </button>
            <button
                onClick={() => onTradeButtonClick('SELL')}
                className="flex-1 p-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors"
            >
                SELL
            </button>
        </div>
      </div>

      <div className="toolbar-section">
        <h3>Tools</h3>
        <div className="flex flex-col gap-1">
          {toolGroups.map(group => {
            const ActiveIcon = getGroupIcon(group);
            const isGroupActive = group.tools.some(t => t.id === activeTool);

            if (group.tools.length === 1) {
              const tool = group.tools[0];
              return (
                <button
                  key={tool.id}
                  title={tool.label}
                  onClick={() => onToolSelect(tool.id)}
                  className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                >
                  <tool.icon size={20} />
                </button>
              );
            }

            return (
              <div key={group.id} className="tool-group">
                <button
                  title={group.label}
                  onClick={() => setOpenFlyout(openFlyout === group.id ? null : group.id)}
                  className={`w-full tool-btn flex justify-between items-center ${isGroupActive ? 'active' : ''}`}
                >
                  <ActiveIcon size={20} />
                  <ChevronRight size={14} />
                </button>
                {openFlyout === group.id && (
                  <div className="flyout-menu">
                    {group.tools.map(tool => (
                      <button
                        key={tool.id}
                        title={tool.label}
                        onClick={() => handleToolSelect(group, tool.id)}
                        className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                      >
                        <tool.icon size={20} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="toolbar-section">
          <h3>Style</h3>
          <div className="flex items-center flex-wrap">
              <input 
                  type="color" 
                  value={color}
                  onChange={(e) => onColorChange(e.target.value)}
                  title="Select color"
              />
              <div className="flex items-center">
                  <input
                      type="range"
                      id="lineWidth"
                      min="1"
                      max="20"
                      value={lineWidth}
                      onChange={(e) => onLineWidthChange(Number(e.target.value))}
                  />
                  <span id="lineWidthValue">{lineWidth}</span>
              </div>
          </div>
      </div>

       <div className="toolbar-section">
            <h3>Actions</h3>
            <div className="flex flex-wrap">
                <button
                    title="Magnet Mode"
                    onClick={onMagnetToggle}
                    className={`tool-btn magnet-btn ${isMagnetOn ? 'active' : ''}`}
                >
                    <Magnet size={20} />
                </button>
                <button title="Clear All Drawings" onClick={onClear} className="tool-btn">
                    <Trash size={20} />
                </button>
            </div>
       </div>
    </div>
  );
};

export default DrawingToolbar;

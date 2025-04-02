'use client';

import { useState } from 'react';
import { Stroke } from '@/types/canvasTypes';
import Toolbar from '@/components/whiteboard/Toolbar';
import DrawingCanvas from '@/components/whiteboard/DrawingCanvas';

export default function Whiteboard() {
  const [color, setColor] = useState('black');
  const [width, setWidth] = useState(8);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const [tool, setTool] = useState<'draw' | 'pan'>('draw');

  const handleUndo = () => {
    if (strokes.length === 0) return;
    const undone = strokes[strokes.length - 1];
    setStrokes(strokes.slice(0, -1));
    setRedoStack([...redoStack, undone]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const redone = redoStack[redoStack.length - 1];
    setRedoStack(redoStack.slice(0, -1));
    setStrokes([...strokes, redone]);
  };

  return (
    <div className="w-full h-full relative">
      <Toolbar
        color={color}
        onColorChange={setColor}
        width={width}
        onWidthChange={setWidth}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onToolChange={setTool}
        tool={tool}
      />
      <DrawingCanvas
        color={color}
        width={width}
        strokes={strokes}
        setStrokes={setStrokes}
        isPanning={tool === 'pan'}
      />
    </div>
  );
}

'use client';

import { useState } from 'react';
import DrawingCanvas from '@/components/whiteboard/DrawingCanvas';
import Toolbar from '@/components/whiteboard/Toolbar';
import { CanvasElement, Tool, HistoryItem } from '@/types/canvasTypes';

export default function Whiteboard() {
  const [tool, setTool] = useState<Tool>('draw');
  const [color, setColor] = useState('black');
  const [width, setWidth] = useState(8);
  const [filled, setFilled] = useState(true);

  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [redoStack, setRedoStack] = useState<HistoryItem[]>([]);

  const addElement = (element: CanvasElement) => {
    setElements((prev) => [...prev, element]);
    setHistory((prev) => [...prev, { type: 'add', data: element }]);
    setRedoStack([]);
  };

  const addDeleteHistory = (deleted: CanvasElement[]) => {
    setHistory((prev) => [...prev, { type: 'delete', data: deleted }]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    const last = history[history.length - 1];
    if (!last) return;

    setHistory((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [last, ...prev]);

    if (last.type === 'add') {
      setElements((prev) => prev.filter((el) => el !== last.data));
    } else if (last.type === 'delete') {
      setElements((prev) => [...prev, ...(last.data as CanvasElement[])]);
    }
  };

  const handleRedo = () => {
    const next = redoStack[0];
    if (!next) return;

    setRedoStack((prev) => prev.slice(1));
    setHistory((prev) => [...prev, next]);

    if (next.type === 'add') {
      setElements((prev) => [...prev, next.data as CanvasElement]);
    } else if (next.type === 'delete') {
      setElements((prev) => prev.filter((el) => !(next.data as CanvasElement[]).includes(el)));
    }
  };

  return (
    <div className="w-full h-full relative">
      <Toolbar
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
        width={width}
        setWidth={setWidth}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        filled={filled}
        setFilled={setFilled}
      />
      <DrawingCanvas
        tool={tool}
        color={color}
        width={width}
        elements={elements}
        setElements={setElements}
        addElement={addElement}
        addDeleteHistory={addDeleteHistory}
        filled={filled}
      />

      <div
        className="fixed
         top-10 right-10 bg-gray-300 w-[300px] h-[500px] rounded-lg
         shadow-lg"
      >
        <h1>메모</h1>
      </div>
    </div>
  );
}

import type Konva from 'konva';
import { RefObject, Dispatch, SetStateAction } from 'react';

export type Point = { x: number; y: number };

export interface Stroke {
  type: 'stroke';
  points: Point[];
  color: string;
  width: number;
}

export interface ShapeObject {
  type: 'rectangle' | 'circle';
  start: Point;
  end: Point;
  color: string;
  width: number;
  filled: boolean;
}

export type CanvasElement = Stroke | ShapeObject;

export type Tool = 'draw' | 'pan' | 'eraser' | 'rectangle' | 'circle';

export interface HistoryItem {
  type: 'add' | 'delete';
  data: CanvasElement | CanvasElement[];
}

export interface DrawingCanvasProps {
  tool: Tool;
  color: string;
  width: number;
  elements: CanvasElement[];
  setElements: (elements: CanvasElement[]) => void;
  addElement: (element: CanvasElement) => void;
  addDeleteHistory: (elements: CanvasElement[]) => void; // ✅ 추가
  filled: boolean;
}

export interface UseDrawingHandlersProps extends DrawingCanvasProps {
  stageRef: RefObject<Konva.Stage | null>;
  isDrawing: boolean;
  setIsDrawing: Dispatch<SetStateAction<boolean>>;
  currentStroke: Stroke | null;
  setCurrentStroke: Dispatch<SetStateAction<Stroke | null>>;
  currentShape: ShapeObject | null;
  setCurrentShape: Dispatch<SetStateAction<ShapeObject | null>>;
}

export interface ToolbarProps {
  tool: Tool;
  setTool: (tool: Tool) => void;
  color: string;
  setColor: (color: string) => void;
  width: number;
  setWidth: (width: number) => void;
  handleUndo: () => void;
  handleRedo: () => void;
  filled: boolean;
  setFilled: (value: boolean) => void;
}

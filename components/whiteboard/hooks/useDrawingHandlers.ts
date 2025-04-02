import { RefObject } from 'react';
import type Konva from 'konva';
import { Stroke, Point } from '@/types/canvasTypes';
import { transformPointerPosition } from '../utils/transformPointer';

interface UseDrawingHandlersProps {
  isPanning: boolean;
  color: string;
  width: number;
  strokes: Stroke[];
  setStrokes: (strokes: Stroke[]) => void;
  stageRef: RefObject<Konva.Stage>;
  setCurrentStroke: (stroke: Stroke | null) => void;
  currentStroke: Stroke | null;
  setIsDrawing: (value: boolean) => void;
}

export const useDrawingHandlers = ({
  isPanning,
  color,
  width,
  strokes,
  setStrokes,
  stageRef,
  currentStroke,
  setCurrentStroke,
  setIsDrawing,
}: UseDrawingHandlersProps) => {
  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (isPanning) return;
    setIsDrawing(true);
    const stage = stageRef.current;
    const pointer = stage?.getPointerPosition();
    if (!stage || !pointer) return;
    const pos = transformPointerPosition(stage, pointer);
    setCurrentStroke({ points: [pos], color, width });
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!currentStroke || isPanning) return;
    const stage = stageRef.current;
    const pointer = stage?.getPointerPosition();
    if (!stage || !pointer) return;

    const pos = transformPointerPosition(stage, pointer);
    const isShiftPressed = e.evt.shiftKey;

    if (isShiftPressed) {
      setCurrentStroke({
        ...currentStroke,
        points: [currentStroke.points[0], pos],
      });
    } else {
      setCurrentStroke({
        ...currentStroke,
        points: [...currentStroke.points, pos],
      });
    }
  };

  const handleMouseUp = () => {
    if (!isPanning && currentStroke) {
      setStrokes([...strokes, currentStroke]);
    }
    setIsDrawing(false);
    setCurrentStroke(null);
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp };
};

import { UseDrawingHandlersProps, Stroke, ShapeObject } from '@/types/canvasTypes';
import { transformPointerPosition } from '../utils/transformPointer';
import { isNearStroke } from '../utils/isNearStroke';
import { isNearShape } from '../utils/isNearShape';
import type Konva from 'konva';

export const useDrawingHandlers = ({
  tool,
  color,
  width,
  filled,
  stageRef,
  isDrawing,
  setIsDrawing,
  currentStroke,
  setCurrentStroke,
  currentShape,
  setCurrentShape,
  elements,
  setElements,
  addElement,
  addDeleteHistory, // ✅ 추가됨
}: UseDrawingHandlersProps) => {
  const handleMouseDown = () => {
    const stage = stageRef.current;
    if (!stage) return;

    const pos = transformPointerPosition(stage);
    if (!pos) return;

    if (tool === 'eraser') {
      const removed = elements.filter((el) => {
        if (el.type === 'stroke') return isNearStroke(pos, el);
        return isNearShape(pos, el);
      });
      const remaining = elements.filter((el) => !removed.includes(el));

      if (removed.length > 0) {
        setElements(remaining);
        addDeleteHistory(removed); // ✅ 삭제 기록 추가
      }

      return;
    }

    if (tool === 'rectangle' || tool === 'circle') {
      const newShape: ShapeObject = {
        type: tool,
        start: pos,
        end: pos,
        color,
        width,
        filled,
      };
      setCurrentShape(newShape);
      setIsDrawing(true);
      return;
    }

    if (tool === 'draw') {
      const newStroke: Stroke = {
        type: 'stroke',
        points: [pos],
        color,
        width,
      };
      setCurrentStroke(newStroke);
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = stageRef.current;
    if (!stage) return;

    const pos = transformPointerPosition(stage);
    if (!pos) return;

    if (tool === 'eraser') return;

    if ((tool === 'rectangle' || tool === 'circle') && isDrawing && currentShape) {
      const isShiftPressed = e.evt.shiftKey;
      let newEnd = pos;

      if (isShiftPressed) {
        const dx = pos.x - currentShape.start.x;
        const dy = pos.y - currentShape.start.y;
        const size = Math.min(Math.abs(dx), Math.abs(dy));

        newEnd = {
          x: currentShape.start.x + Math.sign(dx) * size,
          y: currentShape.start.y + Math.sign(dy) * size,
        };
      }

      setCurrentShape({ ...currentShape, end: newEnd });
      return;
    }

    if (tool === 'draw' && isDrawing && currentStroke) {
      const updatedPoints = [...currentStroke.points, pos];
      setCurrentStroke({ ...currentStroke, points: updatedPoints });
    }
  };

  const handleMouseUp = () => {
    if (tool === 'draw' && currentStroke) {
      addElement(currentStroke);
      setCurrentStroke(null);
    }

    if ((tool === 'rectangle' || tool === 'circle') && currentShape) {
      addElement(currentShape);
      setCurrentShape(null);
    }

    setIsDrawing(false);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

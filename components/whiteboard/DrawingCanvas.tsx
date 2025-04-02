'use client';

import { Stage, Layer, Shape } from 'react-konva';
import { useRef, useState, useEffect } from 'react';
import { Point, Stroke } from '@/types/canvasTypes';
import type Konva from 'konva';
import { getSvgPath } from './utils/getSvgPath';
import { useDrawingHandlers } from './hooks/useDrawingHandlers';

type Props = {
  color: string;
  width: number;
  strokes: Stroke[];
  setStrokes: (strokes: Stroke[]) => void;
  isPanning: boolean;
};

export default function DrawingCanvas({ color, width, strokes, setStrokes, isPanning }: Props) {
  const stageRef = useRef<Konva.Stage | null>(null);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const resize = () => {
      setStageSize({ width: window.innerWidth, height: window.innerHeight });
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useDrawingHandlers({
    isPanning,
    color,
    width,
    strokes,
    setStrokes,
    stageRef,
    currentStroke,
    setCurrentStroke,
    setIsDrawing,
  });

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const scaleBy = 1.05;
    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = scale;
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setScale(newScale);
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    setPosition(newPos);

    stage.scale({ x: newScale, y: newScale });
    stage.position(newPos);
    stage.batchDraw();
  };

  return (
    <Stage
      width={stageSize.width}
      height={stageSize.height}
      ref={stageRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      draggable={isPanning}
      scale={{ x: scale, y: scale }}
      x={position.x}
      y={position.y}
    >
      <Layer>
        {strokes.map((stroke, idx) => (
          <Shape
            key={idx}
            sceneFunc={(ctx) => {
              const path = new Path2D(getSvgPath(stroke.points, stroke.width));
              ctx.beginPath();
              ctx.fillStyle = stroke.color;
              ctx.fill(path);
              ctx.closePath();
            }}
          />
        ))}
        {currentStroke && (
          <Shape
            sceneFunc={(ctx) => {
              const path = new Path2D(getSvgPath(currentStroke.points, currentStroke.width));
              ctx.beginPath();
              ctx.fillStyle = currentStroke.color;
              ctx.fill(path);
              ctx.closePath();
            }}
          />
        )}
      </Layer>
    </Stage>
  );
}

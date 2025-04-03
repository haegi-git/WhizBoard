'use client';

import { Stage, Layer, Shape } from 'react-konva';
import { useRef, useState, useEffect } from 'react';
import type Konva from 'konva';
import { Stroke, ShapeObject, DrawingCanvasProps } from '@/types/canvasTypes';
import { getSvgPath } from './utils/getSvgPath';
import { useDrawingHandlers } from './hooks/useDrawingHandlers';

export default function DrawingCanvas({
  tool,
  color,
  width,
  elements,
  setElements,
  addElement,
  filled, // ✅ Toolbar에서 받아온 값 넘겨줘야 해!
  addDeleteHistory,
}: DrawingCanvasProps) {
  const stageRef = useRef<Konva.Stage | null>(null);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [currentShape, setCurrentShape] = useState<ShapeObject | null>(null);
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
    addElement,
    addDeleteHistory, // ✅ 이거 추가!
    elements,
    setElements,
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

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    setScale(newScale);
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
      draggable={tool === 'pan'}
      scale={{ x: scale, y: scale }}
      x={position.x}
      y={position.y}
    >
      <Layer>
        {/* 기존 요소들 */}
        {elements.map((el, idx) => {
          if (el.type === 'stroke') {
            return (
              <Shape
                key={`stroke-${idx}`}
                sceneFunc={(ctx) => {
                  const path = new Path2D(getSvgPath(el.points, el.width));
                  ctx.beginPath();
                  ctx.fillStyle = el.color;
                  ctx.fill(path);
                  ctx.closePath();
                }}
              />
            );
          }

          if (el.type === 'rectangle' || el.type === 'circle') {
            const { start, end, color, width, filled } = el;
            const x = Math.min(start.x, end.x);
            const y = Math.min(start.y, end.y);
            const w = Math.abs(end.x - start.x);
            const h = Math.abs(end.y - start.y);

            return (
              <Shape
                key={`${el.type}-${idx}`}
                sceneFunc={(ctx) => {
                  ctx.beginPath();
                  if (el.type === 'rectangle') {
                    if (filled) {
                      ctx.fillStyle = color;
                      ctx.rect(x, y, w, h);
                      ctx.fill();
                    } else {
                      ctx.strokeStyle = color;
                      ctx.lineWidth = width;
                      ctx.strokeRect(x, y, w, h);
                    }
                  } else {
                    const centerX = x + w / 2;
                    const centerY = y + h / 2;
                    const radiusX = w / 2;
                    const radiusY = h / 2;

                    if (filled) {
                      ctx.fillStyle = color;
                      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
                      ctx.fill();
                    } else {
                      ctx.strokeStyle = color;
                      ctx.lineWidth = width;
                      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
                      ctx.stroke();
                    }
                  }
                  ctx.closePath();
                }}
              />
            );
          }

          return null;
        })}

        {/* 현재 그리고 있는 선 */}
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

        {/* 현재 그리고 있는 도형 */}
        {currentShape && (
          <Shape
            sceneFunc={(ctx) => {
              const { type, start, end, color, width, filled } = currentShape;
              const x = Math.min(start.x, end.x);
              const y = Math.min(start.y, end.y);
              const w = Math.abs(end.x - start.x);
              const h = Math.abs(end.y - start.y);

              ctx.beginPath();
              if (type === 'rectangle') {
                if (filled) {
                  ctx.fillStyle = color;
                  ctx.rect(x, y, w, h);
                  ctx.fill();
                } else {
                  ctx.strokeStyle = color;
                  ctx.lineWidth = width;
                  ctx.strokeRect(x, y, w, h);
                }
              } else if (type === 'circle') {
                const centerX = x + w / 2;
                const centerY = y + h / 2;
                const radiusX = w / 2;
                const radiusY = h / 2;

                if (filled) {
                  ctx.fillStyle = color;
                  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
                  ctx.fill();
                } else {
                  ctx.strokeStyle = color;
                  ctx.lineWidth = width;
                  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
                  ctx.stroke();
                }
              }
              ctx.closePath();
            }}
          />
        )}
      </Layer>
    </Stage>
  );
}

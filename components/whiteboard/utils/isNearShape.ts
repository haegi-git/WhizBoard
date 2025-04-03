import { ShapeObject } from '@/types/canvasTypes';

export const isNearShape = (point: { x: number; y: number }, shape: ShapeObject): boolean => {
  const { start, end } = shape;
  const left = Math.min(start.x, end.x);
  const right = Math.max(start.x, end.x);
  const top = Math.min(start.y, end.y);
  const bottom = Math.max(start.y, end.y);

  const padding = 10; // 여유 거리

  return (
    point.x >= left - padding &&
    point.x <= right + padding &&
    point.y >= top - padding &&
    point.y <= bottom + padding
  );
};

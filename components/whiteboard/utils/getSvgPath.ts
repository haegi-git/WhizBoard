import getStroke from 'perfect-freehand';
import { Point } from '@/types/canvasTypes';

export const getSvgPath = (points: Point[], size: number): string => {
  const strokePoints = points.map((p) => [p.x, p.y]) as [number, number][];
  const stroke = getStroke(strokePoints, {
    size,
    thinning: 0,
    smoothing: 0.5,
    streamline: 0.5,
  });
  if (stroke.length < 1) return '';
  return stroke.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');
};

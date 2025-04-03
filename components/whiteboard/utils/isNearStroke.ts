// utils/isNearStroke.ts
import { Stroke, Point } from '@/types/canvasTypes';

export function isNearStroke(point: Point, stroke: Stroke, threshold = 10): boolean {
  return stroke.points.some((p) => {
    const dx = p.x - point.x;
    const dy = p.y - point.y;
    return Math.sqrt(dx * dx + dy * dy) < threshold;
  });
}

import type Konva from 'konva';

export const transformPointerPosition = (stage: Konva.Stage, pointer: { x: number; y: number }) => {
  const scale = stage.scaleX();
  return {
    x: (pointer.x - stage.x()) / scale,
    y: (pointer.y - stage.y()) / scale,
  };
};

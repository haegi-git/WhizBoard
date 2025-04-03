import type Konva from 'konva';

export const transformPointerPosition = (stage: Konva.Stage) => {
  const scale = stage.scaleX();
  const pointer = stage.getPointerPosition();
  if (!pointer) return null;

  const stagePos = stage.position();

  return {
    x: (pointer.x - stagePos.x) / scale,
    y: (pointer.y - stagePos.y) / scale,
  };
};

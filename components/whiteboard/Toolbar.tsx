type Props = {
  color: string;
  onColorChange: (color: string) => void;
  width: number;
  onWidthChange: (width: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onToolChange: (tool: 'draw' | 'pan') => void;
  tool: 'draw' | 'pan';
};

export default function Toolbar({
  color,
  onColorChange,
  width,
  onWidthChange,
  onUndo,
  onRedo,
  onToolChange,
  tool,
}: Props) {
  const colors = ['black', 'red', 'blue', 'green'];
  const sizes = [2, 4, 8, 12, 16];

  return (
    <div className="absolute top-2 left-2 bg-white p-3 rounded shadow flex items-center gap-4 z-10">
      {/* 색상 선택 */}
      <div className="flex items-center gap-1">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => onColorChange(c)}
            className={`w-6 h-6 rounded-full border transition`}
            style={{
              backgroundColor: c,
              border: color === c ? '2px solid black' : '1px solid lightgray',
            }}
          />
        ))}
      </div>

      {/* 굵기 선택 */}
      <div className="flex items-center gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => onWidthChange(s)}
            className="rounded-full border border-gray-400 flex items-center justify-center"
            style={{
              width: s + 8,
              height: s + 8,
              backgroundColor: 'gray',
              border: width === s ? '2px solid black' : '1px solid gray',
            }}
          />
        ))}
      </div>
      <button
        onClick={() => onToolChange('draw')}
        className={`px-2 ${tool === 'draw' ? 'bg-black text-white' : 'bg-white border'}`}
      >
        ✏️ Draw
      </button>
      <button
        onClick={() => onToolChange('pan')}
        className={`px-2 ${tool === 'pan' ? 'bg-black text-white' : 'bg-white border'}`}
      >
        🖐️ Pan
      </button>

      {/* Undo / Redo */}
      <button onClick={onUndo} className="px-2 text-sm border rounded">
        ↩️ Undo
      </button>
      <button onClick={onRedo} className="px-2 text-sm border rounded">
        ↪️ Redo
      </button>
    </div>
  );
}

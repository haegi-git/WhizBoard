'use client';

import { ToolbarProps } from '@/types/canvasTypes';

export default function Toolbar({
  tool,
  setTool,
  color,
  setColor,
  width,
  setWidth,
  handleUndo,
  handleRedo,
  filled,
  setFilled, // ✅ 추가!
}: ToolbarProps) {
  return (
    <div className="fixed top-4 left-4 bg-white p-4 rounded-xl shadow-xl flex flex-col gap-4 z-50">
      {/* 🎨 색상 선택 */}
      <div className="flex gap-2">
        {['black', 'red', 'blue', 'green', 'orange'].map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-6 h-6 rounded-full border-2 ${
              color === c ? 'border-black' : 'border-gray-300'
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      {/* ✍️ 굵기 선택 */}
      <div className="flex gap-2">
        {[4, 8, 12].map((w) => (
          <button
            key={w}
            onClick={() => setWidth(w)}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
              width === w ? 'bg-black text-white' : 'bg-gray-100 text-black'
            }`}
          >
            {w}
          </button>
        ))}
      </div>

      {/* 🎨 도형 채우기 여부 */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilled(true)}
          className={`px-2 py-1 rounded border ${
            filled ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          채우기
        </button>
        <button
          onClick={() => setFilled(false)}
          className={`px-2 py-1 rounded border ${
            !filled ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          테두리만
        </button>
      </div>

      {/* 🛠️ 툴 선택 */}
      <div className="flex gap-2 flex-wrap">
        {[
          { tool: 'draw', label: '✏️' },
          { tool: 'pan', label: '✋' },
          { tool: 'eraser', label: '🧽' },
          { tool: 'rectangle', label: '▭' },
          { tool: 'circle', label: '◯' },
        ].map(({ tool: t, label }) => (
          <button
            key={t}
            onClick={() => setTool(t)}
            className={`px-2 py-1 rounded border ${
              tool === t ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ↩️ Undo & Redo */}
      <div className="flex gap-2">
        <button
          onClick={handleUndo}
          className="px-2 py-1 rounded border bg-white text-black hover:bg-gray-100"
        >
          ↩️ Undo
        </button>
        <button
          onClick={handleRedo}
          className="px-2 py-1 rounded border bg-white text-black hover:bg-gray-100"
        >
          ↪️ Redo
        </button>
      </div>
    </div>
  );
}

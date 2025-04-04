// CreatePopup.tsx
'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import EditorToolbar from './EditorToolbar';
import { HeadingNode } from '@lexical/rich-text';

export default function CreatePopup() {
  const initialConfig = {
    theme: {
      heading: {
        h1: 'text-3xl font-bold',
        h2: 'text-2xl font-semibold',
        h3: 'text-xl font-medium',
      },
    },
    onError: console.error,
    namespace: 'WhizBoardMemo',
    editorState: null,
    nodes: [HeadingNode], // ✅ 요거 꼭 있어야 함
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 transform
      -translate-x-1/2 -translate-y-1/2 bg-gray-300
      p-4 rounded-lg shadow-lg z-50"
    >
      <form className="flex flex-col gap-4">
        {/* Title */}
        <input type="text" placeholder="Title" className="border-2 border-black rounded-lg p-2" />

        {/* Tag */}
        <input type="text" placeholder="Tag" className="border-2 border-black rounded-lg p-2" />

        {/* Rich Text Editor */}
        <LexicalComposer initialConfig={initialConfig}>
          {/* Toolbar for formatting */}
          <EditorToolbar />

          <RichTextPlugin
            contentEditable={
              <ContentEditable className="border-2 border-black rounded-lg p-2 min-w-[500px] h-[150px] bg-white resize-none overflow-auto" />
            }
            placeholder={<div className="text-gray-400">Write your content here...</div>}
            ErrorBoundary={({ error }) => <div>Error: {error.message}</div>}
          />

          <HistoryPlugin />
        </LexicalComposer>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-amber-700 p-2 rounded-lg cursor-pointer text-white font-bold"
        >
          Create
        </button>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode } from '@lexical/rich-text';

import EditorToolbar from './EditorToolbar';
import EditorSubmitButton from './EditorSubmitButton';

export default function CreatePopup() {
  const [listItem, setListItem] = useState({ title: '', tag: '' });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setListItem((prev) => ({ ...prev, [name]: value }));
  };

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
    nodes: [HeadingNode],
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 transform
     -translate-x-1/2 -translate-y-1/2
      bg-gray-300 p-4 rounded-lg shadow-lg z-50
       w-[850px] h-[90vh]
      "
    >
      <form className="flex flex-col gap-4 h-full">
        {/* Title */}
        <input
          onChange={handleInput}
          value={listItem.title}
          name="title"
          type="text"
          placeholder="Title"
          className="border-2 border-black rounded-lg p-2"
        />

        {/* Tag */}
        <input
          onChange={handleInput}
          value={listItem.tag}
          name="tag"
          type="text"
          placeholder="Tag"
          className="border-2 border-black rounded-lg p-2"
        />

        {/* Rich Text Editor */}
        <LexicalComposer initialConfig={initialConfig}>
          <EditorToolbar />

          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="
              border-2 border-black rounded-lg
               bg-white resize-none
                overflow-auto w-[800px] h-[70%] p-2"
              />
            }
            placeholder={<div className="text-gray-400">Write something...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />

          <HistoryPlugin />

          {/* 👇 이 버튼 안에서 본문 꺼내고 API 요청도 같이함 */}
          <EditorSubmitButton listItem={listItem} />
        </LexicalComposer>
      </form>
    </div>
  );
}

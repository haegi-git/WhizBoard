'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';

interface Props {
  listItem: {
    title: string;
    tag: string;
  };
}

export default function EditorSubmitButton({ listItem }: Props) {
  const [editor] = useLexicalComposerContext();

  const handleSubmit = async () => {
    let description = '';

    editor.getEditorState().read(() => {
      description = $getRoot().getTextContent();
    });

    const payload = {
      ...listItem,
      description,
    };

    try {
      const res = await fetch('/api/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('업로드 실패');
      console.log('저장 완료!');
    } catch (err) {
      console.error('저장 에러:', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSubmit}
      className="bg-amber-700 p-2 rounded-lg cursor-pointer text-white font-bold"
    >
      Create
    </button>
  );
}

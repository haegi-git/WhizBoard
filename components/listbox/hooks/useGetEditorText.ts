import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';

export function useEditorPlainText() {
  const [editor] = useLexicalComposerContext();

  const getText = (): string => {
    let result = '';
    const editorState = editor.getEditorState();
    editorState.read(() => {
      result = $getRoot().getTextContent();
    });
    return result;
  };

  return getText;
}

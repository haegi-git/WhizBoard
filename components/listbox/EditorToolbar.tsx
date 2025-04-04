import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND, $getSelection, $isRangeSelection } from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text';

export default function EditorToolbar() {
  const [editor] = useLexicalComposerContext();

  const formatHeading = (tag: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag)); // ✅ 올바른 방식
      }
    });
  };

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };

  return (
    <div className="flex gap-2 mb-2">
      <button type="button" onClick={() => formatHeading('h1')}>
        H1
      </button>
      <button type="button" onClick={() => formatHeading('h2')}>
        H2
      </button>
      <button type="button" onClick={() => formatHeading('h3')}>
        H3
      </button>
      <button type="button" onClick={formatBold}>
        Bold
      </button>
    </div>
  );
}

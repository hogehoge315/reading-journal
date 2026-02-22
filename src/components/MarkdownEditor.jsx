import { useState, useRef, useCallback } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

marked.setOptions({ breaks: true, gfm: true });

function insertMd(ta, before, after, placeholder) {
  const start = ta.selectionStart;
  const end   = ta.selectionEnd;
  const sel   = ta.value.substring(start, end) || placeholder;
  const newVal = ta.value.substring(0, start) + before + sel + after + ta.value.substring(end);
  ta.value = newVal;
  ta.focus();
  ta.setSelectionRange(start + before.length, start + before.length + sel.length);
  return newVal;
}

function insertMdLine(ta, prefix) {
  const start = ta.selectionStart;
  const lineStart = ta.value.lastIndexOf('\n', start - 1) + 1;
  const newVal = ta.value.substring(0, lineStart) + prefix + ta.value.substring(lineStart);
  ta.value = newVal;
  ta.focus();
  const pos = start + prefix.length;
  ta.setSelectionRange(pos, pos);
  return newVal;
}

export default function MarkdownEditor({ chapterId, value, onChange }) {
  const [mode, setMode] = useState('write');
  const taRef = useRef(null);

  const handleToolbar = useCallback((before, after, placeholder) => {
    const newVal = insertMd(taRef.current, before, after, placeholder);
    onChange(newVal);
  }, [onChange]);

  const handleToolbarLine = useCallback((prefix) => {
    const newVal = insertMdLine(taRef.current, prefix);
    onChange(newVal);
  }, [onChange]);

  const preview = DOMPurify.sanitize(
    marked.parse(value || '', { breaks: true, gfm: true })
  );

  return (
    <div className="chapter-body" data-mode={mode}>
      <div className="editor-tabs">
        <div
          className={`editor-tab${mode === 'write' ? ' active' : ''}`}
          onClick={() => setMode('write')}
        >
          ✏️ 書く
        </div>
        <div
          className={`editor-tab${mode === 'preview' ? ' active' : ''}`}
          onClick={() => setMode('preview')}
        >
          👁 プレビュー
        </div>
      </div>
      <div className="editor-toolbar">
        <button className="toolbar-btn" title="Bold" onClick={() => handleToolbar('**', '**', '太字')}><b>B</b></button>
        <button className="toolbar-btn" title="Italic" onClick={() => handleToolbar('*', '*', '斜体')}><i>I</i></button>
        <button className="toolbar-btn" title="Code" onClick={() => handleToolbar('`', '`', 'コード')}>``</button>
        <button className="toolbar-btn" title="Quote" onClick={() => handleToolbarLine('> ')}>❝</button>
        <button className="toolbar-btn" title="H2" onClick={() => handleToolbarLine('## ')}>H2</button>
        <button className="toolbar-btn" title="H3" onClick={() => handleToolbarLine('### ')}>H3</button>
        <button className="toolbar-btn" title="List" onClick={() => handleToolbarLine('- ')}>• ―</button>
        <button className="toolbar-btn" title="HR" onClick={() => handleToolbarLine('---')}>――</button>
      </div>
      <div className="editor-pane">
        <textarea
          id={`ta-${chapterId}`}
          ref={taRef}
          placeholder={`マークダウンでメモを書こう…\n\n例：\n## 気づき\n- ポイント1\n- ポイント2\n\n> 印象に残った一文`}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div
        className="preview-pane markdown-preview"
        id={`pv-${chapterId}`}
        dangerouslySetInnerHTML={
          value?.trim()
            ? { __html: preview }
            : undefined
        }
      >
        {!value?.trim() && (
          <span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
            まだ何も書いていません
          </span>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import MarkdownEditor from './MarkdownEditor';

export default function ChapterItem({ chapter, index, bookId, onUpdateNote, onToggleDone, onDelete }) {
  const [open, setOpen] = useState(false);

  const statusBadge = chapter.done
    ? <span className="badge badge-green">✓ 読了</span>
    : <span className="badge" style={{ opacity: 0.6 }}>未読了</span>;

  return (
    <div className="chapter-item" id={`ch-${chapter.id}`}>
      <div className="chapter-header" onClick={() => setOpen((o) => !o)}>
        <span className="chapter-number">Ch.{index + 1}</span>
        <span className="chapter-name">{chapter.name}</span>
        <span className="chapter-status">{statusBadge}</span>
        <svg
          className="chapter-toggle"
          width="16" height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transform: open ? 'rotate(90deg)' : undefined, transition: 'transform .2s' }}
        >
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>

      {open && (
        <>
          <MarkdownEditor
            chapterId={chapter.id}
            value={chapter.note}
            onChange={(note) => onUpdateNote(bookId, chapter.id, note)}
          />
          <div className="chapter-footer">
            <label className="read-checkbox">
              <input
                type="checkbox"
                checked={chapter.done}
                onChange={(e) => onToggleDone(bookId, chapter.id, e.target.checked)}
              />
              読了マーク
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(bookId, chapter.id)}
              >
                削除
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

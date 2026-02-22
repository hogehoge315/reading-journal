import ChapterItem from './ChapterItem';

export default function BookDetail({ book, onBack, onAddChapter, onDeleteBook, onUpdateNote, onToggleDone, onDeleteChapter }) {
  const total = book.chapters.length;
  const done  = book.chapters.filter((c) => c.done).length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="page active" id="page-detail">
      <div className="container">
        <button className="back-btn" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          本の一覧に戻る
        </button>

        <div className="book-header">
          <div>
            <div className="book-title" id="detailTitle">{book.title}</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }} id="detailBadges">
              {book.author && <span className="badge">✍️ {book.author}</span>}
            </div>
          </div>
          <div className="book-actions">
            <button className="btn btn-ghost btn-sm" onClick={onAddChapter}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              章を追加
            </button>
            <button className="btn btn-danger btn-sm" onClick={onDeleteBook}>削除</button>
          </div>
        </div>

        <div className="progress-wrap" id="progressWrap">
          <div className="progress-label">
            <span>読了進捗</span>
            <span id="progressText">{done} / {total} 章</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" id="progressFill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="chapters-header">
          <h3>章一覧</h3>
        </div>

        <div id="chaptersList">
          {total === 0 ? (
            <div className="empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <p>章がまだありません</p>
              <span>「章を追加」から記録を始めよう</span>
            </div>
          ) : (
            book.chapters.map((ch, idx) => (
              <ChapterItem
                key={ch.id}
                chapter={ch}
                index={idx}
                bookId={book.id}
                onUpdateNote={onUpdateNote}
                onToggleDone={onToggleDone}
                onDelete={onDeleteChapter}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

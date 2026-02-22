export default function BookCard({ book, onClick }) {
  const total = book.chapters.length;
  const done  = book.chapters.filter((c) => c.done).length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-title">{book.title}</div>
      {book.author && (
        <div style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: '10px' }}>
          {book.author}
        </div>
      )}
      <div className="card-meta">
        <span className="badge">{total} 章</span>
        {done > 0 && <span className="badge badge-green">✓ {done} 読了</span>}
        {total > 0 && <span style={{ color: 'var(--muted)' }}>{pct}%</span>}
      </div>
      {total > 0 && (
        <div style={{ marginTop: '12px' }}>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

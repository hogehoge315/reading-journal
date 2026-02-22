import BookCard from './BookCard';

export default function BookList({ books, onSelectBook, onAddBook }) {
  return (
    <div className="page active" id="page-list">
      <div className="container">
        <div className="hero">
          <h1>📚 Reading Journal</h1>
          <p>本ごと・章ごとに読書メモをマークダウンで記録しよう</p>
        </div>
        <div className="books-grid" id="booksGrid">
          {books.length === 0 && (
            <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <line x1="7" y1="8" x2="17" y2="8"/>
                <line x1="7" y1="12" x2="17" y2="12"/>
                <line x1="7" y1="16" x2="13" y2="16"/>
              </svg>
              <p>まだ本が登録されていません</p>
              <span>「本を追加」から最初の1冊を登録しよう</span>
            </div>
          )}
          {books.map((book) => (
            <BookCard key={book.id} book={book} onClick={() => onSelectBook(book.id)} />
          ))}
          <div className="card card-add" onClick={onAddBook}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="9"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            本を追加
          </div>
        </div>
      </div>
    </div>
  );
}

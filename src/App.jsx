import { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Modal from './components/Modal';
import Toast from './components/Toast';
import { useBooks } from './hooks/useBooks';

function App() {
  const { data, addBook, deleteBook, addChapter, deleteChapter, updateNote, toggleDone } = useBooks();

  const [currentBookId, setCurrentBookId] = useState(null);
  const [showAddBook, setShowAddBook] = useState(false);
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const toastTimer = useRef(null);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(''), 2500);
  }, []);

  const currentBook = data.books.find((b) => b.id === currentBookId);

  const handleAddBook = () => {
    if (!bookTitle.trim()) return;
    addBook(bookTitle.trim(), bookAuthor.trim());
    setBookTitle('');
    setBookAuthor('');
    setShowAddBook(false);
    toast('📖 本を追加しました！');
  };

  const handleDeleteBook = () => {
    if (!currentBook) return;
    if (!confirm(`「${currentBook.title}」を削除しますか？`)) return;
    deleteBook(currentBookId);
    setCurrentBookId(null);
    toast('本を削除しました');
  };

  const handleAddChapter = () => {
    if (!chapterName.trim()) return;
    addChapter(currentBookId, chapterName.trim());
    setChapterName('');
    setShowAddChapter(false);
    toast('📑 章を追加しました！');
  };

  const handleDeleteChapter = (bookId, chapterId) => {
    const book = data.books.find((b) => b.id === bookId);
    const ch = book?.chapters.find((c) => c.id === chapterId);
    if (!ch) return;
    if (!confirm(`「${ch.name}」を削除しますか？`)) return;
    deleteChapter(bookId, chapterId);
    toast('章を削除しました');
  };

  const handleToggleDone = (bookId, chapterId, done) => {
    toggleDone(bookId, chapterId, done);
    toast(done ? '✓ 読了マークを付けました！' : '読了マークを外しました');
  };

  const openAddBook = () => {
    setBookTitle('');
    setBookAuthor('');
    setShowAddBook(true);
  };

  return (
    <>
      {currentBook ? (
        <>
          <Header onAddBook={openAddBook} showAddBook={false} />
          <BookDetail
            book={currentBook}
            onBack={() => setCurrentBookId(null)}
            onAddChapter={() => { setChapterName(''); setShowAddChapter(true); }}
            onDeleteBook={handleDeleteBook}
            onUpdateNote={updateNote}
            onToggleDone={handleToggleDone}
            onDeleteChapter={handleDeleteChapter}
          />
        </>
      ) : (
        <>
          <Header onAddBook={openAddBook} />
          <BookList
            books={data.books}
            onSelectBook={setCurrentBookId}
            onAddBook={openAddBook}
          />
        </>
      )}

      {showAddBook && (
        <Modal
          id="addBookModal"
          title="📖 本を追加"
          onClose={() => setShowAddBook(false)}
          onConfirm={handleAddBook}
        >
          <div className="form-group">
            <label className="form-label">タイトル *</label>
            <input
              id="bookTitleInput"
              className="form-input"
              placeholder="例：JavaScript 入門"
              autoFocus
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">著者</label>
            <input
              id="bookAuthorInput"
              className="form-input"
              placeholder="例：山田 太郎"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-ghost" onClick={() => setShowAddBook(false)}>キャンセル</button>
            <button className="btn btn-primary" onClick={handleAddBook}>追加する</button>
          </div>
        </Modal>
      )}

      {showAddChapter && (
        <Modal
          id="addChapterModal"
          title="📑 章を追加"
          onClose={() => setShowAddChapter(false)}
          onConfirm={handleAddChapter}
        >
          <div className="form-group">
            <label className="form-label">章のタイトル *</label>
            <input
              id="chapterNameInput"
              className="form-input"
              placeholder="例：第1章 はじめに"
              autoFocus
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-ghost" onClick={() => setShowAddChapter(false)}>キャンセル</button>
            <button className="btn btn-primary" onClick={handleAddChapter}>追加する</button>
          </div>
        </Modal>
      )}

      <Toast message={toastMsg} />
    </>
  );
}

export default App;

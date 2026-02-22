import { useState, useCallback } from 'react';
import { loadData, saveData } from '../utils/storage';
import { uid } from '../utils/uid';

export function useBooks() {
  const [data, setData] = useState(() => loadData());

  const persist = useCallback((updater) => {
    setData((prev) => {
      const next = updater(prev);
      saveData(next);
      return next;
    });
  }, []);

  const addBook = useCallback((title, author) => {
    const book = { id: uid(), title, author, chapters: [], createdAt: Date.now() };
    persist((prev) => ({ ...prev, books: [book, ...prev.books] }));
    return book;
  }, [persist]);

  const deleteBook = useCallback((bookId) => {
    persist((prev) => ({ ...prev, books: prev.books.filter((b) => b.id !== bookId) }));
  }, [persist]);

  const addChapter = useCallback((bookId, name) => {
    const ch = { id: uid(), name, note: '', done: false, createdAt: Date.now() };
    persist((prev) => ({
      ...prev,
      books: prev.books.map((b) =>
        b.id === bookId ? { ...b, chapters: [...b.chapters, ch] } : b
      ),
    }));
    return ch;
  }, [persist]);

  const deleteChapter = useCallback((bookId, chapterId) => {
    persist((prev) => ({
      ...prev,
      books: prev.books.map((b) =>
        b.id === bookId
          ? { ...b, chapters: b.chapters.filter((c) => c.id !== chapterId) }
          : b
      ),
    }));
  }, [persist]);

  const updateNote = useCallback((bookId, chapterId, note) => {
    persist((prev) => ({
      ...prev,
      books: prev.books.map((b) =>
        b.id === bookId
          ? {
              ...b,
              chapters: b.chapters.map((c) =>
                c.id === chapterId ? { ...c, note, updatedAt: Date.now() } : c
              ),
            }
          : b
      ),
    }));
  }, [persist]);

  const toggleDone = useCallback((bookId, chapterId, done) => {
    persist((prev) => ({
      ...prev,
      books: prev.books.map((b) =>
        b.id === bookId
          ? {
              ...b,
              chapters: b.chapters.map((c) =>
                c.id === chapterId ? { ...c, done } : c
              ),
            }
          : b
      ),
    }));
  }, [persist]);

  return { data, addBook, deleteBook, addChapter, deleteChapter, updateNote, toggleDone };
}

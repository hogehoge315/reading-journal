const STORAGE_KEY = 'reading-journal-data';

const DEFAULT_DATA = { books: [] };

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_DATA;
  } catch {
    return DEFAULT_DATA;
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

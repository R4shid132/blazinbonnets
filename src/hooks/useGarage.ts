import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'blazin-bonnets-garage';

function getStoredIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useGarage() {
  const [savedIds, setSavedIds] = useState<string[]>(getStoredIds);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    window.dispatchEvent(new Event('garage-updated'));
  }, [savedIds]);

  const toggle = useCallback((id: string) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  return { savedIds, toggle, isSaved, count: savedIds.length };
}

export function useGarageCount() {
  const [count, setCount] = useState(() => getStoredIds().length);

  useEffect(() => {
    const handler = () => setCount(getStoredIds().length);
    window.addEventListener('garage-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('garage-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return count;
}

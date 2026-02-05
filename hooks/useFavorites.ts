'use client';

import { useCallback, useEffect, useState } from 'react';

const FAVORITES_KEY = 'ali-favorites';

function readFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(readFavorites());

    const handleUpdate = () => setFavorites(readFavorites());
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('favorites-updated', handleUpdate as EventListener);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('favorites-updated', handleUpdate as EventListener);
    };
  }, []);

  const persist = useCallback((next: string[]) => {
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('favorites-updated'));
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      const current = readFavorites();
      if (current.includes(id)) {
        persist(current.filter((item) => item !== id));
      } else {
        persist([...current, id]);
      }
    },
    [persist]
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return {
    favorites,
    totalFavorites: favorites.length,
    toggleFavorite,
    isFavorite,
  };
}

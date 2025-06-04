import { useState, useEffect, useCallback } from 'react';

const SEARCH_HISTORY_KEY = 'search_history';

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);


  useEffect(() => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const addToHistory = useCallback((query: string) => {
    if (query.trim().length > 0) {
      setSearchHistory((prev) => {
        const newHistory = [query, ...prev.filter(q => q !== query)].slice(0, 10);
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
        return newHistory;
      });
    }
  }, []);

  const removeFromHistory = useCallback((queryToRemove: string) => {
    setSearchHistory((prev) => {
      const newHistory = prev.filter(query => query !== queryToRemove);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  return {
    searchHistory,
    addToHistory,
    removeFromHistory
  };
} 
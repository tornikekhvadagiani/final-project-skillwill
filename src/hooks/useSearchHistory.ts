import { useState, useEffect } from 'react';

const SEARCH_HISTORY_KEY = 'search_history';

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const addToHistory = (query: string) => {
    if (query.trim().length > 0) {
      setSearchHistory((prev) => {
        const newHistory = [query, ...prev.filter(q => q !== query)].slice(0, 10);
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
        return newHistory;
      });
    }
  };

  return {
    searchHistory,
    addToHistory
  };
} 
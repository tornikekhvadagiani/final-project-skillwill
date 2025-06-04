import { useState, useCallback, useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import PhotoGrid from './components/PhotoGrid';
import { useDebounce } from './hooks/useDebounce';
import { useSearchHistory } from './hooks/useSearchHistory';
import SearchInput from './components/SearchInput';
import { queryClient } from './react-query/queryClient';
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { searchHistory, addToHistory } = useSearchHistory();

  // Save to history on search
  useEffect(() => {
    addToHistory(debouncedSearchQuery);
  }, [debouncedSearchQuery, addToHistory]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleHistoryClick = (word: string) => {
    setSearchQuery(word);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-6">
              Unsplash ფოტო გალერეა
            </h1>
            <div className="max-w-xl mx-auto">
              <SearchInput value={searchQuery} onChange={handleSearch} />
              {searchHistory.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {searchHistory.map((word) => (
                    <button
                      key={word}
                      onClick={() => handleHistoryClick(word)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <PhotoGrid searchQuery={debouncedSearchQuery} />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;

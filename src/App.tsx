import { useState, useCallback, useEffect } from 'react';
import PhotoGrid from './components/PhotoGrid';
import { useDebounce } from './hooks/useDebounce';
import { useSearchHistory } from './hooks/useSearchHistory';
import SearchInput from './components/SearchInput';
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { searchHistory, addToHistory, removeFromHistory } = useSearchHistory();

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      addToHistory(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, addToHistory]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleHistoryClick = (word: string) => {
    setSearchQuery(word);
  };

  return (
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
                  <div
                    key={word}
                    className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
                    style={{ position: 'relative' }}
                  >
                    <span
                      onClick={() => handleHistoryClick(word)}
                      style={{ cursor: 'pointer' }}
                    >
                      {word}
                    </span>
                    <button
                      onClick={() => removeFromHistory(word)}
                      className="ml-2 text-gray-500 hover:text-red-600 focus:outline-none"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        lineHeight: 1,
                        padding: 0
                      }}
                      aria-label="წაშლა"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 4l8 8M12 4l-8 8"/>
                      </svg>
                    </button>
                  </div>
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
  );
}

export default App;

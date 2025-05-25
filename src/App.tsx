import { useState, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PhotoGrid from './components/PhotoGrid';
import { useDebounce } from './hooks/useDebounce';
import './App.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-6">
              Unsplash ფოტო გალერეა
            </h1>
            <div className="max-w-xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="ძებნა..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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

import { useQuery } from '@tanstack/react-query';
import { searchPhotos, getPhotos } from '../services/unsplashApi';
import type { Photo } from '../services/unsplashApi';
import { useState, useEffect } from 'react';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';

interface PhotoGridProps {
  searchQuery: string;
}

export default function PhotoGrid({ searchQuery }: PhotoGridProps) {
  const [page, setPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['photos', searchQuery, page],
    queryFn: () =>
      searchQuery.length > 0
        ? searchPhotos(searchQuery, page)
        : getPhotos(page),
  });

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">იტვირთება...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">შეცდომა მოხდა</div>;
  }

  if (!data?.results.length) {
    return <div className="text-center">ფოტოები ვერ მოიძებნა</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.results.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClick={() => setSelectedPhoto(photo)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          წინა
        </button>
        <span className="px-4 py-2">
          გვერდი {page}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          შემდეგი
        </button>
      </div>

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
} 
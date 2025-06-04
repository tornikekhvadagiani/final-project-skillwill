import { useQuery } from '@tanstack/react-query';
import { searchPhotos, getPhotos } from '../services/unsplashApi';
import { useState, useEffect } from 'react';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';
import LoadingSpinner from './LoadingSpinner';
import Pagination from './Pagination';
import type { Photo, PhotoGridProps } from '../types/photo';

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
    return <LoadingSpinner />;
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

      <Pagination currentPage={page} onPageChange={setPage} />

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
} 
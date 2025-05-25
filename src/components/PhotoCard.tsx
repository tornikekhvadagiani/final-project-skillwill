import type { Photo } from '../services/unsplashApi';

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

export default function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg bg-white"
      onClick={onClick}
    >
      <img
        src={photo.urls.regular}
        alt={photo.alt_description || 'Unsplash photo'}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
} 
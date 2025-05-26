import type { Photo } from '../services/unsplashApi';
import { useState } from 'react';

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
}

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
          >
            ✕
          </button>
          <div className="flex items-center justify-center min-h-[300px]">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-white bg-opacity-80">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
              </div>
            )}
            <img
              src={photo.urls.full}
              alt={photo.alt_description || 'Unsplash photo'}
              className={`w-full h-auto ${loading ? 'invisible' : 'visible'}`}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{photo.user.name}</h2>
              <p className="text-gray-600">@{photo.user.username}</p>
            </div>
            <div className="flex items-center gap-2">
              <span>❤️ {photo.likes}</span>
            </div>
          </div>
          {photo.description && (
            <p className="text-gray-700 mb-4">{photo.description}</p>
          )}
          <div className="text-sm text-gray-500">
            გამოქვეყნდა: {new Date(photo.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
} 
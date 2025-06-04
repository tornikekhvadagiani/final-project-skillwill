export interface Photo {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
  alt_description: string;
  description: string;
  user: {
    name: string;
    username: string;
  };
  likes: number;
  created_at: string;
}

export interface PhotoGridProps {
  searchQuery: string;
}

export interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

export interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
} 
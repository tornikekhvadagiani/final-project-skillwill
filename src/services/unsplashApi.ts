import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com';
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string; 

export interface Photo {
  id: string;
  urls: {
    full: string;
    regular: string;
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

export interface SearchPhotosResponse {
  results: Photo[];
  total: number;
  total_pages: number;
}

const unsplashApi = axios.create({
  baseURL: UNSPLASH_API_URL,
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

export const searchPhotos = async (query: string, page: number = 1) => {
  const response = await unsplashApi.get<SearchPhotosResponse>('/search/photos', {
    params: {
      query,
      page,
      per_page: 20,
    },
  });
  return response.data;
};

export const getPhoto = async (id: string) => {
  const response = await unsplashApi.get<Photo>(`/photos/${id}`);
  return response.data;
};

export const getPhotos = async (page: number = 1) => {
  const response = await unsplashApi.get<Photo[]>('/photos', {
    params: {
      page,
      per_page: 20,
    },
  });
  return {
    results: response.data,
    total: 0,
    total_pages: 0,
  };
}; 
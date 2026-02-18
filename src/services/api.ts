import axios from 'axios';

const API_KEY = '2ac243714eb51a261560fde07afdfaf1';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  popularity: number;
}

export interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const movieAPI = {
  getPopularMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/movie/popular', {
      params: { page }
    });
    return response.data;
  },

  getTrendingMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/trending/movie/week', {
      params: { page }
    });
    return response.data;
  },

  getTopRatedMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/movie/top_rated', {
      params: { page }
    });
    return response.data;
  },

  getMovieDetails: async (movieId: number): Promise<Movie> => {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  },

  searchMovies: async (query: string, page: number = 1): Promise<MovieResponse> => {
    const response = await api.get('/search/movie', {
      params: { query, page }
    });
    return response.data;
  },
};

export const getImageUrl = (path: string, size: string = 'original'): string => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : '';
};

import { movieAPI, getImageUrl } from './api';

// Mock the entire axios module
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn()
  }))
}));

describe('API Service Tests', () => {
  let mockAxiosInstance: any;
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxiosInstance = require('axios').create();
  });

  describe('movieAPI', () => {
    it('should fetch popular movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 1,
              title: 'Test Movie',
              overview: 'Test Overview',
              backdrop_path: '/test_backdrop.jpg',
              poster_path: '/test_poster.jpg',
              release_date: '2023-01-01',
              vote_average: 8.5,
              popularity: 100
            }
          ],
          page: 1,
          total_pages: 1,
          total_results: 1
        }
      };

      (mockAxiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await movieAPI.getPopularMovies();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/movie/popular', {
        params: { page: 1 }
      });
      expect(result).toEqual(mockResponse.data);
      expect(result.results[0].title).toBe('Test Movie');
      expect(result.results[0].id).toBe(1);
    });

    it('should fetch trending movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 2,
              title: 'Trending Movie',
              overview: 'Trending Overview',
              backdrop_path: '/trending_backdrop.jpg',
              poster_path: '/trending_poster.jpg',
              release_date: '2023-02-01',
              vote_average: 9.0,
              popularity: 200
            }
          ],
          page: 1,
          total_pages: 1,
          total_results: 1
        }
      };

      (mockAxiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await movieAPI.getTrendingMovies();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/trending/movie/week', {
        params: { page: 1 }
      });
      expect(result.results[0].title).toBe('Trending Movie');
      expect(result.results[0].vote_average).toBe(9.0);
    });

    it('should fetch top rated movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 3,
              title: 'Top Rated Movie',
              overview: 'Top Rated Overview',
              backdrop_path: '/top_rated_backdrop.jpg',
              poster_path: '/top_rated_poster.jpg',
              release_date: '2023-03-01',
              vote_average: 9.5,
              popularity: 150
            }
          ],
          page: 1,
          total_pages: 1,
          total_results: 1
        }
      };

      (mockAxiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await movieAPI.getTopRatedMovies();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/movie/top_rated', {
        params: { page: 1 }
      });
      expect(result.results[0].title).toBe('Top Rated Movie');
      expect(result.results[0].vote_average).toBe(9.5);
    });

    it('should fetch movie details successfully', async () => {
      const mockResponse = {
        data: {
          id: 4,
          title: 'Movie Details',
          overview: 'Movie Details Overview',
          backdrop_path: '/details_backdrop.jpg',
          poster_path: '/details_poster.jpg',
          release_date: '2023-04-01',
          vote_average: 8.0,
          popularity: 120
        }
      };

      (mockAxiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await movieAPI.getMovieDetails(4);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/movie/4');
      expect(result.title).toBe('Movie Details');
      expect(result.id).toBe(4);
    });

    it('should search movies successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 5,
              title: 'Search Result Movie',
              overview: 'Search Result Overview',
              backdrop_path: '/search_backdrop.jpg',
              poster_path: '/search_poster.jpg',
              release_date: '2023-05-01',
              vote_average: 7.5,
              popularity: 80
            }
          ],
          page: 1,
          total_pages: 1,
          total_results: 1
        }
      };

      (mockAxiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await movieAPI.searchMovies('Search Query');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/search/movie', {
        params: { query: 'Search Query', page: 1 }
      });
      expect(result.results[0].title).toBe('Search Result Movie');
    });

    it('should handle API errors gracefully', async () => {
      const errorMessage = 'API Error';
      (mockAxiosInstance.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(movieAPI.getPopularMovies()).rejects.toThrow(errorMessage);
    });
  });

  describe('getImageUrl', () => {
    it('should return correct image URL with default size', () => {
      const path = '/test_image.jpg';
      const result = getImageUrl(path);
      expect(result).toBe('https://image.tmdb.org/t/p/original/test_image.jpg');
    });

    it('should return correct image URL with custom size', () => {
      const path = '/test_image.jpg';
      const size = 'w300';
      const result = getImageUrl(path, size);
      expect(result).toBe('https://image.tmdb.org/t/p/w300/test_image.jpg');
    });

    it('should return empty string when path is null or undefined', () => {
      expect(getImageUrl('')).toBe('');
      expect(getImageUrl(null as any)).toBe('');
      expect(getImageUrl(undefined as any)).toBe('');
    });
  });

  describe('API Configuration', () => {
    it('should configure axios with correct base URL and API key', () => {
      const axios = require('axios');
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'https://api.themoviedb.org/3',
        params: {
          api_key: '2ac243714eb51a261560fde07afdfaf1',
          language: 'en-US',
        },
      });
    });
  });
});

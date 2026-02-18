import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { movieAPI } from './services/api';

// Mock the API service
jest.mock('./services/api');
const mockMovieAPI = movieAPI as jest.Mocked<typeof movieAPI>;

// Mock the components
jest.mock('./components/FeaturedMovie', () => {
  return function MockFeaturedMovie({ movie }: { movie: any }) {
    return <div data-testid="featured-movie">{movie.title}</div>;
  };
});

jest.mock('./components/MovieRow', () => {
  return function MockMovieRow({ title, movies }: { title: string; movies: any[] }) {
    return (
      <div data-testid="movie-row">
        <h2>{title}</h2>
        {movies.map(movie => (
          <div key={movie.id} data-testid="movie-card">{movie.title}</div>
        ))}
      </div>
    );
  };
});

describe('App Component Tests', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test Overview',
    backdrop_path: '/test_backdrop.jpg',
    poster_path: '/test_poster.jpg',
    release_date: '2023-01-01',
    vote_average: 8.5,
    popularity: 100
  };

  const mockMovieResponse = {
    results: [mockMovie],
    page: 1,
    total_pages: 1,
    total_results: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockMovieAPI.getPopularMovies.mockImplementation(() => new Promise(() => {}));
    mockMovieAPI.getTrendingMovies.mockImplementation(() => new Promise(() => {}));
    mockMovieAPI.getTopRatedMovies.mockImplementation(() => new Promise(() => {}));

    render(<App />);
    
    expect(screen.getByText('Loading movies...')).toBeInTheDocument();
  });

  it('should render movies after successful API calls', async () => {
    mockMovieAPI.getPopularMovies.mockResolvedValue(mockMovieResponse);
    mockMovieAPI.getTrendingMovies.mockResolvedValue(mockMovieResponse);
    mockMovieAPI.getTopRatedMovies.mockResolvedValue(mockMovieResponse);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('featured-movie')).toBeInTheDocument();
      expect(screen.getAllByText('Test Movie')).toHaveLength(4); // 1 featured + 3 in rows
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('movie-row')).toHaveLength(3);
    });

    // Check if movie rows are rendered with correct titles
    expect(screen.getByText('Popular This Week')).toBeInTheDocument();
    expect(screen.getByText('Popular Movies')).toBeInTheDocument();
    expect(screen.getByText('Top Rated')).toBeInTheDocument();
  });

  it('should render error state when API calls fail', async () => {
    mockMovieAPI.getPopularMovies.mockRejectedValue(new Error('API Error'));
    mockMovieAPI.getTrendingMovies.mockRejectedValue(new Error('API Error'));
    mockMovieAPI.getTopRatedMovies.mockRejectedValue(new Error('API Error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Failed to fetch movies from API')).toBeInTheDocument();
    });

    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('should call API functions on component mount', async () => {
    mockMovieAPI.getPopularMovies.mockResolvedValue(mockMovieResponse);
    mockMovieAPI.getTrendingMovies.mockResolvedValue(mockMovieResponse);
    mockMovieAPI.getTopRatedMovies.mockResolvedValue(mockMovieResponse);

    render(<App />);

    await waitFor(() => {
      expect(mockMovieAPI.getPopularMovies).toHaveBeenCalledTimes(1);
      expect(mockMovieAPI.getTrendingMovies).toHaveBeenCalledTimes(1);
      expect(mockMovieAPI.getTopRatedMovies).toHaveBeenCalledTimes(1);
    });
  });

  it('should render Netflix header', async () => {
    mockMovieAPI.getPopularMovies.mockResolvedValue(mockMovieResponse);
    mockMovieAPI.getTrendingMovies.mockResolvedValue(mockMovieResponse);
    mockMovieAPI.getTopRatedMovies.mockResolvedValue(mockMovieResponse);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('NETFLIX')).toBeInTheDocument();
    });

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByText('TV Shows')).toBeInTheDocument();
    expect(screen.getByText('My List')).toBeInTheDocument();
  });

  it('should handle empty movie arrays', async () => {
    const emptyResponse = {
      results: [],
      page: 1,
      total_pages: 0,
      total_results: 0
    };

    mockMovieAPI.getPopularMovies.mockResolvedValue(emptyResponse);
    mockMovieAPI.getTrendingMovies.mockResolvedValue(emptyResponse);
    mockMovieAPI.getTopRatedMovies.mockResolvedValue(emptyResponse);

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByTestId('featured-movie')).not.toBeInTheDocument();
    });

    // Movie rows should still be rendered but empty
    await waitFor(() => {
      expect(screen.getAllByTestId('movie-row')).toHaveLength(3);
    });
  });
});

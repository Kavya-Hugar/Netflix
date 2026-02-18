import React, { useState, useEffect, useRef } from 'react';
import FeaturedMovie from './components/FeaturedMovie';
import MovieRow from './components/MovieRow';
import { movieAPI, Movie } from './services/api';
import './App.css';

const App: React.FC = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const [popularData, trendingData, topRatedData] = await Promise.all([
          movieAPI.getPopularMovies(),
          movieAPI.getTrendingMovies(),
          movieAPI.getTopRatedMovies()
        ]);

        setPopularMovies(popularData.results);
        setTrendingMovies(trendingData.results);
        setTopRatedMovies(topRatedData.results);

        // Set featured movie as the first popular movie
        if (popularData.results.length > 0) {
          setFeaturedMovie(popularData.results[0]);
        }
      } catch (err) {
        setError('Failed to fetch movies from API');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Auto-rotate featured movies
  useEffect(() => {
    if (popularMovies.length > 1 && !loading && !error) {
      intervalRef.current = setInterval(() => {
        setCurrentFeaturedIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % popularMovies.length;
          setFeaturedMovie(popularMovies[nextIndex]);
          return nextIndex;
        });
      }, 5000); // Change featured movie every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [popularMovies, loading, error]);

  // Manual navigation functions
  const goToPreviousMovie = () => {
    if (popularMovies.length > 1) {
      const newIndex = currentFeaturedIndex === 0 ? popularMovies.length - 1 : currentFeaturedIndex - 1;
      setCurrentFeaturedIndex(newIndex);
      setFeaturedMovie(popularMovies[newIndex]);
    }
  };

  const goToNextMovie = () => {
    if (popularMovies.length > 1) {
      const newIndex = (currentFeaturedIndex + 1) % popularMovies.length;
      setCurrentFeaturedIndex(newIndex);
      setFeaturedMovie(popularMovies[newIndex]);
    }
  };

  // Pause auto-rotation on hover
  const pauseRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resumeRotation = () => {
    if (popularMovies.length > 1 && !loading && !error) {
      intervalRef.current = setInterval(() => {
        setCurrentFeaturedIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % popularMovies.length;
          setFeaturedMovie(popularMovies[nextIndex]);
          return nextIndex;
        });
      }, 5000);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <h1>NETFLIX</h1>
        </div>
        <nav className="nav">
          <button className="nav-btn">Home</button>
          <button className="nav-btn">Movies</button>
          <button className="nav-btn">TV Shows</button>
          <button className="nav-btn">My List</button>
        </nav>
      </header>

      <main className="main-content">
        {featuredMovie && (
          <FeaturedMovie 
            movie={featuredMovie}
            currentIndex={currentFeaturedIndex}
            totalMovies={popularMovies.length}
            onPrevious={goToPreviousMovie}
            onNext={goToNextMovie}
            onPause={pauseRotation}
            onResume={resumeRotation}
          />
        )}
        
        <div className="movie-rows">
          <MovieRow title="Popular This Week" movies={trendingMovies.slice(0, 6)} />
          <MovieRow title="Popular Movies" movies={popularMovies.slice(0, 6)} />
          <MovieRow title="Top Rated" movies={topRatedMovies.slice(0, 6)} />
        </div>
      </main>
    </div>
  );
};

export default App;

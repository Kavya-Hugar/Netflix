import React from 'react';
import { Movie } from '../services/api';
import { getImageUrl } from '../services/api';

interface FeaturedMovieProps {
  movie: Movie;
  onPrevious?: () => void;
  onNext?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  currentIndex?: number;
  totalMovies?: number;
}

const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ 
  movie, 
  onPrevious, 
  onNext, 
  onPause, 
  onResume,
  currentIndex = 0,
  totalMovies = 1 
}) => {
  return (
    <div 
      className="featured-movie"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
    >
      <div className="featured-backdrop">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="backdrop-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/1920x1080/333/fff?text=No+Image';
          }}
        />
        <div className="featured-overlay"></div>
      </div>
      
      {/* Navigation Controls */}
      {totalMovies > 1 && (
        <>
          <button className="featured-nav-btn featured-nav-prev" onClick={onPrevious}>
            ‹
          </button>
          <button className="featured-nav-btn featured-nav-next" onClick={onNext}>
            ›
          </button>
          
          {/* Progress Indicators */}
          <div className="featured-indicators">
            {Array.from({ length: totalMovies }).map((_, index) => (
              <button
                key={index}
                className={`featured-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  // This would need to be handled by parent component
                  if (onNext && index > currentIndex) {
                    for (let i = 0; i < index - currentIndex; i++) {
                      onNext();
                    }
                  } else if (onPrevious && index < currentIndex) {
                    for (let i = 0; i < currentIndex - index; i++) {
                      onPrevious();
                    }
                  }
                }}
              />
            ))}
          </div>
        </>
      )}
      
      <div className="featured-content">
        <h1 className="featured-title">{movie.title}</h1>
        <div className="featured-meta">
          <span className="featured-rating">⭐ {movie.vote_average.toFixed(1)}</span>
          <span className="featured-year">
            {new Date(movie.release_date).getFullYear()}
          </span>
        </div>
        <p className="featured-description">{movie.overview}</p>
        <div className="featured-buttons">
          <button className="btn btn-primary">▶ Play</button>
          <button className="btn btn-secondary">ℹ More Info</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;

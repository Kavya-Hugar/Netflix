import React from 'react';
import { Movie } from '../services/api';
import { getImageUrl } from '../services/api';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  return (
    <div className="movie-row">
      <h2 className="movie-row-title">{title}</h2>
      <div className="movie-row-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={getImageUrl(movie.poster_path, 'w300')}
              alt={movie.title}
              className="movie-poster"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/300x450/333/fff?text=No+Image';
              }}
            />
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <div className="movie-meta">
                <span className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</span>
                <span className="movie-year">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;

# Netflix Clone

A Netflix-like frontend application built with React and TypeScript that fetches movie data from the TMDB (The Movie Database) API.

## Features

- **Netflix-style UI**: Dark theme with red accent colors matching Netflix's design
- **Movie Categories**: Display popular, trending, and top-rated movies
- **Featured Movie Banner**: Large hero section showcasing a featured movie
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **API Integration**: Fetches real movie data from TMDB API
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Graceful error handling with retry functionality
- **Comprehensive Testing**: Unit tests for API service and React components

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Axios** - HTTP client for API calls
- **Jest & React Testing Library** - Testing framework
- **CSS3** - Styling with responsive design

## API Configuration

The application uses the TMDB API with the following configuration:
- **API Key**: `2ac243714eb51a261560fde07afdfaf1`
- **Base URL**: `https://api.themoviedb.org/3`
- **Image Base URL**: `https://image.tmdb.org/t/p/`

## API Endpoints Used

- `/movie/popular` - Get popular movies
- `/trending/movie/week` - Get trending movies for the week
- `/movie/top_rated` - Get top-rated movies
- `/movie/{id}` - Get movie details
- `/search/movie` - Search movies

## Project Structure

```
netflix-clone/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── FeaturedMovie.tsx
│   │   └── MovieRow.tsx
│   ├── services/
│   │   ├── api.ts
│   │   └── api.test.ts
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── App.css
│   ├── index.tsx
│   └── setupTests.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd netflix-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running Tests

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Generate test coverage report:
```bash
npm test -- --coverage
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Testing

The application includes comprehensive tests:

### API Service Tests (`src/services/api.test.ts`)
- Tests all API endpoints (popular, trending, top-rated, movie details, search)
- Tests error handling
- Tests image URL generation
- Tests API configuration

### Component Tests (`src/App.test.tsx`)
- Tests loading states
- Tests successful data rendering
- Tests error states
- Tests API call integration
- Tests header rendering
- Tests empty data handling

## Features in Detail

### Featured Movie Section
- Displays the first popular movie as a featured banner
- Shows movie title, rating, year, and description
- Includes "Play" and "More Info" buttons
- Responsive backdrop image with overlay gradient

### Movie Rows
- Three categories: "Popular This Week", "Popular Movies", "Top Rated"
- Grid layout with hover effects
- Movie posters with title, rating, and year
- Responsive grid that adapts to screen size

### Navigation
- Fixed header with Netflix logo
- Navigation buttons: Home, Movies, TV Shows, My List
- Responsive design for mobile devices

### Error Handling
- Displays user-friendly error messages
- Retry button to reload data
- Graceful fallback for missing images

## API Data Validation

The application validates API data by:
1. **TypeScript Interfaces**: Strong typing for all API responses
2. **Error Boundaries**: Catches and displays API errors
3. **Test Coverage**: Comprehensive tests verify API integration
4. **Data Validation**: Ensures required fields are present before rendering

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is for educational purposes only. Netflix is a registered trademark of Netflix, Inc.

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;  // Store API key in .env
const BASE_URL = "https://api.themoviedb.org/3";
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Fetch Trending Movies
export const getTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// Fetch Upcoming Movies
export const getUpcomingMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// Fetch Top-Rated Movies
export const getTopRatedMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// Fetch Movie Details by ID
export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`);
  const data = await response.json();
  return data;
};

// Fetch Movie Trailers (YouTube)
export const getMovieTrailer = async (movieTitle) => {
  const response = await fetch(
    `${YOUTUBE_BASE_URL}?part=snippet&q=${encodeURIComponent(movieTitle + " trailer")}&key=${YOUTUBE_API_KEY}&maxResults=1`
  );
  const data = await response.json();
  return data.items.length > 0 ? `https://www.youtube.com/watch?v=${data.items[0].id.videoId}` : null;
};

// Fetch Movies by Search Query
export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results;
};

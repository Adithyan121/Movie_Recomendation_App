const API_KEY = import.meta.env.VITE_TMDB_API_KEY;  // Store API key in .env
const BASE_URL = "https://api.themoviedb.org/3";
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Fetch Trending Movies
console.log("TMDB API Key loaded:", API_KEY ? "Yes" : "No", API_KEY);

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

// --- NEW FEATURES ---

// Fetch Genres List
export const getGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres || [];
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

// Discover Movies (Filter by Genre, Year, Mood, Language)
export const discoverMovies = async ({ genreId, year, mood, language }) => {
  let query = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

  if (year) {
    query += `&primary_release_year=${year}`;
  }

  if (language) {
    query += `&with_original_language=${language}`;
  }

  // Combine Genre + Mood Mapping
  let activeGenreIds = [];

  if (genreId) activeGenreIds.push(genreId);

  if (mood) {
    const moodMap = {
      'happy': [35, 10751],     // Comedy, Family
      'sad': [18],              // Drama
      'exciting': [28, 12],     // Action, Adventure
      'scary': [27, 53],        // Horror, Thriller
      'romantic': [10749],      // Romance
      'thoughtful': [99, 36],   // Documentary, History
      'laugh': [35]             // Comedy
    };
    if (moodMap[mood]) {
      activeGenreIds.push(...moodMap[mood]);
    }
  }

  if (activeGenreIds.length > 0) {
    const uniqueIds = [...new Set(activeGenreIds)];
    query += `&with_genres=${uniqueIds.join('|')}`;
  }

  try {
    const response = await fetch(query);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error discovering movies:", error);
    return [];
  }
};

// Fetch Watch Providers
export const getMovieProviders = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results || {};
  } catch (error) {
    console.error("Error fetching movie providers:", error);
    return {};
  }
};

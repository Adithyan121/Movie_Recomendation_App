const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovies = async (url) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${url}&api_key=${TMDB_API_KEY}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching movies:", error);
        return null;
    }
};

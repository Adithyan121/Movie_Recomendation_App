import React, { useState } from "react";
import MovieCard from "../components/MovieCard";
import "./Search.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
;

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (event) => {
    event.preventDefault();
    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    const res = await fetch(searchURL);
    const data = await res.json();
    setMovies(data.results);
  };

  return (
    <div className="search">
      <h2>Search Movies</h2>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;

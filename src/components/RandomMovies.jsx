import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { getTrendingMovies } from "../../api";
import "../css/randomMovies.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RandomMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate(); // ✅ Initialize useNavigate

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const fetchRandomMovies = async () => {
    setLoading(true);
    setTimeout(async () => {
      const data = await getTrendingMovies();
      const shuffledMovies = data.sort(() => Math.random() - 0.5).slice(0, 7);
      setMovies(shuffledMovies);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchRandomMovies();
  }, []);

  const toggleWishlist = (movie) => {
    const updatedWishlist = wishlist.some(item => item.id === movie.id)
      ? wishlist.filter(item => item.id !== movie.id)
      : [...wishlist, movie];

    setWishlist(updatedWishlist);
  };

  return (
    <div className="random-movies-container">
      <h2>🎲 Random Movie Suggestions</h2>

      {loading ? (
        <div className="loading-message">🍿 Cooking movies for you...</div>
      ) : (
        <div className="carousel">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="movie-card"
              onClick={() => navigate(`/movie/${movie.id}`)} // ✅ Redirect to MovieDetails
            >
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              
              <button className="wishlist-btn" onClick={(e) => { e.stopPropagation(); toggleWishlist(movie); }}>
                {wishlist.some(item => item.id === movie.id) ? <FaHeart className="wishlist-icon active" /> : <FaRegHeart className="wishlist-icon" />}
              </button>

              <h3>{movie.title}</h3>
              <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}/10</p> {/* ✅ Display Rating */}
              <p className="movie-description">{movie.overview.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}

      <button onClick={fetchRandomMovies} className="random-btn">🎥 Suggest New Movies</button>
    </div>
  );
};

export default RandomMovies;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/movieCard.css";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa"; // Import heart icons

const MovieCard = ({ movie }) => {
  if (!movie || !movie.id) {
    return null;
  }

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const toggleWishlist = () => {
    let updatedWishlist = wishlist.some((item) => item.id === movie.id)
      ? wishlist.filter((item) => item.id !== movie.id) // Remove from wishlist
      : [...wishlist, movie]; // Add to wishlist

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
        <div className="overlay">
          <h3 className="title">{movie.title || "Unknown Title"}</h3>
          <p className="rating">
            <FaStar className="star-icon" /> {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10
          </p>
        </div>
      </Link>

      {/* Wishlist Button */}
      <button className="wishlist-btn" onClick={toggleWishlist}>
        {wishlist.some((item) => item.id === movie.id) ? (
          <FaHeart className="wishlist-icon active" />
        ) : (
          <FaRegHeart className="wishlist-icon" />
        )}
      </button>
    </div>
  );
};

export default MovieCard;

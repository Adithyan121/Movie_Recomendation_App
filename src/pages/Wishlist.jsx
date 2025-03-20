import React, { useState, useEffect } from "react";
import "../css/wishlist.css";
import { FaTrashAlt } from "react-icons/fa"; // Trash icon for remove button
import Navbar from "../components/Navbar";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from Local Storage on mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  // Remove Movie from Wishlist
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((movie) => movie.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div>
      <Navbar/>
      <div className="wishlist-container">
        <h2>🎬 My Wishlist</h2>

        {wishlist.length === 0 ? (
          <p className="empty-message">😔 Your wishlist is empty...</p>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((movie) => (
              <div key={movie.id} className="wishlist-card">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="wishlist-info">
                  <h3>{movie.title}</h3>
                  <p className="movie-description">{movie.overview.substring(0, 100)}...</p>
                  <button className="remove-btn" onClick={() => removeFromWishlist(movie.id)}>
                    <FaTrashAlt className="trash-icon" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

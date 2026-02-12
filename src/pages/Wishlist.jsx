import React, { useState, useEffect } from "react";
import "../css/wishlist.css";
import MovieCard from "../components/MovieCard"; // Reuse MovieCard
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from Local Storage on mount
  useEffect(() => {
    const loadWishlist = () => {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(savedWishlist);
    };

    loadWishlist();
    // Add event listener to update if changed in other tabs/components
    window.addEventListener('storage', loadWishlist);
    return () => window.removeEventListener('storage', loadWishlist);
  }, []);

  return (
    <div className="wishlist-page">
      <SEO title="My Wishlist" description="Your curated list of movies to watch." />
      <Navbar />

      <div className="wishlist-wrapper">
        <div className="wishlist-header">
          <h2 className="section-title">My Collection</h2>
          <p className="stats">{wishlist.length} Movies</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h3>Your collection is empty</h3>
            <p>Movies you add to your wishlist will appear here.</p>
          </div>
        ) : (
          <div className="layout-grid">
            {wishlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaSun, FaMoon, FaTimes } from "react-icons/fa";
import "../css/navbar.css"; // Updated CSS
import { searchMovies } from "../../api"; // Import search function

const Navbar = ({ onSearch }) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Debounce search (delay API call to optimize performance)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        handleLiveSearch(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleLiveSearch = async (query) => {
    const results = await searchMovies(query);
    setSearchResults(results);
    setShowResults(true);
  };

  return (
    <nav className="navbar">
      {/* Netflix-Style Logo */}
      <Link to="/" className="logo">
        MOVIE<span>ZONE</span>
      </Link>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          onFocus={() => setShowResults(true)}
        />
        <FaSearch className="search-icon" />

        {/* Close Search Button */}
        {searchTerm && (
          <button className="clear-search" onClick={() => setSearchTerm("")}>
            <FaTimes />
          </button>
        )}

        {/* Live Search Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="search-dropdown" onMouseDown={(e) => e.preventDefault()}>
            {searchResults.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="search-result-item"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="search-result-img"
                />
                <span>{movie.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Watchlist & Theme Toggle */}
      <div className="nav-links">
        <Link to="/watchlist" className="watchlist-link">
          <FaHeart className="watchlist-icon" />
        </Link>

        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

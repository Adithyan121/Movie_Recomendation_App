import React, { useEffect, useState } from "react";
import { getTrendingMovies, getMovieTrailer } from "../../api";
import "../css/hero.css";

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movies = await getTrendingMovies();
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);

        // Fetch trailer URL
        const trailer = await getMovieTrailer(randomMovie.title);
        setTrailerUrl(trailer);
      } catch (error) {
        console.error("Error fetching hero movie:", error);
      }
    };
    fetchMovie();
  }, []);

  if (!movie) return null; // Prevent rendering if no movie is available

  return (
    <>
      <div
        className="hero"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">{movie.title}</h1>
          <p className="hero-overview">{movie.overview.substring(0, 150)}...</p>
          <div className="hero-buttons">
            <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
              <button className="play-button">▶ Play</button>
            </a>
            <button className="info-button" onClick={() => setShowModal(true)}>
              ℹ More Info
            </button>
          </div>
        </div>
      </div>

      {/* Modal for More Info */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>{movie.title}</h2>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> ⭐ {movie.vote_average}/10</p>
            <p><strong>Genres:</strong> {movie.genre_ids.join(", ")}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;

import React, { useEffect, useState } from "react";
import { FaPlay, FaInfoCircle, FaCalendarAlt, FaStar, FaTags, FaAlignLeft } from "react-icons/fa";
import { getTrendingMovies, getMovieTrailer } from "../../api";
import "../css/hero.css";

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!movie) return null;

  return (
    <>
      <div
        className="hero"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundPositionY: `${offset * 0.5}px`,
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">{movie.title}</h1>
          <p className="hero-overview">{movie.overview.substring(0, 150)}...</p>


          <div className="hero-buttons">
            <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
              <button className="play-button"><FaPlay /> Play</button>
            </a>
            <button className="info-button" onClick={() => setShowModal(true)}>
              <FaInfoCircle /> More Info
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
            <p><strong><FaCalendarAlt /> Release Date:</strong> {movie.release_date}</p>
            <p><strong><FaStar /> Rating:</strong> {movie.vote_average}/10</p>
            <p><strong><FaTags /> Genres:</strong> {movie.genre_ids.join(", ")}</p>
            <p><strong><FaAlignLeft /> Overview:</strong> {movie.overview}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;

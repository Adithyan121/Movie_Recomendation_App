import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/movieDetails.css";
import { FaStar, FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";

import { getMovieProviders } from "../../api";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=videos,credits`
        );
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Extract trailer key
        const trailer = movieData.videos.results.find((vid) =>
          vid.type.includes("Trailer")
        );
        if (trailer) setTrailerKey(trailer.key);

        // Extract cast (only first 5 members)
        setCast(movieData.credits.cast.slice(0, 5));

        // Fetch Watch Providers
        const providers = await getMovieProviders(id);
        setProviders(providers);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );

  return (
    <div className="movie-page">
      <SEO
        title={`${movie.title} (${new Date(movie.release_date).getFullYear()})`}
        description={movie.overview}
        image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        url={`https://adithyan-phi.vercel.app/movie/${id}`}
      />
      <Navbar />

      {/* Immersive Hero Section */}
      <div className="movie-hero" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="movie-title">{movie.title}</h1>

          <div className="movie-meta">
            <span className="release-date">{new Date(movie.release_date).getFullYear()}</span>
            <span className="runtime">{movie.runtime} min</span>
            <span className="rating-badge">
              <FaStar className="star-icon" /> {movie.vote_average.toFixed(1)}
            </span>
          </div>

          <div className="hero-actions">
            {trailerKey && (
              <a
                href={`https://www.youtube.com/watch?v=${trailerKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-trailer"
              >
                <FaPlay /> Watch Trailer
              </a>
            )}
            {movie.homepage && (
              <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="btn-website">
                Official Site <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-wrapper">
        <div className="content-grid">
          {/* Left Column: Poster */}
          <div className="poster-column">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster-large"
            />
          </div>

          {/* Right Column: Details */}
          <div className="details-column">
            <div className="synopsis-section">
              <h2>Plot Synopsis</h2>
              <p className="overview-text">{movie.overview}</p>
            </div>

            <div className="tags-section">
              {movie.genres.map(g => <span key={g.id} className="genre-tag">{g.name}</span>)}
            </div>

            {/* Cast Row */}
            <div className="cast-section">
              <h3>Top Cast</h3>
              <div className="cast-scroll">
                {cast.map((actor) => (
                  <div key={actor.id} className="cast-card">
                    <img
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "https://via.placeholder.com/150"}
                      alt={actor.name}
                    />
                    <p>{actor.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Where to Watch */}
            {providers && (providers.US || providers.IN) && (
              <div className="providers-section">
                <h3>Where to Watch</h3>
                <div className="providers-grid">
                  {[...(providers.US?.flatrate || providers.IN?.flatrate || []), ...(providers.US?.buy || providers.IN?.buy || [])]
                    .filter((v, i, a) => a.findIndex(t => (t.provider_id === v.provider_id)) === i) // unique
                    .slice(0, 5) // limit
                    .map((provider) => (
                      <img
                        key={provider.provider_id}
                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                        alt={provider.provider_name}
                        title={provider.provider_name}
                        className="provider-icon"
                      />
                    ))}
                </div>
              </div>
            )}

            <div className="info-grid">
              <div className="info-item">
                <span>Status</span>
                <p>{movie.status}</p>
              </div>
              <div className="info-item">
                <span>Budget</span>
                <p>${movie.budget.toLocaleString()}</p>
              </div>
              <div className="info-item">
                <span>Revenue</span>
                <p>${movie.revenue.toLocaleString()}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/movieDetails.css";
import { FaStar, FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");

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
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="loading">🍿 Loading movie details...</div>;

  return (
    <div>
      <Navbar/>
      <div className="movie-details">
        {/* Backdrop Image */}
        <div className="backdrop">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
          />
        </div>

        <div className="details-content">
          {/* Full-Size Poster */}
          <div className="poster">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          {/* Movie Information */}
          <div className="info">
            {/* <h1>{movie.title}</h1> */}
              <h1>{movie.title}</h1>
            <p className="description">{movie.overview}</p>

            <div className="additional-info">
              <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(", ")}</p>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Runtime:</strong> {movie.runtime} min</p>
              <p><strong>Popularity:</strong> {Math.round(movie.popularity)}</p>
              <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
              {movie.homepage && (
                <p>
                  <strong>Website:</strong>{" "}
                  <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                    Official Page <FaExternalLinkAlt />
                  </a>

                </p>
              )}
            </div>

            {/* Rating */}
            <div className="rating">
              <FaStar className="star-icon" /> {movie.vote_average.toFixed(1)}/10
            </div>

            {/* Cast List */}
            <div className="cast">
              <h3>Top Cast:</h3>
              <div className="cast-list">
                {cast.map((actor) => (
                  <div key={actor.id} className="cast-member">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : "https://via.placeholder.com/200"
                      }
                      alt={actor.name}
                    />
                    <p>{actor.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Watch Trailer Button */}
            {trailerKey && (
              <a
                href={`https://www.youtube.com/watch?v=${trailerKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-trailer-btn"
              >
                <FaPlay className="play-icon" /> Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

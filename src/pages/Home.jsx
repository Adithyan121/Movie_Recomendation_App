import React, { useState, useEffect } from "react";
import "../css/home.css";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies, getUpcomingMovies, getTopRatedMovies } from "../../api";
import Navbar from "../components/Navbar";
import RandomMovies from "../components/RandomMovies"
import Footer from "../components/Footer"
import Hero from "../components/Hero";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const trending = await getTrendingMovies();
        const upcoming = await getUpcomingMovies();
        const topRated = await getTopRatedMovies();

        setTrendingMovies(trending);
        setUpcomingMovies(upcoming);
        setTopRatedMovies(topRated);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };

    loadMovies();
  }, []);

  return (
    <div className="container">
      <Navbar className='navbar'/>
    <div className="home-container">
      <Hero className='hero'/>
      <RandomMovies className='movie-random'/>
      <h2 className="section-title">🔥 Trending Movies</h2>
      {loading ? <p className="loading-text">Loading movies...</p> : (
        <div className="movie-grid">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <h2 className="section-title">🎬 Upcoming Movies</h2>
      {loading ? <p className="loading-text">Loading movies...</p> : (
        <div className="movie-grid">
          {upcomingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <h2 className="section-title">⭐ Top Rated Movies</h2>
      {loading ? <p className="loading-text">Loading movies...</p> : (
        <div className="movie-grid">
          {topRatedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import "../css/home.css";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies, getUpcomingMovies, getTopRatedMovies, discoverMovies } from "../../api";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import SEO from "../components/SEO";
// import RandomMovies from "../components/RandomMovies"
import Footer from "../components/Footer"
import Hero from "../components/Hero";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
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

  const handleFilterChange = async (filters) => {
    // If no filters are active, reset to default view
    if (!filters.genreId && !filters.year && !filters.mood) {
      setIsFiltering(false);
      return;
    }

    setLoading(true);
    setIsFiltering(true);
    try {
      const results = await discoverMovies(filters);
      setFilteredMovies(results); // Handle empty results in UI
    } catch (error) {
      console.error("Error filtering movies:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <Navbar className='navbar' />
      <div className="home-container">
        <Hero className='hero' />

        <div className="filter-section">
          {/* SEO Content */}
          <div style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: '0' }}>
            <h1>Find the best movies for your mood</h1>
            <p>Whether you want to watch a happy comedy, a scary horror movie, or a romantic drama, our movie finder helps you decide what to watch tonight.</p>
            {/* FAQ structured data */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is Uncover Cinema?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Uncover Cinema is a movie recommendation app that helps you discover trending, upcoming, and top-rated movies based on your mood and genre preferences."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is Uncover Cinema free?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, Uncover Cinema is completely free to use for browsing movie details and recommendations."
                    }
                  }
                ]
              })}
            </script>
          </div>
          <h2 className="section-title">Discover Movies</h2>
          {/* Filter Component */}
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading movies...</p>
          </div>
        ) : isFiltering ? (
          <>
            <h2 className="section-title">Result for your Mood & Taste</h2>
            {filteredMovies.length > 0 ? (
              <div className="movie-grid">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>No movies found matching your criteria.</h3>
                <p>Try adjusting your mood or filters!</p>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="section-title">Trending Movies</h2>
            <div className="movie-grid">
              {trendingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <h2 className="section-title">Upcoming Movies</h2>
            <div className="movie-grid">
              {upcomingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <h2 className="section-title">Top Rated Movies</h2>
            <div className="movie-grid">
              {topRatedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";

const RandomMovies = ({ setHeroMovie }) => {
  const [randomMovies, setRandomMovies] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchRandomMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        const movies = response.data.results;

        if (movies.length > 0) {
          const shuffledMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 5);
          setRandomMovies(shuffledMovies);
        }
      } catch (error) {
        console.error("Error fetching random movies:", error);
      }
    };

    fetchRandomMovies();
  }, [API_KEY]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (randomMovies.length > 0) {
        setHeroMovie(randomMovies[index]);
        index = (index + 1) % randomMovies.length;
      }
    }, 5000); // Change movie every 5 seconds

    return () => clearInterval(interval);
  }, [randomMovies, setHeroMovie]);

  return null;
};

export default RandomMovies;

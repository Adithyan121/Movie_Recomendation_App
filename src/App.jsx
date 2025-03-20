import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import MovieDetails from "./pages/MovieDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<Wishlist />} />
        <Route path="/movie/:id" element={<MovieDetails />} /> {/* Fixed route */}
      </Routes>
    </Router>
  );
};

export default App;

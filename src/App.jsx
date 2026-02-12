import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const FAQPage = lazy(() => import("./pages/FAQPage"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#121212', color: 'white' }}>
          Loading...
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Wishlist />} />
          <Route path="/movie/:id/:slug?" element={<MovieDetails />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

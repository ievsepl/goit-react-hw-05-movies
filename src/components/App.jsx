import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { trendMovie } from 'services/Api';
import { ToastContainer } from 'react-toastify';

import { Container, Header, Link } from './App.styled';
import { useEffect, useState } from 'react';
// import { useState } from 'react';
// import Box from './Box/Box';

const Home = lazy(() => import('../pages/Home/Home'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const Cast = lazy(() => import('../pages/Cast/Cast'));
const Reviews = lazy(() => import('../pages/Reviews/Reviews'));

export const App = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  //
  // ==========================Trend Movie for homepage==========================
  //
  useEffect(() => {
    trendMovie().then(results => {
      return setTrendMovies(results);
    });
  }, []);

  return (
    <Container>
      <Header as="ul">
        <Link to="">Home</Link>
        <Link to="Movies">Movies</Link>
      </Header>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="" element={<Home trendMovies={trendMovies} />} />
          <Route path="Movies" element={<Movies />} />
          <Route path="Movies/:movieId" element={<MovieDetails />}>
            <Route path="Cast" element={<Cast />} />
            <Route path="Reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer autoClose={2000} />
    </Container>
  );
};

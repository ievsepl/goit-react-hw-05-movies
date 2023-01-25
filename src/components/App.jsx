import { Routes, Route } from 'react-router-dom';
// import Box from './Box/Box';
import { trendMovie } from 'services/Api';
import { ToastContainer } from 'react-toastify';

import { Home } from '../pages/Home/Home';
import { Movies } from '../pages/Movies/Movies';
import { MovieDetails } from '../pages/MovieDetails/MovieDetails';
import { NotFound } from '../pages/NotFound/NotFound';
import { Cast } from '../pages/Cast/Cast';
import { Reviews } from '../pages/Reviews/Reviews';
import { Container, Header, Link } from './App.styled';
import { useEffect, useState } from 'react';
// import { useState } from 'react';

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
      <Header>
        <Link to="">Home</Link>
        <Link to="Movies">Movies</Link>
      </Header>

      <Routes>
        <Route path="" element={<Home trendMovies={trendMovies} />} />
        <Route path="Movies" element={<Movies />} />
        <Route path="Movies/:movieId" element={<MovieDetails />}>
          <Route path="Cast" element={<Cast />} />
          <Route path="Reviews" element={<Reviews />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer autoClose={2000} />
    </Container>
  );
};

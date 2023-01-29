import { useEffect, useState } from 'react';

import { MovieList } from 'components/MovieList/MovieList';
import { trendMovie } from 'services/Api';

const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  //
  // ==========================Trend Movie for homepage==========================
  //
  useEffect(() => {
    trendMovie().then(results => {
      return setTrendMovies(results);
    });
  }, []);

  return <MovieList askedMovies={trendMovies} />;
};
export default Home;

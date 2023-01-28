import { MovieList } from 'components/MovieList/MovieList';

export const Home = ({ trendMovies }) => {
  return <MovieList askedMovies={trendMovies} />;
};

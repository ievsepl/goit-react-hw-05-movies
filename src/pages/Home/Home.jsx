import { MovieList } from 'components/MovieList/MovieList';

const Home = ({ trendMovies }) => {
  return <MovieList askedMovies={trendMovies} />;
};
export default Home;

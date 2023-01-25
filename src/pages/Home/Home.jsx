import { NavLink } from 'react-router-dom';

export const Home = ({ trendMovies }) => {
  return (
    <ul>
      {trendMovies.map(trendMovie => {
        return (
          <li key={trendMovie.id}>
            <NavLink to={`Movies/${trendMovie.id}`}>
              {trendMovie.name ?? trendMovie.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

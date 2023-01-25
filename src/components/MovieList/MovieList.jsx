import Box from 'components/Box/Box';
import { Link, useLocation } from 'react-router-dom';

export const MovieList = ({ askedMovies }) => {
  const location = useLocation();
  return (
    <Box as="ul">
      {askedMovies.map(({ title, name, id }) => {
        // console.log(id);
        return (
          <li key={id}>
            <Link to={`${id}`} state={{ from: location }}>
              {name ?? title}
            </Link>
          </li>
        );
      })}
    </Box>
  );
};

import PropTypes from 'prop-types';

import Box from 'components/Box/Box';
import { Link, useLocation } from 'react-router-dom';

export const MovieList = ({ askedMovies }) => {
  const location = useLocation();
  console.log(location);

  return (
    <Box as="ul">
      {askedMovies.map(({ title, name, id }) => {
        return (
          <li key={id}>
            <Link to={`/Movies/${id}`} state={{ from: location }}>
              {name ?? title}
            </Link>
          </li>
        );
      })}
    </Box>
  );
};
MovieList.propTypes = {
  askedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

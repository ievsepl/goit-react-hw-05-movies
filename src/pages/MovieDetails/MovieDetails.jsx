import { useEffect, useState } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';

import { Link } from './MovieDetails.styled';
import Box from 'components/Box/Box';
import {
  movieById,
  NO_POSTER,
  BASE_POSTER_URL,
  POSTER_SIZE,
} from 'services/Api';

const MovieDetails = () => {
  const [movieData, setMovieData] = useState([]);
  const [genres, setGenres] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();

  console.log(NO_POSTER);

  useEffect(() => {
    movieById(movieId).then(response => {
      const { data } = response;
      setMovieData(data);
      setGenres(data.genres);
    });
  }, [movieId]);
  // const navigate = useNavigate();
  const turnBack = location.state?.from ?? '/Movies';
  return (
    <Box>
      {/* <button onClick={() => navigate(turnBack)}>Go back</button> */}
      <Link to={turnBack}>Back</Link>
      {/* <br /> */}
      <Box display="flex" mt="20px">
        {movieData.poster_path !== null ? (
          <img
            src={BASE_POSTER_URL + POSTER_SIZE + movieData.poster_path}
            alt={movieData.title}
          />
        ) : (
          <img src={NO_POSTER} alt={movieData.title} width="300px" />
        )}
        <Box p="20px">
          <h2>
            {movieData.title}({movieData.release_date})
          </h2>
          <p>{movieData.overview}</p>
          <Box mt="15px">
            <h3>Genres:</h3>
            <Box m="0px" as="ul">
              {genres.map(({ id, name }) => {
                return <li key={id}>{name}</li>;
              })}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box p="8px" mt="20px">
        <Link to="Cast" state={location.state}>
          Cast
        </Link>
        <Link to="Reviews" state={location.state}>
          Reviews
        </Link>
      </Box>

      <Outlet />
    </Box>
  );
};
export default MovieDetails;

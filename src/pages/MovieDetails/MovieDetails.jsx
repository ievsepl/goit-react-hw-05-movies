import Box from 'components/Box/Box';
import { useEffect, useState } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { movieById, BASE_POSTER_URL, POSTER_SIZE } from 'services/Api';
import { Link } from './MovieDetails.styled';

// import { Cast } from './pages/Cast/Cast';
// import { Reviews } from './pages/Reviews/Reviews';

export const MovieDetails = () => {
  const [movieData, setMovieData] = useState([]);
  const [genres, setGenres] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();

  // console.log(movieId);

  useEffect(() => {
    movieById(movieId).then(response => {
      const { data } = response;
      // console.log(data);
      setMovieData(data);
      setGenres(data.genres);
      // console.log(data.genres);
    });
  }, [movieId]);
  const turnBack = location.state?.from ?? '/Movies';
  return (
    <Box>
      {/* <button type="button">Back</button> */}
      <Link to={turnBack}>Back</Link>
      {/* <br /> */}
      <Box display="flex" mt="20px">
        <img
          src={BASE_POSTER_URL + POSTER_SIZE + movieData.poster_path}
          alt={movieData.title}
        />
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
// const location = useLocation();
//   console.log(location.state); // { from: "/dashboard?name=hoodie" }

//   return <Link to={location.state.from}>Back to products</Link>;
// };
//
//
//

//  const backLinkHref = location.state?.from ?? "/products";

//   return <Link to={backLinkHref}>Back to products</Link>;
// };

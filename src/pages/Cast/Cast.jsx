import Box from 'components/Box/Box';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  castMovieById,
  BASE_POSTER_URL,
  CAST_SIZE,
  NO_PHOTO,
} from 'services/Api';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    castMovieById(movieId).then(({ data: { cast } }) => setCast(cast));
  }, [movieId]);
  console.log(cast);
  return (
    <>
      {cast.length !== 0 ? (
        <Box as="ul">
          {cast.map(({ character, name, profile_path, id }) => {
            return (
              <Box key={id} display="flex" m="10px" as="li">
                {/* <img
                  src={BASE_POSTER_URL + CAST_SIZE + profile_path}
                  alt={name}
                /> */}
                {profile_path !== null ? (
                  <img
                    src={BASE_POSTER_URL + CAST_SIZE + profile_path}
                    alt={name}
                  />
                ) : (
                  <img src={NO_PHOTO} alt={name} width="45px" />
                )}
                <Box ml="5px">
                  <Box fontSize="15px" as="h2">
                    {name}
                  </Box>
                  <p>
                    character: <br />
                    {character}
                  </p>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        <p>There are no information about cast for this movie</p>
      )}
    </>
  );
};
export default Cast;

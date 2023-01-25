import Box from 'components/Box/Box';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { castMovieById, BASE_POSTER_URL, CAST_SIZE } from 'services/Api';

export const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    castMovieById(movieId).then(({ data: { cast } }) => setCast(cast));
  }, [movieId]);

  return (
    <Box as="ul">
      {cast.map(({ character, name, profile_path, id }) => {
        return (
          <Box key={id} display="flex" m="10px" as="li">
            <img src={BASE_POSTER_URL + CAST_SIZE + profile_path} alt={name} />
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
  );
};

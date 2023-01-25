import Box from 'components/Box/Box';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { reviewsMovieById } from 'services/Api';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    reviewsMovieById(movieId).then(
      ({ data: { results } }) => setReviews(results)
      // console.log(results)
    );
  }, [movieId]);
  return (
    <Box as="ul">
      {reviews.map(({ author, id, content }) => {
        return (
          <li key={id}>
            <h2>{author}</h2>
            <p>{content}</p>
          </li>
        );
      })}
    </Box>
  );
};

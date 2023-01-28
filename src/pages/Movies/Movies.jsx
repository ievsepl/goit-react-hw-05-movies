import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from 'components/Box/Box';
import { MovieList } from 'components/MovieList/MovieList';
import { Searchbar } from 'components/Seachbar/Searchbar';
import { queryByName } from 'services/Api';
// console.log(filter);
// idle - простій
// pending - очікується
// resolved - успішно виконане
// rejected - відхилено(помилка)]
export const Movies = () => {
  const [askedMovies, setAskedMovies] = useState([]);
  // const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const filter = searchParams.get('filter');
  // const filter = query;

  // const onSubmitMovieQuery = query => {
  //   setQuery(query);
  // };

  useEffect(() => {
    if (filter === '' || filter === null) {
      return;
    }
    setStatus('pending');

    // cons ole.log(filter);
    // console.log(page);
    queryByName(filter).then(response => {
      if (response.results.length === 0) {
        return toast.error('We have no movie by your query');
      } else if (response.results.length < 20) {
        toast.warn('There are no more images to load!');
        setStatus('idle');
      }
      setAskedMovies(response.results);
      // setAskedMovies(prev => {
      //   console.log(prev, response.results);

      //   if (prev === []) {
      //     return response.results;
      //   } else {
      //     return [...prev, ...response.results];
      //   }
      // });
      setStatus('resolved');
      console.log(response.results);
    });
  }, [filter]);

  // const fetchAskedMovies = () => {
  //   queryByName(filter, page).then(response => {
  //     if (response.results.length === 0) {
  //       return toast.error('We have no movie by your query');
  //     }
  //     setAskedMovies(prev => {
  //       console.log(prev, response.results);

  //       if (prev === response.results) {
  //         return prev;
  //       } else {
  //         return [...prev, ...response.results];
  //       }
  //     });
  //     console.log('second');
  //     console.log(response.results);
  //   });
  // };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
    setSearchParams({ filter: filter, page: page + 1 });
  };

  return (
    <Box>
      <Searchbar />
      {status === 'resolved' ? (
        <MovieList askedMovies={askedMovies} />
      ) : (
        <p>Write your query</p>
      )}
      {status === 'resolved' && (
        <button type="button" onClick={onLoadMore}>
          Load more
        </button>
      )}
    </Box>
  );
};
// getAskedMovies={getAskedMovies};
// onSubmitMovieQuery = { onSubmitMovieQuery }

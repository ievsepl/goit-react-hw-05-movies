import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from 'components/Box/Box';
import { MovieList } from 'components/MovieList/MovieList';
import { Searchbar } from 'components/Seachbar/Searchbar';
import { queryByName } from 'services/Api';
import { useRef } from 'react';
// idle - простій
// pending - очікується
// resolved - успішно виконане
// rejected - відхилено(помилка)
//
const Movies = () => {
  const initFetch = useRef(true);
  const [askedMovies, setAskedMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  // const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  // const filter = searchParams.get('filter');
  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );
  const { filter, page } = params;
  // console.log(searchValue);
  const inputValue = searchBarValue => {
    setSearchValue(searchBarValue);
  };

  if (searchValue !== '') {
    setAskedMovies([]);
    setSearchValue('');
  }

  useEffect(() => {
    // setAskedMovies([]);
    if (filter === '' || filter === undefined) {
      return;
    }

    setStatus('pending');
    queryByName(filter, page).then(response => {
      setAskedMovies(prev => {
        return [...prev, ...response.results];
      });

      setStatus('resolved');

      if (response.results.length === 0) {
        return toast.error('We have no movie by your query');
      } else if (response.results.length < 20) {
        toast.warn('There are no more images to load!');
        setStatus('idle');
      }
      // setAskedMovies(response.results);

      setStatus('resolved');
      initFetch.current = false;
      console.log(response.results);
    });
  }, [filter, page]);

  const onLoadMore = () => {
    // setPage(prev => prev + 1);
    setSearchParams({ filter: filter, page: Number(page) + 1 });
  };

  return (
    <Box>
      <Searchbar inputValue={inputValue} />
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
export default Movies;

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from 'components/Box/Box';
import { MovieList } from 'components/MovieList/MovieList';
import { Searchbar } from 'components/Seachbar/Searchbar';
import { queryByName } from 'services/Api';
// idle - простій
// pending - очікується
// resolved - успішно виконане
// rejected - відхилено(помилка)
//
const Movies = () => {
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
  console.log(searchValue);
  const inputValue = searchValue => {
    setSearchValue(searchValue);
  };
  useEffect(() => {
    // setFilter('');
    if (filter === '' || filter === undefined) {
      return;
    }
    // if (searchValue === '') {
    //   return;
    // }
    setStatus('pending');

    queryByName(filter, page).then(response => {
      if (response.results.length === 0) {
        return toast.error('We have no movie by your query');
      } else if (response.results.length < 20) {
        toast.warn('There are no more images to load!');
        setStatus('idle');
      }
      setAskedMovies(response.results);
      // setAskedMovies(prev => {
      //   console.log(prev, response.results);

      //   if (searchValue === '') {
      //     return response.results;
      //   } else {
      //     return [...prev, ...response.results];
      //   }
      // });
      setStatus('resolved');
      console.log(response.results);
    });
  }, [filter, page, searchValue]);

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

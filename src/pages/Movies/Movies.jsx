import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from 'components/Box/Box';
import { MovieList } from 'components/MovieList/MovieList';
import { Searchbar } from 'components/Seachbar/Searchbar';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { queryByName } from 'services/Api';

export const Movies = () => {
  const [askedMovies, setAskedMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  console.log(page);

  const filter = searchParams.get('filter');
  // const page = searchParams.get('page');
  const onLoadMore = () => {
    setPage(prev => prev + 1);
    setSearchParams({ filter: filter, page: page + 1 });

    console.log(page);

    // onGetFilms();
  };

  useEffect(() => {
    if (filter === null) {
      return;
    }
    queryByName(filter, page).then(response => {
      if (response.results.length === 0) {
        return toast.error('We have no movie by your query');
      }
      // setAskedMovies(response.results);
      setAskedMovies(prev => [...prev, ...response.results]);

      console.log(response.results);
    });
  }, [filter, page]);

  // const getAskedMovies = (filter, page) => {
  //   console.log(filter, page);
  //   queryByName(filter, page).then(response => {
  //     setAskedMovies(response.results);

  //     // setAskedMovies(prev => [...prev, response.results]);
  //     console.log(response.results);
  //   });
  // };

  return (
    <Box>
      <Searchbar />
      <MovieList askedMovies={askedMovies} />
      <button type="button" onClick={onLoadMore}>
        Load more
      </button>
    </Box>
  );
};
// getAskedMovies={getAskedMovies};

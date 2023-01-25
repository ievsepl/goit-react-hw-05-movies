import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from 'components/Box/Box';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Searchbar = ({ getAskedMovies }) => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const onInputQuery = e => {
    setQuery(e.target.value.toLowerCase().trim());
    // setSearchParams(
    //   e.target.value !== '' ? { filter: e.target.value.trim(), page: 1 } : {}
    // );
  };

  const onSubmitSearchQuery = e => {
    e.preventDefault();
    if (query === '') {
      return toast.error('Please write your query');
    }
    setSearchParams(query !== '' ? { filter: query, page: 1 } : {});
    // console.log(searchParams.get('filter'));
    // console.log(searchParams.get('page'));

    // getAskedMovies(searchParams.get('filter'), searchParams.get('page'));
    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <Box>
      <form onSubmit={onSubmitSearchQuery}>
        <input type="text" value={query} onInput={onInputQuery} />
        <button type="submit">Search</button>
      </form>
    </Box>
  );
};

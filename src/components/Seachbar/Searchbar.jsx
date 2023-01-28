import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from 'components/Box/Box';
// import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Searchbar = ({ onSubmitMovieQuery }) => {
  // const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  // const onInputQuery = e => {
  //   setQuery(e.target.value.toLowerCase().trim());
  //   // setSearchParams(query !== '' ? { filter: query, page: 1 } : {});
  // };

  const onSubmitSearchQuery = e => {
    e.preventDefault();
    const search = e.currentTarget.query.value;

    if (search === '') {
      return toast.error('Please write your query');
    }
    setSearchParams(search !== '' ? { filter: search, page: 1 } : {});
    console.log(searchParams);
    // onSubmitMovieQuery(query);

    reset();
  };

  const reset = () => {
    // setQuery('');
  };

  return (
    <Box>
      <form onSubmit={onSubmitSearchQuery}>
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>
    </Box>
  );
};

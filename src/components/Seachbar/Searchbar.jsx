import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'react-router-dom';

import Box from 'components/Box/Box';

export const Searchbar = ({ inputValue }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmitSearchQuery = e => {
    e.preventDefault();
    const search = e.currentTarget.query.value;

    if (search === '') {
      return toast.error('Please write your query');
    }
    setSearchParams(search !== '' ? { filter: search, page: 1 } : {});
    console.log(searchParams);
    inputValue(e.currentTarget.query.value);

    e.currentTarget.query.value = '';
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

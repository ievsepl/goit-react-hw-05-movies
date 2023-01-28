import axios from 'axios';
export const FAKE_ACTOR_PHOTO =
  'https://cdn0.iconfinder.com/data/icons/people-12/24/Anonymous-2-512.png';
export const FAKE_POSTER_URL =
  'https://acmi-website-media-prod.s3.amazonaws.com/static/images/confused_travolta_original_acmi.original.jpg';
export const NOT_FOUND_IMAGE =
  'https://media.tenor.com/lndtLWwXZC0AAAAj/%D1%87%D1%82%D0%BE.gif';
export const NOT_FOUND =
  'https://ru.hostings.info/upload/images/2021/12/e11044b915dc39afc3004430606bd6d1.jpg';

const MY_KEY = '918bf745d942a4e02da57dd40b893231';
const moviesRequest = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/';
export const POSTER_SIZE = 'w300/';
export const CAST_SIZE = 'w45/';

export const trendMovie = async () => {
  try {
    const {
      data: { results },
    } = await moviesRequest.get(`/trending/all/day`, {
      params: { api_key: MY_KEY },
    });

    // console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const movieById = async id => {
  // console.log(id);

  try {
    const data = await moviesRequest.get(`/movie/${id}?`, {
      params: { api_key: MY_KEY },
    });

    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const castMovieById = async id => {
  // console.log(id);

  try {
    const data = await moviesRequest.get(`/movie/${id}/credits?`, {
      params: { api_key: MY_KEY },
    });

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const reviewsMovieById = async id => {
  // console.log(id);

  try {
    const data = await moviesRequest.get(`/movie/${id}/reviews?&page=1`, {
      params: { api_key: MY_KEY },
    });

    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const queryByName = async (filter, page) => {
  // console.log(filter);
  // console.log(page);

  try {
    const { data } = await moviesRequest.get(
      `/search/movie?&query=${filter}&page=${page}&include_adult=false`,
      { params: { api_key: MY_KEY } }
    );

    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

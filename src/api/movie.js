import axios from './axiosConfig';

export const getPopularMovies = (success, fail) => axios
  // .get('/movie/popular', { params: { api_key: process.env.REACT_APP_TMDB_API_KEY } })
  .get('/movie/popular', { params: { api_key: 'asdf' } })
  .then((response) => success(response.data))
  .catch((error) => fail(error.response.data));

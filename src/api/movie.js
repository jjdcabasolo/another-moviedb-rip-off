import axios from './axiosConfig';

export const getPopularMovies = (apiKey, success, fail, after) => axios
  .get('/movie/popular', { params: { api_key: apiKey } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

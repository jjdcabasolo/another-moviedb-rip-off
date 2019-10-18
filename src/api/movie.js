import axios from './axiosConfig';

export const getPopularMovies = (apiKey, success, fail, after = () => {}) => axios
  .get('/movie/popular', { params: { api_key: apiKey } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

export const getNowPlayingMovies = (apiKey, success, fail, after = () => {}) => axios
  .get('/movie/now_playing', { params: { api_key: apiKey } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

export const getTopRatedMovies = (apiKey, success, fail, after = () => {}) => axios
  .get('/movie/top_rated', { params: { api_key: apiKey } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

export const getUpcomingMovies = (apiKey, success, fail, after = () => {}) => axios
  .get('/movie/upcoming', { params: { api_key: apiKey } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

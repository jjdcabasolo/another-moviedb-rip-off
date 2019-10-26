import axios from './config';

export const getPopularMovies = (api_key, success, fail, after = () => {}) => axios
  .get('/movie/popular', { params: { api_key } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

export const getNowPlayingMovies = (api_key, success, fail, after = () => {}) => axios
  .get('/movie/now_playing', { params: { api_key } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

export const getTopRatedMovies = (api_key, success, fail, after = () => {}) => axios
  .get('/movie/top_rated', { params: { api_key } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

export const getUpcomingMovies = (api_key, success, fail, after = () => {}) => axios
  .get('/movie/upcoming', { params: { api_key } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

export const getHighestGrossingMovies = (api_key, success, fail, after = () => {}) => axios
  .get('/discover/movie', { params: { api_key, sort_by: 'revenue.desc' } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

export const getMovieDetails = (api_key, movie_id, success, fail, after = () => {}) => axios
  .get(`/movie/${movie_id}`, { params: { api_key } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

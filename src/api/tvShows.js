import axios from './config';

export const getAiringTodayShows = (api_key, success, fail, after = () => {}) => axios
  .get('/tv/airing_today', { params: { api_key } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

export const getOnTheAirShows = (api_key, success, fail, after = () => {}) => axios
  .get('/tv/on_the_air', { params: { api_key } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

export const getPopularShows = (api_key, success, fail, after = () => {}) => axios
  .get('/tv/popular', { params: { api_key } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

export const getTopRatedShows = (api_key, success, fail, after = () => {}) => axios
  .get('/tv/top_rated', { params: { api_key } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());

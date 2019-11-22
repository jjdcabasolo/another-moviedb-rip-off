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
  .all([
    axios.get(`/movie/${movie_id}`, { params: { api_key } }),
    axios.get(`/movie/${movie_id}/videos`, { params: { api_key } }),
    axios.get(`/movie/${movie_id}/credits`, { params: { api_key } }),
    axios.get(`/movie/${movie_id}/external_ids`, { params: { api_key } }),
  ])
  .then(axios.spread((details, videos, credits, external_ids) => {
    const externalLinks = external_ids.data;
    const movieDetails = {
      ...details.data,
      youtube: videos.data.results[0] ? `https://www.youtube.com/watch?v=${videos.data.results[0].key}` : null,
      cast: credits.data.cast,
      crew: credits.data.crew,
      facebook: external_ids.data.facebook_id !== null ? `https://www.facebook.com/${externalLinks.facebook_id}` : null,
      instagram: external_ids.data.instagram_id !== null ? `https://www.instagram.com/${externalLinks.instagram_id}` : null,
      twitter: external_ids.data.twitter_id !== null ? `https://www.twitter.com/${externalLinks.twitter_id}` : null,
      imdb: external_ids.data.imdb_id !== null ? `https://www.imdb.com/title/${externalLinks.imdb_id}` : null,
      tmdb: external_ids.data.id !== null ? `https://www.themoviedb.org/movie/${externalLinks.id}` : null,
    };
    success(movieDetails);
  }))
  .catch(error => fail(error))
  .finally(() => after());

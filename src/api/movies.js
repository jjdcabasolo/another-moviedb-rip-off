/* eslint-disable camelcase */
import axios from './config';
import moment from 'moment';

export const getPopularMovies = (api_key, success, fail, after = () => {}) => axios
  .get('/movie/popular', { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getNowPlayingMovies = (api_key, success, fail, after = () => {}) => axios
  .get('/movie/now_playing', { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getTopRatedMovies = (api_key, success, fail, after = () => {}) => axios
  .get('/movie/top_rated', { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getUpcomingMovies = (api_key, success, fail, after = () => {}) => axios
  .get('/movie/upcoming', { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getHighestGrossingMovies = (api_key, success, fail, after = () => {}) => axios
  .get('/discover/movie', { params: { api_key, sort_by: 'revenue.desc' } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getMovieCollection = (api_key, collectionId, success, fail, after) => axios
  .get(`/collection/${collectionId}`, { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getMovieDetails = (api_key, movie_id, success, fail, after = () => {}) => axios
  .all([
    axios.get(`/movie/${movie_id}`, { params: { api_key } }),
    axios.get(`/movie/${movie_id}/videos`, { params: { api_key } }),
    axios.get(`/movie/${movie_id}/credits`, { params: { api_key } }),
    axios.get(`/movie/${movie_id}/external_ids`, { params: { api_key } }),
  ])
  .then(axios.spread((details, videos, credits, external_ids) => {
    const { data: externalIDData } = external_ids;
    const {
      facebook_id,
      instagram_id,
      twitter_id,
      imdb_id,
      id: tmdb_id,
    } = externalIDData;

    // check if a video of type trailer exists
    let hasVideo = videos.data.results.length > 0;
    const trailerIndex = hasVideo ? videos.data.results.map((e) => e.type).indexOf('Trailer') : -1;
    if (trailerIndex === -1) hasVideo = false;

    const movieDetails = {
      ...details.data,
      youtube: hasVideo ? `https://www.youtube.com/watch?v=${videos.data.results[trailerIndex].key}` : null,
      cast: credits.data.cast,
      crew: credits.data.crew,
      facebook: external_ids.data.facebook_id !== null ? `https://www.facebook.com/${facebook_id}` : null,
      instagram: external_ids.data.instagram_id !== null ? `https://www.instagram.com/${instagram_id}` : null,
      twitter: external_ids.data.twitter_id !== null ? `https://www.twitter.com/${twitter_id}` : null,
      imdb: external_ids.data.imdb_id !== null ? `https://www.imdb.com/title/${imdb_id}` : null,
      tmdb: external_ids.data.id !== null ? `https://www.themoviedb.org/movie/${tmdb_id}` : null,
    };

    // check for collection, fetch if it exists, append to movieDetails if successful
    const { belongs_to_collection: collection } = movieDetails;
    if (collection) {
      getMovieCollection(api_key, collection.id, (response) => {
        const { data } = response;
        const { parts } = data;

        // arrange movies in collection by date
        data.parts = parts.sort((a, b) => moment.utc(a.release_date).diff(moment.utc(b.release_date)));
        movieDetails.collection_content = data;

        success(movieDetails);
      }, () => {}, () => {});
    } else {
      success(movieDetails);
    }
  }))
  .catch((error) => fail(error))
  .finally(() => after());

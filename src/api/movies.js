/* eslint-disable camelcase */
import moment from 'moment';

import axios from './config';

export const getPopularMovies = (
  api_key,
  success,
  fail,
  after = () => { },
) => axios.get('/movie/popular', { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getNowPlayingMovies = (
  api_key,
  success,
  fail,
  after = () => { },
) => axios.get('/movie/now_playing', { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getTopRatedMovies = (
  api_key,
  success,
  fail,
  after = () => { },
) => axios.get('/movie/top_rated', { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getUpcomingMovies = (
  api_key,
  success,
  fail,
  after = () => { },
) => axios.get('/movie/upcoming', { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getHighestGrossingMovies = (
  api_key,
  success,
  fail,
  after = () => { },
) => axios.get('/discover/movie', { params: { api_key, sort_by: 'revenue.desc' } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getTrendingMovies = (
  api_key,
  success,
  fail,
  after = () => { },
) => axios.get('/trending/movie/day', { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getMovieCollection = (
  api_key,
  collectionId,
  success,
  fail,
  after,
) => axios.get(`/collection/${collectionId}`, { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getMovieDetails = (
  api_key,
  movie_id,
  success,
  fail,
  after = () => { },
) => axios.get(`/movie/${movie_id}`, {
  params: {
    api_key,
    append_to_response: 'videos,credits,external_ids,recommendations',
  },
})
  .then((response) => {
    const { data } = response;
    const details = { ...data };

    const {
      belongs_to_collection: collection,
      credits,
      external_ids,
      id: tmdb_id,
      recommendations,
      videos,
    } = details;

    const {
      facebook_id,
      instagram_id,
      twitter_id,
      imdb_id,
    } = external_ids;

    // extract cast and crew from credits
    details.cast = credits.cast;
    details.crew = credits.crew;
    delete details.credits;

    // simplify recommendations response
    details.recommendations = recommendations.results;

    // check if a trailer exists on video response
    const trailer = videos.results.filter((e) => e.type === 'Trailer');
    details.youtube = trailer.length > 0 && trailer[0].key
      ? `https://www.youtube.com/watch?v=${trailer[0].key}`
      : null;
    delete details.videos;

    // extract external link id's
    details.facebook = facebook_id !== null ? `https://www.facebook.com/${facebook_id}` : null;
    details.instagram = instagram_id !== null ? `https://www.instagram.com/${instagram_id}` : null;
    details.twitter = twitter_id !== null ? `https://www.twitter.com/${twitter_id}` : null;
    details.imdb = imdb_id !== null ? `https://www.imdb.com/title/${imdb_id}` : null;
    details.tmdb = tmdb_id !== null ? `https://www.themoviedb.org/movie/${tmdb_id}` : null;
    delete details.external_ids;

    // check for collection, fetch if it exists, append to movieDetails if successful
    if (collection) {
      getMovieCollection(api_key, collection.id, (collectionResponse) => {
        const { data: collectionData } = collectionResponse;
        const { parts } = collectionData;

        // arrange movies in collection by date
        collectionData.parts = parts.sort((a, b) => moment.utc(a.release_date).diff(moment.utc(b.release_date)));
        details.collection_content = collectionData;

        success(details);
      }, () => { }, () => { });
    } else {
      success(details);
    }
  })
  .catch((error) => fail(error))
  .finally(() => after());

export const searchMovie = (
  api_key,
  query,
  success,
  fail,
  after,
) => axios.get(`/search/movie`, { params: { api_key, query } })
  .then((response) => success(response.data.results))
  .catch((error) => fail(error))
  .finally(() => after());

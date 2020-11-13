/* eslint-disable camelcase */
import axios from './config';

export const getAiringTodayShows = (
  api_key,
  success,
  fail,
  after = () => {},
) => axios.get('/tv/airing_today', { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getOnTheAirShows = (
  api_key,
  success,
  fail,
  after = () => {},
) => axios.get('/tv/on_the_air', { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getPopularShows = (
  api_key,
  success,
  fail,
  after = () => {},
) => axios.get('/tv/popular', { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getTopRatedShows = (
  api_key,
  success,
  fail,
  after = () => {},
) => axios.get('/tv/top_rated', { params: { api_key } })
  .then((response) => success(response))
  .catch((error) => fail(error))
  .finally(() => after());

export const getTVShowDetails = (
  api_key,
  tv_id,
  success,
  fail,
  after = () => {},
) => axios.all([
  axios.get(`/tv/${tv_id}`, { params: { api_key } }),
  axios.get(`/tv/${tv_id}/videos`, { params: { api_key } }),
  axios.get(`/tv/${tv_id}/credits`, { params: { api_key } }),
  axios.get(`/tv/${tv_id}/external_ids`, { params: { api_key } }),
  axios.get(`/tv/${tv_id}/recommendations`, { params: { api_key } }),
])
  .then((axios).spread((details, videos, credits, external_ids, recommendations) => {
    // extracting external links
    const { data: externalIDData } = external_ids;
    const {
      facebook_id,
      instagram_id,
      twitter_id,
      imdb_id,
      id: tmdb_id,
    } = externalIDData;

    // extracting recommendations
    const { data: recommendationsData } = recommendations;
    const { results: recommendationResults } = recommendationsData;

    const tvShowDetails = {
      ...details.data,
      video: videos.data.results[0]
        ? {
          link: `https://www.youtube.com/watch?v=${videos.data.results[0].key}`,
          type: videos.data.results[0].type,
        }
        : null,
      cast: credits.data.cast,
      facebook: external_ids.data.facebook_id !== null ? `https://www.facebook.com/${facebook_id}` : null,
      instagram: external_ids.data.instagram_id !== null ? `https://www.instagram.com/${instagram_id}` : null,
      twitter: external_ids.data.twitter_id !== null ? `https://www.twitter.com/${twitter_id}` : null,
      imdb: external_ids.data.imdb_id !== null ? `https://www.imdb.com/title/${imdb_id}` : null,
      tmdb: external_ids.data.id !== null ? `https://www.themoviedb.org/tv/${tmdb_id}` : null,
      recommendations: recommendationResults,
    };
    success(tvShowDetails);
  }))
  .catch((error) => fail(error))
  .finally(() => after());

export const getTVShowSeasonDetails = (
  api_key,
  tv_id,
  season_number,
  success,
  fail,
  after = () => {},
) => axios.get(`/tv/${tv_id}/season/${season_number}`, { params: { api_key } })
  .then((response) => success(response.data.episodes))
  .catch((error) => fail(error))
  .finally(() => after());

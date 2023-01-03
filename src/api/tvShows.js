/* eslint-disable camelcase */
import axios from "./config";

export const getAiringTodayShows = (api_key, success, fail, after = () => {}) =>
  axios
    .get("/tv/airing_today", { params: { api_key } })
    .then((response) => success(response))
    .catch((error) => fail(error))
    .finally(() => after());

export const getOnTheAirShows = (api_key, success, fail, after = () => {}) =>
  axios
    .get("/tv/on_the_air", { params: { api_key } })
    .then((response) => success(response))
    .catch((error) => fail(error))
    .finally(() => after());

export const getPopularShows = (api_key, success, fail, after = () => {}) =>
  axios
    .get("/tv/popular", { params: { api_key } })
    .then((response) => success(response))
    .catch((error) => fail(error))
    .finally(() => after());

export const getTopRatedShows = (api_key, success, fail, after = () => {}) =>
  axios
    .get("/tv/top_rated", { params: { api_key } })
    .then((response) => success(response))
    .catch((error) => fail(error))
    .finally(() => after());

export const getTrendingShows = (api_key, success, fail, after = () => {}) =>
  axios
    .get("/trending/tv/day", { params: { api_key } })
    .then((response) => success(response))
    .catch((error) => fail(error))
    .finally(() => after());

export const getTVShowDetails = (
  api_key,
  tv_id,
  success,
  fail,
  after = () => {}
) =>
  axios
    .get(`/tv/${tv_id}`, {
      params: {
        api_key,
        append_to_response: "credits,external_ids,recommendations,reviews",
      },
    })
    .then((response) => {
      const { data } = response;
      const details = { ...data };

      const {
        credits,
        external_ids,
        id: tmdb_id,
        recommendations,
        reviews,
      } = details;

      const { facebook_id, instagram_id, twitter_id, imdb_id } = external_ids;

      // extract cast from credits
      details.cast = credits.cast;
      delete details.credits;

      // simplify recommendations response
      details.recommendations = recommendations.results;

      // extract reviews
      details.reviews = reviews.results.filter((e) => e.author_details.rating);

      // extract external link id's
      details.facebook =
        facebook_id !== null ? `https://www.facebook.com/${facebook_id}` : null;
      details.instagram =
        instagram_id !== null
          ? `https://www.instagram.com/${instagram_id}`
          : null;
      details.twitter =
        twitter_id !== null ? `https://www.twitter.com/${twitter_id}` : null;
      details.imdb =
        imdb_id !== null ? `https://www.imdb.com/title/${imdb_id}` : null;
      details.tmdb =
        tmdb_id !== null ? `https://www.themoviedb.org/tv/${tmdb_id}` : null;
      delete details.external_ids;

      success(details);
    })
    .catch((error) => fail(error))
    .finally(() => after());

export const getTVShowSeasonDetails = (
  api_key,
  tv_id,
  season_number,
  success,
  fail,
  after = () => {}
) =>
  axios
    .get(`/tv/${tv_id}/season/${season_number}`, { params: { api_key } })
    .then((response) => success(response.data.episodes))
    .catch((error) => fail(error))
    .finally(() => after());

export const searchTVShow = (api_key, query, success, fail, after) =>
  axios
    .get(`/search/tv`, { params: { api_key, query } })
    .then((response) => success(response.data.results))
    .catch((error) => fail(error))
    .finally(() => after());

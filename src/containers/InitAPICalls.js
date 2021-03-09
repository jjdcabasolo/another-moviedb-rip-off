import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  getTrendingMovies,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getHighestGrossingMovies,

  getTrendingShows,
  getAiringTodayShows,
  getOnTheAirShows,
  getPopularShows,
  getTopRatedShows,

  // getCountries,
} from '../api';

import {
  moviesActions,
  snackbarActions,
  // tmdbConfigActions,
  tvShowsActions,
} from '../reducers/ducks';

import { decryptKey } from '../utils/functions';

const InitAPICalls = () => {
  const apiKey = useSelector((state) => state.sidebar.apiKey);
  const dispatch = useDispatch();

  useEffect(() => {
    let hasError = false;
    let errorMessage = '';

    // movies
    getTrendingMovies(decryptKey(), (response) => {
      dispatch(moviesActions.setMovieList('trending', response.data.results));
    }, (error) => {
      errorMessage = error;
      hasError = true;
    });

    getNowPlayingMovies(decryptKey(), (response) => {
      dispatch(moviesActions.setMovieList('nowPlaying', response.data.results));
    }, (error) => {
      errorMessage = error;
      hasError = true;
    });

    getPopularMovies(decryptKey(), (response) => {
      dispatch(moviesActions.setMovieList('popular', response.data.results));
    }, (error) => {
      errorMessage = error;
      hasError = true;
    });

    getTopRatedMovies(decryptKey(), (response) => {
      dispatch(moviesActions.setMovieList('topRated', response.data.results));
    }, (error) => {
      errorMessage = error;
      hasError = true;
    });

    getUpcomingMovies(decryptKey(), (response) => {
      dispatch(moviesActions.setMovieList('upcoming', response.data.results));
    }, (error) => {
      errorMessage = error;
      hasError = true;
    });

    getHighestGrossingMovies(decryptKey(), (response) => {
      dispatch(moviesActions.setMovieList('highestGrossing', response.data.results));
    }, (error) => {
      errorMessage = error;
      hasError = true;
    });

    // tv shows
    getTrendingShows(decryptKey(), (response) => {
      dispatch(tvShowsActions.setTVShowsList('trending', response.data.results));
    }, (error) => {
      errorMessage = error;
      hasError = true;
    });

    getAiringTodayShows(decryptKey(), (response) => {
      dispatch(tvShowsActions.setTVShowsList('airingToday', response.data.results));
    }, (error) => {
      errorMessage = error;
      hasError = true;
    });

    getOnTheAirShows(decryptKey(), (response) => {
      dispatch(tvShowsActions.setTVShowsList('onTheAir', response.data.results));
    }, (error) => {
      errorMessage = error;
      hasError = true;
    });

    getPopularShows(decryptKey(), (response) => {
      dispatch(tvShowsActions.setTVShowsList('popular', response.data.results));
    }, (error) => {
      errorMessage = error;
      hasError = true;
    });

    getTopRatedShows(decryptKey(), (response) => {
      dispatch(tvShowsActions.setTVShowsList('topRated', response.data.results));
    }, (error) => {
      errorMessage = error;
      hasError = true;
    });

    // // country config
    // getCountries(decryptKey(), (response) => {
    //   dispatch(tmdbConfigActions.setCountryConfig(response.data));
    // }, (error) => {
    //   errorMessage = error;
    //   hasError = true;
    // });

    if (hasError) {
      dispatch(snackbarActions.showSnackbar(`Error on fetching now playing movies: ${errorMessage}`, 'error'));
    }
  }, [apiKey, dispatch]);

  return null;
};

export default InitAPICalls;

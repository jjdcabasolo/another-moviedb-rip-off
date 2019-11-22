import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getHighestGrossingMovies,

  getAiringTodayShows,
  getOnTheAirShows,
  getPopularShows,
  getTopRatedShows,
} from '../api';

import { moviesActions, tvShowsActions } from '../reducers/ducks';

import { decryptKey } from '../utils/functions';

const InitAPICalls = () => {
  const apiKey = useSelector(state => state.sidebar.apiKey);
  const dispatch = useDispatch();

  useEffect(() => {
    // movies
    getNowPlayingMovies(decryptKey(), response => {
      dispatch(moviesActions.setMovieList('nowPlaying', response.data.results));
    }, error => {
      console.log(error);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    getPopularMovies(decryptKey(), response => {
      dispatch(moviesActions.setMovieList('popular', response.data.results));
    }, error => {
      console.log(error);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    getTopRatedMovies(decryptKey(), response => {
      dispatch(moviesActions.setMovieList('topRated', response.data.results));
    }, error => {
      console.log(error);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    getUpcomingMovies(decryptKey(), response => {
      dispatch(moviesActions.setMovieList('upcoming', response.data.results));
    }, error => {
      console.log(error);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    getHighestGrossingMovies(decryptKey(), response => {
      dispatch(moviesActions.setMovieList('highestGrossing', response.data.results));
    }, error => {
      console.log(error);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    // tv shows
    getAiringTodayShows(decryptKey(), response => {
      dispatch(tvShowsActions.setTVShowsList('airingToday', response.data.results));
    }, error => {
      console.log(error);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    getOnTheAirShows(decryptKey(), response => {
      dispatch(tvShowsActions.setTVShowsList('onTheAir', response.data.results));
    }, error => {
      console.log(error);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    getPopularShows(decryptKey(), response => {
      dispatch(tvShowsActions.setTVShowsList('popular', response.data.results));
    }, error => {
      console.log(error);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    getTopRatedShows(decryptKey(), response => {
      dispatch(tvShowsActions.setTVShowsList('topRated', response.data.results));
    }, error => {
      console.log(error);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });
  }, [apiKey, dispatch]);

  return null;
};

export default InitAPICalls;

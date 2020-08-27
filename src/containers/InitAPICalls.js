import { useEffect } from 'react';

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

import { moviesActions, tvShowsActions, snackbarActions } from '../reducers/ducks';

import { decryptKey } from '../utils/functions';

const InitAPICalls = () => {
  const apiKey = useSelector((state) => state.sidebar.apiKey);
  const dispatch = useDispatch();

  useEffect(() => {
    // movies
    getNowPlayingMovies(decryptKey(), (response) => {
      dispatch(moviesActions.setMovieList('nowPlaying', response.data.results));
    }, (error) => {
      dispatch(snackbarActions.showSnackbar(`Error on fetching now playing movies: ${error}`, 'error'));
    });

    getPopularMovies(decryptKey(), (response) => {
      dispatch(moviesActions.setMovieList('popular', response.data.results));
    }, (error) => {
      dispatch(snackbarActions.showSnackbar(`Error on fetching popular movies: ${error}`, 'error'));
    });

    getTopRatedMovies(decryptKey(), (response) => {
      dispatch(moviesActions.setMovieList('topRated', response.data.results));
    }, (error) => {
      dispatch(snackbarActions.showSnackbar(`Error on fetching top rated movies: ${error}`, 'error'));
    });

    getUpcomingMovies(decryptKey(), (response) => {
      dispatch(moviesActions.setMovieList('upcoming', response.data.results));
    }, (error) => {
      dispatch(snackbarActions.showSnackbar(`Error on fetching upcoming movies: ${error}`, 'error'));
    });

    getHighestGrossingMovies(decryptKey(), (response) => {
      dispatch(moviesActions.setMovieList('highestGrossing', response.data.results));
    }, (error) => {
      dispatch(snackbarActions.showSnackbar(`Error on fetching highest grossing movies: ${error}`, 'error'));
    });

    // tv shows
    getAiringTodayShows(decryptKey(), (response) => {
      dispatch(tvShowsActions.setTVShowsList('airingToday', response.data.results));
    }, (error) => {
      dispatch(snackbarActions.showSnackbar(`Error on fetching air today tv shows: ${error}`, 'error'));
    });

    getOnTheAirShows(decryptKey(), (response) => {
      dispatch(tvShowsActions.setTVShowsList('onTheAir', response.data.results));
    }, (error) => {
      dispatch(snackbarActions.showSnackbar(`Error on fetching on the air tv shows: ${error}`, 'error'));
    });

    getPopularShows(decryptKey(), (response) => {
      dispatch(tvShowsActions.setTVShowsList('popular', response.data.results));
    }, (error) => {
      dispatch(snackbarActions.showSnackbar(`Error on fetching popular tv shows: ${error}`, 'error'));
    });

    getTopRatedShows(decryptKey(), (response) => {
      dispatch(tvShowsActions.setTVShowsList('topRated', response.data.results));
    }, (error) => {
      dispatch(snackbarActions.showSnackbar(`Error on fetching top rated tv shows: ${error}`, 'error'));
    });
  }, [apiKey, dispatch]);

  return null;
};

export default InitAPICalls;

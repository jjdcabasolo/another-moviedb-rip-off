import { useEffect } from "react";

import { useDispatch } from "react-redux";

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
} from "../api";

import {
  moviesActions,
  snackbarActions,
  // tmdbConfigActions,
  tvShowsActions,
} from "../reducers/ducks";

const InitAPICalls = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const parmesanio = process.env.REACT_APP_TMDB_PARMESANIO;

    let hasError = false;
    let errorMessage = "";

    // movies
    getTrendingMovies(
      parmesanio,
      (response) => {
        dispatch(moviesActions.setMovieList("trending", response.data.results));
      },
      (error) => {
        errorMessage = error;
        hasError = true;
      }
    );

    getNowPlayingMovies(
      parmesanio,
      (response) => {
        dispatch(
          moviesActions.setMovieList("nowPlaying", response.data.results)
        );
      },
      (error) => {
        errorMessage = error;
        hasError = true;
      }
    );

    getPopularMovies(
      parmesanio,
      (response) => {
        dispatch(moviesActions.setMovieList("popular", response.data.results));
      },
      (error) => {
        errorMessage = error;
        hasError = true;
      }
    );

    getTopRatedMovies(
      parmesanio,
      (response) => {
        dispatch(moviesActions.setMovieList("topRated", response.data.results));
      },
      (error) => {
        errorMessage = error;
        hasError = true;
      }
    );

    getUpcomingMovies(
      parmesanio,
      (response) => {
        dispatch(moviesActions.setMovieList("upcoming", response.data.results));
      },
      (error) => {
        errorMessage = error;
        hasError = true;
      }
    );

    getHighestGrossingMovies(
      parmesanio,
      (response) => {
        dispatch(
          moviesActions.setMovieList("highestGrossing", response.data.results)
        );
      },
      (error) => {
        errorMessage = error;
        hasError = true;
      }
    );

    // tv shows
    getTrendingShows(
      parmesanio,
      (response) => {
        dispatch(
          tvShowsActions.setTVShowsList("trending", response.data.results)
        );
      },
      (error) => {
        errorMessage = error;
        hasError = true;
      }
    );

    getAiringTodayShows(
      parmesanio,
      (response) => {
        dispatch(
          tvShowsActions.setTVShowsList("airingToday", response.data.results)
        );
      },
      (error) => {
        errorMessage = error;
        hasError = true;
      }
    );

    getOnTheAirShows(
      parmesanio,
      (response) => {
        dispatch(
          tvShowsActions.setTVShowsList("onTheAir", response.data.results)
        );
      },
      (error) => {
        errorMessage = error;
        hasError = true;
      }
    );

    getPopularShows(
      parmesanio,
      (response) => {
        dispatch(
          tvShowsActions.setTVShowsList("popular", response.data.results)
        );
      },
      (error) => {
        errorMessage = error;
        hasError = true;
      }
    );

    getTopRatedShows(
      parmesanio,
      (response) => {
        dispatch(
          tvShowsActions.setTVShowsList("topRated", response.data.results)
        );
      },
      (error) => {
        errorMessage = error;
        hasError = true;
      }
    );

    // // country config
    // getCountries(parmesanio, (response) => {
    //   dispatch(tmdbConfigActions.setCountryConfig(response.data));
    // }, (error) => {
    //   errorMessage = error;
    //   hasError = true;
    // });

    if (hasError) {
      dispatch(
        snackbarActions.showSnackbar(
          `Error on fetching now playing movies: ${errorMessage}`,
          "error"
        )
      );
    }
  }, [dispatch]);

  return null;
};

export default InitAPICalls;

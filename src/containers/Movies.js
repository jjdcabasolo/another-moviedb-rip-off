import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';

import MovieCard from '../components/movie/MovieCard';

import { getPopularMovies } from '../api/movie';

import { decryptKey } from '../utils/encrypt';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getPopularMovies(decryptKey(), response => {
      setMovies(response.data.results);
    }, error => {
      console.log(error.message)
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        {movies.map(movie => <MovieCard movie={movie} /> )}
      </Grid>
      <Grid item container justify="center" alignItems="center">
        Footer containers
      </Grid>
    </Grid>
  );
};

export default Movies;

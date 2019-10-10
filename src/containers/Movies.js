import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import MovieCard from '../components/movie/MovieCard';
import MovieDrawer from '../components/movie/MovieDrawer';

import { getPopularMovies } from '../api/movie';
import { getConfiguration } from '../api/configuration';

import { decryptKey } from '../utils/encrypt';

const useStyles = makeStyles({
  // horizontalContainer: {
  //   width: '1000em !important',
  // },
});

const Movies = () => {
  const classes = useStyles();

  const [moviePage, setMoviePage] = useState({
    config: '',
    content: [],
    pageNumber: 1,
  });

  useEffect(() => {
    getConfiguration(decryptKey(), response => {
      const imageConfig = response.data.images;
      const imageURL = `${imageConfig.base_url}${imageConfig.poster_sizes[5]}`
      setMoviePage({ ...moviePage, config: imageURL });
    }, () => {

    });

    getPopularMovies(decryptKey(), response => {
      setMoviePage({ ...moviePage, content: response.data.results });
    }, error => {
      console.log(error.response);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });
  }, []);

  return (
    <>
      {/* <MovieDrawer /> */}
      <Grid container>
        {moviePage.content.slice(0, 5).map(movie => <MovieCard movie={movie} imageURL={moviePage.config} /> )}
      </Grid>
      <Grid container>
        {moviePage.content.slice(5, 10).map(movie => <MovieCard movie={movie} imageURL={moviePage.config} /> )}
      </Grid>
    </>
  );
};

export default Movies;

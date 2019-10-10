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


  return (
    <>
      Movie Content!
    </>
  );
};

export default Movies;

import React from 'react';

import moment from 'moment';
import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Chip, Grid, Typography, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  note: {
    padding: theme.spacing(8, 2),
  },
  title: {
    fontWeight: 600,
  },
  chipContainer: {
    margin: theme.spacing(1, 0),
  },
  chip: {
    margin: theme.spacing(0.25, 0.5, 0.25, 0),
  },
  description: {
    margin: theme.spacing(2, 0),
  },
}));

const MovieCast = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const movie = useSelector(state => state.movies.movie);

  const hasRuntime = movie.runtime;
  const runtimeHours = ~~(movie.runtime / 60);
  const runtimeMinutes = movie.runtime % 60;

  return (
    <>
      {JSON.stringify(movie.cast)}
    </>
  );
};

export default MovieCast;

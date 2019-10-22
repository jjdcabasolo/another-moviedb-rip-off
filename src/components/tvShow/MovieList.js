import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import MovieCard from './MovieCard';
import MovieCategory from './MovieCategory';
import Note from '../common/Note';

import { NOTE_NO_API_KEY } from '../../constants';

const useStyles = makeStyles(theme => ({
  note: {
    padding: theme.spacing(8, 2),
  },
}));

const MovieList = () => {
  const classes = useStyles();

  const category = useSelector(state => state.movies.category);
  const list = useSelector(state => state.movies.list);

  const moviesToDisplay = list[category];

  if (moviesToDisplay.length <= 0) return (
    <div className={classes.note}>
      <Note details={NOTE_NO_API_KEY} />
    </div>
  );

  return (
    <>
      <MovieCategory isList />
      <Grid item container justify="center" spacing={2}>
        {moviesToDisplay.slice(0, 10).map(movie => <MovieCard movie={movie} movieDrawerOpen col={12}/> )}
      </Grid>
    </>
  );
};

export default MovieList;

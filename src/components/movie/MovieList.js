import React, { useState } from 'react';

import SwipeableViews from 'react-swipeable-views';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, AppBar, Toolbar } from '@material-ui/core';

import MovieCard from './MovieCard';
import ItemCard from '../common/item/ItemCard';
import MovieCategory from './MovieCategory';
import Note from '../common/Note';

import { moviesActions } from '../../reducers/ducks';

import {
  MOVIE_DRAWER_CATEGORY_CHIPS,
  NOTE_NO_API_KEY,
  NOTE_OFFLINE,
} from '../../constants';

const useStyles = makeStyles(theme => ({
  note: {
    padding: theme.spacing(8, 2),
  },
}));

const MovieList = () => {
  const classes = useStyles();

  const category = useSelector(state => state.movies.category);
  const list = useSelector(state => state.movies.list);
  const dispatch = useDispatch();

  const [categoryIndex, setCategoryIndex] = useState(0);

  const moviesToDisplay = list[category];

  const handleSwipe = index => {
    setCategoryIndex(index);
    dispatch(moviesActions.setCategory(MOVIE_DRAWER_CATEGORY_CHIPS[index].identifier));
  };

  if (!window.navigator.onLine) return (
    <div className={classes.note}>
      <Note details={NOTE_OFFLINE} />
    </div>
  );

  if (moviesToDisplay.length <= 0) return (
    <div className={classes.note}>
      <Note details={NOTE_NO_API_KEY} />
    </div>
  );

  return (
    <>
      <MovieCategory isList />
      <SwipeableViews enableMouseEvents index={categoryIndex} onChangeIndex={handleSwipe}>
        {MOVIE_DRAWER_CATEGORY_CHIPS.map(cat => (
          <div>
            <Grid container justify="center">
              {list[cat.identifier].slice(0, 10).map((movie, rank) => (
                <ItemCard
                  col={12}
                  content={movie}
                  drawerOpen
                  mobile
                  rank={rank + 1}
                  type="movie"
                />
              ))}
            </Grid>
          </div>
        ))}
      </SwipeableViews>
    </>
  );
};

export default MovieList;

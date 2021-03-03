import React from 'react';

import moment from 'moment';
import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import { toCamelCase } from '../../../utils/functions';

import {
  MOVIE_DRAWER_CATEGORY_CHIPS,
  TV_SHOW_DRAWER_CATEGORY_CHIPS,
} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  titleLite: {
    fontWeight: 100,
    textAlign: 'center',
  },
  title: {
    fontWeight: 500,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    maxWidth: '75vw',
  },
  subtitle: {
    color: theme.palette.action.disabled,
  },
}));

const ItemHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const movieCategory = useSelector((state) => state.movies.category);
  const tvShowCategory = useSelector((state) => state.tvShows.category);

  const isMovie = activeTab === 'movies';
  const activeCategory = isMovie ? movieCategory : tvShowCategory;
  const categoryChips = isMovie
    ? MOVIE_DRAWER_CATEGORY_CHIPS
    : TV_SHOW_DRAWER_CATEGORY_CHIPS;
  const [ { description } ] = categoryChips.filter(e => e.identifier === activeCategory);

  return (
    <>
      <Typography variant={isMobile ? 'h3' : 'h2'} className={classes.titleLite}>
        {'Top 10 '}
      </Typography>
      <Typography variant={isMobile ? 'h2' : 'h1'} className={classes.title}>
        {toCamelCase(activeCategory)}
      </Typography>
      <Typography variant={isMobile ? 'h3' : 'h2'} gutterBottom className={classes.titleLite}>
        {activeTab === 'movies' ? ' Movies' : ' TV Shows'}
      </Typography>
      <Typography variant="caption" gutterBottom className={classes.description} color="textSecondary">
        {description}
      </Typography>
      <Typography variant="caption" className={classes.subtitle}>
        {`as of today, ${moment().format('MMMM D, YYYY (dddd)')}`}
      </Typography>
    </>
  );
};

export default ItemHeader;

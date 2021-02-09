import React from 'react';

import moment from 'moment';
import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import { toCamelCase } from '../../../utils/functions';

const useStyles = makeStyles((theme) => ({
  titleLite: {
    fontWeight: 100,
    textAlign: 'center',
  },
  title: {
    fontWeight: 500,
    textAlign: 'center',
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
      <Typography variant="caption" className={classes.subtitle}>
        on The Movie Database (TMDb)
      </Typography>
      <Typography variant="caption" className={classes.subtitle}>
        {`as of today, ${moment().format('MMMM D, YYYY')}`}
      </Typography>
    </>
  );
};

export default ItemHeader;

import React from 'react';

import moment from 'moment';
import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Chip, Typography, useMediaQuery } from '@material-ui/core';

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
    marginRight: theme.spacing(0.5),
  },
  description: {
    margin: theme.spacing(2, 0),
  },
}));

const MovieHeader = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const movie = useSelector(state => state.movies.movie);

  return (
    <>
      <Typography variant={isMobile ? "h4" : "h2"} className={classes.title}>{movie.title}</Typography>
      <div>
        <Typography variant={isMobile ? "body1" : "h5"}>
          {moment(movie.date).format('YYYY')}&nbsp;
          &middot;&nbsp;
          {movie.runtime} hrs
        </Typography>
      </div>
      <div className={classes.chipContainer}>
        { movie.genres.map(i => (
          <Chip label={i.name} className={classes.chip} size={isMobile ? "small" : "medium"} />
        )) }
      </div>
      <div className={classes.description}>
        <Typography variant="body1">{movie.overview}</Typography>
      </div>
    </>
  );
};

export default MovieHeader;

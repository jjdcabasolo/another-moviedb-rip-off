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
    marginTop: theme.spacing(2),
  },
}));

const MovieHeader = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const movie = useSelector(state => state.movies.movie);

  const hasRuntime = movie.runtime;
  const runtimeHours = ~~(movie.runtime / 60);
  const runtimeMinutes = movie.runtime % 60;

  return (
    <Grid item xs={12}>
      <Typography variant={isMobile ? "h4" : "h2"} className={classes.title}>{movie.title}</Typography>
      <div>
        <Typography variant={isMobile ? "body1" : "h5"}>
          {moment(movie.date).format('YYYY')}&nbsp;
          &middot;&nbsp;
          {hasRuntime ? `${runtimeHours} hr ${runtimeMinutes} min` : 'No runtime yet.'}
        </Typography>
      </div>
      { movie.genres.length > 0 && (
        <div className={classes.chipContainer}>
          { movie.genres.map(i => (
            <Chip label={i.name} className={classes.chip} size={isMobile ? "small" : "medium"} />
          )) }
        </div>
      )}
      <div className={classes.description}>
        <Typography variant="body1">{movie.overview}</Typography>
      </div>
    </Grid>
  );
};

export default MovieHeader;

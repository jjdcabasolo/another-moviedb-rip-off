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
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));

  const movie = useSelector(state => state.movies.movie);

  const hasRuntime = movie.runtime;
  const runtimeHours = ~~(movie.runtime / 60);
  const runtimeMinutes = movie.runtime % 60;

  return (
    <Grid item xs={12} container spacing={1}>
      <Grid item xs={12}>
        <Typography variant={isMobile ? "h4" : "h2"} className={classes.title}>{movie.title}</Typography>
      </Grid>
      <Grid item xs={12} container alignItems="center">
        { movie.status === 'Released' && (
          <Grid item>
            <Chip label="Released" variant="outlined" size={isMobile ? "small" : "medium"} />
            &nbsp;
          </Grid>
        )}
        <Grid item>
          <Typography variant={isMobile ? "body1" : "h5"}>
            &middot;&nbsp;
            {moment(movie.release_date).format('YYYY')}&nbsp;
            &middot;&nbsp;
            {hasRuntime ? `${runtimeHours}hr ${runtimeMinutes}min` : 'No runtime yet.'}
          </Typography>
        </Grid>
      </Grid>
      { movie.genres.length > 0 && (
        <Grid item xs={12}>
          { movie.genres.map(i => (
            <Chip label={i.name} className={classes.chip} size={isMobile ? "small" : "medium"} />
          )) }
        </Grid>
      )}
      <Grid item xs={12} className={classes.description}>
        <Typography variant="body1">{movie.overview}</Typography>
      </Grid>
    </Grid>
  );
};

export default MovieHeader;

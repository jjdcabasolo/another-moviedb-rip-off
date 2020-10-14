import React from 'react';

import moment from 'moment';
import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Chip,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

  const movie = useSelector((state) => state.movies.movie);

  const {
    genres,
    original_title: originalTitle,
    overview,
    release_date: releaseDate,
    runtime,
    status,
    title,
  } = movie;

  // eslint-disable-next-line no-bitwise
  const runtimeHours = ~~(runtime / 60);
  const runtimeMinutes = runtime % 60;

  return (
    <Grid item xs={12} container spacing={1}>
      <Grid item xs={12}>
        <Typography
          variant={isMobile ? 'h4' : 'h2'}
          className={classes.title}
        >
          {title || originalTitle}
        </Typography>
      </Grid>
      <Grid item xs={12} container alignItems="center">
        { status === 'Released' && (
          <Grid item>
            <Chip
              label="Released"
              size={isMobile ? 'small' : 'medium'}
              variant="outlined"
            />
          </Grid>
        )}
        <Grid item>
          <Typography variant={isMobile ? 'body1' : 'h6'} color="textSecondary">
            {status && <span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>}
            {moment(releaseDate).format('MMM D, YYYY')}
            &nbsp;&middot;&nbsp;&nbsp;
            {runtime ? `${runtimeHours}hr ${runtimeMinutes}min` : 'No runtime yet.'}
          </Typography>
        </Grid>
      </Grid>
      { genres.length > 0 && (
        <Grid item xs={12}>
          { genres.map((i) => (
            <Chip
              className={classes.chip}
              label={i.name}
              size={isMobile ? 'small' : 'medium'}
            />
          )) }
        </Grid>
      )}
      <Grid item xs={12} className={classes.description}>
        <Typography variant="body1">{overview}</Typography>
      </Grid>
    </Grid>
  );
};

export default MovieHeader;

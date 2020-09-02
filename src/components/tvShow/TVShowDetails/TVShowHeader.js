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

import { getTVShowStatus } from '../../../utils/functions';

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

const TVShowHeader = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));

  const tvShow = useSelector((state) => state.tvShows.tvShow);

  const {
    episode_run_time: episodeRunTime,
    first_air_date: firstAirDate,
    genres,
    name,
    original_name: originalName,
    overview,
    status,
  } = tvShow;

  // eslint-disable-next-line no-bitwise
  const runtimeHours = ~~(episodeRunTime[0] / 60);
  const runtimeMinutes = episodeRunTime[0] % 60;

  return (
    <Grid item xs={12} container spacing={1}>
      <Grid item xs={12}>
        <Typography
          className={classes.title}
          variant={isMobile ? 'h4' : 'h2'}
        >
          {name || originalName}
        </Typography>
      </Grid>
      <Grid item xs={12} container alignItems="center">
        <Grid item>
          <Chip
            label={getTVShowStatus(status)}
            size={isMobile ? 'small' : 'medium'}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Typography variant={isMobile ? 'body1' : 'h5'}>
            &nbsp;&nbsp;&middot;&nbsp;&nbsp;
            {`${moment(firstAirDate).format('MMM D, YYYY')} `}
            {episodeRunTime.length > 0
              && ` · ${runtimeHours > 0 ? `${runtimeHours}hr` : ''} ${runtimeMinutes}min`}
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

export default TVShowHeader;

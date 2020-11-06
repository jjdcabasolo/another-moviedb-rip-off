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

import ItemBreadcrumbs from '../../common/item/ItemBreadcrumbs';
import ItemLinks from '../../common/item/ItemLinks';

import { getTVShowStatus, selectEpisode } from '../../../utils/functions';

import { TV_SHOW_BREADCRUMBS_CONFIG } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  note: {
    padding: theme.spacing(8, 2),
  },
  title: {
    fontWeight: 600,
  },
  subtitle: {
    fontWeight: 400,
  },
  chipContainer: {
    margin: theme.spacing(1, 0),
  },
  chip: {
    margin: theme.spacing(0.25, 0.5, 0.25, 0),
  },
}));

const TVShowHeader = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));

  const episodes = useSelector((state) => state.tvShows.episodes);
  const selectedEpisode = useSelector((state) => state.tvShows.selectedEpisode);
  const tvShow = useSelector((state) => state.tvShows.tvShow);

  const {
    episode_run_time: episodeRunTime,
    first_air_date: firstAirDate,
    genres,
    name,
    original_name: originalName,
    overview,
    status,
    facebook,
    imdb,
    instagram,
    tmdb,
    twitter,
    youtube,
  } = tvShow;

  const { crew } = selectEpisode(episodes, selectedEpisode);

  const breadcrumbs = (crew && crew.length > 0)
    ? TV_SHOW_BREADCRUMBS_CONFIG
    : TV_SHOW_BREADCRUMBS_CONFIG.filter((e) => e.link !== '#tvshow-crew');
  // eslint-disable-next-line no-bitwise
  const runtimeHours = ~~(episodeRunTime[0] / 60);
  const runtimeMinutes = episodeRunTime[0] % 60;

  return (
    <Grid item xs={12} container spacing={2}>
      <Grid item xs={12}>
        <Typography
          className={classes.title}
          variant={isMobile ? 'h4' : 'h2'}
        >
          {name || originalName}
        </Typography>
      </Grid>
      <Grid item xs={12} container alignItems="center">
        <Typography
          className={classes.subtitle}
          color="textSecondary"
          variant={isMobile ? 'body1' : 'h6'}
        >
          {`${firstAirDate ? moment(firstAirDate).format('MMM D, YYYY') : 'No release date.'} `}
          {episodeRunTime.length > 0
            && ` · ${runtimeHours > 0 ? `${runtimeHours}hr` : ''} ${runtimeMinutes !== 0 ? `${runtimeMinutes}min` : ''}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Chip
          className={classes.chip}
          label={getTVShowStatus(status)}
          size="small"
        />
        { genres.map((i) => (
          <Chip
            className={classes.chip}
            label={i.name}
            size="small"
            variant="outlined"
          />
        )) }
      </Grid>
      <Grid item xs={12}>
        <ItemLinks
          facebook={facebook}
          imdb={imdb}
          instagram={instagram}
          tmdb={tmdb}
          twitter={twitter}
          youtube={youtube}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>{overview}</Typography>
      </Grid>
      <Grid item xs={12}>
        <ItemBreadcrumbs content={breadcrumbs} />
      </Grid>
    </Grid>
  );
};

export default TVShowHeader;

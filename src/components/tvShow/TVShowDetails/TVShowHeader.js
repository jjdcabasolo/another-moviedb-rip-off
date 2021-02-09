import React from 'react';
import PropTypes from 'prop-types';

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
import TruncatedOverview from '../../common/TruncatedOverview';

import { getTVShowStatus } from '../../../utils/functions';

import {
  TV_SHOW_BREADCRUMBS_CONFIG,
  TV_SHOW_OVERVIEW_MAX_WORDS,
} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
  },
  subtitle: {
    fontWeight: 400,
  },
  chip: {
    margin: theme.spacing(0.25, 0.5, 0.25, 0),
  },
  releaseYear: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.fontWeightLight,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      marginLeft: theme.spacing(1),
      fontSize: theme.typography.h5.fontSize,
    },
  },
}));

const TVShowHeader = ({ sectionVisibility }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));

  const tvShow = useSelector((state) => state.tvShows.tvShow);

  const {
    episode_run_time: episodeRunTime,
    facebook,
    first_air_date: firstAirDate,
    genres,
    imdb,
    instagram,
    name,
    original_name: originalName,
    overview,
    status,
    tagline,
    tmdb,
    twitter,
    youtube,
  } = tvShow;

  const breadcrumbs = TV_SHOW_BREADCRUMBS_CONFIG.filter((e) => sectionVisibility[e.visibilityId]);
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
          <span className={classes.releaseYear}>
            {`(${moment(firstAirDate).format('YYYY')})`}
          </span>
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
      {overview && overview.length > 0 && (
        <Grid item xs={12}>
          <TruncatedOverview overview={overview} maxWords={TV_SHOW_OVERVIEW_MAX_WORDS} />
        </Grid>
      )}
      {tagline && (
        <Grid item xs={12}>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body1"
          >
            <em>
              {tagline}
            </em>
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <ItemBreadcrumbs content={breadcrumbs} />
      </Grid>
    </Grid>
  );
};

TVShowHeader.propTypes = {
  sectionVisibility: PropTypes.shape({
    cast: PropTypes.bool.isRequired,
    crew: PropTypes.bool.isRequired,
    episodes: PropTypes.bool.isRequired,
    production: PropTypes.bool.isRequired,
    recommendations: PropTypes.bool.isRequired,
    seasons: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TVShowHeader;

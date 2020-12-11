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

import {
  MOVIE_BREADCRUMBS_CONFIG,
  MOVIE_OVERVIEW_MAX_WORDS,
} from '../../../constants';

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
  readMore: {
    cursor: 'pointer',
  },
}));

const MovieHeader = ({ sectionVisibility }) => {
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
    tagline,
    title,
    facebook,
    imdb,
    instagram,
    tmdb,
    twitter,
    youtube,
  } = movie;

  const breadcrumbs = MOVIE_BREADCRUMBS_CONFIG.filter((e) => sectionVisibility[e.visibilityId]);
  // eslint-disable-next-line no-bitwise
  const runtimeHours = ~~(runtime / 60);
  const runtimeMinutes = runtime % 60;

  return (
    <Grid item xs={12} container spacing={2}>
      <Grid item xs={12}>
        <Typography
          className={classes.title}
          variant={isMobile ? 'h4' : 'h2'}
        >
          {title || originalTitle}
        </Typography>
      </Grid>
      <Grid item xs={12} container alignItems="center">
        <Grid item>
          <Typography
            className={classes.subtitle}
            color="textSecondary"
            variant={isMobile ? 'body1' : 'h6'}
          >
            {releaseDate ? moment(releaseDate).format('MMM D, YYYY') : 'No release date.'}
            &nbsp;&middot;&nbsp;&nbsp;
            {runtime ? `${runtimeHours}hr ${runtimeMinutes !== 0 ? `${runtimeMinutes}min` : ''}` : 'No runtime yet.'}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        { genres.map((i) => (
          <Chip
            className={classes.chip}
            label={i.name}
            size="small"
            variant="outlined"
          />
        ))}
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
        <TruncatedOverview overview={overview} maxWords={MOVIE_OVERVIEW_MAX_WORDS} />
      </Grid>
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

MovieHeader.propTypes = {
  sectionVisibility: PropTypes.shape({
    trailer: PropTypes.bool.isRequired,
    cast: PropTypes.bool.isRequired,
    crew: PropTypes.bool.isRequired,
    production: PropTypes.bool.isRequired,
    collection: PropTypes.bool.isRequired,
    recommendations: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MovieHeader;

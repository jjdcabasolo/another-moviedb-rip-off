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
  OVERVIEW_MAX_WORDS,
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

const MovieHeader = ({ sectionVisibility }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));

  const movie = useSelector((state) => state.movies.movie);

  const {
    facebook,
    genres,
    imdb,
    instagram,
    original_title: originalTitle,
    overview,
    release_date: releaseDate,
    runtime,
    tagline,
    title,
    tmdb,
    twitter,
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
          <span className={classes.releaseYear}>
            {`(${moment(releaseDate).format('YYYY')})`}
          </span>
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
            {runtime
              ? `${runtimeHours}hr ${runtimeMinutes !== 0 ? `${runtimeMinutes}min` : ''}`
              : 'No runtime yet.'}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        { genres.map((i) => (
          <Chip
            className={classes.chip}
            key={`movie-header-chip-${i.id}`}
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
        />
      </Grid>
      {overview && overview.length > 0 && (
        <Grid item xs={12}>
          <TruncatedOverview
            overview={overview}
            maxWords={OVERVIEW_MAX_WORDS}
          />
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

MovieHeader.propTypes = {
  sectionVisibility: {
    collection: false,
  },
};

MovieHeader.propTypes = {
  sectionVisibility: PropTypes.shape({
    cast: PropTypes.bool.isRequired,
    collection: PropTypes.bool,
    crew: PropTypes.bool.isRequired,
    production: PropTypes.bool.isRequired,
    recommendations: PropTypes.bool.isRequired,
    trailer: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MovieHeader;

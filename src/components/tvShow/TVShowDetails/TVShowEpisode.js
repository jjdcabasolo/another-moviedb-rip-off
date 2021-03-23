import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { usePath } from '../../../hooks';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Avatar,
  Divider,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

import BrokenImage from '../../common/BrokenImage';
import TruncatedOverview from '../../common/TruncatedOverview';

import { TMDB_IMAGE_PREFIX, NO_DATE_TEXT } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    marginBottom: theme.spacing(1),
    maxWidth: '100%',
  },
  dividerContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      paddingTop: theme.spacing(4),
    },
  },
  image: {
    border: `1px solid ${theme.palette.brokenImage.border}`,
    borderRadius: theme.shape.borderRadius,
    height: theme.spacing(25),
    objectFit: 'cover',
    objectPosition: '50% 0%',
    width: '100%',
  },
  brokenImageContainer: {
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(1),
  },
  avatar: {
    border: `1px solid ${theme.palette.brokenImage.border}`,
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
}));

const renderCrew = (crew, label) => crew && (
  <Grid item xs={6}>
    <Typography color="textSecondary" variant="caption">
      {label}
    </Typography>
    <Typography variant="body2">
      {crew.name || crew.original_name}
    </Typography>
  </Grid>
);

const TVShowEpisode = ({
  episode,
  isCollapsed,
  isLastItem,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmallTablet = useMediaQuery(theme.breakpoints.only('md'));
  const classes = useStyles();

  const [, , section] = usePath();
  const isSectionActive = section && section.length !== 0;

  const maxGuestsToShow = isSmallTablet ? 12 : 10;

  const {
    air_date: airDate,
    crew,
    episode_number: episodeNumber,
    guest_stars: guestStars,
    name: episodeName,
    overview,
    still_path: stillPath,
  } = episode;

  if (!airDate || moment(airDate).diff(moment()) > 0) return null;

  let episodeImagePath = TMDB_IMAGE_PREFIX;
  if (stillPath) episodeImagePath += `/w780${stillPath}`;

  const [director] = crew.filter((e) => e.job === 'Director');
  const [writer] = crew.filter((e) => e.job === 'Writer');
  const sectionActiveGridSize = isSectionActive ? 12 : 6;

  return (
    <Grid
      container
      direction="column"
      item
      md={isCollapsed ? 6 : sectionActiveGridSize}
      sm={isCollapsed ? 6 : sectionActiveGridSize}
      xs={12}
    >
      <Grid item className={classes.gridItem}>
        {stillPath
          ? (
            <img
              className={classes.image}
              alt="Season cover"
              src={episodeImagePath}
            />
          )
          : (
            <BrokenImage
              type="baseImage"
              extraClass={`${classes.activeImage} ${classes.image} ${classes.brokenImageContainer}`}
            />
          )}
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography noWrap>
          {`${episodeNumber} · ${episodeName}`}
        </Typography>
        <Typography color="textSecondary" variant="body2" noWrap gutterBottom>
          {airDate ? moment(airDate).format('MMM D, YYYY') : NO_DATE_TEXT}
        </Typography>
      </Grid>
      <Grid item className={classes.gridItem}>
        <TruncatedOverview overview={overview} variant="body2" />
      </Grid>
      {director && Object.keys(director).length > 0
        && writer && Object.keys(writer).length > 0 && (
          <Grid item className={classes.gridItem} container>
            {renderCrew(director, 'Director')}
            {renderCrew(writer, 'Writer')}
          </Grid>
        )}
      {guestStars.length > 0 && (
        <Grid item className={classes.gridItem}>
          <Typography color="textSecondary" variant="caption">
            Guests
          </Typography>
          <AvatarGroup max={maxGuestsToShow}>
            {guestStars.map((guest, i) => {
              const { id, profile_path: profilePath } = guest;

              let guestImagePath = TMDB_IMAGE_PREFIX;
              if (stillPath) guestImagePath += `/w780${profilePath}`;

              if (i < maxGuestsToShow) {
                return (
                  <Tooltip
                    enterTouchDelay={50}
                    key={`tv-show-episode-avatar-group-${id}`}
                    title={`${guest.character} / ${guest.name}`}
                    placement="top"
                  >
                    <Avatar
                      className={classes.avatar}
                      src={guestImagePath}
                    />
                  </Tooltip>
                );
              }

              return null;
            })}
          </AvatarGroup>
        </Grid>
      )}
      {!isCollapsed
        && (isMobile || isSectionActive)
        && isLastItem && (
          <Grid item className={classes.dividerContainer}>
            <Divider />
          </Grid>
        )}
    </Grid>
  );
};

TVShowEpisode.defaultProps = {
  episode: {
    air_date: '',
    crew: [],
    episode_number: 0,
    guest_stars: [],
    name: '',
    overview: '',
    still_path: '',
  },
  isCollapsed: false,
  isLastItem: false,
};

TVShowEpisode.propTypes = {
  episode: PropTypes.shape({
    air_date: PropTypes.string,
    crew: PropTypes.arrayOf(PropTypes.shape()),
    episode_number: PropTypes.number,
    guest_stars: PropTypes.arrayOf(PropTypes.shape()),
    name: PropTypes.string,
    overview: PropTypes.string,
    still_path: PropTypes.string,
  }),
  isCollapsed: PropTypes.bool,
  isLastItem: PropTypes.bool,
};

export default TVShowEpisode;

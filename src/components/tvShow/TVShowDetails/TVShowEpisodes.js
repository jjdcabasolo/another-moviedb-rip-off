import React, { useState } from 'react';

import clsx from 'clsx';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

import ComponentLoader from '../../common/ComponentLoader';
import LineClamp from '../../common/LineClamp';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
  gridItem: {
    marginBottom: theme.spacing(1),
    maxWidth: '100%',
  },
  image: {
    borderRadius: theme.shape.borderRadius,
    height: theme.spacing(25),
    objectFit: 'cover',
    width: '100%',
  },
  brokenImage: {
    backgroundColor: theme.palette.action.hover,
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  avatarGroup: {
    marginLeft: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const MAX_EPISODES_TO_SHOW = 4;
const MAX_GUESTS_TO_SHOW = 12;

const TVShowEpisodeDetails = () => {
  const theme = useTheme();
  const isSmallTabletBelow = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles();

  const episodes = useSelector((state) => state.tvShows.episodes);
  const isSeasonLoading = useSelector((state) => state.tvShows.isSeasonLoading);
  const isTVShowLoading = useSelector((state) => state.tvShows.isTVShowLoading);
  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);

  const [showAll, setShowAll] = useState(false);

  const filteredEpisodes = episodes.filter((e) => !e.air_date
    || moment(e.air_date).diff(moment()) < 0);
  const episodesToDisplay = showAll
    ? filteredEpisodes
    : filteredEpisodes.slice(0, MAX_EPISODES_TO_SHOW);
  const episodesTruncated = filteredEpisodes.length - MAX_EPISODES_TO_SHOW;

  const handleShowAllClick = () => {
    setShowAll(!showAll);
  };

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

  if (isSeasonLoading || isTVShowLoading) {
    return (
      <ComponentLoader
        isFullScreen={false}
        label={`Getting episodes from Season ${selectedSeason}...`}
      />
    );
  }

  return (
    <Grid container spacing={isSmallTabletBelow ? 4 : 2}>
      {episodesToDisplay.map((episode) => {
        const {
          air_date: airDate,
          crew,
          episode_number: episodeNumber,
          guest_stars: guestStars,
          name,
          overview,
          still_path: stillPath,
        } = episode;

        if (!airDate || moment(airDate).diff(moment()) > 0) return null;

        let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
        if (stillPath) imagePath += `/w780${stillPath}`;

        const [director] = crew.filter((e) => e.job === 'Director');
        const [writer] = crew.filter((e) => e.job === 'Writer');

        return (
          <Grid item md={6} xs={12} container direction="column">
            <Grid item className={classes.gridItem}>
              {stillPath
                ? (
                  <img
                    className={classes.image}
                    alt="Season cover"
                    src={imagePath}
                  />
                )
                : (
                  <div className={clsx(classes.image, classes.activeImage, classes.brokenImage)}>
                    <Typography variant="body1">No image available.</Typography>
                  </div>
                )}
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography noWrap>
                {`${episodeNumber} · ${name}`}
              </Typography>
              <Typography color="textSecondary" variant="body2" noWrap gutterBottom>
                {airDate ? moment(airDate).format('MMM D, YYYY') : ''}
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <LineClamp
                text={overview}
                lines={2}
                ellipsis="..."
                moreText="read more"
                lessText="read less"
                className="line-clamp"
              />
            </Grid>
            <Grid item className={classes.gridItem} container>
              {renderCrew(director, 'Director')}
              {renderCrew(writer, 'Writer')}
            </Grid>
            {guestStars.length > 0 && (
              <Grid item className={classes.gridItem}>
                <Typography color="textSecondary" variant="caption">
                  Guests
                </Typography>
                <AvatarGroup className={classes.avatarGroup}>
                  {guestStars.map((guest, i) => i < MAX_GUESTS_TO_SHOW && (
                    <Tooltip
                      title={`${guest.character} / ${guest.name}`}
                      enterTouchDelay={50}
                    >
                      <Avatar
                        className={classes.avatar}
                        src={`${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}/w780${guest.profile_path}`}
                      />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </Grid>
            )}
          </Grid>
        );
      })}
      {filteredEpisodes.length > MAX_EPISODES_TO_SHOW && (
        <Grid item xs={12} container justify="center">
          <Button onClick={handleShowAllClick} variant="outlined">
            {showAll
              ? 'Show less'
              : `Show ${episodesTruncated} more episode${episodesTruncated > 1 ? 's' : ''}`}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default TVShowEpisodeDetails;

import React from 'react';

import clsx from 'clsx';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

import BrokenImage from '../../common/BrokenImage';
import ItemHorizontalContainer from '../../common/item/ItemHorizontalContainer';

import { getTVShowSeasonDetails } from '../../../api';

import { tvShowsActions } from '../../../reducers/ducks';

import { decryptKey } from '../../../utils/functions';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  image: {
    border: `1px solid ${theme.palette.brokenImage.border}`,
    borderRadius: theme.shape.borderRadius,
    height: theme.spacing(25),
    width: theme.spacing(18.75),
  },
  activeImage: {
    border: `1px solid ${theme.palette.divider} !important`,
    borderRadius: theme.shape.borderRadius,
  },
  emphasis: {
    fontWeight: 600,
  },
  horizontalScrollItemSpacing: {
    border: '1px solid transparent',
    cursor: 'pointer',
    margin: 0,
    padding: theme.spacing(1),
    maxWidth: theme.spacing(22.25),
    [theme.breakpoints.only('xs')]: {
      '&:last-child': {
        marginRight: theme.spacing(2),
      },
    },
  },
  gridItem: {
    maxWidth: '100%',
  },
  brokenImageContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
  lastEntry: {
    width: theme.spacing(2.5),
  },
}));

const TVShowSeasonList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);
  const dispatch = useDispatch();

  const { seasons } = tvShow;

  const handleCardClick = (index) => {
    if (selectedSeason !== index) {
      getTVShowSeasonDetails(decryptKey(), tvShow.id, index, (response) => {
        dispatch(tvShowsActions.setEpisode(response));
      }, () => {});
    }
    dispatch(tvShowsActions.setSelectedSeason(index));
  };

  return (
    <Grid container item xs={12} className={classes.container}>
      <ItemHorizontalContainer
        imageSize={theme.spacing(28)}
        scrollAmount={theme.spacing(63)}
      >
        {seasons.map((season) => {
          const {
            air_date: airDate,
            id,
            name,
            poster_path: posterPath,
            season_number: seasonNumber,
          } = season;

          const isActive = seasonNumber === selectedSeason;
          const seasonName = seasonNumber === 0 ? name : `S${seasonNumber}`;

          let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
          if (posterPath) imagePath += `/w780${posterPath}`;

          return (
            <Grid
              className={clsx(
                classes.horizontalScrollItemSpacing,
                { [classes.activeImage]: isActive },
              )}
              container
              direction="column"
              onClick={() => handleCardClick(seasonNumber)}
              spacing={1}
              key={`tv-show-season-list-${id}`}
            >
              <Grid item className={classes.gridItem}>
                {posterPath
                  ? (
                    <img
                      className={classes.image}
                      alt="Season cover"
                      src={imagePath}
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
                <Typography noWrap className={clsx({ [classes.emphasis]: isActive })}>
                  {seasonName}
                </Typography>
                <Typography color="textSecondary" variant="body2" noWrap>
                  {airDate ? moment(airDate).format('MMM D, YYYY') : ''}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
        {isMobile && (
          <Grid container direction="column" spacing={1}>
            <Grid item className={classes.lastEntry} />
          </Grid>
        )}
      </ItemHorizontalContainer>
    </Grid>
  );
};

export default TVShowSeasonList;

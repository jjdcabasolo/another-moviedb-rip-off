import React from 'react';

import clsx from 'clsx';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
} from '@material-ui/core';

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
    padding: theme.spacing(0.5),
    maxWidth: theme.spacing(21),
  },
  gridItem: {
    maxWidth: '100%',
  },
  brokenImage: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.action.hover,
  },
}));

const TVShowSeasonList = () => {
  const theme = useTheme();
  const classes = useStyles();

  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);
  const dispatch = useDispatch();

  const { seasons } = tvShow;

  const handleCardClick = (index) => {
    dispatch(tvShowsActions.setSeasonDrawerSelectedSeason(true));
    if (selectedSeason !== index) {
      getTVShowSeasonDetails(decryptKey(), tvShow.id, index, (response) => {
        dispatch(tvShowsActions.setEpisode(response));
      });
    }
    dispatch(tvShowsActions.setSelectedSeason(index));
  };

  const renderBrokenImage = () => (
    <div className={clsx(classes.image, classes.activeImage, classes.brokenImage)}>
      <Typography variant="body1">No image available.</Typography>
    </div>
  );

  const renderSeasonCard = (posterPath) => {
    let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
    if (posterPath) imagePath += `/w780${posterPath}`;
    else imagePath = renderBrokenImage();

    if (!(typeof (imagePath) === 'string')) {
      return imagePath;
    }

    return (
      <img
        className={classes.image}
        alt="Season cover"
        src={imagePath}
      />
    );
  };

  return (
    <Grid container className={classes.container}>
      <ItemHorizontalContainer
        imageSize={theme.spacing(25)}
        scrollAmount={theme.spacing(63)}
      >
        {seasons.map((season) => {
          const {
            air_date: airDate,
            poster_path: posterPath,
            name,
            season_number: seasonNumber,
          } = season;

          const isActive = seasonNumber === selectedSeason;
          const seasonName = seasonNumber === 0 ? name : `S${seasonNumber}`;

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
            >
              <Grid item className={classes.gridItem}>
                {renderSeasonCard(posterPath)}
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
      </ItemHorizontalContainer>
    </Grid>
  );
};

export default TVShowSeasonList;

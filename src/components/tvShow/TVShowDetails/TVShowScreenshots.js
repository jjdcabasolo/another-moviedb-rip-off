import React from 'react';

import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { selectEpisode, selectSeason } from '../../../utils/functions';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';
import ItemHorizontalContainer from '../../common/item/ItemHorizontalContainer';

const useStyles = makeStyles((theme) => ({
  image: {
    height: theme.spacing(22),
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  video: {
    '& div': {
      borderRadius: theme.shape.borderRadius,
    },
    height: `${theme.spacing(22)}px !important`,
    width: `${theme.spacing(40)}px !important`,
    marginRight: theme.spacing(2),
    marginBottom: 5,
  },
  screenshotContainer: {
    position: 'relative',
  },
}));

const TVShowScreenshots = () => {
  const classes = useStyles();

  const episodes = useSelector((state) => state.tvShows.episodes);
  const selectedEpisode = useSelector((state) => state.tvShows.selectedEpisode);
  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);
  const tvShow = useSelector((state) => state.tvShows.tvShow);

  const { seasons, video } = tvShow;

  const { poster_path: posterPath } = selectSeason(seasons, selectedSeason);
  const { still_path: stillPath } = selectEpisode(episodes, selectedEpisode);

  const imageConfig = [
    {
      label: 'Season cover',
      isVisible: posterPath || false,
      component: (
        <img
          className={classes.image}
          alt="Season cover"
          src={`${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}w300${posterPath}`}
        />
      ),
    },
    {
      label: `A scene from S${selectedSeason}E${selectedEpisode}`,
      isVisible: stillPath || false,
      component: (
        <img
          className={classes.image}
          alt="Episode still"
          src={`${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}w300${stillPath}`}
        />
      ),
    },
    {
      label: video ? video.type : '',
      isVisible: video || false,
      component: (
        <ReactPlayer
          className={classes.video}
          controls
          light
          pip
          url={video ? video.link : ''}
          width="100%"
        />
      ),
    },
  ];

  return (
    <Grid container className={classes.screenshotContainer}>
      <ItemHorizontalContainer
        id="tvshow-screenshots"
        scrollAmount={200}
      >
        {imageConfig.map((item) => item.isVisible && (
          <div className={classes.horizontalScrollItem}>
            <Grid container direction="column">
              <Grid item>
                {item.component}
              </Grid>
              <Grid item>
                <Typography variant="caption" noWrap>
                  {item.label}
                </Typography>
              </Grid>
            </Grid>
          </div>
        ))}
      </ItemHorizontalContainer>
    </Grid>
  );
};

export default TVShowScreenshots;

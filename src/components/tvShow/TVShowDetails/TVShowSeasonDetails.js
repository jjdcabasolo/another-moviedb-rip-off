import React from 'react';

import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';

import { tvShowsActions } from '../../../reducers/ducks';

import { selectSeason } from '../../../utils/functions';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  cardImg: {
    height: 0,
    paddingTop: theme.spacing(50),
    [theme.breakpoints.down('lg')]: {
      paddingTop: theme.spacing(55),
    },
    [theme.breakpoints.only('md')]: {
      paddingTop: theme.spacing(70),
    },
    [theme.breakpoints.only('xs')]: {
      paddingTop: theme.spacing(60),
    },
    width: '100%',
  },
  noWeight: {
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const TVShowSeasonDetails = () => {
  const classes = useStyles();

  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);
  const dispatch = useDispatch();

  const { seasons, name, tmdb } = tvShow;

  const season = selectSeason(seasons, selectedSeason);

  const {
    air_date: airDate,
    episode_count: episodeCount,
    overview,
    poster_path: posterPath,
  } = season;

  const handleSeasonChange = () => {
    dispatch(tvShowsActions.setSeasonDrawerSelectedSeason(false));
    dispatch(tvShowsActions.setSeasonDrawer(true));
  };

  const renderBrokenImage = () => (
    <div className={classes.brokenImgContainer}>
      <Typography variant="body1">No image available.</Typography>
    </div>
  );

  let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
  if (posterPath) imagePath += `/w780${posterPath}`;
  else imagePath = renderBrokenImage();

  return (
    <Grid item container spacing={2}>
      <Grid item lg={4} md={6} sm={6} xs={12}>
        <Card>
          <CardActionArea>
            { !(typeof (imagePath) === 'string') && imagePath }
            <CardMedia
              className={classes.cardImg}
              image={imagePath}
            />
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item lg={8} md={6} sm={6} xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {moment(airDate).format('MMM D, YYYY')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Premier date
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              {episodeCount}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Episodes
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {overview
              ? (
                <Typography variant="body1">
                  {overview}
                </Typography>
              )
              : (
                <>
                  <Typography variant="body1">
                    There is no description yet.
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    {`Contribute now on TMDb's ${name} `}
                    <Link href={`${tmdb}`}>page</Link>
                    {'.'}
                  </Typography>
                </>
              )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} container justify="flex-end">
        <Button onClick={handleSeasonChange}>
          Change season
        </Button>
      </Grid>
    </Grid>
  );
};

export default TVShowSeasonDetails;

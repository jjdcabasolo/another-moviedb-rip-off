import React from 'react';

import moment from 'moment';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  Link,
} from '@material-ui/core';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

const useStyles = makeStyles(theme => ({
  cardImg: {
    height: 0,
    paddingTop: theme.spacing(50),
    width: '100%',
  },
  noWeight: {
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const TVShowSeasonDetails = () => {
  const classes = useStyles();

  const tvShow = useSelector(state => state.tvShows.tvShow);
  const selectedSeason = useSelector(state => state.tvShows.selectedSeason);

  const { seasons, name, tmdb } = tvShow;

  const {
    poster_path,
    overview,
    air_date,
    episode_count,
  } = seasons.filter(e => e.season_number === selectedSeason)[0];

  const renderBrokenImage = () => (
    <div className={classes.brokenImgContainer}>
      <Typography variant="body1">No image available.</Typography>
    </div>
  );

  let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
  if (poster_path) imagePath += `/w780${poster_path}`;
  else imagePath = renderBrokenImage();

  return (
    <Grid item container spacing={2}>
      <Grid item xs={4}>
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
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {moment(air_date).format('MMM D, YYYY')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Premier date
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              {episode_count}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Episodes
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {overview
              ? <Typography variant="body1">{overview}</Typography>
              : (
                <Typography variant="body1">
                  {`There is no description yet. Contribute now on TMDb's ${name} `}
                  <Link href={`${tmdb}`}>page</Link>.
                </Typography>
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TVShowSeasonDetails;
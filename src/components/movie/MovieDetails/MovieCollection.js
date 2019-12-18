import React from 'react';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActionArea, CardMedia, Typography } from '@material-ui/core';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

const useStyles = makeStyles(theme => ({
  collectionImg: {
    height: 0,
    paddingTop: theme.spacing(20),
    width: '100%',
  },
  typoOverlay: {
    position: 'absolute',
    marginTop: theme.spacing(-9),
    padding: theme.spacing(4, 2, 2, 2),
    color: theme.palette.common.white,
    pointerEvents: 'none',
    overflow: 'hidden',
    width: '100%',
    backgroundImage: `linear-gradient(to top, rgba(33, 33, 33, 0.6), #0000)`,
  },
}));

const MovieCollection = () => {
  const classes = useStyles();

  const movie = useSelector(state => state.movies.movie);

  const { belongs_to_collection } = movie;

  const renderBrokenImage = () => (
    <div className={classes.brokenImgContainer}>
      <Typography variant="body1">No image available.</Typography>
    </div>
  );

  let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
  if (belongs_to_collection.backdrop_path) imagePath += `/w780${belongs_to_collection.backdrop_path}`;
  else if (belongs_to_collection.poster_path) imagePath += `/w780${belongs_to_collection.poster_path}`;
  else imagePath = renderBrokenImage();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardActionArea>
            { !(typeof (imagePath) === 'string') && imagePath }
            <CardMedia
              className={classes.collectionImg}
              image={imagePath}
            />
            <div gutterBottom variant="button" className={classes.typoOverlay}>
              <Typography variant="h6" className={classes.cardTitle} noWrap>
                {belongs_to_collection.name}
              </Typography>
            </div>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MovieCollection;

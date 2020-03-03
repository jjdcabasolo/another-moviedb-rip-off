import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../../constants';

const useStyles = makeStyles((theme) => ({
  cardImg: {
    height: 0,
    paddingTop: theme.spacing(22),
    width: '100%',
  },
  typoOverlay: {
    backgroundImage: 'linear-gradient(to top, rgba(33, 33, 33, 0.6), #0000)',
    color: theme.palette.common.white,
    marginTop: theme.spacing(-9),
    overflow: 'hidden',
    padding: theme.spacing(4, 2, 2, 2),
    pointerEvents: 'none',
    position: 'absolute',
    width: '100%',
  },
}));

const ImageCard = ({ content, onClick, col = 12 }) => {
  const classes = useStyles();

  const {
    backdrop_path: backdropPath,
    name,
    poster_path: posterPath,
  } = content;

  const renderBrokenImage = () => (
    <div>
      <Typography variant="body1">No image available.</Typography>
    </div>
  );

  let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
  if (backdropPath) imagePath += `/w780${backdropPath}`;
  else if (posterPath) imagePath += `/w780${posterPath}`;
  else imagePath = renderBrokenImage();

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={8} md={6} lg={6} xl={6}>
        <Card onClick={onClick}>
          <CardActionArea>
            { !(typeof (imagePath) === 'string') && imagePath }
            <CardMedia
              className={classes.cardImg}
              image={imagePath}
            />
            <div gutterBottom variant="button" className={classes.typoOverlay}>
              <Typography variant="h6" className={classes.cardTitle} noWrap>
                {name}
              </Typography>
            </div>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ImageCard;

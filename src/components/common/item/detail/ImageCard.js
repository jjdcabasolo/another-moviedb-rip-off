import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActionArea, CardMedia, Typography } from '@material-ui/core';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../../constants';

const useStyles = makeStyles(theme => ({
  cardImg: {
    height: 0,
    paddingTop: theme.spacing(22),
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

const ImageCard = ({ content, onClick }) => {
  const classes = useStyles();

  const renderBrokenImage = () => (
    <div>
      <Typography variant="body1">No image available.</Typography>
    </div>
  );

  let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
  if (content.backdrop_path) imagePath += `/w780${content.backdrop_path}`;
  else if (content.poster_path) imagePath += `/w780${content.poster_path}`;
  else imagePath = renderBrokenImage();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card onClick={onClick}>
          <CardActionArea>
            { !(typeof (imagePath) === 'string') && imagePath }
            <CardMedia
              className={classes.cardImg}
              image={imagePath}
            />
            <div gutterBottom variant="button" className={classes.typoOverlay}>
              <Typography variant="h6" className={classes.cardTitle} noWrap>
                {content.name}
              </Typography>
            </div>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ImageCard;

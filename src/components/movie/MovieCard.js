import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { truncateText } from '../../utils/text';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../constants/movie';

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(0, 1),
  },
  media: {
    height: 0,
    paddingTop: '25em',
    width: '15em',
  },
}));

const MovieCard = ({movie}) => {
  const classes = useStyles();
  console.log(`${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}${movie.poster_path}`);
  return (
    <Grid item xs={2} className={classes.card}>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${1}${movie.poster_path}`}
            title={movie.title}
          />
          <CardContent>
            <Typography gutterBottom variant="button">
              {truncateText(movie.title, 25)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default MovieCard;

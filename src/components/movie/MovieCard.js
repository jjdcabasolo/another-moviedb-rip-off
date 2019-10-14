import React from 'react';

import clsx from 'clsx';
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
  // TO DO: update image height to browser height jsq auq n
  mediaHover: {
    '&:hover': {
      filter: 'blur(1px) brightness(80%)',
    },
  },
  mediaDrawerOpen: {
    height: 0,
    paddingTop: '26em',
    width: '21em',
  },
  mediaDrawerClosed: {
    height: 0,
    paddingTop: '5em',
    width: '60em',
  },
  typoOverlay: {
    position: 'absolute',
    marginTop: theme.spacing(-4),
    marginLeft: theme.spacing(2),
    color: theme.palette.common.white,
    pointerEvents: 'none',
  },
}));

const MovieCard = ({movie, movieDrawerOpen}) => {
  const classes = useStyles();
  console.log(movieDrawerOpen, movie);

  const imagePath = `${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}${movieDrawerOpen ? movie.poster_path : movie.backdrop_path}`;

  return (
    <Grid item xs={movieDrawerOpen ? 2 : 12} className={classes.card}>
      <Card>
        <CardActionArea>
          <CardMedia
            className={clsx(
              { [classes.mediaDrawerOpen]: movieDrawerOpen },
              { [classes.mediaDrawerClosed]: !movieDrawerOpen },
              { [classes.mediaHover]: !movieDrawerOpen },
            )}
            // image={`${1}${movie.poster_path}`}
            image={imagePath}
          />
          {movieDrawerOpen
            ? (
              <CardContent>
                <Typography gutterBottom variant="button">
                  {truncateText(movie.title, 25)}
                </Typography>
              </CardContent>
            )
            : (
              <Typography gutterBottom variant="button" className={classes.typoOverlay}>
                {truncateText(movie.title, 100)}
              </Typography>
            )
          }
          </CardActionArea>
      </Card>
    </Grid>
  );
};

export default MovieCard;

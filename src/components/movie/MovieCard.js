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

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../constants';

const useStyles = makeStyles(theme => ({
  mediaHover: {
    '&:hover': {
      filter: 'blur(1px) brightness(80%)',
    },
  },
  mediaDrawerOpen: {
    height: 0,
    // theme.breakpoints.up('lg')
    // theme.breakpoints.between('md', 'lg')
    // theme.breakpoints.down('md')
    [theme.breakpoints.up('lg')]: {
      paddingTop: (theme.browserSize.height - theme.spacing(20)) / 2,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      paddingTop: (theme.browserSize.height - theme.spacing(20)) / 2,
    },
    width: '100%',
  },
  mediaDrawerClosed: {
    height: 0,
    paddingTop: '5em',
    width: '60em',
  },
  typoOverlay: {
    position: 'absolute',
    marginTop: theme.spacing(-5),
    padding: theme.spacing(1, 2),
    color: theme.palette.common.white,
    pointerEvents: 'none',

    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '-webkit-fill-available',
    backgroundImage: `linear-gradient(to top, ${theme.palette.grey[900]} , #0000)`,
  },
}));

const MovieCard = ({movie, movieDrawerOpen, col}) => {
  const classes = useStyles();

  let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
  if (col === 2) {
    imagePath += movie.poster_path
  } else {
    imagePath += movie.backdrop_path
  }

  return (
    <Grid item xs={col} className={classes.card}>
      <Card>
        <CardActionArea>
          <CardMedia
            className={clsx(
              classes.mediaHover,
              { [classes.mediaDrawerOpen]: movieDrawerOpen },
              { [classes.mediaDrawerClosed]: !movieDrawerOpen },
            )}
            // image={`${1}${movie.poster_path}`}
            image={imagePath}
          />
          <Typography gutterBottom variant="button" className={classes.typoOverlay}>
            {truncateText(movie.title, movieDrawerOpen ? 25 : 100)}
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default MovieCard;

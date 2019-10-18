import React from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import { truncateText } from '../../utils/functions';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../constants';

const useStyles = makeStyles(theme => ({
  mediaHover: {
    '&:hover': {
      filter: 'blur(1px) brightness(80%)',
    },
  },
  mediaDrawerOpen: {
    height: 0,
    [theme.breakpoints.up('md')]: {
      paddingTop: (theme.browserSize.height - theme.spacing(20)) / 2,
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: (theme.browserSize.height - theme.spacing(20)) / 5.5,
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
  itemExtension: {
    maxWidth: '20%',
    flexBasis: '20%',
  },
}));

const MovieCard = ({movie, movieDrawerOpen, col}) => {
  const theme = useTheme();
  const higherResolutionDesktop = useMediaQuery(theme.breakpoints.up('xl'));
  const classes = useStyles();

  let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
  if (col === 2) {
    imagePath += movie.poster_path
  } else {
    imagePath += movie.backdrop_path
  }

  return (
    <Grid item xs={col} className={clsx({ [classes.itemExtension]: (col === 2 && !higherResolutionDesktop) })}>
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

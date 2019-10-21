import React from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { BrokenImageOutlined } from '@material-ui/icons';

import { truncateText } from '../../utils/functions';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../constants';

const useStyles = makeStyles(theme => ({
  mediaDrawerOpen: {
    height: 0,
    [theme.breakpoints.up('md')]: {
      paddingTop: (theme.browserSize.height - theme.spacing(20)) / 2,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      paddingTop: (theme.browserSize.height - theme.spacing(20)) / 5.5,
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: window.innerHeight / 4,
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
  brokenImgContainer: {
    position: 'absolute',
  },
  brokenImg: {
    fontSize: theme.typography.h3.fontSize,
  },
}));

const MovieCard = ({movie, movieDrawerOpen, col}) => {
  const theme = useTheme();
  const higherResolutionDesktop = useMediaQuery(theme.breakpoints.up('xl'));
  const classes = useStyles();

  const renderBrokenImage = () => (
    <div className={classes.brokenImgContainer}>
      <Typography variant="body1">Image not loaded.</Typography>
    </div>
  );

  let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
  if (col === 2) {
    if (movie.poster_path) imagePath += movie.poster_path;
    else imagePath = renderBrokenImage();
  } else {
    if (movie.backdrop_path) imagePath += movie.backdrop_path;
    else imagePath = renderBrokenImage();
  }

  return (
    <Grid item xs={col} className={clsx({ [classes.itemExtension]: (col === 2 && !higherResolutionDesktop) })}>
      <Card>
        <CardActionArea>
          { !(typeof (imagePath) === 'string') && imagePath}
          <CardMedia
            className={clsx(
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

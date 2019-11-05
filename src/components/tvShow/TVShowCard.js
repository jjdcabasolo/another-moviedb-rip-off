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

import { truncateText } from '../../utils/functions';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../constants';

const useStyles = makeStyles(theme => ({
  mediaDrawerOpen: {
    height: 0,
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(30),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      paddingTop: theme.spacing(60),
    },
    [theme.breakpoints.between('md', 'lg')]: {
      paddingTop: theme.spacing(40),
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: (theme.browserSize.height - theme.spacing(20)) / 2,
    },
    width: '100%',
  },
  mediaDrawerClosed: {
    height: 0,
    paddingTop: theme.spacing(30),
    width: '100%',
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
  rank: {
    fontWeight: '400',
    paddingRight: theme.spacing(1),
  },
}));

const TVShowCard = ({tvShow, tvShowDrawerOpen, col, rank}) => {
  const theme = useTheme();
  const higherResolutionDesktop = useMediaQuery(theme.breakpoints.up('xl'));
  const landscapeTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const classes = useStyles();

  const renderBrokenImage = () => (
    <div className={classes.brokenImgContainer}>
      <Typography variant="body1">Image not loaded.</Typography>
    </div>
  );

  let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
  if (col === 2 || (col === 6 && !landscapeTablet)) {
    if (tvShow.poster_path) imagePath += `/w780${tvShow.poster_path}`;
    else imagePath = renderBrokenImage();
  } else {
    if (tvShow.backdrop_path) imagePath += `/w780${tvShow.backdrop_path}`;
    else imagePath = renderBrokenImage();
  }

  return (
    <Grid item xs={col} className={clsx({ [classes.itemExtension]: (col === 2 && !higherResolutionDesktop) })}>
      <Card>
        <CardActionArea>
          { !(typeof (imagePath) === 'string') && imagePath }
          <CardMedia
            className={clsx(
              { [classes.mediaDrawerOpen]: tvShowDrawerOpen },
              { [classes.mediaDrawerClosed]: !tvShowDrawerOpen },
            )}
            // image={`${1}${tvShow.poster_path}`}
            image={imagePath}
          />
          <Typography gutterBottom variant="button" className={classes.typoOverlay}>
            <span className={classes.rank}>{rank}</span>
            {truncateText(tvShow.original_name, tvShowDrawerOpen ? 25 : 100)}
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default TVShowCard;

import React from 'react';

import clsx from 'clsx';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import { getMovieDetails } from '../../../api';

import { moviesActions } from '../../../reducers/ducks';

import { decryptKey, truncateText } from '../../../utils/functions';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

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
    marginTop: theme.spacing(-7),
    padding: theme.spacing(3, 2, 1, 2),
    color: theme.palette.common.white,
    pointerEvents: 'none',
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
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
  releaseDate: {
    position: 'absolute',
    top: theme.spacing(0.5),
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.fontWeight,
  },
  mobile: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px !important`,
  },
}));

const ItemCard = ({content, drawerOpen, col, rank, mobile, type}) => {
  const theme = useTheme();
  const higherResolutionDesktop = useMediaQuery(theme.breakpoints.up('xl'));
  const landscapeTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const classes = useStyles();

  const dispatch = useDispatch();

  if (!content) return <></>;

  const isMovie = type === 'movie';
  const isTVShow = type === 'tvshow';

  const handleGetDetails = () => {
    if (isMovie) {
      getMovieDetails(decryptKey(), content.id, response => {
        dispatch(moviesActions.setActiveMovie(response.data));
      }, error => {
        console.log(error.response);
        // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
      });
    } else if (isTVShow) {
      // getMovieDetails(decryptKey(), content.id, response => {
      //   dispatch(moviesActions.setActiveMovie(response.data));
      // }, error => {
      //   console.log(error.response);
      //   // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
      // });
    }
  };

  const renderBrokenImage = () => (
    <div className={classes.brokenImgContainer}>
      <Typography variant="body1">Image not loaded.</Typography>
    </div>
  );

  let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
  if (col === 2 || (col === 6 && !landscapeTablet)) {
    if (content && content.poster_path) imagePath += `/w780${content.poster_path}`;
    else imagePath = renderBrokenImage();
  } else {
    if (content && content.backdrop_path) imagePath += `/w780${content.backdrop_path}`;
    else imagePath = renderBrokenImage();
  }

  return (
    <Grid
      item
      xs={col}
      className={clsx(
        { [classes.itemExtension]: (col === 2 && !higherResolutionDesktop) },
        { [classes.mobile]: mobile },
      )}
    >
      <Card onClick={handleGetDetails}>
        <CardActionArea>
          { !(typeof (imagePath) === 'string') && imagePath }
          <CardMedia
            className={clsx(
              { [classes.mediaDrawerOpen]: drawerOpen },
              { [classes.mediaDrawerClosed]: !drawerOpen },
            )}
            image={imagePath}
          />
          <Typography gutterBottom variant="button" className={classes.typoOverlay}>
            { isMovie && (
              <span className={classes.releaseDate}>
                {moment(content.release_date).format('MMM D, YYYY')}
              </span>
            )}
            <span className={classes.rank}>{rank}</span>
            {truncateText(isMovie ? content.title : content.name, drawerOpen ? 25 : 100)}
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ItemCard;

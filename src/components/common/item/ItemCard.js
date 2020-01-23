import React from 'react';

import clsx from 'clsx';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import { truncateText } from '../../../utils/functions';

import { moviesActions, tvShowsActions } from '../../../reducers/ducks';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

const useStyles = makeStyles(theme => ({
  mediaDrawerOpen: {
    height: 0,
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(25),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      paddingTop: theme.spacing(50),
    },
    [theme.breakpoints.between('md', 'lg')]: {
      paddingTop: theme.spacing(30),
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: (theme.browserSize.height - theme.spacing(20)) / 2,
    },
    width: '100%',
  },
  mediaDrawerClosed: {
    height: 0,
    paddingTop: theme.spacing(21),
    width: '100%',
  },
  typoOverlay: {
    position: 'absolute',
    marginTop: theme.spacing(-12.5),
    padding: theme.spacing(4, 2, 2, 2),
    color: theme.palette.common.white,
    pointerEvents: 'none',
    overflow: 'hidden',
    width: '100%',
    backgroundImage: `linear-gradient(to top, rgba(33, 33, 33, 0.6), #0000)`,
  },
  itemExtension: {
    maxWidth: '20%',
    flexBasis: '20%',
  },
  brokenImgContainer: {
    position: 'absolute',
  },
  rank: {
    fontWeight: '400',
    fontSize: theme.typography.body1.fontSize,
    marginRight: theme.spacing(1),
  },
  mobile: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px !important`,
  },
  cardTitle: {
    letterSpacing: '0.02em',
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const ItemCard = ({ content, drawerOpen, col, rank, mobile, type, handleDrawerToggle }) => {
  const theme = useTheme();
  const higherResolutionDesktop = useMediaQuery(theme.breakpoints.up('xl'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const landscapeTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const classes = useStyles();

  const dispatch = useDispatch();

  const isMovie = type === 'movies';

  if (!content) return null;

  const handleCardClick = () => {
    if (handleDrawerToggle && drawerOpen) handleDrawerToggle();
    if (isMovie) dispatch(moviesActions.setDetailsLoading(true));
    else dispatch(tvShowsActions.setDetailsLoading(true));
  };

  const renderBrokenImage = () => (
    <div className={classes.brokenImgContainer}>
      <Typography variant="body1">No image available.</Typography>
    </div>
  );

  let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
  if (col === 2 || (col === 6 && !landscapeTablet) || isDesktop) {
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
      <Link to={`/${type}/${content.id}`}>
        <Card onClick={handleCardClick}>
          <CardActionArea>
            { !(typeof (imagePath) === 'string') && imagePath }
            <CardMedia
              className={clsx(
                { [classes.mediaDrawerOpen]: drawerOpen },
                { [classes.mediaDrawerClosed]: !drawerOpen },
              )}
              image={imagePath}
            />
            <div gutterBottom variant="button" className={classes.typoOverlay}>
              <Typography variant="h5" className={classes.cardTitle} noWrap>
                {truncateText(
                  isMovie ? (content.title || content.original_title) : (content.name || content.original_name),
                  drawerOpen ? 25 : 100
                )}
              </Typography>
              <Typography className={classes.rank}>
                {`${rank} • ${moment(isMovie ? content.release_date : content.first_air_date).format('MMM D, YYYY')}`}
              </Typography>
            </div>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

export default ItemCard;

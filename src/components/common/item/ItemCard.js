import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import BrokenImage from '../BrokenImage';

import { scrollToID, truncateText } from '../../../utils/functions';

import { moviesActions, tvShowsActions } from '../../../reducers/ducks';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  media: {
    borderRadius: theme.shape.borderRadius,
    paddingTop: theme.spacing(22),
  },
  mediaDrawerOpen: {
    height: 0,
    // [theme.breakpoints.only('sm')]: {
    //   paddingTop: theme.browserSize.height / 2.5,
    // },
    // [theme.breakpoints.up('lg')]: {
    //   paddingTop: theme.spacing(45),
    // },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(45),
    },
    width: '100%',
  },
  mediaDrawerClosed: {
    height: 0,
    width: '100%',
  },
  typoOverlayMediaDrawerOpen: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(-25),
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      marginTop: theme.spacing(-25),
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: -((theme.browserSize.height - theme.spacing(22)) / 2),
    },
  },
  typoOverlayMediaDrawerClosed: {
    marginTop: theme.spacing(-21),
  },
  typoOverlay: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'absolute',
    padding: theme.spacing(2),
    color: theme.palette.grey[100],
    pointerEvents: 'none',
    overflow: 'hidden',
    width: '100%',
    bottom: 0,
    height: '100%',
  },
  typoOverlayBackgroundGradient: {
    backgroundImage: `linear-gradient(to top,
      rgba(0,0,0,0.4) 0%,
      rgba(0,0,0,0.3) 30%,
      rgba(0,0,0,0.25) 35%,
      rgba(0,0,0,0.2) 40%,
      rgba(0,0,0,0.15) 45%,
      rgba(0,0,0,0.1) 50%,
      rgba(0,0,0,0.1) 90%,
      rgba(0,0,0,0.1) 100%
    )`,
  },
  cardContainer: {
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1, 0),
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1),
    },
  },
  itemExtension: {
    maxWidth: '20%',
    flexBasis: '20%',
  },
  rank: {
    fontWeight: '400',
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.grey[300],
    marginRight: theme.spacing(1),
  },
  rankText: {
    fontWeight: 600,
    color: theme.palette.grey[50],
  },
  cardTitle: {
    letterSpacing: '0.02em',
    fontWeight: theme.typography.fontWeightMedium,
  },
  horizontalScrollItemWidth: {
    padding: 0,
    width: theme.spacing(45),
    [theme.breakpoints.only('xs')]: {
      width: `calc(100vw - ${theme.spacing(6)}px)`,
    },
  },
  horizontalScrollItemSpacing: {
    padding: 0,
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      '&:last-child': {
        paddingBottom: 0,
      },
    },
    [theme.breakpoints.only('xs')]: {
      '&:first-child': {
        paddingTop: theme.spacing(1),
      },
      '&:last-child': {
        paddingBottom: 0,
      },
    },
  },
  brokenImageContainer: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    padding: theme.spacing(1),
    position: 'absolute',
    width: '100%',
  },
  card: {
    backgroundColor: theme.palette.brokenImage.background,
    border: `1px solid ${theme.palette.brokenImage.border}`,
  },
  textImageInvalid: {
    color: theme.palette.text.primary,
  },
}));

const ItemCard = ({
  col,
  content,
  drawerOpen,
  handleDrawerToggle,
  hasSpacingHorizontalScroll,
  isHorizontalScroll = false,
  rank,
  type,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const seasonDrawerOpen = useSelector((state) => state.tvShows.seasonDrawerOpen);
  const dispatch = useDispatch();

  const isMovie = type === 'movies';
  const date = isMovie ? content.release_date : content.first_air_date;
  const dateDisplay = date ? ` • ${moment(date).format('MMM D, YYYY')}` : '';

  if (!content) return null;

  const handleCardClick = () => {
    scrollToID('scroll-to-top-anchor', true);
    if (handleDrawerToggle && drawerOpen) handleDrawerToggle();
    if (isMovie) dispatch(moviesActions.setDetailsLoading(true));
    else {
      if (seasonDrawerOpen) {
        dispatch(tvShowsActions.setSeasonDrawer(false));
      }
      dispatch(tvShowsActions.setDetailsLoading(true));
    }
  };

  let isImageValid = true;
  let imagePath = MOVIE_DRAWER_TMDB_IMAGE_PREFIX;
  if (!isMobile && content && content.poster_path) {
    imagePath += `/w780${content.poster_path}`;
  } else if (isMobile && content && content.backdrop_path) {
    imagePath += `/w780${content.backdrop_path}`;
  } else isImageValid = false;

  return (
    <Grid
      className={clsx(
        classes.cardContainer,
        {
          [classes.itemExtension]: col === 2 && !isHorizontalScroll,
          [classes.horizontalScrollItemWidth]: isHorizontalScroll,
          [classes.horizontalScrollItemSpacing]: hasSpacingHorizontalScroll,
        },
      )}
      item
      xs={col}
    >
      <Link to={`/${type}/${content.id}`}>
        <Card onClick={handleCardClick} variant="outlined" className={classes.card}>
          <CardActionArea>
            { !isImageValid && (
              <BrokenImage
                type="cardMedia"
                extraClass={classes.brokenImageContainer}
              />
            )}
            <CardMedia
              className={clsx(
                classes.media,
                {
                  [classes.mediaDrawerOpen]: drawerOpen,
                  [classes.mediaDrawerClosed]: !drawerOpen,
                },
              )}
              image={imagePath}
            />
            <div
              className={clsx(
                classes.typoOverlay,
                {
                  [classes.typoOverlayBackgroundGradient]: isImageValid,
                  [classes.typoOverlayMediaDrawerOpen]: drawerOpen,
                  [classes.typoOverlayMediaDrawerClosed]: !drawerOpen,
                },
              )}
              gutterBottom
              variant="button"
            >
              <Typography
                variant="h6"
                className={clsx(
                  classes.cardTitle,
                  { [classes.textImageInvalid]: !isImageValid },
                )}
                noWrap
              >
                {truncateText(
                  isMovie
                    ? (content.title || content.original_title)
                    : (content.name || content.original_name),
                  drawerOpen ? 25 : 100,
                  'characters',
                )}
              </Typography>
              <Typography
                className={clsx(
                  classes.rank,
                  { [classes.textImageInvalid]: !isImageValid },
                )}
                color="textSecondary"
              >
                <span className={classes.rankText}>{rank}</span>
                {dateDisplay}
              </Typography>
            </div>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

ItemCard.propTypes = {
  col: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  hasSpacingHorizontalScroll: PropTypes.bool.isRequired,
  isHorizontalScroll: PropTypes.bool.isRequired,
  rank: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemCard;

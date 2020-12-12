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

import { truncateText } from '../../../utils/functions';

import { moviesActions, tvShowsActions } from '../../../reducers/ducks';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  media: {
    borderRadius: theme.shape.borderRadius,
  },
  mediaDrawerOpen: {
    height: 0,
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(25),
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      paddingTop: theme.spacing(25),
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: (theme.browserSize.height - theme.spacing(22)) / 2,
    },
    width: '100%',
  },
  mediaDrawerClosed: {
    height: 0,
    paddingTop: theme.spacing(21),
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
    height: '100%',
    backgroundImage: `linear-gradient(to top,
      rgba(0,0,0,0.4) 0%,
      rgba(0,0,0,0.3) 30%,
      rgba(0,0,0,0.25) 35%,
      rgba(0,0,0,0.2) 40%,
      rgba(0,0,0,0.15) 45%,
      rgba(0,0,0,0.1) 50%,
      rgba(0,0,0,0.1) 90%,
      rgba(0,0,0,0.1) 100%);
    )`,
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
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.grey[300],
    marginRight: theme.spacing(1),
  },
  mobile: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px !important`,
  },
  cardTitle: {
    letterSpacing: '0.02em',
    fontWeight: theme.typography.fontWeightMedium,
  },
  horizontalScrollItemWidth: {
    width: theme.spacing(45),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      '&:nth-child(odd)': {
        paddingRight: theme.spacing(1),
      },
      '&:nth-child(even)': {
        paddingLeft: theme.spacing(1),
      },
    },
  },
}));

const ItemCard = ({
  col,
  content,
  drawerOpen,
  handleDrawerToggle,
  isHorizontalScroll = false,
  mobile,
  rank,
  type,
}) => {
  const theme = useTheme();
  const higherResolutionDesktop = useMediaQuery(theme.breakpoints.up('xl'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const landscapeTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const classes = useStyles();

  const seasonDrawerOpen = useSelector((state) => state.tvShows.seasonDrawerOpen);
  const dispatch = useDispatch();

  const isMovie = type === 'movies';
  const date = isMovie ? content.release_date : content.first_air_date;
  const dateDisplay = date ? ` • ${moment(date).format('MMM D, YYYY')}` : '';

  if (!content) return null;

  const handleCardClick = () => {
    if (handleDrawerToggle && drawerOpen) handleDrawerToggle();
    if (isMovie) dispatch(moviesActions.setDetailsLoading(true));
    else {
      if (seasonDrawerOpen) {
        dispatch(tvShowsActions.setSeasonDrawer(false));
      }
      dispatch(tvShowsActions.setDetailsLoading(true));
    }
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
  } else if (content && content.backdrop_path) imagePath += `/w780${content.backdrop_path}`;
  else imagePath = renderBrokenImage();

  return (
    <Grid
      className={clsx(
        { [classes.itemExtension]: (col === 2 && !higherResolutionDesktop) && !isHorizontalScroll },
        { [classes.mobile]: mobile },
        { [classes.horizontalScrollItemWidth]: isHorizontalScroll },
      )}
      item
      xs={col}
    >
      <Link to={`/${type}/${content.id}`}>
        <Card onClick={handleCardClick} variant="outlined">
          <CardActionArea>
            { !(typeof (imagePath) === 'string') && imagePath }
            <CardMedia
              className={clsx(
                classes.media,
                { [classes.mediaDrawerOpen]: drawerOpen },
                { [classes.mediaDrawerClosed]: !drawerOpen },
              )}
              image={imagePath}
            />
            <div
              className={clsx(
                classes.typoOverlay,
                { [classes.typoOverlayMediaDrawerOpen]: drawerOpen },
                { [classes.typoOverlayMediaDrawerClosed]: !drawerOpen },
              )}
              gutterBottom
              variant="button"
            >
              <Typography variant="h6" className={classes.cardTitle} noWrap>
                {truncateText(
                  isMovie
                    ? (content.title || content.original_title)
                    : (content.name || content.original_name),
                  drawerOpen ? 25 : 100,
                  'characters',
                )}
              </Typography>
              <Typography className={classes.rank} color="textSecondary">
                {`${rank}${dateDisplay}`}
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
  isHorizontalScroll: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  mobile: PropTypes.bool.isRequired,
  rank: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemCard;

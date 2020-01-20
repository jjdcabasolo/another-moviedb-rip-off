import React, { useRef } from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Container,
  ClickAwayListener,
  CssBaseline,
  Drawer,
  useMediaQuery,
} from '@material-ui/core';

import Helmet from '../Helmet';
import SidebarTitlebar from './SidebarTitlebar';
import GradientBackground from '../../common/GradientBackground';
import ItemDrawer from '../../common/item/ItemDrawer';
import SidebarContent from './SidebarContent';
import ReadingProgress from '../../common/ReadingProgress';

import { sidebarActions } from '../../../reducers/ducks';

import { evaluateLocation } from '../../../utils/functions';

import { SIDEBAR_WIDTH } from '../../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
  },
  contentItemSelected: {
    marginTop: theme.spacing(-8),
  },
  drawer: {
    display: 'flex',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    width: SIDEBAR_WIDTH,
  },
  drawerClose: {
    overflow: 'hidden',
    width: theme.spacing(7),
  },
  drawerOpen: {
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: SIDEBAR_WIDTH,
  },
  itemContainer: {
    overflowY: 'scroll',
    width: '100%',
    height: theme.browserSize.height,
  },
  marginDrawerOpen: {
    marginLeft: theme.spacing(7),
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: theme.zIndex.appBar + 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transition: theme.transitions.create('backgroundColor', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Sidebar = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const target = useRef(null);

  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);
  const isMovieLoading = useSelector(state => state.movies.isMovieLoading);
  const isTVShowLoading = useSelector(state => state.tvShows.isTVShowLoading);
  const tvShow = useSelector(state => state.tvShows.tvShow);
  const movie = useSelector(state => state.movies.movie);
  const dispatch = useDispatch();

  const location = useLocation();

  const currentLocation = evaluateLocation(location);
  const isMovieSelected = 'movieId' in currentLocation;
  const isMovieTabActive = 'movie' in currentLocation;
  const isTVShowSelected = 'tvShowId' in currentLocation;
  const isTVShowTabActive = 'tvShow' in currentLocation;

  const handleDrawerState = () => dispatch(sidebarActions.setDrawer(false));

  const evaluateDrawerVisibility = () => {
    if (isMovieTabActive) {
      if (!isDesktop && isMovieSelected) return <SidebarTitlebar item={movie}/>;
      return <ItemDrawer />;
    } else if (isTVShowTabActive) {
      if (!isDesktop && isTVShowSelected) return <SidebarTitlebar item={tvShow}/>;
      return <ItemDrawer />;
    }
  };
  
  const renderTopContents = () => {
    if (isMovieTabActive) {
      return (
        <>
          <ReadingProgress target={target} isVisible={isMovieSelected && !isMovieLoading} />
          <GradientBackground
            isVisible={isMovieSelected && !isMovieLoading && isMovieTabActive}
            image={movie.backdrop_path}
            isItemSelected={isMovieSelected}
          />
        </>
      );
    } else if (isTVShowTabActive) {
      return (
        <>
          <ReadingProgress target={target} isVisible={isTVShowSelected && !isTVShowLoading} />
          <GradientBackground
            isVisible={isTVShowSelected && !isTVShowLoading && isTVShowTabActive}
            image={tvShow.backdrop_path}
            isItemSelected={isTVShowSelected}
          />
        </>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Helmet />

      <CssBaseline />

      <ClickAwayListener onClickAway={handleDrawerState}>
        <Drawer
          variant="permanent"
          className={clsx(
            classes.drawer,
            { [classes.drawerOpen]: drawerOpen },
            { [classes.drawerClose]: !drawerOpen },
          )}
          classes={{
            paper: clsx(
              { [classes.drawerOpen]: drawerOpen },
              { [classes.drawerClose]: !drawerOpen },
            ),
          }}
          open={drawerOpen}
          style={drawerOpen ? { 'position': 'absolute' } : {}}
        >
          <SidebarContent />
        </Drawer>
      </ClickAwayListener>
      
      { drawerOpen && (
        <>
          <div className={classes.marginDrawerOpen} />
          <div className={classes.backdrop} />
        </>
      )}

      {evaluateDrawerVisibility()}

      <div className={classes.itemContainer} ref={target}>
        {renderTopContents()}
        <main
          className={clsx(
            classes.content,
            { [classes.contentItemSelected]: isMovieSelected ||  isTVShowSelected}
          )}
        >
          <Container maxWidth="md">
            { children }
          </Container>
        </main>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default Sidebar;

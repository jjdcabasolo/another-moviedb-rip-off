import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  ClickAwayListener,
  Container,
  CssBaseline,
  Drawer,
  useMediaQuery,
} from '@material-ui/core';

import GradientBackground from '../../common/GradientBackground';
import Helmet from '../Helmet';
import ItemDrawer from '../../common/item/ItemDrawer';
import ReadingProgress from '../../common/ReadingProgress';
import SeasonDrawer from '../../tvShow/SeasonDrawer';
import SidebarContent from './SidebarContent';
import SidebarTitlebar from './SidebarTitlebar';

import { sidebarActions } from '../../../reducers/ducks';

import { evaluateLocation } from '../../../utils/functions';

import { SIDEBAR_WIDTH } from '../../../constants';

const useStyles = makeStyles((theme) => ({
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

  const drawerOpen = useSelector((state) => state.sidebar.drawerOpen);
  const isMovieLoading = useSelector((state) => state.movies.isMovieLoading);
  const isTVShowLoading = useSelector((state) => state.tvShows.isTVShowLoading);
  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const movie = useSelector((state) => state.movies.movie);
  const dispatch = useDispatch();

  const location = useLocation();

  const currentLocation = evaluateLocation(location);
  const isMovieSelected = 'movieId' in currentLocation;
  const isMovieTabActive = 'movie' in currentLocation;
  const isTVShowSelected = 'tvShowId' in currentLocation;
  const isTVShowTabActive = 'tvShow' in currentLocation;
  const isMovieEmpty = Object.keys(movie).length === 0 && movie.constructor === Object;
  const isTVShowEmpty = Object.keys(tvShow).length === 0 && tvShow.constructor === Object;

  const handleDrawerState = () => {
    if (drawerOpen) dispatch(sidebarActions.setDrawer(false));
  };

  const evaluateDrawerVisibility = () => {
    if (isMovieTabActive) {
      if (!isDesktop && isMovieSelected) return <SidebarTitlebar item={movie} />;
      return <ItemDrawer />;
    } if (isTVShowTabActive) {
      if (!isDesktop && isTVShowSelected) return <SidebarTitlebar item={tvShow} />;
      return <ItemDrawer />;
    }
    return null;
  };

  const renderTopContents = () => {
    if (isMovieTabActive) {
      return (
        <>
          <ReadingProgress
            isLoading={isMovieEmpty}
            isVisible={isMovieSelected && !isMovieLoading}
            target={target}
          />
          <GradientBackground
            image={movie.backdrop_path}
            isItemSelected={isMovieSelected}
            isLoading={isMovieEmpty}
            isVisible={isMovieSelected && !isMovieLoading && isMovieTabActive}
          />
        </>
      );
    } if (isTVShowTabActive) {
      return (
        <>
          <ReadingProgress
            isLoading={isTVShowEmpty}
            isVisible={isTVShowSelected && !isTVShowLoading}
            target={target}
          />
          <GradientBackground
            image={tvShow.backdrop_path}
            isItemSelected={isTVShowSelected}
            isLoading={isTVShowEmpty}
            isVisible={isTVShowSelected && !isTVShowLoading && isTVShowTabActive}
          />
        </>
      );
    }
    return null;
  };

  return (
    <div className={classes.root}>
      <Helmet />

      <CssBaseline />

      <ClickAwayListener onClickAway={handleDrawerState}>
        <Drawer
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
          style={drawerOpen ? { position: 'absolute' } : {}}
          variant="permanent"
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
            { [classes.contentItemSelected]: isMovieSelected || isTVShowSelected },
          )}
        >
          <Container maxWidth="md">
            { children }
          </Container>
        </main>
      </div>

      {isTVShowSelected && <SeasonDrawer />}
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Sidebar;

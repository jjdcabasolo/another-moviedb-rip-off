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
    marginTop: theme.spacing(-10),
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
  drawerPaper: {
    backgroundColor: theme.palette.background.default,
  },
  itemContainer: {
    overflowY: 'scroll',
    width: '100%',
    height: theme.browserSize.height,
  },
  marginDrawerOpen: {
    marginLeft: theme.spacing(7),
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
  const {
    movie: moviePath,
    movieId,
    tvShow: tvShowPath,
    tvShowId,
  } = evaluateLocation(location);

  const isMovieSelected = typeof movieId !== 'undefined' && movieId.length > 0;
  const isMovieTabActive = typeof moviePath !== 'undefined' && moviePath;
  const isTVShowSelected = typeof tvShowId !== 'undefined' && tvShowId.length > 0;
  const isTVShowTabActive = typeof tvShowPath !== 'undefined' && tvShowPath;
  const isMovie = isMovieSelected && isMovieTabActive;
  const isTVShow = isTVShowSelected && isTVShowTabActive;
  const isMovieEmpty = Object.keys(movie).length === 0 && movie.constructor === Object;
  const isTVShowEmpty = Object.keys(tvShow).length === 0 && tvShow.constructor === Object;

  const handleDrawerState = (open) => {
    if (drawerOpen !== open) {
      dispatch(sidebarActions.setDrawer(open));
    }
  };

  const evaluateDrawerVisibility = () => {
    if (isMovieTabActive) {
      if (!isDesktop && isMovieSelected) return <SidebarTitlebar item={movie} />;
      return <ItemDrawer isItemSelected={isMovieSelected} />;
    } if (isTVShowTabActive) {
      if (!isDesktop && isTVShowSelected) return <SidebarTitlebar item={tvShow} />;
      return <ItemDrawer options={isTVShowSelected} />;
    }
    return null;
  };

  const renderTopContents = () => {
    if (isMovie) {
      return (
        <GradientBackground
          image={movie.backdrop_path}
          isItemSelected={isMovieSelected}
          isLoading={isMovieEmpty}
          isVisible={isMovie && !isMovieLoading}
        />
      );
    } if (isTVShow) {
      return (
        <GradientBackground
          image={tvShow.backdrop_path}
          isItemSelected={isTVShowSelected}
          isLoading={isTVShowEmpty}
          isVisible={isTVShow && !isTVShowLoading}
        />
      );
    }
    return null;
  };

  return (
    <div className={classes.root}>
      <Helmet />

      <CssBaseline />

      <ClickAwayListener onClickAway={() => handleDrawerState(false)}>
        <Drawer
          className={clsx(
            classes.drawer,
            {
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            },
          )}
          classes={{
            paper: clsx(
              classes.drawerPaper,
              {
                [classes.drawerOpen]: drawerOpen,
                [classes.drawerClose]: !drawerOpen,
              },
            ),
          }}
          open={drawerOpen}
          onMouseEnter={() => handleDrawerState(true)}
          onMouseLeave={() => handleDrawerState(false)}
          style={drawerOpen ? { position: 'absolute' } : {}}
          variant="permanent"
        >
          <SidebarContent />
        </Drawer>
      </ClickAwayListener>

      {drawerOpen && (
        <div className={classes.marginDrawerOpen} />
      )}

      {evaluateDrawerVisibility()}

      <div className={classes.itemContainer} ref={target}>
        <div id="scroll-to-top-anchor" />
        {renderTopContents()}
        <main
          className={clsx(
            classes.content,
            { [classes.contentItemSelected]: isMovie || isTVShow },
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
};

export default Sidebar;

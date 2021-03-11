import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { usePath } from '../../../hooks';

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

  const [activeTab, idPath] = usePath();
  const isMovie = activeTab === 'movies';
  const { backdrop_path: movieBG } = movie;
  const { backdrop_path: tvShowBG } = tvShow;

  const isMovieEmpty = Object.keys(movie).length === 0 && movie.constructor === Object;
  const isTVShowEmpty = Object.keys(tvShow).length === 0 && tvShow.constructor === Object;

  const isItemSelected = typeof idPath !== 'undefined' && idPath.length > 0;
  const isTabActive = typeof activeTab !== 'undefined' && activeTab;
  const isItemEmpty = isMovie ? isMovieEmpty : isTVShowEmpty;
  const isItemLoading = isMovie ? isMovieLoading : isTVShowLoading;

  const handleDrawerState = (open) => {
    if (drawerOpen !== open) {
      dispatch(sidebarActions.setDrawer(open));
    }
  };

  const evaluateDrawerVisibility = () => {
    if (isTabActive) {
      if (!isDesktop && isItemSelected && idPath !== 'search') {
        return <SidebarTitlebar item={isMovie ? movie : tvShow} />;
      }
      return <ItemDrawer isItemSelected={isItemSelected} />;
    }

    return null;
  };

  const renderTopContents = () => {
    if (isItemSelected && isTabActive) {
      return (
        <GradientBackground
          image={isMovie ? movieBG : tvShowBG}
          isItemSelected={isItemSelected}
          isLoading={isItemEmpty}
          isVisible={isItemSelected && isTabActive && !isItemLoading}
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
            { [classes.contentItemSelected]: isItemSelected && isTabActive },
          )}
        >
          <Container maxWidth="md">
            {children}
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

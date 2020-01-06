import React, { useRef } from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
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
// import TemporaryDrawer from './TemporaryDrawer';
import SidebarContent from './SidebarContent';
import ReadingProgress from '../../common/ReadingProgress';

import { sidebarActions } from '../../../reducers/ducks';

import { SIDEBAR_WIDTH } from '../../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
  },
  contentMovieSelected: {
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
}));

const Sidebar = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const target = useRef(null);

  const activeTab = useSelector(state => state.sidebar.activeTab);
  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);
  const isMovieLoading = useSelector(state => state.movies.isMovieLoading);
  const movie = useSelector(state => state.movies.movie);
  const dispatch = useDispatch();

  const isMovieSelected = 'id' in movie;
  const isMovieTabActive = activeTab === 'movies';
  const isTVShowsTabActive = activeTab === 'tvshows';

  const handleDrawerState = () => dispatch(sidebarActions.setDrawer(false));

  const evaluateDrawerVisibility = () => {
    if (isMovieTabActive) {
      if (!isDesktop && isMovieSelected) return <SidebarTitlebar />;
      return <ItemDrawer type="movie" />;
    } else if (isTVShowsTabActive) {
      // if (!isDesktop) return <SidebarTitlebar />;
      return <ItemDrawer type="tvshow" />;
    }
  };

  return (
    <div className={classes.root}>
      <Helmet />

      <CssBaseline />

      {/* <TemporaryDrawer drawerOpen={drawerOpen} /> */}

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
      
      { drawerOpen && <div className={classes.marginDrawerOpen} /> }

      {evaluateDrawerVisibility()}

      <div className={classes.itemContainer} ref={target}>
        <ReadingProgress target={target} isVisible={isMovieSelected && !isMovieLoading} />
        <GradientBackground isVisible={isMovieSelected && !isMovieLoading} image="backdrop_path" isMovieSelected={isMovieSelected} />
        <main
          className={clsx(
            classes.content,
            { [classes.contentMovieSelected]: isMovieSelected }
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

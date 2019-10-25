import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import MovieCategory from './MovieCategory';
import MovieCard from './MovieCard';
import Note from '../common/Note';
import ResponsiveComponent from '../../utils/components/ResponsiveComponent';

import {
  SIDEBAR_WIDTH,
  NOTE_NO_API_KEY,
} from '../../constants';

const useStyles = makeStyles(theme => ({
  drawerOpenWidthOpenSidebar: {
    width: theme.browserSize.width - SIDEBAR_WIDTH,
  },
  drawerOpenWidthClosedSidebar: {
    width: theme.browserSize.width - 56,
  },
  drawerCloseWidthOpenSidebar: {
    width: (theme.browserSize.width - SIDEBAR_WIDTH) / 3,
  },
  drawerCloseWidthClosedSidebar: {
    width: (theme.browserSize.width - 56) / 3,
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    position: 'inherit',
    padding: theme.spacing(5),
    height: theme.browserSize.height,
  },
  drawerClose: {
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerOpen: {
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    marginBottom: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  extendItem: {
    flex: 1,
  },
  desktopDrawerClosedContainer: {
    maxHeight: '85vh',
    overflowY: 'auto',
  },
}));

const MovieDrawer = () => {
  const theme = useTheme();
  const isTabletBelow = useMediaQuery(theme.breakpoints.down('lg'));
  const classes = useStyles();

  const category = useSelector(state => state.movies.category);
  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);
  const list = useSelector(state => state.movies.list);

  const getLocalStorage = localStorage.getItem('movieDrawerOpen');
  const finalDrawerState = (getLocalStorage === null ? true : getLocalStorage === 'true') || isTabletBelow;
  const [movieDrawerOpen, setMovieDrawerOpen] = useState(finalDrawerState);

  const moviesToDisplay = list[category];

  const handleDrawerToggle = () => {
    localStorage.setItem('movieDrawerOpen', !movieDrawerOpen);
    setMovieDrawerOpen(!movieDrawerOpen);
  };

  const renderToggleMovieDrawer = () => (
    <IconButton onClick={handleDrawerToggle}>
      {movieDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
    </IconButton>
  );

  const renderMovieCards = () => {
    if (moviesToDisplay.length > 0) {
      if (movieDrawerOpen) {
        return (
          <ResponsiveComponent
            mobileComponent={<></>}
            tabletComponent={(
              <Grid container spacing={2}>
                {new Array(5).fill({}).map((_, index) => (
                  <Grid item container spacing={2}>
                    {moviesToDisplay.slice((2 * index), (2 * index) + 2).map((movie, rank) => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen} col={6} rank={(2 * index) + rank + 1}/> )}
                  </Grid>
                ))}
              </Grid>
            )}
            desktopComponent={(
              <Grid container spacing={2}>
                {new Array(2).fill({}).map((_, index) => (
                  <Grid item container spacing={2} direction="row" justify="center" alignItems="flex-start">
                    {moviesToDisplay.slice((5 * index), (5 * index) + 5).map((movie, rank) => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen} col={2} rank={(5 * index) + rank + 1}/> )}
                  </Grid>
                ))}
              </Grid>
            )}
          />
        );
      } else {
        return (
          <Grid item container justify="center" spacing={2} className={classes.desktopDrawerClosedContainer}>
            {moviesToDisplay.slice(0, 10).map((movie, rank) => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen} col={12} rank={rank + 1} /> )}
          </Grid>
        );
      }
    } else {
      return <Note details={NOTE_NO_API_KEY} />;
    }
  };

  return (
    <Drawer
      className={clsx(
        classes.drawer,
        { [classes.drawerOpen]: movieDrawerOpen },
        { [classes.drawerOpenWidthOpenSidebar]: movieDrawerOpen && drawerOpen },
        { [classes.drawerOpenWidthClosedSidebar]: movieDrawerOpen && !drawerOpen },

        { [classes.drawerClose]: !movieDrawerOpen },
        { [classes.drawerCloseWidthOpenSidebar]: !movieDrawerOpen && drawerOpen },
        { [classes.drawerCloseWidthClosedSidebar]: !movieDrawerOpen && !drawerOpen },
      )}
      variant="permanent"
      open={movieDrawerOpen}
      classes={{
        paper: clsx(
          classes.drawerPaper,
          { [classes.drawerOpen]: movieDrawerOpen },
          { [classes.drawerOpenWidthOpenSidebar]: movieDrawerOpen && drawerOpen },
          { [classes.drawerOpenWidthClosedSidebar]: movieDrawerOpen && !drawerOpen },

          { [classes.drawerClose]: !movieDrawerOpen },
          { [classes.drawerCloseWidthOpenSidebar]: !movieDrawerOpen && drawerOpen },
          { [classes.drawerCloseWidthClosedSidebar]: !movieDrawerOpen && !drawerOpen },
        ),
      }}
    >
      <Grid container direction="row" alignItems="center" spacing={2} className={classes.toolbar}>
        <Grid item>
          <Typography variant="h6">Movies</Typography>
        </Grid>
        <Grid item container justify="flex-end" alignItems="center" className={classes.extendItem}>
          {moviesToDisplay.length > 0 && <MovieCategory isDrawer={movieDrawerOpen} />}
          <ResponsiveComponent
            mobileComponent={null}
            tabletComponent={null}
            desktopComponent={renderToggleMovieDrawer()}
          />
        </Grid>
      </Grid>

      {renderMovieCards()}
    </Drawer>
  );
};

export default MovieDrawer;

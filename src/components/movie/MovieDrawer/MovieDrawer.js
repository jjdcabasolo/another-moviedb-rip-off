import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

import Category from './Category';
import MovieCard from '../MovieCard';
import Note from '../../common/Note';
import ResponsiveComponent from '../../../utils/components/ResponsiveComponent';

import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from '../../../api/movie';

import { moviesActions } from '../../../reducers/ducks';

import { decryptKey } from '../../../utils/functions';

import {
  SIDEBAR_WIDTH,
  NOTE_NO_API_KEY,
} from '../../../constants';

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
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'fixed',
    bottom: theme.spacing(4),
    padding: theme.spacing(0, 5),
    backgroundColor: theme.palette.background.paper,
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
}));

const MovieDrawer = () => {
  const theme = useTheme();

  const hideMovieDrawer = useMediaQuery(theme.breakpoints.up('lg'));

  const classes = useStyles();

  const apiKey = useSelector(state => state.sidebar.apiKey);
  const category = useSelector(state => state.movies.category);
  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);
  const list = useSelector(state => state.movies.list);
  const width = useSelector(state => state.browser.width);

  const dispatch = useDispatch();

  const [movieDrawerOpen, setMovieDrawerOpen] = useState(true);

  useEffect(() => {
    setMovieDrawerOpen(!hideMovieDrawer);
  }, [width]);

  useEffect(() => {
    getNowPlayingMovies(decryptKey(), response => {
      dispatch(moviesActions.setMovieList('nowPlaying', response.data.results));
    }, error => {
      console.log(error.response);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    getPopularMovies(decryptKey(), response => {
      dispatch(moviesActions.setMovieList('popular', response.data.results));
    }, error => {
      console.log(error.response);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    getTopRatedMovies(decryptKey(), response => {
      dispatch(moviesActions.setMovieList('topRated', response.data.results));
    }, error => {
      console.log(error.response);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    getUpcomingMovies(decryptKey(), response => {
      dispatch(moviesActions.setMovieList('upcoming', response.data.results));
    }, error => {
      console.log(error.response);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });
  }, [apiKey]);

  const moviesToDisplay = list[category];

  const handleDrawerToggle = () => setMovieDrawerOpen(!movieDrawerOpen);

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
            mobileComponent={<p>no mobile view yet biyatch</p>}
            tabletComponent={(
              <Grid container spacing={2}>
                <Grid item container spacing={2}>
                  {moviesToDisplay.slice(0, 2).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen} col={6} /> )}
                </Grid>
                <Grid item container spacing={2}>
                  {moviesToDisplay.slice(2, 4).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen} col={6} /> )}
                </Grid>
                <Grid item container spacing={2}>
                  {moviesToDisplay.slice(4, 6).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen} col={6} /> )}
                </Grid>
                <Grid item container spacing={2}>
                  {moviesToDisplay.slice(6, 8).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen} col={6} /> )}
                </Grid>
                <Grid item container spacing={2}>
                  {moviesToDisplay.slice(8, 10).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen} col={6} /> )}
                </Grid>
              </Grid>
            )}
            desktopComponent={(
              <Grid container spacing={2}>
                <Grid item container spacing={2} direction="row" justify="center" alignItems="flex-start">
                  {moviesToDisplay.slice(0, 5).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen} col={2}/> )}
                </Grid>
                <Grid item container spacing={2} direction="row" justify="center" alignItems="flex-start">
                  {moviesToDisplay.slice(5, 10).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen} col={2}/> )}
                </Grid>
              </Grid>
            )}
          />
        );
      } else {
        return (
          <Grid item container justify="center" spacing={2}>
            {moviesToDisplay.slice(0, 10).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen} col={12}/> )}
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
      movieDrawerOpen={movieDrawerOpen}
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
          <Category movieDrawerOpen={movieDrawerOpen} />
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

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

import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from '../../../api/movie';

import { moviesActions } from '../../../reducers/ducks';

import { decryptKey } from '../../../utils/encrypt';

import {
  MOVIE_DRAWER_WIDTH_OPEN_SIDEBAR,
  SIDEBAR_WIDTH,
  MOVIE_DRAWER_WIDTH_CLOSED_SIDEBAR,
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

  const matches = useMediaQuery(theme.breakpoints.up('lg'));

  const classes = useStyles();

  const apiKey = useSelector(state => state.sidebar.apiKey);
  const category = useSelector(state => state.movies.category);
  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);
  const list = useSelector(state => state.movies.list);

  const dispatch = useDispatch();

  const [movieDrawerOpen, setMovieDrawerOpen] = useState(true);

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

  const handleChipClick = category => dispatch(moviesActions.setCategory(category));

  const renderMovieCards = () => {
    if (moviesToDisplay.length > 0) {
      if (movieDrawerOpen) {
        return (
          <Grid container spacing={2}>
            <Grid item container direction="row" justify="center" alignItems="flex-start">
              {moviesToDisplay.slice(0, 5).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen}/> )}
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="flex-start">
              {moviesToDisplay.slice(5, 10).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen}/> )}
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid item container justify="center" spacing={2}>
            {moviesToDisplay.slice(0, 10).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen}/> )}
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
          <IconButton onClick={handleDrawerToggle}>
            {movieDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Grid>
      </Grid>

      {renderMovieCards()}
    </Drawer>
  );
};

export default MovieDrawer;

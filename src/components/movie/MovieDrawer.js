import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Grid,
  IconButton,
  Chip,
  Typography,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import MovieCard from './MovieCard';
import Note from '../common/Note';

import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from '../../api/movie';

import { decryptKey } from '../../utils/encrypt';

import {
  MOVIE_DRAWER_WIDTH,
  MOVIE_DRAWER_CATEGORY_CHIPS,
  NOTE_NO_API_KEY,
} from '../../constants';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: MOVIE_DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    position: 'inherit',
    width: MOVIE_DRAWER_WIDTH,
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
    width: MOVIE_DRAWER_WIDTH / 2,
  },
  drawerOpen: {
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: MOVIE_DRAWER_WIDTH,
  },
  toolbar: {
    marginBottom: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const MovieDrawer = () => {
  const classes = useStyles();

  const [movieDrawerOpen, setMovieDrawerOpen] = React.useState(false);
  const [moviePage, setMoviePage] = useState({
    category: 'nowPlaying',
    content: {
      nowPlaying: [],
      popular: [],
      topRated: [],
      upcoming: [],
    },
    pageNumber: 1,
  });

  useEffect(() => {
    getNowPlayingMovies(decryptKey(), response => {
      setMoviePage({ ...moviePage, content: {...moviePage.content, nowPlaying: response.data.results} });
    }, error => {
      console.log(error.response);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    getPopularMovies(decryptKey(), response => {
      setMoviePage({ ...moviePage, content: {...moviePage.content, popular: response.data.results} });
    }, error => {
      console.log(error.response);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    getTopRatedMovies(decryptKey(), response => {
      setMoviePage({ ...moviePage, content: {...moviePage.content, topRated: response.data.results} });
    }, error => {
      console.log(error.response);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });

    getUpcomingMovies(decryptKey(), response => {
      setMoviePage({ ...moviePage, content: {...moviePage.content, upcoming: response.data.results} });
    }, error => {
      console.log(error.response);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });
  }, []);

  const moviesToDisplay = moviePage.content[moviePage.category];

  const handleDrawerToggle = () => setMovieDrawerOpen(!movieDrawerOpen);

  const handleChipClick = category => setMoviePage({ ...moviePage, category });

  const renderMovieCards = () => {
    if (moviesToDisplay.length <= 0) {
      return <Note details={NOTE_NO_API_KEY} />;
    }
    else if (movieDrawerOpen) {
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
  };

  return (
    <Drawer
      className={clsx(
        classes.drawer,
        { [classes.drawerOpen]: movieDrawerOpen },
        { [classes.drawerClose]: !movieDrawerOpen },
      )}
      variant="permanent"
      movieDrawerOpen={movieDrawerOpen}
      classes={{
        paper: clsx(
          classes.drawerPaper,
          { [classes.drawerOpen]: movieDrawerOpen },
          { [classes.drawerClose]: !movieDrawerOpen },
        ),
      }}
    >
      <Grid container direction="row" alignItems="center" spacing={2} className={classes.toolbar}>
        <Grid item>
          <Typography variant="h6">Movies</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleDrawerToggle}>
            {movieDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Grid>
        <Grid item>
          {MOVIE_DRAWER_CATEGORY_CHIPS.map(e => (
            <Chip
              variant="outlined"
              label={e.label}
              color={e.isActive(moviePage.category) ? 'secondary' : 'default'}
              className={classes.chip}
              onClick={() => handleChipClick(e.identifier)}
            />
          ))}
        </Grid>
      </Grid>

      {renderMovieCards()}
    </Drawer>
  );
};

export default MovieDrawer;

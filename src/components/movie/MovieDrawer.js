import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import MovieCard from './MovieCard';

import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from '../../api/movie';

import { decryptKey } from '../../utils/encrypt';

import { SIDEBAR_WIDTH, MOVIE_DRAWER_WIDTH } from '../../constants';

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
  const theme = useTheme();

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

  const isNowPlaying = moviePage.category === 'nowPlaying';
  const isPopular = moviePage.category === 'popular';
  const isTopRated = moviePage.category === 'topRated';
  const isUpcoming = moviePage.category === 'upcoming';
  const moviesToDisplay = moviePage.content[moviePage.category];

  const handleDrawerToggle = () => setMovieDrawerOpen(!movieDrawerOpen);

  const handleChipClick = category => setMoviePage({ ...moviePage, category });

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
            {movieDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Grid>
        <Grid item>
          <Chip
            variant="outlined"
            label="Now Playing"
            color={isNowPlaying ? 'primary' : 'default'}
            className={classes.chip}
            onClick={() => handleChipClick('nowPlaying')}
          />
          <Chip
            variant="outlined"
            label="Upcoming"
            color={isUpcoming ? 'primary' : 'default'}
            className={classes.chip}
            onClick={() => handleChipClick('upcoming')}
          />
          <Chip
            variant="outlined"
            label="Popular"
            color={isPopular ? 'primary' : 'default'}
            className={classes.chip}
            onClick={() => handleChipClick('popular')}
          />
          <Chip
            variant="outlined"
            label="Top Rated"
            color={isTopRated ? 'primary' : 'default'}
            className={classes.chip}
            onClick={() => handleChipClick('topRated')}
          />
        </Grid>
      </Grid>

      { movieDrawerOpen
        ? (
          <Grid container spacing={2}>
            <Grid item container direction="row" justify="center" alignItems="flex-start">
              {moviesToDisplay.slice(0, 5).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen}/> )}
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="flex-start">
              {moviesToDisplay.slice(5, 10).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen}/> )}
            </Grid>
          </Grid>
        )
        : (
          <Grid item container justify="center" spacing={2}>
            {moviesToDisplay.slice(0, 10).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen}/> )}
          </Grid>
        )
      }
    </Drawer>
  );
};

export default MovieDrawer;

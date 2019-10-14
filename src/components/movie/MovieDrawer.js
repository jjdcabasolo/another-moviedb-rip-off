import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import MovieCard from './MovieCard';

import { getPopularMovies } from '../../api/movie';

import { decryptKey } from '../../utils/encrypt';

import { SIDEBAR_WIDTH } from '../../constants/sidebar';

const drawerWidth = window.innerWidth - (SIDEBAR_WIDTH + 10);

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    position: 'inherit',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  drawerHeaderOpen: {
    padding: theme.spacing(0, 10),
  },
  drawerHeaderClosed: {
    padding: theme.spacing(0, 5),
  },
  drawerClose: {
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: drawerWidth / 2,
  },
  drawerOpen: {
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: drawerWidth,
  },
  gridDrawerOpen: {
    margin: theme.spacing(5, 0),
  },
  gridDrawerClosed: {
    margin: theme.spacing(5, 5),
    width: 'unset',
  },
}));

const MovieDrawer = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [movieDrawerOpen, setMovieDrawerOpen] = React.useState(false);
  const [moviePage, setMoviePage] = useState({
    config: '',
    content: [],
    pageNumber: 1,
  });

  useEffect(() => {
    getPopularMovies(decryptKey(), response => {
      setMoviePage({ ...moviePage, content: response.data.results });
    }, error => {
      console.log(error.response);
      // dispatch(snackbarActions.showSnackbar('Your API key is invalid!', 'error'));
    });
  }, []);

  const handleDrawerToggle = () => setMovieDrawerOpen(!movieDrawerOpen);

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
      {movieDrawerOpen
        ? (
          <Grid container spacing={2} className={classes.gridDrawerOpen}>
            <Grid item container direction="row" justify="center" alignItems="flex-start">
              {moviePage.content.slice(0, 5).map(movie => <MovieCard movie={movie} imageURL={moviePage.config} movieDrawerOpen={movieDrawerOpen}/> )}
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="flex-start">
              {moviePage.content.slice(5, 10).map(movie => <MovieCard movie={movie} imageURL={moviePage.config} movieDrawerOpen={movieDrawerOpen}/> )}
            </Grid>
          </Grid>
        )
        : (
          <Grid item container justify="center" spacing={2} className={classes.gridDrawerClosed}>
            {moviePage.content.slice(0, 10).map(movie => <MovieCard movie={movie} imageURL={moviePage.config} movieDrawerOpen={movieDrawerOpen}/> )}
          </Grid>
        )
      }

      <div className={clsx(
          classes.drawerHeader,
          { [classes.drawerHeaderOpen]: movieDrawerOpen },
          { [classes.drawerHeaderClosed]: !movieDrawerOpen },
        )}
      >
        <IconButton onClick={handleDrawerToggle}>
          {movieDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
    </Drawer>
  );
};

export default MovieDrawer;

import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import MovieCard from './MovieCard';

import { getPopularMovies } from '../../api/movie';
import { getConfiguration } from '../../api/configuration';

import { decryptKey } from '../../utils/encrypt';

import { SIDEBAR_WIDTH } from '../../constants/sidebar';

const drawerWidth = window.innerWidth - (SIDEBAR_WIDTH + 20);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
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
  drawerClose: {
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 100,
  },
  drawerOpen: {
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: drawerWidth,
  },
  grid: {
    margin: theme.spacing(5, 0),
  }
}));

export default function MovieDrawer() {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);
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

  const handleDrawerToggle = () => setOpen(!open);

  console.log(moviePage);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={clsx(
          classes.drawer,
          { [classes.drawerOpen]: open },
          { [classes.drawerClose]: !open },
        )}
        variant="permanent"
        open={open}
        classes={{
          paper: clsx(
            classes.drawerPaper,
            { [classes.drawerOpen]: open },
            { [classes.drawerClose]: !open },
          ),
        }}
      >
        <Grid container spacing={2} className={classes.grid}>
          <Grid item container direction="row" justify="center" alignItems="flex-start">
            {moviePage.content.slice(0, 5).map(movie => <MovieCard movie={movie} imageURL={moviePage.config} /> )}
          </Grid>
          <Grid item container direction="row" justify="center" alignItems="flex-start">
            {moviePage.content.slice(5, 10).map(movie => <MovieCard movie={movie} imageURL={moviePage.config} /> )}
          </Grid>
        </Grid>

        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
      </Drawer>
    </div>
  );
}
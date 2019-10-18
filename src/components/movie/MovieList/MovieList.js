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

const MovieList = () => {
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

  // useEffect(() => {
  //   setMovieDrawerOpen(!hideMovieDrawer);
  // }, [width]);

  const moviesToDisplay = list[category];

  const handleDrawerToggle = () => setMovieDrawerOpen(!movieDrawerOpen);

  return (
    <Grid item container justify="center" spacing={2}>
      {moviesToDisplay.slice(0, 10).map(movie => <MovieCard movie={movie} movieDrawerOpen={movieDrawerOpen} col={12}/> )}
    </Grid>
  );
};

export default MovieList;

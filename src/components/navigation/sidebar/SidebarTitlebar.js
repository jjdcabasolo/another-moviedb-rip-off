import React, { useCallback } from 'react';

import clsx from 'clsx';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import { ArrowBackTwoTone } from '@material-ui/icons';

import { moviesActions } from '../../../reducers/ducks';

import HideOnScroll from '../../../utils/components/HideOnScroll';

import { SIDEBAR_WIDTH } from '../../../constants';

const useStyles = makeStyles(theme => ({
  toolbarDrawerOpen: {
    marginLeft: SIDEBAR_WIDTH - theme.spacing(1),
    transition: theme.transitions.create('margin-left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbarDrawerClosed: {
    marginLeft: theme.spacing(7) - theme.spacing(1),
    transition: theme.transitions.create('margin-left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  parallax: {
    width: `${theme.browserSize.width}px !important`,
  },
}));

const SidebarTitlebar = () => {
  const classes = useStyles();

  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);
  const movie = useSelector(state => state.movies.movie);
  const dispatch = useDispatch();

  const isMovieSelected = 'id' in movie;

  const goBack = useCallback(() => {
    dispatch(moviesActions.setActiveMovie({}));
  }, [dispatch]);

  return (
    <HideOnScroll>
      <AppBar color="default" className={classes.appbar}>
        <Toolbar
          variant="dense"
          className={clsx(
            { [classes.toolbarDrawerOpen]: drawerOpen },
            { [classes.toolbarDrawerClosed]: !drawerOpen },
          )}
        >
          <IconButton
            aria-label="back"
            edge="start"
            onClick={goBack}
          >
            <ArrowBackTwoTone />
          </IconButton>
          <Typography component="h1" variant="h6">
            {isMovieSelected && `${movie.title} (${moment(movie.date).format('YYYY')})`}
          </Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default SidebarTitlebar;

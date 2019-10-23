import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import TVShowCategory from './TVShowCategory';
import TVShowCard from './TVShowCard';
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
  desktopDrawerClosedContainer: {
    maxHeight: '86vh',
    overflowY: 'auto',
  },
}));

const TVShowDrawer = () => {
  const classes = useStyles();

  const category = useSelector(state => state.tvShows.category);
  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);
  const list = useSelector(state => state.tvShows.list);

  const getLocalStorage = localStorage.getItem('tvShowDrawerOpen');
  const [tvShowDrawerOpen, setTVShowDrawerOpen] = useState(getLocalStorage === null ? true : getLocalStorage === 'true');

  const tvShowsToDisplay = list[category];

  const handleDrawerToggle = () => {
    localStorage.setItem('tvShowDrawerOpen', !tvShowDrawerOpen);
    setTVShowDrawerOpen(!tvShowDrawerOpen)
  };

  const renderToggleTVShowDrawer = () => (
    <IconButton onClick={handleDrawerToggle}>
      {tvShowDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
    </IconButton>
  );

  const renderTVShowCards = () => {
    if (tvShowsToDisplay.length > 0) {
      if (tvShowDrawerOpen) {
        return (
          <ResponsiveComponent
            mobileComponent={<></>}
            tabletComponent={(
              <Grid container spacing={2}>
                <Grid item container spacing={2}>
                  {tvShowsToDisplay.slice(0, 2).map(tvShow => <TVShowCard tvShow={tvShow} tvShowDrawerOpen={tvShowDrawerOpen} col={6} /> )}
                </Grid>
                <Grid item container spacing={2}>
                  {tvShowsToDisplay.slice(2, 4).map(tvShow => <TVShowCard tvShow={tvShow} tvShowDrawerOpen={tvShowDrawerOpen} col={6} /> )}
                </Grid>
                <Grid item container spacing={2}>
                  {tvShowsToDisplay.slice(4, 6).map(tvShow => <TVShowCard tvShow={tvShow} tvShowDrawerOpen={tvShowDrawerOpen} col={6} /> )}
                </Grid>
                <Grid item container spacing={2}>
                  {tvShowsToDisplay.slice(6, 8).map(tvShow => <TVShowCard tvShow={tvShow} tvShowDrawerOpen={tvShowDrawerOpen} col={6} /> )}
                </Grid>
                <Grid item container spacing={2}>
                  {tvShowsToDisplay.slice(8, 10).map(tvShow => <TVShowCard tvShow={tvShow} tvShowDrawerOpen={tvShowDrawerOpen} col={6} /> )}
                </Grid>
              </Grid>
            )}
            desktopComponent={(
              <Grid container spacing={2}>
                <Grid item container spacing={2} direction="row" justify="center" alignItems="flex-start">
                  {tvShowsToDisplay.slice(0, 5).map(tvShow => <TVShowCard tvShow={tvShow} tvShowDrawerOpen={tvShowDrawerOpen} col={2}/> )}
                </Grid>
                <Grid item container spacing={2} direction="row" justify="center" alignItems="flex-start">
                  {tvShowsToDisplay.slice(5, 10).map(tvShow => <TVShowCard tvShow={tvShow} tvShowDrawerOpen={tvShowDrawerOpen} col={2}/> )}
                </Grid>
              </Grid>
            )}
          />
        );
      } else {
        return (
          <Grid item container justify="center" spacing={2} className={classes.desktopDrawerClosedContainer}>
            {tvShowsToDisplay.slice(0, 10).map(tvShow => <TVShowCard tvShow={tvShow} tvShowDrawerOpen={tvShowDrawerOpen} col={12}/> )}
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
        { [classes.drawerOpen]: tvShowDrawerOpen },
        { [classes.drawerOpenWidthOpenSidebar]: tvShowDrawerOpen && drawerOpen },
        { [classes.drawerOpenWidthClosedSidebar]: tvShowDrawerOpen && !drawerOpen },

        { [classes.drawerClose]: !tvShowDrawerOpen },
        { [classes.drawerCloseWidthOpenSidebar]: !tvShowDrawerOpen && drawerOpen },
        { [classes.drawerCloseWidthClosedSidebar]: !tvShowDrawerOpen && !drawerOpen },
      )}
      variant="permanent"
      open={tvShowDrawerOpen}
      classes={{
        paper: clsx(
          classes.drawerPaper,
          { [classes.drawerOpen]: tvShowDrawerOpen },
          { [classes.drawerOpenWidthOpenSidebar]: tvShowDrawerOpen && drawerOpen },
          { [classes.drawerOpenWidthClosedSidebar]: tvShowDrawerOpen && !drawerOpen },

          { [classes.drawerClose]: !tvShowDrawerOpen },
          { [classes.drawerCloseWidthOpenSidebar]: !tvShowDrawerOpen && drawerOpen },
          { [classes.drawerCloseWidthClosedSidebar]: !tvShowDrawerOpen && !drawerOpen },
        ),
      }}
    >
      <Grid container direction="row" alignItems="center" spacing={2} className={classes.toolbar}>
        <Grid item>
          <Typography variant="h6">TV Shows</Typography>
        </Grid>
        <Grid item container justify="flex-end" alignItems="center" className={classes.extendItem}>
          {tvShowsToDisplay.length > 0 && <TVShowCategory isDrawer={tvShowDrawerOpen} />}
          <ResponsiveComponent
            mobileComponent={null}
            tabletComponent={null}
            desktopComponent={renderToggleTVShowDrawer()}
          />
        </Grid>
      </Grid>

      {renderTVShowCards()}
    </Drawer>
  );
};

export default TVShowDrawer;

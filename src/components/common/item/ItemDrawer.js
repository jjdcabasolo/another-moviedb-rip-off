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

import ComponentLoader from '../ComponentLoader';
import ItemCategory from './ItemCategory';
import ItemCard from './ItemCard';
import Note from '../Note';
import ResponsiveComponent from '../../../utils/components/ResponsiveComponent';

import {
  MOVIE_DRAWER_CATEGORY_CHIPS,
  TV_SHOW_DRAWER_CATEGORY_CHIPS,
  SIDEBAR_WIDTH,
  NOTE_NO_API_KEY,
  NOTE_OFFLINE,
} from '../../../constants';

const useStyles = makeStyles(theme => ({
  drawerOpenWidthOpenSidebar: {
    width: theme.browserSize.width - SIDEBAR_WIDTH,
  },
  drawerOpenWidthClosedSidebar: {
    width: theme.browserSize.width - theme.spacing(7),
  },
  drawerCloseWidthOpenSidebar: {
    width: (theme.browserSize.width - SIDEBAR_WIDTH) / 4,
  },
  drawerCloseWidthClosedSidebar: {
    width: (theme.browserSize.width - theme.spacing(7)) / 4,
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    position: 'inherit',
    padding: theme.spacing(5),
    [theme.breakpoints.up('lg')]: {
      height: theme.browserSize.height,
    },
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

const ItemDrawer = ({ type }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();

  const movieCategory = useSelector(state => state.movies.category);
  const movieList = useSelector(state => state.movies.list);
  const movieLoadedContent = useSelector(state => state.movies.loadedContent);
  const tvShowCategory = useSelector(state => state.tvShows.category);
  const tvShowList = useSelector(state => state.tvShows.list);
  const tvShowLoadedContent = useSelector(state => state.tvShows.loadedContent);  
  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);

  const isMovie = type === 'movie';

  const getLocalStorage = localStorage.getItem(isMovie ? 'movieDrawerOpen' : 'tvShowDrawerOpen');
  const finalDrawerState = (getLocalStorage === null ? true : getLocalStorage === 'true') || !isDesktop;
  const [itemDrawerOpen, setItemDrawerOpen] = useState(finalDrawerState);

  const contentToDisplay = isMovie ? movieList[movieCategory] : tvShowList[tvShowCategory];
  const categoryChips = isMovie ? MOVIE_DRAWER_CATEGORY_CHIPS : TV_SHOW_DRAWER_CATEGORY_CHIPS;
  const loadedContent = isMovie ? movieLoadedContent : tvShowLoadedContent;

  const handleDrawerToggle = () => {
    localStorage.setItem(isMovie ? 'movieDrawerOpen' : 'tvShowDrawerOpen', !itemDrawerOpen);
    setItemDrawerOpen(!itemDrawerOpen);
  };

  const renderToggleItemDrawer = () => (
    <IconButton onClick={handleDrawerToggle}>
      {itemDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
    </IconButton>
  );

  const renderItemCards = () => {
    if (!window.navigator.onLine) {
      return <Note details={NOTE_OFFLINE} />;
    }

    if (localStorage.getItem('apiKey') === null) {
      return <Note details={NOTE_NO_API_KEY} />;
    }

    if (loadedContent !== categoryChips.length) {
      return <ComponentLoader />;
    }

    if (itemDrawerOpen) {
      return (
        <ResponsiveComponent
          mobileComponent={null}
          tabletComponent={(
            <Grid container spacing={2}>
              {new Array(5).fill({}).map((_, index) => (
                <Grid item container spacing={2}>
                  {contentToDisplay.slice((2 * index), (2 * index) + 2).map((item, rank) => (
                    <ItemCard
                      content={item}
                      drawerOpen={itemDrawerOpen}
                      handleDrawerToggle={handleDrawerToggle}
                      col={6}
                      rank={(2 * index) + rank + 1}
                      type={type}
                    />
                  ))}
                </Grid>
              ))}
            </Grid>
          )}
          desktopComponent={(
            <Grid container spacing={2}>
              {new Array(2).fill({}).map((_, index) => (
                <Grid item container spacing={2} direction="row" justify="center" alignItems="flex-start">
                  {contentToDisplay.slice((5 * index), (5 * index) + 5).map((item, rank) => (
                    <ItemCard
                      content={item}
                      drawerOpen={itemDrawerOpen}
                      handleDrawerToggle={handleDrawerToggle}
                      col={2}
                      rank={(5 * index) + rank + 1}
                      type={type}
                    />
                  ))}
                </Grid>
              ))}
            </Grid>
          )}
        />
      );
    } else {
      return (
        <Grid item container justify="center" spacing={2} className={classes.desktopDrawerClosedContainer}>
          {contentToDisplay.slice(0, 10).map((item, rank) => (
            <ItemCard
              content={item}
              drawerOpen={itemDrawerOpen}
              handleDrawerToggle={handleDrawerToggle}
              col={12}
              rank={rank + 1}
              type={type}
            />
          ))}
        </Grid>
      );
    }
  };

  return (
    <Drawer
      className={clsx(
        classes.drawer,
        { [classes.drawerOpen]: itemDrawerOpen },
        { [classes.drawerOpenWidthOpenSidebar]: itemDrawerOpen && drawerOpen },
        { [classes.drawerOpenWidthClosedSidebar]: itemDrawerOpen && !drawerOpen },

        { [classes.drawerClose]: !itemDrawerOpen },
        { [classes.drawerCloseWidthOpenSidebar]: !itemDrawerOpen && drawerOpen },
        { [classes.drawerCloseWidthClosedSidebar]: !itemDrawerOpen && !drawerOpen },
      )}
      variant="permanent"
      open={itemDrawerOpen}
      classes={{
        paper: clsx(
          classes.drawerPaper,
          { [classes.drawerOpen]: itemDrawerOpen },
          { [classes.drawerOpenWidthOpenSidebar]: itemDrawerOpen && drawerOpen },
          { [classes.drawerOpenWidthClosedSidebar]: itemDrawerOpen && !drawerOpen },

          { [classes.drawerClose]: !itemDrawerOpen },
          { [classes.drawerCloseWidthOpenSidebar]: !itemDrawerOpen && drawerOpen },
          { [classes.drawerCloseWidthClosedSidebar]: !itemDrawerOpen && !drawerOpen },
        ),
      }}
    >
      <Grid container direction="row" alignItems="center" spacing={2} className={classes.toolbar}>
        <Grid item>
          <Typography variant="h6">{isMovie ? 'Movies' : 'TV Shows'}</Typography>
        </Grid>
        <Grid item container justify="flex-end" alignItems="center" className={classes.extendItem}>
          {contentToDisplay.length > 0 && <ItemCategory isDrawer={itemDrawerOpen} type={type} />}
          {isDesktop && renderToggleItemDrawer()}
        </Grid>
      </Grid>

      {renderItemCards()}
    </Drawer>
  );
};

export default ItemDrawer;

import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import ItemSearch from './ItemSearch';
import ItemCard from './ItemCard';
import ItemLazyLoad from '../../common/item/ItemLazyLoad';

import { sidebarActions } from '../../../reducers/ducks';

import { evaluateLocation } from '../../../utils/functions';

const useStyles = makeStyles((theme) => ({
  drawerOpenContainer: {
    padding: theme.spacing(4),
  },
  drawerClosedContainer: {
    padding: theme.spacing(1),
    overflowY: 'auto',
  },
  noResults: {
    padding: theme.spacing(1),
  },
  paper: {
    backgroundColor: theme.palette.background.default,
  },
  dialogTitle: {
    padding: theme.spacing(0.5, 2),
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
}));

const ItemSearchResults = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isBigTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isSmallTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const itemDrawerOpen = useSelector((state) => state.sidebar.itemDrawerOpen);
  const movieSearchResults = useSelector((state) => state.movies.searchResults);
  const searchQuery = useSelector((state) => state.sidebar.searchQuery);
  const tvShowSearchResults = useSelector((state) => state.tvShows.searchResults);
  const dispatch = useDispatch();

  const location = useLocation();
  const { movieId, tvShowId } = evaluateLocation(location);

  const [content, setContent] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setIsDialogOpen(movieId === 'search' || tvShowId === 'search');
  }, [movieId, tvShowId]);

  useEffect(() => {
    setContent(activeTab === 'movies' ? movieSearchResults : tvShowSearchResults);
  }, [activeTab, movieSearchResults, tvShowSearchResults]);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleDrawerToggle = () => {
    dispatch(sidebarActions.setItemDrawer(false));
  };

  let itemCardCol = 12; // 1 card per row

  if (isBigTablet) itemCardCol = 4; // 3 cards per row
  if (isSmallTablet) itemCardCol = 6; // 2 cards per row
  if (isDesktop) itemCardCol = 2; // 5 cards per row
  if (!itemDrawerOpen) itemCardCol = 12; // 1 card per row

  let results = null;

  if (searchQuery.length > 0) {
    if (content.length > 0) {
      results = (
        <Grid
          container
          item
          justify="center"
        >
          <ItemLazyLoad
            contents={content}
            node={<ItemCard />}
            otherProps={{
              col: itemCardCol,
              drawerOpen: itemDrawerOpen,
              handleDrawerToggle,
              type: activeTab,
            }}
            type="itemCardSearchResults"
          />
        </Grid>
      )
    } else {
      results = (
        <Typography className={classes.noResults}>
          No resuls found.
        </Typography>
      );
    }
  }

  if (isMobile) {
    return (
      <Dialog
        classes={{ paper: classes.paper }}
        fullScreen
        onClose={handleClose}
        open={isDialogOpen}
      >
        <DialogTitle id="item-search-results" onClose={handleClose} className={classes.dialogTitle}>
          <ItemSearch isPermanentlyOpen withSearchIcon />
        </DialogTitle>
        <DialogContent className={classes.dialogContent} dividers>
          {results}
        </DialogContent>
      </Dialog>
    );
  }

  return itemDrawerOpen
    ? (
      <Container className={classes.drawerOpenContainer}>
        {results}
      </Container>
    )
    : (
      <div className={classes.drawerClosedContainer}>
        {results}
      </div>
    );
};

export default ItemSearchResults;

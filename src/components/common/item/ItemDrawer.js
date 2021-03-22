import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { usePath } from '../../../hooks';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Container,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';

import AppBar from '../../overrides/AppBar';
import ComponentLoader from '../ComponentLoader';
import ItemCard from './ItemCard';
import ItemCategory from './ItemCategory';
import ItemHeader from './ItemHeader';
import ItemSearch from './ItemSearch';
import ItemSearchResults from './ItemSearchResults';
import Note from '../Note';

import { toCamelCase } from '../../../utils/functions';

import { sidebarActions } from '../../../reducers/ducks';

import {
  MOVIE_DRAWER_CATEGORY_CHIPS,
  TV_SHOW_DRAWER_CATEGORY_CHIPS,
  NOTE_NO_API_KEY,
  NOTE_OFFLINE,
  ITEM_DRAWER_WIDTH,
} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.default,
    position: 'inherit',
    [theme.breakpoints.up('lg')]: {
      height: theme.browserSize.height,
    },
  },
  drawerOpenPaperPadding: {
    padding: theme.spacing(5),
    height: '100%',
  },
  drawerClose: {
    width: ITEM_DRAWER_WIDTH,
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.between('sm', 'md')]: {
      width: 0,
      overflow: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  drawerOpen: {
    width: theme.browserSize.width - theme.spacing(7),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(1, 2),
    },
  },
  grow: {
    flexGrow: 1,
  },
  itemCardContainer: {
    overflowY: 'auto',
  },
  desktopDrawerOpenItemCardContainer: {
    marginBottom: theme.spacing(10),
  },
  desktopDrawerClosedItemCardContainer: {
    padding: theme.spacing(1),
  },
  itemHeader: {
    padding: theme.spacing(16, 0),
  },
  itemSearch: {
    width: theme.spacing(40),
  },
  options: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.brokenImage.border}`,
    borderRadius: theme.shape.borderRadius,
    maxWidth: '50%',
    position: 'fixed',
    right: theme.spacing(8),
    top: theme.spacing(8),
    width: 'auto',
    zIndex: 2,
  },
  anchor: {
    top: 0,
    position: 'absolute',
  },
}));

const ItemDrawer = ({
  isItemSelected,
}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isBigTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isSmallTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const isSearchOpen = useSelector((state) => state.sidebar.isSearchOpen);
  const movieCategory = useSelector((state) => state.movies.category);
  const movieList = useSelector((state) => state.movies.list);
  const movieLoadedContent = useSelector((state) => state.movies.loadedContent);
  const tvShowCategory = useSelector((state) => state.tvShows.category);
  const tvShowList = useSelector((state) => state.tvShows.list);
  const tvShowLoadedContent = useSelector((state) => state.tvShows.loadedContent);
  const dispatch = useDispatch();

  const [itemDrawerOpen, setItemDrawerOpen] = useState(true);

  const [, searchPath] = usePath();

  const isMovie = activeTab === 'movies';
  const categoryChips = isMovie ? MOVIE_DRAWER_CATEGORY_CHIPS : TV_SHOW_DRAWER_CATEGORY_CHIPS;
  const contentToDisplay = isMovie ? movieList[movieCategory] : tvShowList[tvShowCategory];
  const loadedContent = isMovie ? movieLoadedContent : tvShowLoadedContent;

  const evaluateDrawerState = useCallback(() => {
    let itemDrawerFinalState = false;

    if (isDesktop && !isItemSelected) itemDrawerFinalState = true;
    if (isTablet) itemDrawerFinalState = true;

    setItemDrawerOpen(itemDrawerFinalState);
    dispatch(sidebarActions.setItemDrawer(itemDrawerFinalState));
  }, [dispatch, isDesktop, isItemSelected, isTablet]);

  useEffect(() => {
    evaluateDrawerState();
  }, [isDesktop, isTablet, isItemSelected, evaluateDrawerState]);

  useEffect(() => {
    if (!isDesktop || (isDesktop && searchPath !== 'search')) {
      evaluateDrawerState();
    }
  }, [searchPath, evaluateDrawerState, isDesktop]);

  const handleDrawerToggle = () => {
    const isDrawerOpen = !itemDrawerOpen;

    setItemDrawerOpen(isDrawerOpen);
    dispatch(sidebarActions.setItemDrawer(isDrawerOpen));
  };

  const renderToggleItemDrawer = (isEdgeEnd) => (
    <Tooltip title={itemDrawerOpen ? 'See less' : 'See all'}>
      <IconButton onClick={handleDrawerToggle} edge={isEdgeEnd ? 'end' : false}>
        {itemDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Tooltip>
  );

  const renderItemCards = () => {
    if (!window.navigator.onLine) {
      return <Note details={NOTE_OFFLINE} />;
    }

    if (localStorage.getItem('apiKey') === null) {
      return <Note details={NOTE_NO_API_KEY} />;
    }

    if (loadedContent !== categoryChips.length) {
      return (
        <ComponentLoader
          location="itemdrawer"
          isItemDrawerOpen={itemDrawerOpen}
        />
      );
    }

    let itemCardCol = 12; // 1 card per row
    if (isBigTablet) itemCardCol = 4; // 3 cards per row
    if (isSmallTablet) itemCardCol = 6; // 2 cards per row
    if (isDesktop) itemCardCol = 2; // 5 cards per row
    if (!itemDrawerOpen) itemCardCol = 12; // 1 card per row

    return (
      <Grid
        className={classes.cardGridContainer}
        container
        item
        justify="center"
      >
        {!itemDrawerOpen && <div id="scroll-to-top-anchor-drawer" />}
        {contentToDisplay.slice(0, 10).map((item, rank) => (
          <ItemCard
            col={itemCardCol}
            content={item}
            drawerOpen={itemDrawerOpen}
            handleDrawerToggle={handleDrawerToggle}
            rank={rank + 1}
            type={activeTab}
            key={`item-drawer-item-card-${rank + 1}-${item.id}`}
          />
        ))}
      </Grid>
    );
  };

  return (
    <Drawer
      className={clsx(
        classes.drawer,
        {
          [classes.drawerOpen]: itemDrawerOpen,
          [classes.drawerClose]: !itemDrawerOpen,
        },
      )}
      variant="permanent"
      open={itemDrawerOpen}
      classes={{
        paper: clsx(
          classes.drawerPaper,
          {
            [classes.drawerOpenPaperPadding]: itemDrawerOpen,
            [classes.drawerOpen]: itemDrawerOpen,
            [classes.drawerClose]: !itemDrawerOpen,
          },
        ),
      }}
    >
      {itemDrawerOpen
        ? (
          <Container>
            <Grid
              alignItems="center"
              container
              direction="row"
            >
              <Grid
                alignItems="center"
                container
                item
                justify="flex-end"
              >
                <Grid item className={clsx({ [classes.itemSearch]: isSearchOpen })}>
                  <ItemSearch />
                </Grid>
                {!isSearchOpen && (
                  <Grid item>
                    {isDesktop && renderToggleItemDrawer()}
                  </Grid>
                )}
              </Grid>
              {!isSearchOpen && (
                <Grid
                  alignItems="center"
                  className={classes.itemHeader}
                  container
                  direction="column"
                  item
                  justify="center"
                >
                  <ItemHeader />
                </Grid>
              )}
            </Grid>
          </Container>
        )
        : (
          <AppBar position="static" color="inherit">
            <Toolbar className={classes.toolbar}>
              {!isSearchOpen && (
                <>
                  <Typography variant="h6">
                    {`Top 10 ${toCamelCase(isMovie ? movieCategory : tvShowCategory).replace('Highest', 'H. ')}`}
                  </Typography>
                  {contentToDisplay.length > 0 && (
                    <ItemCategory type="iconButton" />
                  )}
                </>
              )}
              <div className={classes.grow} />
              <ItemSearch />
              {!isSearchOpen && isDesktop && renderToggleItemDrawer(true)}
            </Toolbar>
          </AppBar>
        )}
      {isSearchOpen
        ? <ItemSearchResults />
        : (
          <Container
            className={clsx(
              classes.itemCardContainer,
              {
                [classes.desktopDrawerOpenItemCardContainer]: itemDrawerOpen,
                [classes.desktopDrawerClosedItemCardContainer]: !itemDrawerOpen,
              },
            )}
          >
            {renderItemCards()}
          </Container>
        )}
    </Drawer>
  );
};

ItemDrawer.defaultProps = {
  isItemSelected: false,
};

ItemDrawer.propTypes = {
  isItemSelected: PropTypes.bool,
};

export default ItemDrawer;

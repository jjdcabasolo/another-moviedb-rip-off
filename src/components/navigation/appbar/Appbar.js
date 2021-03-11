import React, {
  useCallback,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { usePath } from '../../../hooks';

import { makeStyles } from '@material-ui/core/styles';
import {
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { ArrowBackTwoTone, SearchTwoTone } from '@material-ui/icons';

import APIKeyDialog from '../../apiKey/APIKeyDialog';
import AppBar from '../../overrides/AppBar';
import AppbarMenu from './AppbarMenu';
import GradientBackground from '../../common/GradientBackground';
import Helmet from '../Helmet';
import ItemCategory from '../../common/item/ItemCategory';
import ItemList from '../../common/item/ItemList';
import ItemSearchResults from '../../common/item/ItemSearchResults';

import { moviesActions, sidebarActions } from '../../../reducers/ducks';

import { scrollToID } from '../../../utils/functions';

import { routes } from '../../../routes/config';

const useStyles = makeStyles((theme) => ({
  bottomNavigation: {
    width: theme.browserSize.width,
    position: 'fixed',
    bottom: 0,
  },
  titlebar: {
    flexGrow: 1,
    margin: theme.spacing(0, 1),
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(15),
  },
  containerItemSelected: {
    marginTop: -theme.spacing(12),
  },
  category: {
    backgroundColor: theme.palette.background.paper,
    bottom: theme.spacing(7),
    position: 'fixed',
    width: '100%',
  },
  detailContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
  },
}));

const Appbar = ({ children }) => {
  const classes = useStyles();

  const appbarContainerRef = useRef(null);
  const itemListContainerRef = useRef(null);

  const history = useHistory();
  const [activeTab, idPath] = usePath();
  const isMovie = activeTab === 'movies';

  const isMovieLoading = useSelector((state) => state.movies.isMovieLoading);
  const isSearchOpen = useSelector((state) => state.sidebar.isSearchOpen);
  const isTVShowLoading = useSelector((state) => state.tvShows.isTVShowLoading);
  const movie = useSelector((state) => state.movies.movie);
  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const dispatch = useDispatch();

  const [activeBottomTab, setActiveBottomTab] = useState(isMovie ? 1 : 2);

  const {
    title,
    original_title: originalTitle,
    poster_path: movieBG,
  } = movie;
  const {
    name,
    original_name: originalName,
    poster_path: tvShowBG,
  } = tvShow;

  const isMovieEmpty = Object.keys(movie).length === 0 && movie.constructor === Object;
  const isTVShowEmpty = Object.keys(tvShow).length === 0 && tvShow.constructor === Object;

  const isItemSelected = typeof idPath !== 'undefined' && idPath.length > 0;
  const isTabActive = typeof activeTab !== 'undefined' && activeTab;
  const isItemEmpty = isMovie ? isMovieEmpty : isTVShowEmpty;
  const isItemLoading = isMovie ? isMovieLoading : isTVShowLoading;

  const goBack = useCallback(() => {
    if (isSearchOpen) dispatch(sidebarActions.setSearch(false));

    dispatch(moviesActions.setActiveMovie({}));
    history.goBack();
  }, [dispatch, history, isSearchOpen]);

  const handleBottomNavigationClick = (index) => {
    const tab = index === 1 ? 'movies' : 'tvshows';
    scrollToID('scroll-to-top-anchor', tab === activeTab);
    setActiveBottomTab(index);
    dispatch(sidebarActions.setActiveTab(tab));
    history.push(tab);
  };

  const handleSearch = () => {
    history.push(`/${activeTab}/search`);
  };

  const renderToolbarContents = () => {
    const displayTitle = isMovie
      ? (title || originalTitle)
      : (name || originalName);
    const titleComponent = isItemLoading
      ? <div className={classes.titlebar} />
      : (
        <Typography component="h1" variant="h6" noWrap className={classes.titlebar}>
          {displayTitle}
        </Typography>
      );
    const searchComponent = (
      <Tooltip title="Search">
        <IconButton onClick={handleSearch}>
          <SearchTwoTone />
        </IconButton>
      </Tooltip>
    );

    if (isItemSelected) {
      return (
        <>
          <IconButton
            aria-label="back"
            edge="start"
            onClick={goBack}
          >
            <ArrowBackTwoTone />
          </IconButton>
          {titleComponent}
          {searchComponent}
          <AppbarMenu />
        </>
      );
    }

    return (
      <>
        <Typography component="h1" variant="h6" className={classes.titlebar}>
          ATMDbRo
        </Typography>
        {searchComponent}
        <APIKeyDialog />
        <AppbarMenu />
      </>
    );
  };

  const renderList = () => {
    if (isTabActive) {
      if (isItemSelected) return children;
      return <ItemList />;
    }

    return children;
  };

  const renderTopContents = () => {
    if (isTabActive) {
      return (
        <GradientBackground
          image={isMovie ? movieBG : tvShowBG}
          isItemSelected={isItemSelected}
          isLoading={isItemEmpty}
          isVisible={isItemSelected && !isItemLoading}
        />
      );
    }

    return null;
  };

  return (
    <>
      <Helmet />
      <CssBaseline />

      <AppBar color="inherit">
        <Toolbar>
          {renderToolbarContents()}
        </Toolbar>
      </AppBar>

      <div
        className={clsx({
          [classes.detailContainer]: (isItemSelected && isTabActive),
        })}
        ref={appbarContainerRef}
      >
        <div id="scroll-to-top-anchor" />
        {renderTopContents()}
        <div
          className={clsx(
            classes.container,
            { [classes.containerItemSelected]: isItemSelected },
          )}
          ref={itemListContainerRef}
        >
          {renderList()}
        </div>
      </div>

      {!isItemSelected && (
        <>
          <div className={classes.category}>
            <ItemCategory type="appbarHorizontalList" />
          </div>
          <BottomNavigation
            className={classes.bottomNavigation}
            onChange={(_, index) => handleBottomNavigationClick(index)}
            showLabels={false}
            value={activeBottomTab}
          >
            {routes.map((element, index) => (index !== 0) && (
              <BottomNavigationAction
                component={Link}
                icon={element.icon}
                key={`appbar-bottom-nav-${element.title}`}
                label={element.title}
                to={element.path}
              />
            ))}
          </BottomNavigation>
        </>
      )}

      <ItemSearchResults />
    </>
  );
};

Appbar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Appbar;

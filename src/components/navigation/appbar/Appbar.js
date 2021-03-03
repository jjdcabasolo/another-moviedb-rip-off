import React, {
  useCallback,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ArrowBackTwoTone } from '@material-ui/icons';

import APIKeyDialog from '../../apiKey/APIKeyDialog';
import AppBar from '../../overrides/AppBar';
import AppbarMenu from './AppbarMenu';
import GradientBackground from '../../common/GradientBackground';
import Helmet from '../Helmet';
import ItemCategory from '../../common/item/ItemCategory';
import ItemList from '../../common/item/ItemList';
import ItemSearch from '../../common/item/ItemSearch';

import { moviesActions, sidebarActions } from '../../../reducers/ducks';

import { evaluateLocation, scrollToID } from '../../../utils/functions';

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

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const isMovieLoading = useSelector((state) => state.movies.isMovieLoading);
  const isSearchOpen = useSelector((state) => state.sidebar.isSearchOpen);
  const isTVShowLoading = useSelector((state) => state.tvShows.isTVShowLoading);
  const movie = useSelector((state) => state.movies.movie);
  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const dispatch = useDispatch();

  const [activeBottomTab, setActiveBottomTab] = useState(activeTab === 'movies' ? 1 : 2);

  const { title, original_title: originalTitle } = movie;
  const { name, original_name: originalName } = tvShow;

  const location = useLocation();
  const history = useHistory();

  const currentLocation = evaluateLocation(location);
  const isMovieSelected = 'movieId' in currentLocation;
  const isMovieTabActive = 'movie' in currentLocation;
  const isTVShowSelected = 'tvShowId' in currentLocation;
  const isTVShowTabActive = 'tvShow' in currentLocation;
  const isMovieEmpty = Object.keys(movie).length === 0 && movie.constructor === Object;
  const isTVShowEmpty = Object.keys(tvShow).length === 0 && tvShow.constructor === Object;

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

  const renderToolbarContents = () => {
    const isLoading = isMovieSelected ? isMovieLoading : isTVShowLoading;
    const displayTitle = isMovieSelected ? (title || originalTitle) : (name || originalName);
    const titleComponent = isLoading
      ? <div className={classes.titlebar} />
      : (
        <Typography component="h1" variant="h6" noWrap className={classes.titlebar}>
          {displayTitle}
        </Typography>
      );

    if (isMovieSelected || isTVShowSelected) {
      return (
        <>
          <IconButton
            aria-label="back"
            edge="start"
            onClick={goBack}
          >
            <ArrowBackTwoTone />
          </IconButton>
          {!isSearchOpen && titleComponent}
          <ItemSearch withSearchIcon={false} />
          {!isSearchOpen && (
            <AppbarMenu />
          )}
        </>
      );
    }

    return (
      <>
        {!isSearchOpen && (
          <Typography component="h1" variant="h6" className={classes.titlebar}>
            ATMDbRo
          </Typography>
        )}
        <ItemSearch />
        {!isSearchOpen && (
          <>
            <APIKeyDialog />
            <AppbarMenu />
          </>
        )}
      </>
    );
  };

  const renderList = () => {
    if (isMovieTabActive) {
      if (isMovieSelected) return children;
      return <ItemList />;
    }

    if (isTVShowTabActive) {
      if (isTVShowSelected) return children;
      return <ItemList />;
    }

    return children;
  };

  const renderTopContents = () => {
    if (isMovieTabActive) {
      return (
        <GradientBackground
          image={movie.poster_path}
          isItemSelected={isMovieSelected}
          isLoading={isMovieEmpty}
          isVisible={isMovieSelected && !isMovieLoading && isMovieTabActive}
        />
      );
    }

    if (isTVShowTabActive) {
      return (
        <GradientBackground
          image={tvShow.poster_path}
          isItemSelected={isTVShowSelected}
          isLoading={isTVShowEmpty}
          isVisible={isTVShowSelected && !isTVShowLoading && isTVShowTabActive}
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
          [classes.detailContainer]: (isMovieSelected && isMovieTabActive)
            || (isTVShowSelected && isTVShowTabActive),
        })}
        ref={appbarContainerRef}
      >
        <div id="scroll-to-top-anchor" />
        {renderTopContents()}
        <div
          className={clsx(
            classes.container,
            { [classes.containerItemSelected]: isMovieSelected || isTVShowSelected },
          )}
          ref={itemListContainerRef}
        >
          {renderList()}
        </div>
      </div>

      {(!isMovieSelected && !isTVShowSelected) && (
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
    </>
  );
};

Appbar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Appbar;

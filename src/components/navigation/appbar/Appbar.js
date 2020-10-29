import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ArrowBackTwoTone } from '@material-ui/icons';

import APIKeyDialog from '../../apiKey/APIKeyDialog';
import AppbarMenu from './AppbarMenu';
import DarkModeToggle from '../../common/DarkModeToggle';
import GradientBackground from '../../common/GradientBackground';
import Helmet from '../Helmet';
import ItemCategory from '../../common/item/ItemCategory';
import ItemList from '../../common/item/ItemList';
import ReadingProgress from '../../common/ReadingProgress';

import { browserActions, moviesActions, sidebarActions } from '../../../reducers/ducks';

import { evaluateLocation } from '../../../utils/functions';
import HideOnScroll from '../../../utils/components/HideOnScroll';

import { routes } from '../../../routes/config';

const useStyles = makeStyles((theme) => ({
  bottomNavigation: {
    width: theme.browserSize.width,
    position: 'fixed',
    bottom: 0,
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(9),
  },
  containerItemSelected: {
    marginTop: -theme.spacing(12),
  },
  category: {
    padding: theme.spacing(0, 1),
  },
  detailContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    height: theme.browserSize.height,
  },
}));

const Appbar = ({ children }) => {
  const classes = useStyles();

  const target = useRef(null);

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const movie = useSelector((state) => state.movies.movie);
  const isMovieLoading = useSelector((state) => state.movies.isMovieLoading);
  const isTVShowLoading = useSelector((state) => state.tvShows.isTVShowLoading);
  const scrollY = useSelector((state) => state.browser.scrollY);
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
    dispatch(moviesActions.setActiveMovie({}));
    setTimeout(() => window.scrollTo(0, scrollY), 100);
    history.goBack();
  }, [dispatch, scrollY, history]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (!('id' in movie)) dispatch(browserActions.changeBrowserScrollY(window.pageYOffset));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, movie]);

  const handleBottomNavigationClick = (index) => {
    setActiveBottomTab(index);
    const tab = index === 1 ? 'movies' : 'tvshows';
    dispatch(sidebarActions.setActiveTab(tab));
    history.push(tab);
  };

  const renderToolbarContents = () => {
    const isLoading = isMovieSelected ? isMovieLoading : isTVShowLoading;
    const hasItemContent = isMovieSelected
      ? (Object.keys(movie).length === 0 && movie.constructor === Object)
      : (Object.keys(tvShow).length === 0 && tvShow.constructor === Object);
    const displayTitle = isMovieSelected ? (title || originalTitle) : (name || originalName);

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

          {isLoading || hasItemContent
            ? <Skeleton variant="rect" height={24} width="75%" />
            : (
              <>
                <Typography component="h1" variant="h6" noWrap className={classes.title}>
                  {displayTitle}
                </Typography>
                <DarkModeToggle type="iconButton" edge="end" />
              </>
            )}
        </>
      );
    }

    return (
      <>
        <Typography component="h1" variant="h6" className={classes.title}>
          ATMDbRo
        </Typography>
        <APIKeyDialog />
        <AppbarMenu />
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
        <>
          <ReadingProgress
            isLoading={isMovieEmpty}
            isVisible={isMovieSelected && !isMovieLoading}
            target={target}
          />
          <GradientBackground
            image={movie.poster_path}
            isItemSelected={isMovieSelected}
            isLoading={isMovieEmpty}
            isVisible={isMovieSelected && !isMovieLoading && isMovieTabActive}
          />
        </>
      );
    }

    if (isTVShowTabActive) {
      return (
        <>
          <ReadingProgress
            isLoading={isTVShowEmpty}
            isVisible={isTVShowSelected && !isTVShowLoading}
            target={target}
          />
          <GradientBackground
            image={tvShow.poster_path}
            isItemSelected={isTVShowSelected}
            isLoading={isTVShowEmpty}
            isVisible={isTVShowSelected && !isTVShowLoading && isTVShowTabActive}
          />
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Helmet />
      <CssBaseline />

      <HideOnScroll
        replacement={(
          <AppBar color="default">
            <Toolbar variant="dense" className={classes.category}>
              <ItemCategory isList replacement />
            </Toolbar>
          </AppBar>
        )}
        willReplace={!isMovieSelected}
      >
        <AppBar color="default">
          <Toolbar variant="dense">
            {renderToolbarContents()}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <div
        className={clsx({
          [classes.detailContainer]: (isMovieSelected && isMovieTabActive)
            || (isTVShowSelected && isTVShowTabActive),
        })}
        ref={target}
      >
        <div id="scroll-to-top-anchor" />
        {renderTopContents()}
        <div
          className={clsx(
            classes.container,
            { [classes.containerItemSelected]: isMovieSelected || isTVShowSelected },
          )}
        >
          {renderList()}
        </div>
      </div>

      {(!isMovieSelected && !isTVShowSelected) && (
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
              label={element.title}
              to={element.path}
            />
          ))}
        </BottomNavigation>
      )}
    </>
  );
};

Appbar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Appbar;

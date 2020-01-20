import React, { useState, useLayoutEffect, useCallback, useRef } from 'react';

import clsx from 'clsx';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
  ArrowBackTwoTone,
  Brightness2TwoTone,
  BrightnessLowTwoTone,
} from '@material-ui/icons';

import Helmet from '../Helmet';
import APIKeyDialog from '../../apiKey/APIKeyDialog';
import ItemList from '../../common/item/ItemList';
import GradientBackground from '../../common/GradientBackground';
import ReadingProgress from '../../common/ReadingProgress';

import { browserActions, moviesActions, sidebarActions } from '../../../reducers/ducks';

import { evaluateLocation } from '../../../utils/functions';

import { routes } from '../../../routes/config';

const useStyles = makeStyles(theme => ({
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

  const activeTab = useSelector(state => state.sidebar.activeTab);
  const darkMode = useSelector(state => state.sidebar.darkMode);
  const tvShow = useSelector(state => state.tvShows.tvShow);
  const movie = useSelector(state => state.movies.movie);
  const isMovieLoading = useSelector(state => state.movies.isMovieLoading);
  const isTVShowLoading = useSelector(state => state.tvShows.isTVShowLoading);
  const scrollY = useSelector(state => state.browser.scrollY);
  const dispatch = useDispatch();

  const { title, original_title } = movie;
  const { name, original_name } = tvShow;

  const location = useLocation();
  const history = useHistory();

  const currentLocation = evaluateLocation(location);
  const isMovieSelected = 'movieId' in currentLocation;
  const isMovieTabActive = 'movie' in currentLocation;
  const isTVShowSelected = 'tvShowId' in currentLocation;
  const isTVShowTabActive = 'tvShow' in currentLocation;

  const [activeBottomTab, setActiveBottomTab] = useState(activeTab === 'movies' ? 1 : 2);

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

  const handleBottomNavigationClick = index => {
    setActiveBottomTab(index);
    const tab = index === 1 ? 'movies' : 'tvshows';
    dispatch(sidebarActions.setActiveTab(tab));
    history.push(tab);
  };

  const renderToolbar = () => {
    const isLoading = isMovieSelected ? isMovieLoading : isTVShowLoading;
    const displayTitle = isMovieSelected ? (title || original_title) : (name || original_name);

    if (isMovieSelected || isTVShowSelected) {
      return (
        <>
          <IconButton
            aria-label="back"
            edge="start"
            onClick = {goBack}
          >
            <ArrowBackTwoTone />
          </IconButton>
          { isLoading
            ? <Skeleton width="60%" />
            : (
              <Typography component="h1" variant="h6" noWrap>
                {displayTitle}
              </Typography>
            )
          }
        </>
      );
    }

    return (
      <>
        <Typography component="h1" variant="h6" className={classes.title}> ATMDbRo </Typography>
        <div>
          <IconButton
            className={classes.menuButton}
            aria-label="menu"
            onClick={() => dispatch(sidebarActions.toggleLights())}
          >
            {darkMode ? <Brightness2TwoTone /> : <BrightnessLowTwoTone /> }
          </IconButton>
          <APIKeyDialog />
        </div>
      </>
    );
  };

  const renderList = () => {
    if (isMovieTabActive) {
      if (isMovieSelected) return children;
      return <ItemList />;
    }
    else if (isTVShowTabActive) {
      if (isTVShowSelected) return children;
      return <ItemList />;
    }
    else return children;
  };

  const renderTopContents = () => {
    if (isMovieTabActive) {
      return (
        <>
          <ReadingProgress target={target} isVisible={isMovieSelected && !isMovieLoading} />
          <GradientBackground
            isVisible={isMovieSelected && !isMovieLoading && isMovieTabActive}
            image={movie.poster_path}
            isItemSelected={isMovieSelected}
          />
        </>
      );
    } else if (isTVShowTabActive) {
      return (
        <>
          <ReadingProgress target={target} isVisible={isTVShowSelected && !isTVShowLoading} />
          <GradientBackground
            isVisible={isTVShowSelected && !isTVShowLoading && isTVShowTabActive}
            image={tvShow.poster_path}
            isItemSelected={isTVShowSelected}
          />
        </>
      );
    }
  };

  return (
    <>
      <Helmet />
      <CssBaseline />

      <AppBar color="default">
        <Toolbar variant="dense">
          {renderToolbar()}
        </Toolbar>
      </AppBar>

      <div className={classes.detailContainer} ref={target}>
        {renderTopContents()}
        <div
          className={clsx(
            classes.container,
            { [classes.containerItemSelected]: isMovieSelected || isTVShowSelected }
          )}
        >
          {renderList()}
        </div>
      </div>

      { (!isMovieSelected && !isTVShowSelected) && (
        <BottomNavigation
          className={classes.bottomNavigation}
          onChange={(_, index) => handleBottomNavigationClick(index)}
          showLabels={false}
          value={activeBottomTab}
        >
          {routes.map((element, index) => (index !== 0) && (
            <BottomNavigationAction
              icon={element.icon}
              label={element.title}
              component={Link}
              to={element.path}
            />
          ))}
        </BottomNavigation>
      )}
    </>
  );
};

export default Appbar;

import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';

import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
import {
  ArrowBackTwoTone,
  Brightness2TwoTone,
  BrightnessLowTwoTone,
} from '@material-ui/icons';

import Helmet from '../Helmet';
import APIKeyDialog from '../../apiKey/APIKeyDialog';
import MovieList from '../../movie/MovieList';
import MovieCategory from '../../movie/MovieCategory';
import TVShowList from '../../tvShow/TVShowList';
import NotFound from '../../notFound/NotFound';
import GradientBackground from '../../common/GradientBackground';

import { browserActions, moviesActions, sidebarActions } from '../../../reducers/ducks';

import HideOnScroll from '../../../utils/components/HideOnScroll';

import { routes } from '../../../routes/config';
import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

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
  containerMovieSelected: {
    marginTop: -theme.spacing(12),
  },
}));

const Appbar = ({ children }) => {
  const classes = useStyles();

  const activeTab = useSelector(state => state.sidebar.activeTab);
  const darkMode = useSelector(state => state.sidebar.darkMode);
  const movie = useSelector(state => state.movies.movie);
  const scrollY = useSelector(state => state.browser.scrollY);
  const dispatch = useDispatch();

  const history = useHistory();

  const isMovieSelected = 'id' in movie;
  const isMovieTabActive = activeTab === 'movies';
  const isTVShowsTabActive = activeTab === 'tvshows';

  const [activeBottomTab, setActiveBottomTab] = useState(activeTab === 'movies' ? 1 : 2);

  const goBack = useCallback(() => {
    dispatch(moviesActions.setActiveMovie({}));
    setTimeout(() => window.scrollTo(0, scrollY), 100);
  }, [dispatch, scrollY]);

  useEffect(() => {
    const handleBack = () => {
      if ('id' in movie) {
        history.push('movies');
        goBack();
      }
    };

    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, [goBack, history, movie]);

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
    if (isMovieSelected) {
      return (
        <>
          <IconButton
            aria-label="back"
            edge="start"
            onClick = {goBack}
          >
            <ArrowBackTwoTone />
          </IconButton>
          <Typography component="h1" variant="h6">{movie.title}</Typography>
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
      return <MovieList />;
    }
    else if (isTVShowsTabActive) return <TVShowList />;
    else return <NotFound />;
  };

  return (
    <>
      <Helmet />
      <CssBaseline />

      <HideOnScroll
        replacement={
          <AppBar color="default">
            <Toolbar variant="dense">
              <MovieCategory isList replacement />
            </Toolbar>
          </AppBar>
        }
      >
        <AppBar color="default">
          <Toolbar variant="dense">
            {renderToolbar()}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      { isMovieTabActive && isMovieSelected && (
        <GradientBackground src={`${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}/original${movie.poster_path}`} />
      )}

      <div
        className={clsx(
          classes.container,
          { [classes.containerMovieSelected]: isMovieSelected }
        )}
      >
        {renderList()}
      </div>

      { !isMovieSelected && (
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
            />
          ))}
        </BottomNavigation>
      )}
    </>
  );
};

export default Appbar;

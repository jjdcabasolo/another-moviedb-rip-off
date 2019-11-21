import React, { useState, useLayoutEffect, useCallback } from 'react';

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
import {
  ArrowBackTwoTone,
  Brightness2TwoTone,
  BrightnessLowTwoTone,
} from '@material-ui/icons';

import Helmet from '../Helmet';
import APIKeyDialog from '../../apiKey/APIKeyDialog';
import NotFound from '../../notFound/NotFound';
import ItemCategory from '../../common/item/ItemCategory';
import ItemList from '../../common/item/ItemList';
import GradientBackground from '../../common/GradientBackground';

import { browserActions, moviesActions, sidebarActions } from '../../../reducers/ducks';

import HideOnScroll from '../../../utils/components/HideOnScroll';
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
  containerMovieSelected: {
    marginTop: -theme.spacing(12),
  },
  category: {
    padding: theme.spacing(0, 1),
  },
}));

const Appbar = ({ children }) => {
  const classes = useStyles();

  const activeTab = useSelector(state => state.sidebar.activeTab);
  const darkMode = useSelector(state => state.sidebar.darkMode);
  const movie = useSelector(state => state.movies.movie);
  const isMovieLoading = useSelector(state => state.movies.isMovieLoading);
  const scrollY = useSelector(state => state.browser.scrollY);
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  const currentLocation = evaluateLocation(location);
  const isMovieSelected = 'movieId' in currentLocation;
  const isMovieTabActive = 'movie' in currentLocation;
  const isTVShowsTabActive = 'tvShow' in currentLocation;

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
      return <ItemList type="movie"/>;
    }
    else if (isTVShowsTabActive) return <ItemList type="tvshow"/>;
    else return <NotFound />;
  };

  return (
    <>
      <Helmet />
      <CssBaseline />

      <HideOnScroll
        replacement={
          <AppBar color="default">
            <Toolbar variant="dense" className={classes.category}>
              <ItemCategory isList replacement type={isMovieTabActive ? 'movie' : 'tvshow'} />
            </Toolbar>
          </AppBar>
        }
        willReplace={!isMovieSelected}
      >
        <AppBar color="default">
          <Toolbar variant="dense">
            {renderToolbar()}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <GradientBackground isVisible={isMovieSelected && !isMovieLoading && 'id' in movie} image="poster_path" />

      <div
        className={clsx(
          classes.container,
          { [classes.containerMovieSelected]: isMovieSelected && 'id' in movie }
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

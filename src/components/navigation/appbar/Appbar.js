import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Route, useRouteMatch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Container,
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
import TVShowList from '../../tvShow/TVShowList';
import NotFound from '../../notFound/NotFound';

import { browserActions, moviesActions, sidebarActions } from '../../../reducers/ducks';

import HideOnScroll from '../../../utils/components/HideOnScroll';

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

  const [activeBottomTab, setActiveBottomTab] = useState(activeTab === 'movies' ? 1 : 2);

  const goBack = () => {
    dispatch(moviesActions.setActiveMovie({}));
    setTimeout(() => window.scrollTo(0, scrollY), 100);
  };

  useEffect(() => {
    window.onpopstate = e => {
      history.push('movies');

      // event is reversed here so variables are reversed
      if (!isMovieSelected) goBack();
    };
  }, [window]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (!('id' in movie)) dispatch(browserActions.changeBrowserScrollY(window.pageYOffset));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [movie]);

  const handleBottomNavigationClick = index => {
    setActiveBottomTab(index);

    let tab;
    if (index === 1) tab = 'movies';
    if (index === 2) tab = 'tvshows';
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
    if (activeTab === 'movies') {
      if (isMovieSelected) return children;
      return <MovieList />;
    }
    else if (activeTab === 'tvshows') return <TVShowList />;
    else return <NotFound />;
  };

  return (
    <>
      <Helmet />
      <CssBaseline />

      <HideOnScroll>
        <AppBar color="default">
          <Toolbar variant="dense">
            {renderToolbar()}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Container className={classes.container}>
        {renderList()}
      </Container>

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

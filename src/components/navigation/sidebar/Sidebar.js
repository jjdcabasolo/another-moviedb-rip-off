import React from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Grid,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import {
  BrightnessLowTwoTone,
  Brightness2TwoTone,
  MenuTwoTone
} from '@material-ui/icons';

import Helmet from '../Helmet';
import SidebarTitlebar from './SidebarTitlebar';
import APIKeyDialog from '../../apiKey/APIKeyDialog';
import MovieDrawer from '../../movie/MovieDrawer';
import TVShowDrawer from '../../tvShow/TVShowDrawer';
import ParallaxBackdrop from '../../common/ParallaxBackdrop';

import { sidebarActions } from '../../../reducers/ducks';

import {
  API_KEY_DIALOG_TMDB_LINK,
  SIDEBAR_WIDTH,
  SIDEBAR_TMDB_LOGO_DARK,
  SIDEBAR_TMDB_LOGO,
  MOVIE_DRAWER_TMDB_IMAGE_PREFIX,
} from '../../../constants';
import { routes } from '../../../routes/config';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appTitle: {
    marginRight: '20px',
  },
  bottomTabs: {
    alignContent: 'flex-end',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    padding: theme.spacing(5),
  },
  contentTopPadding: {
    paddingTop: theme.spacing(11),
  },
  drawer: {
    display: 'flex',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    width: SIDEBAR_WIDTH,
  },
  drawerClose: {
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
  },
  drawerOpen: {
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: SIDEBAR_WIDTH,
  },
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: '10px',
    padding: '0 4px',
    ...theme.mixins.toolbar,
  },
  tmdbLogo: {
    width: '1.6em',
  },
}));

const WithTooltip = ({ children, title, withTooltip }) => (withTooltip
  ? (
    <Tooltip title={title} placement="right">
      {children}
    </Tooltip>
  )
  : children
);

const Sidebar = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  const activeTab = useSelector(state => state.sidebar.activeTab);
  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);
  const darkMode = useSelector(state => state.sidebar.darkMode);
  const movie = useSelector(state => state.movies.movie);

  const dispatch = useDispatch();

  const history = useHistory();

  const isMovieSelected = 'id' in movie;

  const evaluateDrawerVisibility = () => {
    if (activeTab === 'movies') {
      if (isTablet && isMovieSelected) return <SidebarTitlebar />;
      return <MovieDrawer />;
    } else if (activeTab === 'tvshows') {
      if (isTablet) return <SidebarTitlebar />;
      return <TVShowDrawer />;
    }
  };

  const handleListItemClick = tab => {
    dispatch(sidebarActions.setActiveTab(tab.toLowerCase()));
    history.push(tab.toLowerCase().replace(/ /, ''));
  };

  const handleDrawerState = () => dispatch(sidebarActions.toggleDrawer());

  return (
    <div className={classes.root}>
      <Helmet />

      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(
          classes.drawer,
          { [classes.drawerOpen]: drawerOpen },
          { [classes.drawerClose]: !drawerOpen },
        )}
        classes={{
          paper: clsx(
            { [classes.drawerBG]: !darkMode },
            { [classes.drawerOpen]: drawerOpen },
            { [classes.drawerClose]: !drawerOpen },
          ),
        }}
        open={drawerOpen}
      >

        <div className={classes.toolbar}>
          <IconButton className={classes.appTitle} onClick={handleDrawerState}>
            <MenuTwoTone />
          </IconButton>
          <Typography component="h1" variant="h6"> ATMDbRo </Typography>
        </div>

        <List>
          { routes.map((element, index) => (index !== 0) && (
            <ListItem
              button
              classes={{ selected: classes.activeTab }}
              key={element.key}
              onClick={() => handleListItemClick(element.title.replace(/ /g, '').toLowerCase())}
              selected={activeTab === element.title.replace(/ /g, '').toLowerCase()}
            >
              <WithTooltip title={element.title} withTooltip={!drawerOpen}>
                <ListItemIcon>{element.icon}</ListItemIcon>
              </WithTooltip>
              <ListItemText primary={element.title} />
            </ListItem>
          )) }
        </List>

        <List className={classes.bottomTabs}>
          <ListItem button onClick={() => dispatch(sidebarActions.toggleLights())}>
            <WithTooltip title="Toggle lights" withTooltip={!drawerOpen}>
              <ListItemIcon>
                {darkMode ? <Brightness2TwoTone /> : <BrightnessLowTwoTone /> }
              </ListItemIcon>
            </WithTooltip>
            <ListItemText primary="Toggle lights"/>
          </ListItem>

          <APIKeyDialog />

          <ListItem button onClick={() => window.open(API_KEY_DIALOG_TMDB_LINK, '_blank')}>
            <WithTooltip title="Le TMDb" withTooltip={!drawerOpen}>
              <ListItemIcon>
                <img
                  alt="TMDb Logo"
                  className={classes.tmdbLogo}
                  src={darkMode ? SIDEBAR_TMDB_LOGO_DARK : SIDEBAR_TMDB_LOGO}
                />
              </ListItemIcon>
            </WithTooltip>
            <ListItemText secondary="Made with ❤ and TMDb"/>
          </ListItem>
        </List>
      </Drawer>

      {evaluateDrawerVisibility()}

      <div>
        <ParallaxBackdrop src={`${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}/original${movie.backdrop_path}`} />
        <main className={classes.content}>
          { children }
        </main>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default Sidebar;

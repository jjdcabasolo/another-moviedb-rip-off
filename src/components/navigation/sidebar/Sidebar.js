import React from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
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
import GradientBackground from '../../common/GradientBackground';
import ItemDrawer from '../../common/item/ItemDrawer';

import { moviesActions, sidebarActions } from '../../../reducers/ducks';

import {
  API_KEY_DIALOG_TMDB_LINK,
  SIDEBAR_WIDTH,
  TMDB_LOGO_DARK,
  TMDB_LOGO,
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
    height: '60vh',
    padding: theme.spacing(5),
  },
  contentMovieSelected: {
    marginTop: theme.spacing(-5),
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
  itemContainer: {
    overflowY: 'auto',
    width: '100%',
  },
  link: {
    textDecoration: 'none',
    color: 'unset',
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
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const activeTab = useSelector(state => state.sidebar.activeTab);
  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);
  const darkMode = useSelector(state => state.sidebar.darkMode);
  const isMovieLoading = useSelector(state => state.movies.isMovieLoading);
  const movie = useSelector(state => state.movies.movie);

  const dispatch = useDispatch();

  const isMovieSelected = 'id' in movie;
  const isMovieTabActive = activeTab === 'movies';
  const isTVShowsTabActive = activeTab === 'tvshows';

  const evaluateDrawerVisibility = () => {
    if (isMovieTabActive) {
      if (!isDesktop && isMovieSelected) return <SidebarTitlebar />;
      return <ItemDrawer type="movie" />;
    } else if (isTVShowsTabActive) {
      // if (!isDesktop) return <SidebarTitlebar />;
      return <ItemDrawer type="tvshow" />;
    }
  };

  const handleListItemClick = tab => {
    dispatch(moviesActions.setActiveMovie({}));  
    dispatch(sidebarActions.setActiveTab(tab.toLowerCase()))
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
            <Link to={element.path} className={classes.link}>
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
            </Link>
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
                  src={darkMode ? TMDB_LOGO_DARK : TMDB_LOGO}
                />
              </ListItemIcon>
            </WithTooltip>
            <ListItemText secondary="Made with ❤ and TMDb"/>
          </ListItem>
        </List>
      </Drawer>

      {evaluateDrawerVisibility()}

      <div className={classes.itemContainer}>
        <GradientBackground isVisible={isMovieSelected && !isMovieLoading} image="backdrop_path"/>
        <main
          className={clsx(
            classes.content,
            { [classes.contentMovieSelected]: isMovieSelected }
          )}
        >
          <Container maxWidth="md">
            { children }
          </Container>
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

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  BrightnessLowTwoTone,
  Brightness2TwoTone,
  MenuTwoTone
} from '@material-ui/icons';

import APIKeyDialog from './APIKeyDialog';
import MovieDrawer from '../movie/MovieDrawer';

import { sidebarActions } from '../../reducers/ducks/sidebar';

import {
  SIDEBAR_UPPER_TABS,
  SIDEBAR_WIDTH,
  SIDEBAR_TMDB_LOGO_DARK,
  SIDEBAR_TMDB_LOGO,
} from '../../constants/sidebar';
import { API_KEY_DIALOG_TMDB_LINK } from '../../constants/movie';

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
  tmdblogo: {
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

const Sidebar = (props) => {
  const classes = useStyles();

  const { children } = props;

  const activeTab = useSelector(state => state.sidebar.activeTab);
  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);
  const darkMode = useSelector(state => state.sidebar.darkMode);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleListItemClick = tab => {
    dispatch(sidebarActions.setActiveTab(tab.toLowerCase()));
    history.push(tab.toLowerCase().replace(/ /, ''));
  };

  const handleDrawerState = () => dispatch(sidebarActions.toggleDrawer());

  return (
    <div className={classes.root}>
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
          <Typography variant="h6"> ATMDbRo </Typography>
        </div>

        <List>
          { SIDEBAR_UPPER_TABS.map((element, index) => (
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
                  className={classes.tmdblogo}
                  src={darkMode ? SIDEBAR_TMDB_LOGO_DARK : SIDEBAR_TMDB_LOGO}
                />
              </ListItemIcon>
            </WithTooltip>
            <ListItemText secondary="Made with ❤ and TMDb"/>
          </ListItem>
        </List>
      </Drawer>

      {activeTab === 'movies' && <MovieDrawer />}

      <main className={classes.content}>
        { children }
      </main>
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default Sidebar;

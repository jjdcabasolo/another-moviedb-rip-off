import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
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

import APIKeyDialog from '../../apiKey/APIKeyDialog';

import { moviesActions, sidebarActions, tvShowsActions } from '../../../reducers/ducks';

import {
  API_KEY_DIALOG_TMDB_LINK,
  TMDB_LOGO_DARK,
  TMDB_LOGO,
} from '../../../constants';

import { routes } from '../../../routes/config';

const useStyles = makeStyles(theme => ({
  appTitle: {
    marginRight: '20px',
  },
  bottomTabs: {
    alignContent: 'flex-end',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
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
  link: {
    textDecoration: 'none',
    color: 'unset',
  },
}));

const SidebarContent = () => {
  const classes = useStyles();
  
  const activeTab = useSelector(state => state.sidebar.activeTab);
  const darkMode = useSelector(state => state.sidebar.darkMode);
  const dispatch = useDispatch();

  const handleListItemClick = tab => {
    if (activeTab === 'movies') dispatch(moviesActions.setActiveMovie({}));
    else dispatch(tvShowsActions.setActiveTVShow({}));
    dispatch(sidebarActions.setActiveTab(tab.toLowerCase()))
  };

  const handleDrawerState = () => dispatch(sidebarActions.toggleDrawer());

  return (
    <>
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
              <Tooltip title={element.title} placement="right">
                <ListItemIcon>{element.icon}</ListItemIcon>
              </Tooltip>
              <ListItemText primary={element.title} />
            </ListItem>
          </Link>
        )) }
      </List>

      <List className={classes.bottomTabs}>
        <ListItem button onClick={() => dispatch(sidebarActions.toggleLights())}>
          <Tooltip title="Toggle lights" placement="right">
            <ListItemIcon>
              {darkMode ? <Brightness2TwoTone /> : <BrightnessLowTwoTone /> }
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Toggle lights"/>
        </ListItem>

        <APIKeyDialog />

        <ListItem button onClick={() => window.open(API_KEY_DIALOG_TMDB_LINK, '_blank')}>
          <Tooltip title="Le TMDb" placement="right">
            <ListItemIcon>
              <img
                alt="TMDb Logo"
                className={classes.tmdbLogo}
                src={darkMode ? TMDB_LOGO_DARK : TMDB_LOGO}
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText secondary="Made with ❤ and TMDb"/>
        </ListItem>
      </List>
    </>
  );
};

export default SidebarContent;

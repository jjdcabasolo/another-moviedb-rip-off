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
  Typography,
  Divider,
  ListSubheader,
} from '@material-ui/core';
import { CodeTwoTone, MenuTwoTone, WebTwoTone } from '@material-ui/icons';

import DarkModeToggle from '../../common/DarkModeToggle';

import APIKeyDialog from '../../apiKey/APIKeyDialog';

import { moviesActions, sidebarActions, tvShowsActions } from '../../../reducers/ducks';

import Tooltip from '../../../utils/components/Tooltip';

import {
  API_KEY_DIALOG_TMDB_LINK,
  GITHUB_REPO_LINK,
  TMDB_LOGO_DARK,
  TMDB_LOGO,
  FIGMA_LINK,
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
  divider: {
    margin: theme.spacing(2, 0),
    width: '100%',
  },
}));

const SidebarContent = () => {
  const classes = useStyles();
  
  const activeTab = useSelector(state => state.sidebar.activeTab);
  const darkMode = useSelector(state => state.sidebar.darkMode);
  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);
  const dispatch = useDispatch();

  const handleListItemClick = tab => {
    if (activeTab === 'movies') dispatch(moviesActions.setActiveMovie({}));
    else dispatch(tvShowsActions.setActiveTVShow({}));
    dispatch(sidebarActions.setActiveTab(tab.toLowerCase()))
  };

  const handleDrawerState = () => dispatch(sidebarActions.toggleDrawer());

  const renderListItemLink = (link, tooltipTitle, icon, primary, secondary) => (
    <ListItem button onClick={() => window.open(link, '_blank')}>
      <Tooltip title={tooltipTitle} placement="right" visible={drawerOpen}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
      </Tooltip>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );

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
              <Tooltip title={element.title} placement="right" visible={drawerOpen}>
                <ListItemIcon>{element.icon}</ListItemIcon>
              </Tooltip>
              <ListItemText primary={element.title} />
            </ListItem>
          </Link>
        )) }
      </List>

      <List className={classes.bottomTabs}>
        {drawerOpen && (
          <ListSubheader component="div" id="nested-list-subheader">
            External Links
          </ListSubheader>
        )}
        {renderListItemLink(GITHUB_REPO_LINK, "GitHub", <CodeTwoTone />, "GitHub Repository", undefined)}
        {renderListItemLink(FIGMA_LINK, "Figma", <WebTwoTone />, "Figma (Wireframes)", undefined)}
        <Divider className={classes.divider} />
        <DarkModeToggle type="listItem" tooltipVisible={drawerOpen} />
        <APIKeyDialog />
        {renderListItemLink(API_KEY_DIALOG_TMDB_LINK, "Le TMDb", (
          <img
            alt="TMDb Logo"
            className={classes.tmdbLogo}
            src={darkMode ? TMDB_LOGO_DARK : TMDB_LOGO}
          />
        ), undefined, "Made with ❤ and TMDb")}
      </List>
    </>
  );
};

export default SidebarContent;

import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core';
import { CodeTwoTone, MenuTwoTone, WebTwoTone } from '@material-ui/icons';

import DarkModeToggle from '../../common/DarkModeToggle';

import { moviesActions, sidebarActions, tvShowsActions } from '../../../reducers/ducks';

import {
  TMDB_LINK,
  FIGMA_LINK,
  GITHUB_REPO_LINK,
  TMDB_LOGO,
  TMDB_LOGO_DARK,
} from '../../../constants';

import { routes } from '../../../routes/config';

const useStyles = makeStyles((theme) => ({
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

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const darkMode = useSelector((state) => state.sidebar.darkMode);
  const drawerOpen = useSelector((state) => state.sidebar.drawerOpen);
  const dispatch = useDispatch();

  const handleListItemClick = (tab) => {
    if (activeTab === 'movies') dispatch(moviesActions.setActiveMovie({}));
    else dispatch(tvShowsActions.setActiveTVShow({}));
    dispatch(sidebarActions.setActiveTab(tab.toLowerCase()));
  };

  const handleDrawerState = () => dispatch(sidebarActions.toggleDrawer());

  const renderListItemLink = (link, icon, primary, secondary) => (
    <ListItem button onClick={() => window.open(link, '_blank')}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
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
        {routes.map((element, index) => (index !== 0) && (
          <Link
            className={classes.link}
            key={`sidebar-content-link-${element.path}`}
            to={element.path}
          >
            <ListItem
              button
              classes={{ selected: classes.activeTab }}
              onClick={() => handleListItemClick(element.title.replace(/ /g, '').toLowerCase())}
              selected={activeTab === element.title.replace(/ /g, '').toLowerCase()}
            >
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText primary={element.title} />
            </ListItem>
          </Link>
        ))}
      </List>

      <List className={classes.bottomTabs}>
        {drawerOpen && (
          <ListSubheader component="div" id="nested-list-subheader">
            External Links
          </ListSubheader>
        )}
        {renderListItemLink(GITHUB_REPO_LINK, <CodeTwoTone />, 'GitHub Repository', undefined)}
        {renderListItemLink(FIGMA_LINK, <WebTwoTone />, 'Figma (Wireframes)', undefined)}
        <Divider className={classes.divider} />
        <DarkModeToggle type="listItem" />
        {renderListItemLink(TMDB_LINK, (
          <img
            alt="TMDb Logo"
            className={classes.tmdbLogo}
            src={darkMode ? TMDB_LOGO_DARK : TMDB_LOGO}
          />
        ), 'Made with y540 and TMDb', 'by jjdcabasolo')}
      </List>
    </>
  );
};

export default SidebarContent;

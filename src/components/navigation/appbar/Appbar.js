import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

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
  Brightness2TwoTone,
  BrightnessLowTwoTone,
} from '@material-ui/icons';

import { sidebarActions } from '../../../reducers/ducks';

import HideOnScroll from '../../../utils/components/HideOnScroll';

import { routes } from '../../../routes';

const useStyles = makeStyles(theme => ({
  bottomNavigation: {
    width: theme.browserSize.width,
    position: 'fixed',
    bottom: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

const Appbar = ({ children, window }) => {
  const classes = useStyles();

  const darkMode = useSelector(state => state.sidebar.darkMode);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(1);

  const history = useHistory();

  const handleBottomNavigationClick = index => {
    setActiveTab(index);

    let tab;
    if (index === 1) tab = 'movies';
    if (index === 2) tab = 'tvshows';

    dispatch(sidebarActions.setActiveTab(tab));
    history.push(tab);
  };

  return (
    <>
      <CssBaseline />
      <HideOnScroll window={window}>
        <AppBar color="default">
          <Toolbar>
            <Typography variant="h6" className={classes.title}> ATMDbRo </Typography>
            <div>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => dispatch(sidebarActions.toggleLights())}
              >
                {darkMode ? <Brightness2TwoTone /> : <BrightnessLowTwoTone /> }
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* <Toolbar /> */}

      <Container>
        { children }
      </Container>

      <BottomNavigation
        value={activeTab}
        onChange={(_, index) => handleBottomNavigationClick(index)}
        showLabels
        className={classes.bottomNavigation}
      >
        {routes.map((element, index) => (index !== 0) && (
          <BottomNavigationAction
            label={element.title}
            icon={element.icon}
          />
        ))}
      </BottomNavigation>
    </>
  );
};

export default Appbar;

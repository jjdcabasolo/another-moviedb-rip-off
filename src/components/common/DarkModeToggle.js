import React from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import {
  IconButton,
  ListItemText,
  ListItem,
  ListItemIcon,
  MenuItem,
} from '@material-ui/core';
import {
  Brightness2TwoTone,
  BrightnessLowTwoTone,
} from '@material-ui/icons';

import { sidebarActions } from '../../reducers/ducks';

const DarkModeToggle = ({ type, edge }) => {
  const darkMode = useSelector((state) => state.sidebar.darkMode);
  const dispatch = useDispatch();

  const handleToggleLights = () => {
    dispatch(sidebarActions.toggleLights());
  };

  switch (type) {
    case 'iconButton':
      return (
        <IconButton aria-label="menu" onClick={handleToggleLights} edge={edge}>
          {darkMode ? <Brightness2TwoTone /> : <BrightnessLowTwoTone /> }
        </IconButton>
      );
    case 'listItem':
      return (
        <ListItem button onClick={handleToggleLights}>
          <ListItemIcon>
            {darkMode ? <Brightness2TwoTone /> : <BrightnessLowTwoTone /> }
          </ListItemIcon>
          <ListItemText primary="Toggle lights" />
        </ListItem>
      );
    case 'menuItem':
      return (
        <MenuItem onClick={handleToggleLights}>
          Toggle lights
        </MenuItem>
      );
    default:
      return <div>Type not supported.</div>;
  }
};

DarkModeToggle.defaultProps = {
  edge: '',
};

DarkModeToggle.propTypes = {
  edge: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default DarkModeToggle;

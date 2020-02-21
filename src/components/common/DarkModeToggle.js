import React from 'react';
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
  VpnKeyTwoTone,
} from '@material-ui/icons';

import Tooltip from '../../utils/components/Tooltip';

import { sidebarActions } from '../../reducers/ducks';

const DarkModeToggle = ({ type, tooltipVisible, edge }) => {
  const darkMode = useSelector(state => state.sidebar.darkMode);
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
          <Tooltip title="Toggle lights" placement="right" visible={tooltipVisible}>
            <ListItemIcon>
              {darkMode ? <Brightness2TwoTone /> : <BrightnessLowTwoTone /> }
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Toggle lights"/>
        </ListItem>
      );
    case 'menuItem':
      return (
        <MenuItem onClick={handleToggleLights}>
          Toggle lights
        </MenuItem>
      );
    default:
      return <div>Type not supported.</div>
  };
};

export default DarkModeToggle;

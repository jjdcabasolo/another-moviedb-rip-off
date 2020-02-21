import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  MoreVertTwoTone,
  OpenInNewTwoTone,
} from '@material-ui/icons';

import DarkModeToggle from '../../common/DarkModeToggle';
const AppbarMenu = () => {
  // listItemIcon/
// display: flex;
//     justify-content: flex-end;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        edge="end"
      >
        <MoreVertTwoTone />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <DarkModeToggle type="menuItem" />
        <MenuItem onClick={handleClose}>
          <ListItemText primary="GitHub Repository" />
          <ListItemIcon className={classes.listItemIcon}>
            <OpenInNewTwoTone fontSize="small" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText primary="Figma (Wireframes)" />
          <ListItemIcon className={classes.listItemIcon}>
            <OpenInNewTwoTone fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AppbarMenu;

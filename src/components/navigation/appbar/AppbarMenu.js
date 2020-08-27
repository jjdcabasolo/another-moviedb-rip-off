import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  MoreVertTwoTone,
  OpenInNewTwoTone,
} from '@material-ui/icons';

import DarkModeToggle from '../../common/DarkModeToggle';

const useStyles = makeStyles({
  listItemIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const AppbarMenu = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
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
        edge="end"
        onClick={handleClick}
      >
        <MoreVertTwoTone />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="simple-menu"
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
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

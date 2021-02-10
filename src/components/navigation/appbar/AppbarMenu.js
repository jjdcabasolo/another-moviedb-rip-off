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

import {
  FIGMA_LINK,
  GITHUB_REPO_LINK,
} from '../../../constants';

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

  const handleLinkClick = (link) => {
    window.open(link, '_blank');
    handleClose();
  };

  const renderMenuItem = (link, primary) => (
    <MenuItem onClick={() => handleLinkClick(link)}>
      <ListItemText primary={primary} />
      <ListItemIcon className={classes.listItemIcon}>
        <OpenInNewTwoTone fontSize="small" />
      </ListItemIcon>
    </MenuItem>
  );

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
        {renderMenuItem(GITHUB_REPO_LINK, 'GitHub Repository')}
        {renderMenuItem(FIGMA_LINK, 'Figma (Wireframes)')}
      </Menu>
    </>
  );
};

export default AppbarMenu;

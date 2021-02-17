import React, { useState } from 'react';

import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

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

  const history = useHistory();

  const activeTab = useSelector((state) => state.sidebar.activeTab);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (menuItemClickType, link) => {
    switch (menuItemClickType) {
      case 'newLink':
        window.open(link, '_blank');
        break;
      case 'home':
        history.push(`/${activeTab}`);
        break;
      default:
        break;
    }
    handleClose();
  };

  const renderMenuItem = (primary, link, menuItemClickType, icon) => (
    <MenuItem onClick={() => handleMenuItemClick(menuItemClickType, link)}>
      <ListItemText primary={primary} />
      {icon && (
        <ListItemIcon className={classes.listItemIcon}>
          {icon}
        </ListItemIcon>
      )}
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
        {renderMenuItem(
          'Go home',
          '',
          'home',
        )}
        <DarkModeToggle type="menuItem" />
        {renderMenuItem(
          'GitHub Repository',
          GITHUB_REPO_LINK,
          'newTab',
          <OpenInNewTwoTone fontSize="small" />,
        )}
        {renderMenuItem(
          'Figma (Wireframes)',
          FIGMA_LINK,
          'newTab',
          <OpenInNewTwoTone fontSize="small" />,
        )}
      </Menu>
    </>
  );
};

export default AppbarMenu;

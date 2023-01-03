import React, { useState } from "react";

import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@material-ui/core";
import IconButton from "../../custom/composed/IconButton";
import OptionsIcon from "../../../assets/icons/options";
import NewTabIcon from "../../../assets/icons/new-tab";

import DarkModeToggle from "../../common/DarkModeToggle";

import { FIGMA_LINK, GITHUB_REPO_LINK } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  moreOptions: {
    marginLeft: theme.spacing(1),
  },
  icon: {
    "& svg": {
      height: theme.spacing(3),
      width: theme.spacing(3),
      marginBottom: -4,
    },
    "& svg *[fill]": {
      fill: theme.palette.colorScheme.svgStrokeFill,
    },
    "& svg *[stroke]": {
      stroke: theme.palette.colorScheme.svgStrokeFill,
    },
  },
  listItemIcon: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

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
    if (menuItemClickType === "home") {
      history.push(`/${activeTab}`);
    } else {
      window.open(link, "_blank");
    }
    handleClose();
  };

  const renderMenuItem = (primary, link, menuItemClickType, icon) => (
    <MenuItem onClick={() => handleMenuItemClick(menuItemClickType, link)}>
      <ListItemText primary={primary} />
      {icon && (
        <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
      )}
    </MenuItem>
  );

  return (
    <>
      <div className={classes.moreOptions} />
      <IconButton
        svgSrc={<OptionsIcon />}
        handleOnClick={handleClick}
        tooltipTitle="More options"
      />
      <Menu
        anchorEl={anchorEl}
        id="simple-menu"
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        {renderMenuItem("Go home", "", "home")}
        <DarkModeToggle type="menuItem" />
        {renderMenuItem(
          "GitHub Repository",
          GITHUB_REPO_LINK,
          "newTab",
          <span className={classes.icon}>
            <NewTabIcon />
          </span>
        )}
        {renderMenuItem(
          "Figma (Wireframes)",
          FIGMA_LINK,
          "newTab",
          <span className={classes.icon}>
            <NewTabIcon />
          </span>
        )}
      </Menu>
    </>
  );
};

export default AppbarMenu;

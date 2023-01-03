import React from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { ListItemText, ListItem, MenuItem } from "@material-ui/core";
import IconButton from "../custom/composed/IconButton";

import LightModeIcon from "../../assets/icons/light-mode";
import DarkModeIcon from "../../assets/icons/dark-mode";

import { sidebarActions } from "../../reducers/ducks";

const useStyles = makeStyles((theme) => ({
  listItemText: {
    marginLeft: theme.spacing(2.5),
  },
}));

const DarkModeToggle = ({ type, edge }) => {
  const classes = useStyles();

  const darkMode = useSelector((state) => state.sidebar.darkMode);
  const dispatch = useDispatch();

  const handleToggleLights = () => {
    dispatch(sidebarActions.toggleLights());
  };

  switch (type) {
    case "listItem":
      return (
        <ListItem button onClick={handleToggleLights}>
          <IconButton
            svgSrc={darkMode ? <DarkModeIcon /> : <LightModeIcon />}
          />
          <ListItemText
            className={classes.listItemText}
            primary="Toggle lights"
          />
        </ListItem>
      );
    case "menuItem":
      return <MenuItem onClick={handleToggleLights}>Toggle lights</MenuItem>;
    default:
      return <div>Type not supported.</div>;
  }
};

DarkModeToggle.defaultProps = {
  edge: "",
};

DarkModeToggle.propTypes = {
  edge: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default DarkModeToggle;

import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@material-ui/core";

import IconButton from "../../custom/composed/IconButton";
import DarkModeToggle from "../../common/DarkModeToggle";

import TMDbIcon from "../../../assets/icons/tmdb";
import MenuIcon from "../../../assets/icons/menu";
import FigmaIcon from "../../../assets/icons/figma";
import GitHubIcon from "../../../assets/icons/github";

import {
  moviesActions,
  sidebarActions,
  tvShowsActions,
} from "../../../reducers/ducks";

import { TMDB_LINK, FIGMA_LINK, GITHUB_REPO_LINK } from "../../../constants";

import { routes } from "../../../routes/config";

const useStyles = makeStyles((theme) => ({
  appTitle: {
    marginRight: "20px",
  },
  bottomTabs: {
    alignContent: "flex-end",
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
  },
  tmdbLogo: {
    width: "1.6em",
  },
  link: {
    textDecoration: "none",
    color: "unset",
  },
  divider: {
    width: "100%",
  },
  dividerPadding: {
    margin: theme.spacing(1, 0),
  },
  listItemText: {
    marginLeft: theme.spacing(2.5),
  },
  menuListItem: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const SidebarContent = () => {
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const drawerOpen = useSelector((state) => state.sidebar.drawerOpen);
  const dispatch = useDispatch();

  const handleListItemClick = (tab) => {
    if (activeTab === "movies") dispatch(moviesActions.setActiveMovie({}));
    else dispatch(tvShowsActions.setActiveTVShow({}));
    dispatch(sidebarActions.setActiveTab(tab.toLowerCase()));
  };

  const handleDrawerState = () => dispatch(sidebarActions.toggleDrawer());

  const renderListItemLink = (link, icon, primary, secondary) => (
    <ListItem button onClick={() => window.open(link, "_blank")}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        className={classes.listItemText}
        primary={primary}
        secondary={secondary}
      />
    </ListItem>
  );

  return (
    <>
      <List disablePadding>
        <ListItem className={classes.menuListItem}>
          <ListItemIcon>
            <IconButton
              className={classes.appTitle}
              svgSrc={<MenuIcon />}
              handleOnClick={handleDrawerState}
              tooltipTitle="Toggle menu"
            />
          </ListItemIcon>
          <ListItemText
            className={classes.listItemText}
            primary={
              <Typography component="h1" variant="h6">
                {" "}
                ATMDbRo{" "}
              </Typography>
            }
          />
        </ListItem>
        <Divider className={classes.divider} />

        {routes.map(
          (element, index) =>
            index !== 0 && (
              <Link
                className={classes.link}
                key={`sidebar-content-link-${element.path}`}
                to={element.path}
              >
                <ListItem
                  button
                  classes={{ selected: classes.activeTab }}
                  onClick={() =>
                    handleListItemClick(
                      element.title.replace(/ /g, "").toLowerCase()
                    )
                  }
                  selected={
                    activeTab === element.title.replace(/ /g, "").toLowerCase()
                  }
                >
                  <ListItemIcon>{element.icon}</ListItemIcon>
                  <ListItemText
                    className={classes.listItemText}
                    primary={element.title}
                  />
                </ListItem>
              </Link>
            )
        )}
      </List>

      <List className={classes.bottomTabs}>
        {drawerOpen && (
          <ListSubheader component="div" id="nested-list-subheader">
            External Links
          </ListSubheader>
        )}
        {renderListItemLink(
          GITHUB_REPO_LINK,
          <IconButton svgSrc={<GitHubIcon />} />,
          "GitHub Repository",
          undefined
        )}
        {renderListItemLink(
          FIGMA_LINK,
          <IconButton svgSrc={<FigmaIcon />} />,
          "Figma (Wireframes)",
          undefined
        )}
        <Divider className={clsx(classes.divider, classes.dividerPadding)} />
        <DarkModeToggle type="listItem" />
        {renderListItemLink(
          TMDB_LINK,
          <IconButton svgSrc={<TMDbIcon />} />,
          "Made with y540 and TMDb",
          "by jjdcabasolo"
        )}
      </List>
    </>
  );
};

export default SidebarContent;

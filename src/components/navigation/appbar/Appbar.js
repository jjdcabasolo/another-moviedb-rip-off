import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { usePath } from "../../../hooks";

import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Grid, Toolbar, Typography } from "@material-ui/core";
import IconButton from "../../custom/composed/IconButton";
import SearchIcon from "../../../assets/icons/search";
import BackIcon from "../../../assets/icons/back";

import AppBar from "../../custom/base/AppBar";
import AppbarMenu from "./AppbarMenu";
import GradientBackground from "../../common/GradientBackground";
import Helmet from "../Helmet";
import ItemCategory from "../../common/item/ItemCategory";
import ItemList from "../../common/item/ItemList";
import ItemSearchResults from "../../common/item/ItemSearchResults";

import { sidebarActions } from "../../../reducers/ducks";

import { scrollToID } from "../../../utils/functions";

import { routes } from "../../../routes/config";

const useStyles = makeStyles((theme) => ({
  appbar: {
    borderBottom: `1px solid ${theme.palette.colorScheme.divider}`,
  },
  toolbar: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  bottomNavigation: {
    backgroundColor: theme.palette.colorScheme.background,
    borderTop: `1px solid ${theme.palette.colorScheme.divider}`,
    bottom: 0,
    height: theme.spacing(9),
    padding: theme.spacing(1, 8),
    position: "fixed",
    width: theme.browserSize.width,
  },
  titlebar: {
    flexGrow: 1,
    margin: theme.spacing(0, 1),
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(15),
  },
  containerItemSelected: {
    marginTop: -theme.spacing(12),
  },
  category: {
    borderTop: `1px solid ${theme.palette.colorScheme.divider}`,
    backgroundColor: theme.palette.colorScheme.background,
    bottom: theme.spacing(9),
    position: "fixed",
    width: "100%",
  },
  detailContainer: {
    overflowY: "auto",
    overflowX: "hidden",
    width: "100%",
  },
}));

const Appbar = ({ children }) => {
  const classes = useStyles();

  const appbarContainerRef = useRef(null);
  const itemListContainerRef = useRef(null);

  const history = useHistory();
  const [activeTab, idPath] = usePath();
  const isMovie = activeTab === "movies";

  const isMovieLoading = useSelector((state) => state.movies.isMovieLoading);
  const isTVShowLoading = useSelector((state) => state.tvShows.isTVShowLoading);
  const movie = useSelector((state) => state.movies.movie);
  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const dispatch = useDispatch();

  const [activeBottomTab, setActiveBottomTab] = useState(isMovie ? 1 : 2);

  const { title, original_title: originalTitle, poster_path: movieBG } = movie;
  const { name, original_name: originalName, poster_path: tvShowBG } = tvShow;

  const isMovieEmpty =
    Object.keys(movie).length === 0 && movie.constructor === Object;
  const isTVShowEmpty =
    Object.keys(tvShow).length === 0 && tvShow.constructor === Object;

  const isItemSelected = typeof idPath !== "undefined" && idPath.length > 0;
  const isTabActive = typeof activeTab !== "undefined" && activeTab;
  const isItemEmpty = isMovie ? isMovieEmpty : isTVShowEmpty;
  const isItemLoading = isMovie ? isMovieLoading : isTVShowLoading;

  const goBack = () => history.goBack();

  const handleBottomNavigationClick = (index) => {
    const tab = index === 1 ? "movies" : "tvshows";
    scrollToID("scroll-to-top-anchor", tab === activeTab);
    setActiveBottomTab(index);
    dispatch(sidebarActions.setActiveTab(tab));
    history.push(tab);
  };

  const handleSearchClick = () => {
    history.push(`/${activeTab}/search`);
  };

  const renderToolbarContents = () => {
    const displayTitle = isMovie
      ? title || originalTitle
      : name || originalName;
    const titleComponent = isItemLoading ? (
      <div className={classes.titlebar} />
    ) : (
      <Typography
        component="h1"
        variant="h6"
        noWrap
        className={classes.titlebar}
      >
        {displayTitle}
      </Typography>
    );
    const searchComponent = (
      <IconButton
        svgSrc={<SearchIcon />}
        handleOnClick={handleSearchClick}
        tooltipTitle="Search"
      />
    );

    if (isItemSelected) {
      return (
        <>
          <IconButton
            svgSrc={<BackIcon />}
            handleOnClick={goBack}
            tooltipTitle="Go back"
          />
          {titleComponent}
          {searchComponent}
          <AppbarMenu />
        </>
      );
    }

    return (
      <>
        <Typography component="h1" variant="h6" className={classes.titlebar}>
          ATMDbRo
        </Typography>
        {searchComponent}
        <AppbarMenu />
      </>
    );
  };

  const renderList = () => {
    if (isTabActive) {
      if (isItemSelected) return children;
      return <ItemList />;
    }

    return children;
  };

  const renderTopContents = () => {
    if (isTabActive) {
      return (
        <GradientBackground
          image={isMovie ? movieBG : tvShowBG}
          isItemSelected={isItemSelected}
          isLoading={isItemEmpty}
          isVisible={isItemSelected && !isItemLoading}
        />
      );
    }

    return null;
  };

  return (
    <>
      <Helmet />
      <CssBaseline />

      <AppBar color="inherit" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>{renderToolbarContents()}</Toolbar>
      </AppBar>

      <div
        className={clsx({
          [classes.detailContainer]: isItemSelected && isTabActive,
        })}
        ref={appbarContainerRef}
      >
        <div id="scroll-to-top-anchor" />
        {renderTopContents()}
        <div
          className={clsx(classes.container, {
            [classes.containerItemSelected]: isItemSelected,
          })}
          ref={itemListContainerRef}
        >
          {renderList()}
        </div>
      </div>

      {!isItemSelected && (
        <>
          <div className={classes.category}>
            <ItemCategory type="appbarHorizontalList" />
          </div>
          <div className={classes.bottomNavigation}>
            <Grid container justify="space-around" alignItems="center">
              {routes.map(
                (element, index) =>
                  index !== 0 && (
                    <Grid item key={`appbar-bottom-nav-${element.title}`}>
                      <IconButton
                        svgSrc={element.svg}
                        handleOnClick={() => handleBottomNavigationClick(index)}
                        tooltipTitle={element.title}
                        isActive={activeBottomTab === index}
                      />
                    </Grid>
                  )
              )}
            </Grid>
          </div>
        </>
      )}

      <ItemSearchResults />
    </>
  );
};

Appbar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Appbar;

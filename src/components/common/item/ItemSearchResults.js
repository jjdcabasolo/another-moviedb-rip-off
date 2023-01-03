import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { usePath } from "../../../hooks";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import IconButton from "../../custom/composed/IconButton";
import BackIcon from "../../../assets/icons/back";

import ComponentLoader from "../ComponentLoader";
import ItemCard from "./ItemCard";
import ItemLazyLoad from "../../common/item/ItemLazyLoad";
import ItemSearch from "./ItemSearch";

import { sidebarActions } from "../../../reducers/ducks";

const useStyles = makeStyles((theme) => ({
  drawerOpenContainer: {
    padding: theme.spacing(4),
  },
  drawerClosedContainer: {
    padding: theme.spacing(1),
    overflowY: "auto",
  },
  noResults: {
    padding: theme.spacing(1),
  },
  paper: {
    backgroundColor: theme.palette.colorScheme.background,
  },
  dialogTitle: {
    padding: theme.spacing(1, 2),
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  itemSearchContainer: {
    flexGrow: 1,
  },
  loader: {
    marginTop: theme.spacing(2),
  },
}));

const ItemSearchResults = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const isBigTablet = useMediaQuery(theme.breakpoints.only("md"));
  const isSmallTablet = useMediaQuery(theme.breakpoints.only("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const classes = useStyles();

  // const isSearchOpen = useSelector((state) => state.sidebar.isSearchOpen);
  const isMovieSearchLoading = useSelector(
    (state) => state.movies.isSearchLoading
  );
  const isTVShowSearchLoading = useSelector(
    (state) => state.tvShows.isSearchLoading
  );
  const itemDrawerOpen = useSelector((state) => state.sidebar.itemDrawerOpen);
  const movieSearchResults = useSelector((state) => state.movies.searchResults);
  const searchQuery = useSelector((state) => state.sidebar.searchQuery);
  const tvShowSearchResults = useSelector(
    (state) => state.tvShows.searchResults
  );
  const dispatch = useDispatch();

  const history = useHistory();
  const [activeTab, idPath] = usePath();

  const [content, setContent] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isMovie = activeTab === "movies";

  useEffect(() => {
    setIsDialogOpen(idPath === "search");
  }, [idPath]);

  useEffect(() => {
    const searchResults = isMovie ? movieSearchResults : tvShowSearchResults;

    setContent(searchResults);
  }, [activeTab, movieSearchResults, tvShowSearchResults, isMovie]);

  const handleClose = () => history.goBack();

  const handleDrawerToggle = () => {
    history.push(`/${activeTab}/search/${searchQuery}`);
    dispatch(sidebarActions.setItemDrawer(false));
  };

  const isSearchLoading = isMovie
    ? isMovieSearchLoading
    : isTVShowSearchLoading;

  let itemCardCol = 12; // 1 card per row

  if (isBigTablet) itemCardCol = 4; // 3 cards per row
  if (isSmallTablet) itemCardCol = 6; // 2 cards per row
  if (isDesktop) itemCardCol = 2; // 5 cards per row
  if (!itemDrawerOpen) itemCardCol = 12; // 1 card per row

  let results = null;

  if (searchQuery.length > 0) {
    if (content.length > 0) {
      results = (
        <Grid container item justify="center">
          <ItemLazyLoad
            contents={content}
            node={<ItemCard />}
            otherProps={{
              col: itemCardCol,
              drawerOpen: itemDrawerOpen,
              handleDrawerToggle,
              type: activeTab,
            }}
            type="itemCardSearchResults"
          />
        </Grid>
      );
    } else {
      if (isSearchLoading) {
        results = (
          <div className={classes.loader}>
            <ComponentLoader />
          </div>
        );
      } else {
        results = (
          <Typography className={classes.noResults}>
            No resuls found.
          </Typography>
        );
      }
    }
  }

  if (isMobile) {
    return (
      <Dialog
        classes={{ paper: classes.paper }}
        fullScreen
        onClose={handleClose}
        open={isDialogOpen}
      >
        <DialogTitle
          id="item-search-results"
          onClose={handleClose}
          className={classes.dialogTitle}
        >
          <Grid container spacing={2} wrap="nowrap">
            <Grid item>
              <IconButton
                svgSrc={<BackIcon />}
                handleOnClick={handleClose}
                tooltipTitle="Go back"
              />
            </Grid>
            <Grid item className={classes.itemSearchContainer}>
              <ItemSearch isPermanentlyOpen />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent className={classes.dialogContent} dividers>
          {results}
        </DialogContent>
      </Dialog>
    );
  }

  return itemDrawerOpen ? (
    <Container className={classes.drawerOpenContainer}>{results}</Container>
  ) : (
    <div className={classes.drawerClosedContainer}>{results}</div>
  );
};

export default ItemSearchResults;

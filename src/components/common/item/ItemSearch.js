import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { usePath } from "../../../hooks";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { InputBase, useMediaQuery } from "@material-ui/core";
import IconButton from "../../custom/composed/IconButton";
import SearchIcon from "../../../assets/icons/search";
import CloseIcon from "../../../assets/icons/close";

import {
  moviesActions,
  sidebarActions,
  snackbarActions,
  tvShowsActions,
} from "../../../reducers/ducks";

import { debounceEvent } from "../../../utils/functions";

import { searchMovie, searchTVShow } from "../../../api";

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    marginRight: theme.spacing(2),
  },
  input: {
    marginRight: theme.spacing(2),
  },
}));

const ItemSearch = ({ isPermanentlyOpen = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const classes = useStyles();

  const isSearchOpen = useSelector((state) => state.sidebar.isSearchOpen);
  const movieSearchResults = useSelector((state) => state.movies.searchResults);
  const searchQuery = useSelector((state) => state.sidebar.searchQuery);
  const tvShowSearchResults = useSelector(
    (state) => state.tvShows.searchResults
  );
  const dispatch = useDispatch();

  const inputBaseRef = useRef(null);

  const history = useHistory();

  const [query, setQuery] = useState("");
  const [activeTab, categoryPath, searchQueryOnPath] = usePath();

  const isMovie = activeTab === "movies";

  const fetchSearchResults = useCallback(
    (q) => {
      const parmesanio = process.env.REACT_APP_TMDB_PARMESANIO;

      if (isMovie) {
        dispatch(moviesActions.setSearchLoading(true));
        searchMovie(
          parmesanio,
          q,
          (response) => {
            dispatch(moviesActions.setSearchResults(response));
          },
          (error) => {
            dispatch(
              snackbarActions.showSnackbar(
                `Error on searching the movie: ${error}`,
                "error"
              )
            );
          },
          () => {
            dispatch(moviesActions.setSearchLoading(false));
          }
        );
      } else {
        dispatch(tvShowsActions.setSearchLoading(true));
        searchTVShow(
          parmesanio,
          q,
          (response) => {
            dispatch(tvShowsActions.setSearchResults(response));
          },
          (error) => {
            dispatch(
              snackbarActions.showSnackbar(
                `Error on searching the TV show: ${error}`,
                "error"
              )
            );
          },
          () => {
            dispatch(tvShowsActions.setSearchLoading(false));
          }
        );
      }
    },
    [isMovie, dispatch]
  );

  // automatic search on path change
  useEffect(() => {
    if (categoryPath === "search") {
      if (searchQueryOnPath && searchQueryOnPath.length > 0) {
        dispatch(sidebarActions.setSearchQuery(searchQueryOnPath));
        setQuery(searchQueryOnPath);
        fetchSearchResults(searchQueryOnPath);
      } else {
        dispatch(sidebarActions.setSearchQuery(""));
        setQuery("");
      }
    }
  }, [searchQueryOnPath, dispatch, categoryPath, fetchSearchResults]);

  // toggles search when on right path
  useEffect(() => {
    dispatch(sidebarActions.setSearch(categoryPath === "search"));
  }, [categoryPath, dispatch]);

  // automatically opens the drawer open prop set
  useEffect(() => {
    if (isPermanentlyOpen) {
      dispatch(sidebarActions.setSearch(isPermanentlyOpen));
    }
  }, [isPermanentlyOpen, dispatch]);

  const debouncedQuery = useCallback(
    debounceEvent((q) => {
      handleSetSearchQuery(q);

      if (q.length <= 0) {
        dispatch(sidebarActions.setSearchQuery(""));
        return;
      }

      fetchSearchResults(q);
    }, 500),
    [isMovie, activeTab, searchQueryOnPath]
  );

  const handleSetSearch = (isOpen) => {
    // works as clear search on mobile only
    if (isMobile) {
      if (!isOpen) {
        setQuery("");
        dispatch(sidebarActions.setSearchQuery(""));

        if (inputBaseRef.current) {
          inputBaseRef.current.focus();
        }
        return;
      }
    }

    if (isOpen) {
      history.push(`/${activeTab}/search`);
      setQuery("");
      dispatch(sidebarActions.setSearchQuery(""));
    } else {
      if (categoryPath && categoryPath !== 0 && categoryPath === "search") {
        history.goBack();
      }
      if (isMovie) {
        dispatch(moviesActions.setSearchResults([]));
      } else {
        dispatch(tvShowsActions.setSearchResults([]));
      }
    }

    if (isSearchOpen !== isOpen) {
      dispatch(sidebarActions.setSearch(isOpen));
    }
  };

  const handleSetSearchQuery = (newQuery) => {
    if (searchQuery !== newQuery) {
      dispatch(sidebarActions.setSearchQuery(newQuery));
    }
  };

  const handleInputChange = ({ target }) => {
    const { value } = target;

    const searchResults = isMovie ? movieSearchResults : tvShowSearchResults;
    if (searchResults.length > 0) {
      dispatch(moviesActions.setSearchResults([]));
      dispatch(tvShowsActions.setSearchResults([]));
    }

    setQuery(value);
    debouncedQuery(value);
  };

  return isSearchOpen || isPermanentlyOpen ? (
    <InputBase
      autoFocus
      classes={{ input: classes.input }}
      endAdornment={
        <IconButton
          svgSrc={<CloseIcon />}
          handleOnClick={() => handleSetSearch(false)}
          tooltipTitle="Close search"
        />
      }
      fullWidth
      inputRef={inputBaseRef}
      onChange={handleInputChange}
      placeholder={`Search ${isMovie ? "Movies" : "TV Shows"}`}
      value={query}
    />
  ) : (
    <IconButton
      svgSrc={<SearchIcon />}
      handleOnClick={() => handleSetSearch(true)}
      tooltipTitle="Search"
    />
  );
};

ItemSearch.defaultProps = {
  isPermanentlyOpen: false,
};

ItemSearch.propTypes = {
  isPermanentlyOpen: PropTypes.bool,
};

export default ItemSearch;

import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { usePath } from '../../../hooks';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  IconButton,
  InputBase,
  Tooltip,
  useMediaQuery,
} from '@material-ui/core';
import {
  CloseTwoTone,
  SearchTwoTone,
} from '@material-ui/icons';

import {
  moviesActions,
  sidebarActions,
  snackbarActions,
  tvShowsActions,
} from '../../../reducers/ducks';

import { debounceEvent, decryptKey } from '../../../utils/functions';

import { searchMovie, searchTVShow } from '../../../api';

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    marginRight: theme.spacing(2),
  },
}));

const ItemSearch = ({
  isPermanentlyOpen = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const isSearchOpen = useSelector((state) => state.sidebar.isSearchOpen);
  const itemDrawerOpen = useSelector((state) => state.sidebar.itemDrawerOpen);
  const searchQuery = useSelector((state) => state.sidebar.searchQuery);
  const dispatch = useDispatch();

  const inputBaseRef = useRef(null);

  const history = useHistory();
  
  const [query, setQuery] = useState('');
  const [activeTab, categoryPath, searchQueryOnPath] = usePath();

  const isMovie = activeTab === 'movies';

  const fetchSearchResults = useCallback((q) => {
    if (isMovie) {
      searchMovie(decryptKey(), q, (response) => {
        dispatch(moviesActions.setSearchResults(response));
      }, (error) => {
        dispatch(snackbarActions.showSnackbar(`Error on searching the movie: ${error}`, 'error'));
      });
    }
    else {
      searchTVShow(decryptKey(), q, (response) => {
        dispatch(tvShowsActions.setSearchResults(response));
      }, (error) => {
        dispatch(snackbarActions.showSnackbar(`Error on searching the TV show: ${error}`, 'error'));
      });
    }
  }, [isMovie, dispatch]);

  useEffect(() => {
    if (searchQueryOnPath && searchQueryOnPath.length > 0) {
      setQuery(searchQueryOnPath);
      dispatch(sidebarActions.setSearchQuery(searchQueryOnPath));
      fetchSearchResults(searchQueryOnPath);
    } else {
      setQuery('');
      dispatch(sidebarActions.setSearchQuery(''));
    }
  }, [searchQueryOnPath, dispatch, fetchSearchResults]);

  useEffect(() => {
    if (categoryPath === 'search') {
      dispatch(sidebarActions.setSearch(true));
    }
  }, [categoryPath, dispatch]);

  useEffect(() => {
    if (searchQuery.length > 0) setQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (isPermanentlyOpen) {
      dispatch(sidebarActions.setSearch(isPermanentlyOpen));
    }
  }, [isPermanentlyOpen, dispatch]);

  const debouncedQuery = useCallback(
    debounceEvent((q) => {
      handleSetSearchQuery(q);

      if (q.length <= 0) return;

      history.push(`/${activeTab}/search/${q}`);
      fetchSearchResults(q);
    }, 500), [isMovie, activeTab]);

  const handleSetSearch = (isOpen) => {
    if (isMobile) {
      if (!isOpen) {
        setQuery('');
        dispatch(sidebarActions.setSearchQuery(''));

        if (inputBaseRef.current) {
          inputBaseRef.current.focus();
        }
        return;
      }
    }

    if (isOpen) {
      history.push(`/${activeTab}/search`);
      setQuery('');
      dispatch(sidebarActions.setSearchQuery(''));
    }
    else {
      if (categoryPath && categoryPath !== 0 && categoryPath === 'search') {
        history.goBack();
      }
      if (isMovie) {
        dispatch(moviesActions.setSearchResults([]));
      }
      else {
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

    setQuery(value);
    debouncedQuery(value);
  };

  return isSearchOpen || isPermanentlyOpen
    ? (
      <InputBase
        autoFocus
        className={classes.input}
        endAdornment={(
          <Tooltip title="Close search">
            <IconButton
              onClick={() => handleSetSearch(false)}
              edge={isMobile || !itemDrawerOpen ? 'end' : false}
            >
              <CloseTwoTone />
            </IconButton>
          </Tooltip>
        )}
        fullWidth
        inputRef={inputBaseRef}
        onChange={handleInputChange}
        placeholder={`Search ${isMovie ? 'Movies' : 'TV Shows'}`}
        value={query}
      />
    )
    : (
      <Tooltip title="Search">
        <IconButton onClick={() => handleSetSearch(true)}>
          <SearchTwoTone />
        </IconButton>
      </Tooltip>
    );
};

ItemSearch.defaultProps = {
  isPermanentlyOpen: false,
};

ItemSearch.propTypes = {
  isPermanentlyOpen: PropTypes.bool,
};

export default ItemSearch;

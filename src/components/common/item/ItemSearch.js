import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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

import {
  debounceEvent,
  decryptKey,
  evaluateLocation,
} from '../../../utils/functions';

import { searchMovie, searchTVShow } from '../../../api';

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    marginRight: theme.spacing(2),
  },
}));

const ItemSearch = ({
  isPermanentlyOpen = false,
  withSearchIcon = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const isSearchOpen = useSelector((state) => state.sidebar.isSearchOpen);
  const itemDrawerOpen = useSelector((state) => state.sidebar.itemDrawerOpen);
  const searchQuery = useSelector((state) => state.sidebar.searchQuery);
  const dispatch = useDispatch();

  const history = useHistory();

  const [query, setQuery] = useState('');

  const location = useLocation();
  const { movieId, tvShowId } = evaluateLocation(location);

  const isMovie = activeTab === 'movies';
  const searchPath = isMovie ? movieId : tvShowId;

  useEffect(() => {
    if (searchPath === 'search') {
      dispatch(sidebarActions.setSearch(true));
    }
  }, [movieId, tvShowId, searchPath, dispatch]);

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

      if (q.length > 0) return;

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
    }, 500), [isMovie, activeTab]);

  const handleSetSearch = (isOpen) => {
    if (isOpen) {
      history.push(`/${activeTab}/search`);
      setQuery('');
      dispatch(sidebarActions.setSearchQuery(''));
    }
    else {
      if (searchPath && searchPath !== 0 && searchPath === 'search') {
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
        onChange={handleInputChange}
        placeholder={`Search ${isMovie ? 'Movies' : 'TV Shows'}`}
        startAdornment={withSearchIcon && (
          <SearchTwoTone className={classes.searchIcon} />
        )}
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
  withSearchIcon: true,
};

ItemSearch.propTypes = {
  isPermanentlyOpen: PropTypes.bool,
  withSearchIcon: PropTypes.bool,
};

export default ItemSearch;

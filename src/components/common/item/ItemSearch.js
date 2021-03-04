import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

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

  const [query, setQuery] = useState('');

  const isMovie = activeTab === 'movies';

  const debouncedQuery = useCallback(
    debounceEvent((q) => {
      handleSetSearchQuery(q);
      if (isMovie) {
        searchMovie(decryptKey(), q, (response) => {
          dispatch(moviesActions.setSearchResults(response));
        }, (error) => {
          console.log('searchMovie', error);
        });
      }
      else {
        searchTVShow(decryptKey(), q, (response) => {
          dispatch(tvShowsActions.setSearchResults(response));
        }, (error) => {
          console.log('searchTVShow', error);
        });
      }
    }, 500), [isMovie, activeTab]);

  const handleSetSearch = (isOpen) => {
    if (isOpen) {
      setQuery('');
      dispatch(sidebarActions.setSearchQuery(''));
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

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    debouncedQuery(e.target.value);
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
        startAdornment={withSearchIcon && (<SearchTwoTone className={classes.searchIcon} />)}
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

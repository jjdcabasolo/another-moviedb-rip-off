import React, { useCallback, useState } from 'react';
// import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  IconButton,
  InputBase,
  Tooltip,
  useMediaQuery,
} from '@material-ui/core';
import {
  DeleteTwoTone,
  CloseTwoTone,
  SearchTwoTone,
} from '@material-ui/icons';

import { sidebarActions } from '../../../reducers/ducks';

import { debounceEvent } from '../../../utils/functions';

const useStyles = makeStyles((theme) => ({
  input: {
    // marginLeft: theme.spacing(2),
  },
}));

const ItemSearch = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();
  
  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const searchQuery = useSelector((state) => state.sidebar.searchQuery);
  const isSearchOpen = useSelector((state) => state.sidebar.isSearchOpen);
  const dispatch = useDispatch();
  
  const [query, setQuery] = useState('');
  
  const isMovie = activeTab === 'movies';

  const debouncedQuery = useCallback(
    debounceEvent((q) => {
      handleSetSearchQuery(q);
    }, 500),
  []);

  const handleSetSearch = (isOpen) => {
    if (isSearchOpen !== isOpen) {
      dispatch(sidebarActions.setSearch(isOpen));
    }
  };

  const handleSetSearchQuery = (newQuery) => {
    if (newQuery === '') {
      setQuery(newQuery);
      dispatch(sidebarActions.setSearchQuery(newQuery));
    }

    if (searchQuery !== newQuery) {
      dispatch(sidebarActions.setSearchQuery(newQuery));
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    debouncedQuery(e.target.value);
  };

  return isSearchOpen
    ? (
      <InputBase
        autoFocus
        className={classes.input}
        endAdornment={(
          <>
            <Tooltip title="Clear search">
              <IconButton
                onClick={() => handleSetSearchQuery('')}
              >
                <DeleteTwoTone />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close search">
              <IconButton
                onClick={() => handleSetSearch(false)}
                edge={isMobile ? 'end' : false}
              >
                <CloseTwoTone />
              </IconButton>
            </Tooltip>
          </>
        )}
        fullWidth
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

ItemSearch.propTypes = {

};

export default ItemSearch;

import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  InputBase,
  Tooltip,
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
    marginLeft: theme.spacing(2),
  },
}));

const ItemSearch = () => {
  const classes = useStyles();

  const searchQuery = useSelector((state) => state.sidebar.searchQuery);
  const isSearchOpen = useSelector((state) => state.sidebar.isSearchOpen);
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');

  const handleSetSearch = (isOpen) => {
    if (isSearchOpen !== isOpen) {
      dispatch(sidebarActions.setSearch(isOpen));
    }
  };

  const handleSetSearchQuery = (query) => {
    if (searchQuery !== query) {
      dispatch(sidebarActions.setSearchQuery(query));
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    debounceEvent(() => {
      console.log('debounce event callbackerz()');
      handleSetSearchQuery(e.target.value);
    }, 500);
  };

  return isSearchOpen
    ? (
      <InputBase
        value={query}
        onChange={handleInputChange}
        className={classes.input}
        placeholder="Search"
        endAdornment={(
          <>
            <Tooltip title="Clear search">
              <IconButton onClick={() => handleSetSearchQuery('')}>
                <DeleteTwoTone />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close search">
              <IconButton onClick={() => handleSetSearch(false)}>
                <CloseTwoTone />
              </IconButton>
            </Tooltip>
          </>
        )}
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

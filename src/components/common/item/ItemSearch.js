import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// import { useSelector } from 'react-redux';

// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  InputBase,
  Tooltip,
} from '@material-ui/core';
import {
  SearchTwoTone,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(0, 1),
  },
}));

const ItemSearch = () => {
  const classes = useStyles();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleToggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return isSearchOpen
    ? (
      <InputBase
        className={classes.input}
        placeholder="Search"
      />
    )
    : (
      <Tooltip title="Search">
        <IconButton onClick={handleToggleSearch}>
          <SearchTwoTone />
        </IconButton>
      </Tooltip>
    );
};

ItemSearch.propTypes = {

};

export default ItemSearch;

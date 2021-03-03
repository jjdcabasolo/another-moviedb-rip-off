import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Grid,
  IconButton,
  SvgIcon,
  Tooltip,
} from '@material-ui/core';
import { LinkTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({

}));

const ItemSearchResults = ({

}) => {
  const classes = useStyles();

  const darkMode = useSelector((state) => state.sidebar.darkMode);
  const dispatch = useDispatch();

  return (
    
  );
};

ItemSearchResults.defaultProps = {

};

ItemSearchResults.propTypes = {

};

export default ItemSearchResults;

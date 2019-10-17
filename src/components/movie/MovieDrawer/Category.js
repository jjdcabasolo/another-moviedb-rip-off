import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Chip,
  Tooltip,
  IconButton,
  Popover,
  Typography,
} from '@material-ui/core';
import { CategoryTwoTone } from '@material-ui/icons';

import ResponsiveComponent from '../../common/ResponsiveComponent';

import { moviesActions } from '../../../reducers/ducks';

import { MOVIE_DRAWER_CATEGORY_CHIPS } from '../../../constants';

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  popover: {
    padding: theme.spacing(2),
  },
}));

const Category = ({ movieDrawerOpen }) => {
  const classes = useStyles();

  const category = useSelector(state => state.movies.category);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = event => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleChipClick = category => dispatch(moviesActions.setCategory(category));

  const renderCategoryChips = () => (
    MOVIE_DRAWER_CATEGORY_CHIPS.map(e => (
      <Chip
        variant="outlined"
        label={e.label}
        key={e.label}
        color={e.isActive(category) ? 'secondary' : 'default'}
        className={classes.chip}
        onClick={() => handleChipClick(e.identifier)}
      />
    ))
  );

  const collapsedCategoryChips = () => (
    <>
      <Tooltip title="Set category">
        <IconButton aria-label="setCategory" onClick={handleClick}>
          <CategoryTwoTone />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        classes={{
          paper: classes.popover
        }}
      >
        <Typography variant="body2" gutterBottom>Set category:</Typography>
        {renderCategoryChips()}
      </Popover>
    </>
  );

  return (
    <>
      { movieDrawerOpen
        ? (
          <ResponsiveComponent
              mobileComponent={collapsedCategoryChips()}
              tabletComponent={renderCategoryChips()}
              desktopComponent={renderCategoryChips()}
            />
          )
        : collapsedCategoryChips()
      }
    </>
  );
};

export default Category;

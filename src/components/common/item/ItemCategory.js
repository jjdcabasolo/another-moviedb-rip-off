import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Chip,
  IconButton,
  Popover,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { CategoryTwoTone } from '@material-ui/icons';

import ResponsiveComponent from '../../../utils/components/ResponsiveComponent';

import { moviesActions, tvShowsActions } from '../../../reducers/ducks';

import {
  MOVIE_DRAWER_CATEGORY_CHIPS,
  TV_SHOW_DRAWER_CATEGORY_CHIPS,
} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  popover: {
    padding: theme.spacing(2),
    maxWidth: theme.spacing(25),
  },
  topCategories: {
    display: 'flex',
    margin: theme.spacing(0, 1, 1, 1),
    overflowX: 'auto',
    'scrollbar-width': 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  topCategoriesReplacement: {
    margin: 0,
  },
  category: {
    fontWeight: theme.typography.h6.fontWeight,
  },
}));

const ItemCategory = ({ isList, isDrawer, replacement }) => {
  const theme = useTheme();
  const isTabletBelow = useMediaQuery(theme.breakpoints.down('lg'));
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const movieCategory = useSelector((state) => state.movies.category);
  const tvShowCategory = useSelector((state) => state.tvShows.category);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const isMovie = activeTab === 'movies';
  const isTVShow = activeTab === 'tvshows';
  const categoryChips = isMovie ? MOVIE_DRAWER_CATEGORY_CHIPS : TV_SHOW_DRAWER_CATEGORY_CHIPS;
  const category = isMovie ? movieCategory : tvShowCategory;

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleChipClick = (itemCategory) => {
    if (isMovie) dispatch(moviesActions.setCategory(itemCategory));
    if (isTVShow) dispatch(tvShowsActions.setCategory(itemCategory));
  };

  const renderCategoryChips = () => (
    categoryChips.map((e) => (
      <Chip
        className={classes.chip}
        color={e.isActive(category) ? 'primary' : 'default'}
        key={e.label}
        label={e.label}
        onClick={() => handleChipClick(e.identifier)}
        variant={e.isActive(category) ? 'default' : 'outlined'}
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
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        classes={{ paper: classes.popover }}
        id={id}
        onClose={handleClose}
        open={open}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Typography variant="body1" className={classes.category} gutterBottom>Set category:</Typography>
        {renderCategoryChips()}
      </Popover>
    </>
  );

  if (isList) {
    return (
      <div
        className={clsx(
          classes.topCategories,
          { [classes.topCategoriesReplacement]: replacement },
        )}
      >
        {renderCategoryChips()}
      </div>
    );
  }

  if (isTabletBelow && !isDrawer) return collapsedCategoryChips();

  if (isDrawer) {
    return (
      <ResponsiveComponent
        desktopComponent={renderCategoryChips()}
        mobileComponent={collapsedCategoryChips()}
        tabletComponent={renderCategoryChips()}
      />
    );
  }

  return collapsedCategoryChips();
};

ItemCategory.propTypes = {
  isList: PropTypes.bool.isRequired,
  isDrawer: PropTypes.bool.isRequired,
  replacement: PropTypes.bool.isRequired,
};

export default ItemCategory;

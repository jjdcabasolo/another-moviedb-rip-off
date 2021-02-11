import React, { useState, useRef } from 'react';
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
import {
  CategoryTwoTone,
  ArrowDropUp,
  ArrowDropDown,
} from '@material-ui/icons';

import { scrollToID, toCamelCase } from '../../../utils/functions';

import { moviesActions, tvShowsActions } from '../../../reducers/ducks';

import {
  MOVIE_DRAWER_CATEGORY_CHIPS,
  TV_SHOW_DRAWER_CATEGORY_CHIPS,
} from '../../../constants';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
    '&:first-child': {
      marginLeft: theme.spacing(1),
    },
    '&:last-child': {
      marginRight: theme.spacing(1),
    },
  },
  popover: {
    padding: theme.spacing(2),
    maxWidth: theme.spacing(25),
  },
  topCategories: {
    display: 'flex',
    margin: theme.spacing(1, 0),
    overflowX: 'auto',
    'scrollbar-width': 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  category: {
    fontWeight: theme.typography.h6.fontWeight,
  },
  lastEntry: {
    padding: theme.spacing(0.25),
  },
  chipDropdown: {
    margin: theme.spacing(1),
  },
}));

const ItemCategory = ({ type }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const movieCategory = useSelector((state) => state.movies.category);
  const tvShowCategory = useSelector((state) => state.tvShows.category);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const chipDropdownRef = useRef(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const isMovie = activeTab === 'movies';
  const isTVShow = activeTab === 'tvshows';
  const categoryChips = isMovie
    ? MOVIE_DRAWER_CATEGORY_CHIPS
    : TV_SHOW_DRAWER_CATEGORY_CHIPS;
  const category = isMovie ? movieCategory : tvShowCategory;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget || event.current);
  };

  const handleClose = () => setAnchorEl(null);

  const handleChipClick = (itemCategory) => {
    if (isMobile) scrollToID('scroll-to-top-anchor', true);
    if (isMovie) dispatch(moviesActions.setCategory(itemCategory));
    if (isTVShow) dispatch(tvShowsActions.setCategory(itemCategory));
  };

  const renderCategoryChips = () => (
    categoryChips.map((e) => (
      <Chip
        className={classes.chip}
        color={e.isActive(category) ? 'primary' : 'default'}
        key={`item-category-chip-${e.label}`}
        label={e.label}
        onClick={() => handleChipClick(e.identifier)}
        variant={e.isActive(category) ? 'default' : 'outlined'}
      />
    ))
  );

  const renderPopover = () => (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      classes={{ paper: classes.popover }}
      id={id}
      onClose={handleClose}
      open={open}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      <Typography
        className={classes.category}
        gutterBottom
        variant="body1"
      >
        Set category:
      </Typography>
      {renderCategoryChips()}
    </Popover>
  );

  switch (type) {
    case 'iconButton':
      return (
        <>
          <Tooltip title="Set category">
            <IconButton aria-label="setCategory" onClick={handleClick}>
              <CategoryTwoTone />
            </IconButton>
          </Tooltip>
          {renderPopover()}
        </>
      );
    case 'appbarHorizontalList':
      return (
        <div className={clsx(classes.topCategories)}>
          {renderCategoryChips()}
          <div className={classes.lastEntry} />
        </div>
      );
    case 'chipDropdown':
      return (
        <>
          <Chip
            className={classes.chipDropdown}
            color="default"
            deleteIcon={open ? <ArrowDropUp /> : <ArrowDropDown />}
            label={toCamelCase(isMovie ? movieCategory : tvShowCategory)}
            onClick={handleClick}
            onDelete={() => handleClick(chipDropdownRef)}
            ref={chipDropdownRef}
            variant="outlined"
          />
          {renderPopover()}
        </>
      );
    default:
      return renderCategoryChips();
  }
};

ItemCategory.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ItemCategory;

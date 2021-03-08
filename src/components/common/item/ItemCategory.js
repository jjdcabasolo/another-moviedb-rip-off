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
import { ArrowDropDown, SearchTwoTone } from '@material-ui/icons';

import { scrollToID } from '../../../utils/functions';

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
  chipLabel: {
    paddingLeft: 0,
    paddingRight: 9,
  },
}));

const ItemCategory = ({
  iconSize = 'default',
  type,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
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
  const categoryChips = isMovie
    ? MOVIE_DRAWER_CATEGORY_CHIPS
    : TV_SHOW_DRAWER_CATEGORY_CHIPS;
  const category = isMovie ? movieCategory : tvShowCategory;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget || event.current);
  };

  const handleClose = () => setAnchorEl(null);

  const handleChipClick = (itemCategory) => {
    if (isMobile) scrollToID('scroll-to-top-anchor', false);
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
      anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
      classes={{ paper: classes.popover }}
      id={id}
      onClose={handleClose}
      open={open}
      transformOrigin={{ vertical: 'center', horizontal: 'left' }}
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
              <ArrowDropDown fontSize={iconSize} />
            </IconButton>
          </Tooltip>
          {renderPopover()}
        </>
      );
    case 'appbarHorizontalList':
      return (
        <div className={clsx(classes.topCategories)}>
          <Chip
            className={classes.chip}
            classes={{ label: classes.chipLabel }}
            color="default"
            icon={<SearchTwoTone />}
            key="item-category-chip-search"
            onClick={() => { }}
            variant="outlined"
          />
          {renderCategoryChips()}
          <div className={classes.lastEntry} />
        </div>
      );
    default:
      return renderCategoryChips();
  }
};

ItemCategory.defaultProps = {
  iconSize: 'default',
};

ItemCategory.propTypes = {
  iconSize: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemCategory;

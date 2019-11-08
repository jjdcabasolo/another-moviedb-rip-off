import React, { useState } from 'react';

import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Chip,
  Tooltip,
  IconButton,
  Popover,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { CategoryTwoTone } from '@material-ui/icons';

import ResponsiveComponent from '../../utils/components/ResponsiveComponent';

import { moviesActions } from '../../reducers/ducks';

import { MOVIE_DRAWER_CATEGORY_CHIPS } from '../../constants';

const useStyles = makeStyles(theme => ({
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

const MovieCategory = ({ isList, isDrawer, replacement }) => {
  const theme = useTheme();
  const isTabletBelow = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const category = useSelector(state => state.movies.category);
  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);
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
        variant={e.isActive(category) ? 'default' : 'outlined'}
        label={e.label}
        key={e.label}
        color={e.isActive(category) ? 'primary' : 'default'}
        className={classes.chip}
        onClick={() => handleChipClick(e.identifier)}
        size={isMobile ? "small" : "medium"}
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
        transformOrigin={{ vertical: 'top', horizontal: 'left', }}
        classes={{ paper: classes.popover }}
      >
        <Typography variant="body1" className={classes.category} gutterBottom>Set category:</Typography>
        {renderCategoryChips()}
      </Popover>
    </>
  );

  if (isList) return (
    <div
      className={clsx(
        classes.topCategories,
        { [classes.topCategoriesReplacement]: replacement },
      )}
    >
      {renderCategoryChips()}
    </div>
  );

  if (isTabletBelow && drawerOpen) return collapsedCategoryChips();

  if (isDrawer) return (
    <ResponsiveComponent
      mobileComponent={collapsedCategoryChips()}
      tabletComponent={renderCategoryChips()}
      desktopComponent={renderCategoryChips()}
    />
  );

  return collapsedCategoryChips();
};

export default MovieCategory;

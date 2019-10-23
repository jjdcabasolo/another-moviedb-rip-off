import React, { useState } from 'react';
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
  },
  topCategories: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    overflowX: 'auto',
  },
}));

const MovieCategory = ({ isList, isDrawer }) => {
  const theme = useTheme();
  const isTabletBelow = useMediaQuery(theme.breakpoints.down('lg'));
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
        variant="outlined"
        label={e.label}
        key={e.label}
        color={e.isActive(category) ? 'primary' : 'default'}
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
        transformOrigin={{ vertical: 'top', horizontal: 'left', }}
        classes={{ paper: classes.popover }}
      >
        <Typography variant="body2" gutterBottom>Set category:</Typography>
        {renderCategoryChips()}
      </Popover>
    </>
  );

  if (isList) return (
    <div className={classes.topCategories}>
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

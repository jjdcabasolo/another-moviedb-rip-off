import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { ArrowBackTwoTone, SearchTwoTone } from '@material-ui/icons';

import AppBar from '../../overrides/AppBar';

import {
  moviesActions,
  sidebarActions,
  tvShowsActions,
} from '../../../reducers/ducks';

const useStyles = makeStyles((theme) => ({
  toolbarDrawer: {
    marginLeft: theme.spacing(7) - theme.spacing(1),
    transition: theme.transitions.create('margin-left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  grow: {
    flexGrow: 1,
  },
}));

const SidebarTitlebar = ({ item }) => {
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const isMovieLoading = useSelector((state) => state.movies.isMovieLoading);
  const isSearchOpen = useSelector((state) => state.sidebar.isSearchOpen);
  const isTVShowLoading = useSelector((state) => state.tvShows.isTVShowLoading);  
  const dispatch = useDispatch();
  
  const history = useHistory();
  
  const {
    date,
    name,
    original_name: originalName,
    original_title: originalTitle,
    title,
  } = item;

  const isMovie = activeTab === 'movies';
  const isItemLoading = isMovie ? isMovieLoading : isTVShowLoading;
  const isItemSelected = 'id' in item;

  const goBack = useCallback(() => {
    if (activeTab === 'movies') dispatch(moviesActions.setActiveMovie({}));
    else dispatch(tvShowsActions.setActiveTVShow({}));

    if (isSearchOpen) dispatch(sidebarActions.setSearch(false));

    history.goBack();
  }, [dispatch, history, isSearchOpen, activeTab]);

  const handleSearch = () => {
    dispatch(sidebarActions.setItemDrawer(true));
    history.push(`/${activeTab}/search`);
  };

  const evaluateTitle = () => {
    if (activeTab === 'movies') return title || originalTitle;
    return name || originalName;
  };

  return (
    <AppBar color="default" className={classes.appbar}>
      <Toolbar
        className={classes.toolbarDrawer}
        variant="dense"
      >
        <IconButton
          aria-label="back"
          onClick={goBack}
        >
          <ArrowBackTwoTone />
        </IconButton>
        {!isItemLoading && (
          <Typography component="h1" variant="h6">
            {isItemSelected && `${evaluateTitle()} ${date ? `(${moment(date).format('YYYY')})` : ''}`}
          </Typography>
        )}
        <div className={classes.grow} />
        <Tooltip title="Search">
          <IconButton onClick={handleSearch}>
            <SearchTwoTone />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

SidebarTitlebar.defaultProps = {
  item: {
    date: '',
    name: '',
    original_name: '',
    original_title: '',
    title: '',
  },
};

SidebarTitlebar.propTypes = {
  item: PropTypes.shape({
    date: PropTypes.string,
    name: PropTypes.string,
    original_name: PropTypes.string,
    original_title: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default SidebarTitlebar;

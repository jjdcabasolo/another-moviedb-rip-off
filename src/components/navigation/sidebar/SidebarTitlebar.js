import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ArrowBackTwoTone } from '@material-ui/icons';

import { moviesActions, tvShowsActions } from '../../../reducers/ducks';

import HideOnScroll from '../../../utils/components/HideOnScroll';

const useStyles = makeStyles((theme) => ({
  toolbarDrawer: {
    marginLeft: theme.spacing(7) - theme.spacing(1),
    transition: theme.transitions.create('margin-left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const SidebarTitlebar = ({ item }) => {
  const classes = useStyles();

  const activeTab = useSelector((state) => state.sidebar.activeTab);
  const dispatch = useDispatch();

  const history = useHistory();
  const {
    date,
    name,
    original_name: originalName,
    original_title: originalTitle,
    title,
  } = item;

  const isItemSelected = 'id' in item;

  const goBack = useCallback(() => {
    if (activeTab === 'movies') dispatch(moviesActions.setActiveMovie({}));
    else dispatch(tvShowsActions.setActiveTVShow({}));
    history.goBack();
  }, [dispatch, history, activeTab]);

  const evaluateTitle = () => {
    if (activeTab === 'movies') return title || originalTitle;
    return name || originalName;
  };

  return (
    <HideOnScroll>
      <AppBar color="default" className={classes.appbar}>
        <Toolbar
          className={classes.toolbarDrawer}
          variant="dense"
        >
          <IconButton
            aria-label="back"
            edge="start"
            onClick={goBack}
          >
            <ArrowBackTwoTone />
          </IconButton>
          <Typography component="h1" variant="h6">
            {isItemSelected && `${evaluateTitle()} (${moment(date).format('YYYY')})`}
          </Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

SidebarTitlebar.propTypes = {
  item: PropTypes.shape({
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    original_name: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default SidebarTitlebar;

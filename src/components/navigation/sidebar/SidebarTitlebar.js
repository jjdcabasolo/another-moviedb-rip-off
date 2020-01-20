import React, { useCallback } from 'react';

import clsx from 'clsx';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import { ArrowBackTwoTone } from '@material-ui/icons';

import { moviesActions, tvShowsActions } from '../../../reducers/ducks';

import HideOnScroll from '../../../utils/components/HideOnScroll';

import { SIDEBAR_WIDTH } from '../../../constants';

const useStyles = makeStyles(theme => ({
  toolbarDrawer: {
    marginLeft: theme.spacing(7) - theme.spacing(1),
    transition: theme.transitions.create('margin-left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const SidebarTitlebar = props => {
  const classes = useStyles();

  const { item } = props;

  const activeTab = useSelector(state => state.sidebar.activeTab);
  const drawerOpen = useSelector(state => state.sidebar.drawerOpen);
  const dispatch = useDispatch();

  const history = useHistory();
  const { title, original_title, date, name, original_name } = item;

  const isItemSelected = 'id' in item;

  const goBack = useCallback(() => {
    if (activeTab === 'movies') dispatch(moviesActions.setActiveMovie({}));
    else dispatch(tvShowsActions.setActiveTVShow({}));
    history.goBack();
  }, [dispatch, history]);

  const evaluateTitle = () => {
    if (activeTab === 'movies') return title || original_title;
    return name || original_name;
  };

  return (
    <HideOnScroll>
      <AppBar color="default" className={classes.appbar}>
        <Toolbar
          variant="dense"
          className={classes.toolbarDrawer}
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

export default SidebarTitlebar;

import React, { useState } from 'react';

import clsx from 'clsx';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Drawer,
  Grid,
  IconButton,
  Typography,
  List,
  ListItem,
  Slide,
  ListItemText,
  useMediaQuery,
} from '@material-ui/core';
import { Close, ArrowBack } from '@material-ui/icons';

import { getTVShowSeasonDetails } from '../../api';

import { tvShowsActions } from '../../reducers/ducks';

import { decryptKey, truncateText } from '../../utils/functions';

import { SEASON_DRAWER_WIDTH } from '../../constants';

const useStyles = makeStyles(theme => ({
  drawer: {
    display: 'flex',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    width: SEASON_DRAWER_WIDTH,
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: 0,
  },
  drawerOpen: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: SEASON_DRAWER_WIDTH,
  },
  drawerPaper: {
    position: 'inherit',
    [theme.breakpoints.up('lg')]: {
      height: theme.browserSize.height,
    },
    overflowX: 'hidden',
  },
  extendItem: {
    flex: 1,
  },
  toolbar: {
    padding: theme.spacing(3, 2, 0, 2),
  },
  listContainer: {
    [theme.breakpoints.up('xl')]: {
      marginTop: theme.spacing(1),
    },
    maxHeight: '90vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 0,
      height: 0,
    }
  },
  toolbarHeader: {
    width: 'unset',
  },
  grow: {
    flexGrow: 1,
  },
}));

const SeasonDrawer = () => {
  const theme = useTheme();
  const isHigherResDesktop = useMediaQuery(theme.breakpoints.up('xl'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();

  const seasonDrawerOpen = useSelector(state => state.tvShows.seasonDrawerOpen);
  const tvShow = useSelector(state => state.tvShows.tvShow);
  const episodes = useSelector(state => state.tvShows.episodes);
  const dispatch = useDispatch();

  const [selectedSeason, setSelectedSeason] = useState(0);

  const { seasons } = tvShow;

  const isSeasonSelected = selectedSeason > 0;

  const handleListItemClick = (_, index) => {
    if (selectedSeason !== index) {
      getTVShowSeasonDetails(decryptKey(), tvShow.id, index, response => {
        dispatch(tvShowsActions.setEpisode(response));
        // dispatch(tvShowsActions.setDetailsLoading(false));
        // setIsLoaded(true);
      }, error => {
        if (error.response) {
          // dispatch(tvShowsActions.setActiveTVShow({}));
          // setIsLoaded(error.response.data.status_code);
        }
      });
    }
    setSelectedSeason(e => e === index ? 0 : index);
  };

  const handleClose = () => {
    dispatch(tvShowsActions.setSeasonDrawer(!seasonDrawerOpen));
  };

  const handleBack = () => {
    setSelectedSeason(0);
  };

  if (!seasons) return null;

  return (
    <Drawer
      variant={isHigherResDesktop ? 'permanent' : 'temporary'}
      className={clsx(
        classes.drawer,
        { [classes.drawerOpen]: seasonDrawerOpen },
        { [classes.drawerClose]: !seasonDrawerOpen },
      )}
      classes={{
        paper: clsx(
          classes.drawerPaper,
          { [classes.drawerOpen]: seasonDrawerOpen },
          { [classes.drawerClose]: !seasonDrawerOpen },
        ),
      }}
      onClose={handleClose}
      open={seasonDrawerOpen}
      anchor="right"
    >
      <AppBar position="static" color="inherit">
        <Toolbar variant={isDesktop ? 'regular' : 'dense'}>
          {isSeasonSelected && (
            <IconButton onClick={handleBack} edge="start" color="inherit">
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant="h6">
            {isSeasonSelected
              ? `Season ${selectedSeason} (${episodes.length} episodes)`
              : 'Seasons'}
          </Typography>
          <div className={classes.grow} />
          <IconButton onClick={handleClose} edge="end" color="inherit">
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Slide direction="right" in={!isSeasonSelected} unmountOnExit>
        <div className={classes.listContainer}>
          <List>
            {seasons.map(season => season.season_number !== 0 && (
              <ListItem
                button
                selected={selectedSeason === season.season_number}
                onClick={event => handleListItemClick(event, season.season_number)}
              >
                <ListItemText
                  primary={`Season ${season.season_number}`}
                  secondary={`${season.episode_count} episodes • ${moment(season.air_date).format('MMM D, YYYY')}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Slide>
      <Slide
        direction="left"
        in={isSeasonSelected}
        unmountOnExit
      >
        <div className={classes.listContainer}>
          {episodes.map(episode => (
            <ListItem
              button
              //selected={selectedSeason === episode.episode_number}
              //onClick={event => handleListItemClick(event, episode.episode_number)}
            >
              <ListItemText
                primary={truncateText(`${episode.episode_number}: ${episode.name}`, 40)}
                secondary={`S${selectedSeason}E${episode.episode_number} • ${moment(episode.air_date).format('MMM D, YYYY')}`}
              />
            </ListItem>
          ))}
        </div>
      </Slide>
    </Drawer>
  );
};

export default SeasonDrawer;

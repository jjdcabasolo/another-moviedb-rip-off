import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { Close, ArrowBack } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

import { getTVShowSeasonDetails } from '../../api';

import { tvShowsActions } from '../../reducers/ducks';

import { decryptKey, truncateText } from '../../utils/functions';

import { SEASON_DRAWER_WIDTH } from '../../constants';

const useStyles = makeStyles((theme) => ({
  drawer: {
    display: 'flex',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    width: SEASON_DRAWER_WIDTH,
    [theme.breakpoints.down('xs')]: {
      width: theme.browserSize.width,
    },
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
    [theme.breakpoints.down('xs')]: {
      width: theme.browserSize.width,
    },
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
    [theme.breakpoints.down('sm')]: {
      maxHeight: '94vh',
    },
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 0,
      height: 0,
    },
  },
  toolbarHeader: {
    width: 'unset',
  },
  grow: {
    flexGrow: 1,
  },
  count: {
    fontWeight: theme.typography.body1.fontWeight,
    fontSize: theme.typography.body1.fontSize,
  },
  hashLink: {
    color: 'unset',
    cursor: 'unset',
    textDecoration: 'unset',
  },
}));

const SeasonDrawer = ({ scrollToRef, seasonDetailRef }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  const seasonDrawerOpen = useSelector((state) => state.tvShows.seasonDrawerOpen);
  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);
  const selectedEpisode = useSelector((state) => state.tvShows.selectedEpisode);
  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const episodes = useSelector((state) => state.tvShows.episodes);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { seasons } = tvShow;

  const isSeasonSelected = selectedSeason > 0;

  const handleSeasonClick = (index) => {
    setIsLoading(true);
    if (selectedSeason !== index) {
      getTVShowSeasonDetails(decryptKey(), tvShow.id, index, (response) => {
        dispatch(tvShowsActions.setEpisode(response));
        // dispatch(tvShowsActions.setDetailsLoading(false));
        setIsLoading(false);
      }, (error) => {
        if (error.response) {
          // dispatch(tvShowsActions.setActiveTVShow({}));
          setIsLoading(false);
        }
      });
    }
    dispatch(tvShowsActions.setSelectedSeason(selectedSeason === index ? 0 : index));
  };

  const handleEpisodeClick = (index) => {
    dispatch(tvShowsActions.setSelectedEpisode(index));
    dispatch(tvShowsActions.setSeasonDrawer(false));
    // console.log(seasonDetailRef)
    // setTimeout(() => scrollToComponent(seasonDetailRef.current), 1000);
  };

  const handleClose = () => {
    dispatch(tvShowsActions.setSeasonDrawer(!seasonDrawerOpen));
  };

  const handleBack = () => {
    dispatch(tvShowsActions.setSelectedSeason(0));
  };

  const renderAppbarTitle = () => {
    if (isSeasonSelected) {
      return (
        <>
          {`Season ${selectedSeason} `}
          <span className={classes.count}>{`(${episodes.length} episodes)`}</span>
        </>
      );
    }
    return 'Seasons';
  };

  if (!seasons) return null;

  return (
    <Drawer
      anchor="right"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          { [classes.drawerOpen]: seasonDrawerOpen },
          { [classes.drawerClose]: !seasonDrawerOpen },
        ),
      }}
      className={clsx(
        classes.drawer,
        { [classes.drawerOpen]: seasonDrawerOpen },
        { [classes.drawerClose]: !seasonDrawerOpen },
      )}
      onClose={handleClose}
      open={seasonDrawerOpen}
    >
      <AppBar position="static" color={isMobile ? 'default' : 'inherit'}>
        <Toolbar variant={isDesktop ? 'regular' : 'dense'}>
          {isSeasonSelected && (
            <IconButton onClick={handleBack} edge="start" color="inherit">
              <ArrowBack />
            </IconButton>
          )}
          { isLoading
            ? <Skeleton variant="rect" height={24} width="75%" />
            : (
              <Typography variant="h6">
                {renderAppbarTitle()}
              </Typography>
            )}
          <div className={classes.grow} />
          <IconButton onClick={handleClose} edge="end" color="inherit">
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Slide direction="right" in={!isSeasonSelected} unmountOnExit>
        <div className={classes.listContainer}>
          <List>
            {seasons.map((season) => season.season_number !== 0 && (
              <ListItem
                button
                onClick={() => handleSeasonClick(season.season_number)}
                selected={selectedSeason === season.season_number}
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
          {episodes.map((episode) => (
            <ListItem
              button
              onClick={() => handleEpisodeClick(episode.episode_number)}
              selected={selectedEpisode === episode.episode_number}
            >
              <ListItemText
                primary={truncateText(`S${selectedSeason}E${episode.episode_number} - ${episode.name}`, 40)}
                secondary={`${moment(episode.air_date).format('MMM D, YYYY')}`}
              />
            </ListItem>
          ))}
        </div>
      </Slide>
    </Drawer>
  );
};

SeasonDrawer.propTypes = {
  scrollToRef: PropTypes.node.isRequired,
  seasonDetailRef: PropTypes.node.isRequired,
};

export default SeasonDrawer;

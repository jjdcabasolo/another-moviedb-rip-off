import React from 'react';

import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  Chip,
  Grid,
  Link,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import { tvShowsActions } from '../../../reducers/ducks';

const useStyles = makeStyles((theme) => ({
  chip: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
}));

const TVShowEpisodeDetails = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));

  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const selectedEpisode = useSelector((state) => state.tvShows.selectedEpisode);
  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);
  const dispatch = useDispatch();

  const { seasons } = tvShow;

  const season = seasons.filter((e) => e.season_number === selectedSeason)[0];

  const {
    air_date: airDate,
    name,
    overview,
  } = season;

  const handleEpisodeChange = () => {
    dispatch(tvShowsActions.setSeasonDrawerSelectedSeason(true));
    dispatch(tvShowsActions.setSeasonDrawer(true));
  };

  return (
    <Grid item container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1">
          {`S${selectedSeason}E${selectedEpisode}`}
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          {`${moment(airDate).format('MMM D, YYYY')} `}
        </Typography>
      </Grid>
      <Grid item xs={12} container justify="flex-end">
        <Button onClick={handleEpisodeChange}>
          Change episode
        </Button>
      </Grid>
    </Grid>
  );
};

export default TVShowEpisodeDetails;

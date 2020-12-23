import React from 'react';

import moment from 'moment';
import { useSelector } from 'react-redux';

import { Grid, Typography } from '@material-ui/core';

import TruncatedOverview from '../../common/TruncatedOverview';

import { selectSeason } from '../../../utils/functions';

import { TV_SHOW_OVERVIEW_MAX_WORDS } from '../../../constants';

const TVShowSeasonDetails = () => {
  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);

  const { seasons } = tvShow;

  const {
    air_date: airDate,
    episode_count: episodeCount,
    name: seasonName,
    overview,
  } = selectSeason(seasons, selectedSeason);

  return (
    <Grid item container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {seasonName}
        </Typography>
        <Typography color="textSecondary">
          {airDate ? moment(airDate).format('MMM D, YYYY') : 'No release date.'}
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          {`${episodeCount} episodes`}
        </Typography>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={12}>
          {overview && (
            <TruncatedOverview
              overview={overview}
              maxWords={TV_SHOW_OVERVIEW_MAX_WORDS}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TVShowSeasonDetails;

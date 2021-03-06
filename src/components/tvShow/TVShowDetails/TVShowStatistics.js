import React from 'react';

import { useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';

import Statistic from '../../common/item/detail/Statistic';

const TVShowStatistics = () => {
  const tvShow = useSelector((state) => state.tvShows.tvShow);

  const {
    number_of_episodes: numberOfEpisodes,
    number_of_seasons: numberOfSeasons,
  } = tvShow;

  return (
    <Grid item container justify="center" alignItems="center">
      <Statistic col={6} count={numberOfSeasons} label="Seasons" divider />
      <Statistic col={6} count={numberOfEpisodes} label="Episodes" />
    </Grid>
  );
};

export default TVShowStatistics;

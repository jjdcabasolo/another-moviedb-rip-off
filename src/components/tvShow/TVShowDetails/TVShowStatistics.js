import React from 'react';

import { useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';

import Statistic from '../../common/item/detail/Statistic';

const TVShowStatistics = () => {
  const tvShow = useSelector(state => state.tvShows.tvShow);

  const { number_of_episodes, number_of_seasons } = tvShow;

  return (
    <Grid item container justify="center" alignItems="center">
      <Statistic col={6} count={number_of_seasons} label="Seasons" divider />
      <Statistic col={6} count={number_of_episodes} label="Episodes" />
    </Grid>
  );
};

export default TVShowStatistics;

import React from 'react';

import { useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';

import PersonAvatarList from '../../common/item/detail/PersonAvatarList';

const TVShowProduction = () => {
  const tvShow = useSelector(state => state.tvShows.tvShow);

  const { created_by, production_companies } = tvShow;

  return (
    <Grid item container spacing={2}>
      <PersonAvatarList title="Created by" content={created_by} location="creator" />
      <PersonAvatarList title="Network" content={production_companies} location="network" />
    </Grid>
  );
};

export default TVShowProduction;

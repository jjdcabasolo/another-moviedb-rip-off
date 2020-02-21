import React from 'react';

import { useSelector } from 'react-redux';

import { useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';

import PersonAvatarList from '../../common/item/detail/PersonAvatarList';

const TVShowProduction = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const tvShow = useSelector(state => state.tvShows.tvShow);

  const { created_by, production_companies } = tvShow;

  const hasCreatedBy = created_by.length > 0;
  const hasProductionCompany = production_companies.length > 0;

  return (
    <Grid item container spacing={2}>
      {hasCreatedBy > 0 && (
        <PersonAvatarList
          title="Created by"
          content={created_by}
          location="creator"
          col={isMobile ? 12 : 6}
        />
      )}
      {hasProductionCompany && (
        <PersonAvatarList
          title="Network"
          content={production_companies}
          location="network"
          col={isMobile ? 12 : 6}
        />
      )}
    </Grid>
  );
};

export default TVShowProduction;

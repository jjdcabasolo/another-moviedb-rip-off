import React from 'react';

import { useSelector } from 'react-redux';

import { useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';

import PersonAvatarList from '../../common/item/detail/PersonAvatarList';

const TVShowProduction = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const tvShow = useSelector((state) => state.tvShows.tvShow);

  const {
    created_by: createdBy,
    production_companies: productionCompanies,
  } = tvShow;

  const hasCreatedBy = createdBy.length > 0;
  const hasProductionCompany = productionCompanies.length > 0;

  return (
    <Grid item container spacing={2}>
      {hasCreatedBy > 0 && (
        <PersonAvatarList
          col={isMobile ? 12 : 6}
          content={createdBy}
          location="creator"
          title="Created by"
        />
      )}
      {hasProductionCompany > 0 && (
        <PersonAvatarList
          col={isMobile ? 12 : 6}
          content={productionCompanies}
          location="network"
          title="Network"
        />
      )}
    </Grid>
  );
};

export default TVShowProduction;

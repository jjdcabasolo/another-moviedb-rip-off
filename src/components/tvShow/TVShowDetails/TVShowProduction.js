import React from 'react';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import ProductionChip from '../../common/item/detail/ProductionChip';

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontWeight: theme.typography.h6.fontWeight,
  },
}));

const TVShowProduction = () => {
  const classes = useStyles();

  const tvShow = useSelector((state) => state.tvShows.tvShow);

  const {
    created_by: createdBy,
    production_companies: productionCompanies,
  } = tvShow;

  const hasCreatedBy = createdBy.length > 0;
  const hasProductionCompany = productionCompanies.length > 0;
  const hasProduction = hasCreatedBy && hasProductionCompany;

  return (
    <Grid item container spacing={2}>
      <Grid container spacing={2} item xs={12}>
        {hasCreatedBy && (
          <Grid item xs={hasProduction ? 6 : 12}>
            <Typography variant="body1" className={classes.title}>
              Created by
            </Typography>
          </Grid>
        )}
        {hasProductionCompany && (
          <Grid item xs={hasProduction ? 6 : 12}>
            <Typography variant="body1" className={classes.title}>
              Network
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2} item xs={12}>
        {hasCreatedBy && (
          <Grid item xs={hasProduction ? 6 : 12} container>
            {createdBy.map((person) => {
              const {
                profile_path: profilePath,
                name,
                origin_country: originCountry,
              } = person;

              return (
                <Grid item>
                  <ProductionChip
                    country={originCountry}
                    image={profilePath}
                    name={name}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
        {hasProductionCompany && (
          <Grid item xs={hasProduction ? 6 : 12} container>
            {productionCompanies.map((company) => {
              const {
                logo_path: logoPath,
                name,
                origin_country: originCountry,
              } = company;

              return (
                <Grid item>
                  <ProductionChip
                    country={originCountry}
                    image={logoPath}
                    name={name}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default TVShowProduction;

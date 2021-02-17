import React from 'react';

import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

import ProductionChip from '../../common/item/detail/ProductionChip';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.h6.fontWeight,
    width: '100%',
  },
}));

const TVShowProduction = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
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
    <Grid item container>
      <Grid
        alignItems="flex-start"
        container
        direction="row"
        item
        justify="flex-start"
        spacing={2}
        xs={12}
      >
        {hasCreatedBy && (
          <Grid item xs={hasProduction && !isMobile ? 6 : 12} container>
            <Typography variant="body1" gutterBottom className={classes.title}>
              Created by
            </Typography>
            {createdBy.map((person) => {
              const {
                id,
                name,
                origin_country: originCountry,
                profile_path: profilePath,
              } = person;

              return (
                <Grid item key={`tv-show-production-created-by-chip-${id}`}>
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
          <Grid item xs={hasProduction && !isMobile ? 6 : 12} container>
            <Typography variant="body1" gutterBottom className={classes.title}>
              Network
            </Typography>
            {productionCompanies.map((company) => {
              const {
                id,
                logo_path: logoPath,
                name,
                origin_country: originCountry,
              } = company;

              return (
                <Grid item key={`tv-show-production-production-company-chip-${id}`}>
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

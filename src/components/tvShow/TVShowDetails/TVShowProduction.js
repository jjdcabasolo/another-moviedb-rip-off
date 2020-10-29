import React from 'react';

import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

import ProductionChip from '../../common/item/detail/ProductionChip';

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
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
      <Grid item xs={12} container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
        {hasCreatedBy && (
          <Grid item xs={hasProduction && !isMobile ? 6 : 12} container>
            <Typography variant="body1" gutterBottom className={classes.title}>
              Created by
            </Typography>
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
          <Grid item xs={hasProduction && !isMobile ? 6 : 12} container>
            <Typography variant="body1" gutterBottom className={classes.title}>
              Network
            </Typography>
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

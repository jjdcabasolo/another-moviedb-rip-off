import React from 'react';

import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

import ProductionChip from '../../common/item/detail/ProductionChip';

import { enumerate } from '../../../utils/functions';

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
    networks,
    production_companies: productionCompanies,
    production_countries: productionCountries,
    spoken_languages: spokenLanguages,
  } = tvShow;

  const hasCreatedBy = createdBy && createdBy.length > 0;
  const hasNetworks = networks && networks.length > 0;
  const hasProductionCompany = productionCompanies && productionCompanies.length > 0;
  const hasProductionCountry = productionCountries && productionCountries.length > 0;
  const hasSpokenLanguages = spokenLanguages && spokenLanguages.length > 0;

  const renderProduction = (title, items) => (
    <Grid item xs={isMobile ? 12 : 6} container>
      <Typography variant="body1" gutterBottom className={classes.title}>
        {title}
      </Typography>
      {items}
    </Grid>
  );

  return (
    <Grid item container>
      <Grid
        alignItems="flex-start"
        container
        direction="row"
        item
        justify="flex-start"
        spacing={3}
        xs={12}
      >
        {hasCreatedBy && renderProduction('Created by', createdBy.map((person) => {
          const { id, name, profile_path: profilePath } = person;

          return (
            <Grid item key={`tv-show-production-created-by-chip-${id}`}>
              <ProductionChip image={profilePath} name={name} />
            </Grid>
          );
        }))}
        {hasNetworks && renderProduction('Network', networks.map((network) => {
          const { id, logo_path: logoPath, name, origin_country: originCountry } = network;

          return (
            <Grid item key={`tv-show-production-network-chip-${id}`}>
              <ProductionChip country={originCountry} image={logoPath} name={name} />
            </Grid>
          );
        }))}
        {hasProductionCompany && renderProduction('Companies', productionCompanies.map((company) => {
          const { id, logo_path: logoPath, name, origin_country: originCountry } = company;

          return (
            <Grid item key={`tv-show-production-production-company-chip-${id}`}>
              <ProductionChip country={originCountry} image={logoPath} name={name} />
            </Grid>
          )
        }))}
        {hasProductionCountry && renderProduction('Country', (
          <Typography variant="body2">
            {enumerate(productionCountries.map(e => `${e.name} (${e.iso_3166_1})`))}
          </Typography>
        ))}
        {hasSpokenLanguages && renderProduction('Spoken Languages', (
          <Typography variant="body2">
            {enumerate(spokenLanguages.map(e => `${e.english_name} (${e.iso_639_1})`))}
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default TVShowProduction;

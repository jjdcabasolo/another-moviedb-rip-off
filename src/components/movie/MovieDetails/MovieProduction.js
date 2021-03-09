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

const MovieProduction = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const movie = useSelector((state) => state.movies.movie);

  const {
    production_companies: productionCompanies,
    production_countries: productionCountries,
    spoken_languages: spokenLanguages,
  } = movie;

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
        {hasProductionCompany && renderProduction('Companies', productionCompanies.map((company) => {
          const { id, logo_path: logoPath, name, origin_country: originCountry } = company;

          return (
            <Grid item key={`tv-show-production-production-company-chip-${id}`}>
              <ProductionChip country={originCountry} image={logoPath} name={name} />
            </Grid>
          )
        })
        )}
        {hasProductionCountry && renderProduction('Country', (
          <Typography>
            {enumerate(productionCountries.map(e => `${e.name} (${e.iso_3166_1})`))}
          </Typography>
        ))}
        {hasSpokenLanguages && renderProduction('Spoken Languages', (
          <Typography>
            {enumerate(spokenLanguages.map(e => `${e.english_name} (${e.iso_639_1})`))}
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default MovieProduction;

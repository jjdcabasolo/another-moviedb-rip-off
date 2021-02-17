import React from 'react';

import { useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';

import ProductionChip from '../../common/item/detail/ProductionChip';

const MovieProduction = () => {
  const movie = useSelector((state) => state.movies.movie);

  const { production_companies: productionCompanies } = movie;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {productionCompanies.map((company) => {
          const {
            id,
            logo_path: logoPath,
            name,
            origin_country: originCountry,
          } = company;

          return (
            <ProductionChip
              key={`movie-production-${id}`}
              country={originCountry}
              image={logoPath}
              name={name}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default MovieProduction;

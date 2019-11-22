import React from 'react';

import { useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';

import ProductionCard from './ProductionCard';

const MovieProduction = () => {
  const movie = useSelector(state => state.movies.movie);

  const { production_companies } = movie;

  return (
    <>
      <Grid container spacing={2}>
        {production_companies.map(company => (
          <ProductionCard company={company} />
        ))}
      </Grid>
    </>
  );
};

export default MovieProduction;

import React from 'react';

import { useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';

import Statistic from './Statistic';

import { toMillionsOrBillions } from '../../../utils/functions';

const MovieBudget = () => {
  const movie = useSelector(state => state.movies.movie);

  const { budget, revenue } = movie;

  return (
    <Grid item container justify="center" alignItems="center">
      <Statistic col={4} count={toMillionsOrBillions(revenue)} label="Revenue" divider />
      <Statistic col={4} count={toMillionsOrBillions(budget)} label="Budget" divider={revenue} />
      <Statistic col={4} count={toMillionsOrBillions(revenue - budget)} label="Income" />
    </Grid>
  );
};

export default MovieBudget;

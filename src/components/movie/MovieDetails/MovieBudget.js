import React from 'react';

import { useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';

import Statistic from './Statistic';

import { toMillionsOrBillions } from '../../../utils/functions';

const MovieBudget = () => {
  const movie = useSelector(state => state.movies.movie);

  const { budget, revenue } = movie;
  
  const renderStatistics = () => {
    const income = revenue - budget;
    const hasIncome = income > 0;

    return [
      <Statistic col={4} count={toMillionsOrBillions(revenue)} label="Revenue" divider />,
      <Statistic col={4} count={toMillionsOrBillions(budget)} label="Budget" divider={revenue && hasIncome} />,
      (hasIncome && <Statistic col={4} count={toMillionsOrBillions(income)} label="Income" />),
    ];
  };

  return (
    <Grid item container justify="center" alignItems="center">
      {renderStatistics()}
    </Grid>
  );
};

export default MovieBudget;

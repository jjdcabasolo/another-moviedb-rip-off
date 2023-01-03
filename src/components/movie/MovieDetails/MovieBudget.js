import React from "react";

import { useSelector } from "react-redux";

import { Grid } from "@material-ui/core";

import Statistic from "../../common/item/detail/Statistic";

import { toMillionsOrBillions } from "../../../utils/functions";

const MovieBudget = () => {
  const movie = useSelector((state) => state.movies.movie);

  const { budget, revenue } = movie;

  const renderStatistics = () => {
    const income = revenue - budget;
    const hasIncome = income > 0;

    return [
      revenue !== 0 && (
        <Statistic
          col={4}
          count={toMillionsOrBillions(revenue)}
          divider
          key="movie-budget-revenue"
          label="Revenue"
        />
      ),
      budget !== 0 && (
        <Statistic
          col={4}
          count={toMillionsOrBillions(budget)}
          divider={!Number.isNaN(revenue) && hasIncome}
          key="movie-budget-budget"
          label="Budget"
        />
      ),
      hasIncome && (
        <Statistic
          col={4}
          count={toMillionsOrBillions(income)}
          key="movie-budget-income"
          label="Income"
        />
      ),
    ];
  };

  return (
    <Grid item container justify="center" alignItems="center">
      {renderStatistics()}
    </Grid>
  );
};

export default MovieBudget;

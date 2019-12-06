import React from 'react';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Chip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5, 1, 0.5, 0),
  },
  avatar: {
    width: theme.spacing(10),
  },
}));

const MovieProduction = () => {
  const classes = useStyles();

  const movie = useSelector(state => state.movies.movie);

  const { production_companies } = movie;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {production_companies.map(company => {
          let label = company.name;
          if (company.origin_country) label += ` (${company.origin_country})`;
          
          return (
            <Chip
              variant="outlined"
              label={label}
              className={classes.chip}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default MovieProduction;

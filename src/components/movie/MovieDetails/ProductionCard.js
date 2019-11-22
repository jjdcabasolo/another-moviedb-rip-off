import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../../constants';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
}));

const ProductionCard = ({ company }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={company.logo_path !== null ? `${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}/w300${company.logo_path}` : ''}
          title={`${company.name} company logo`}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6">
              {company.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {company.origin_country}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
};

export default ProductionCard;

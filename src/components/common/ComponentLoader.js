import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  loaderContainer: {
    [theme.breakpoints.down('sm')]: {
      height: theme.browserSize.height - theme.spacing(17),
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      height: theme.browserSize.height - theme.spacing(6),
    },
    [theme.breakpoints.up('lg')]: {
      height: theme.browserSize.height,
    },
  },
  loaderText: {
    marginTop: theme.spacing(2),
  },
}));

const ComponentLoader = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.loaderContainer} container justify="center" alignItems="center" direction="column">
      <Grid item>
        <CircularProgress size={80} thickness={4}/>
      </Grid>
      <Grid item>
        <Typography className={classes.loaderText} variant="body2">
          Hang tight! Contents are loading.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ComponentLoader;

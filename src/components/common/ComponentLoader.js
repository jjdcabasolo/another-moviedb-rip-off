import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loaderContainer: {
    [theme.breakpoints.down('sm')]: {
      marginTop: (theme.browserSize.height - theme.spacing(17)) / 2.25,
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      marginTop: (theme.browserSize.height - theme.spacing(6)) / 2.25,
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: (theme.browserSize.height) / 2.25,
    },
  },
  loaderText: {
    marginTop: theme.spacing(2),
  },
  loaderContainerWithSpace: {
    margin: theme.spacing(4, 0),
  },
}));

const ComponentLoader = ({
  isFullScreen = true,
  label = 'Hang tight! Contents are loading.',
}) => {
  const classes = useStyles();

  return (
    <Grid
      className={clsx({
        [classes.loaderContainer]: isFullScreen,
        [classes.loaderContainerWithSpace]: !isFullScreen,
      })}
      container
      justify="center"
      alignItems="center"
      direction="column"
    >
      <Grid item>
        <CircularProgress size={80} thickness={4} />
      </Grid>
      <Grid item>
        <Typography className={classes.loaderText} variant="body2">
          {label}
        </Typography>
      </Grid>
    </Grid>
  );
};

ComponentLoader.propTypes = {
  isFullScreen: PropTypes.bool.isRequired,
  label: PropTypes.bool.isRequired,
};

export default ComponentLoader;

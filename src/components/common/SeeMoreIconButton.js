import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

import Fab from '../overrides/Fab';

const useStyles = makeStyles((theme) => ({
  fab: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  seeMoreContainer: {
    height: '100%',
    width: theme.spacing(20),
  },
}));

const SeeMoreIconButton = () => {
  const classes = useStyles();

  return (
    <Grid
      alignItems="center"
      className={classes.seeMoreContainer}
      container
      direction="column"
      item
      justify="center"
      spacing={2}
      wrap="nowrap"
      xs={12}
    >
      <Grid item>
        <Fab className={classes.fab}>
          <ArrowForward />
        </Fab>
      </Grid>
      <Grid item className={classes.text}>
        <Typography variant="body1" className={classes.title} align="center" noWrap>
          View all
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SeeMoreIconButton;

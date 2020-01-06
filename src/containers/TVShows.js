import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Note from '../components/common/Note';

import { NOTE_NO_SELECTED_TV_SHOW } from '../constants';

const useStyles = makeStyles(theme => ({
}));

const TVShows = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={8} className={classes.root}>
      <Note details={NOTE_NO_SELECTED_TV_SHOW} />
    </Grid>
  );
};

export default TVShows;

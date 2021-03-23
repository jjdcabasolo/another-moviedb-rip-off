import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

import Fab from '../overrides/Fab';

const useStyles = makeStyles((theme) => ({
  fab: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
  seeMoreContainer: {
    height: '100%',
    width: theme.spacing(20),
  },
}));

const SeeMoreIconButton = ({ handleSeeMore }) => {
  const classes = useStyles();

  return (
    <Grid
      alignItems="center"
      className={classes.seeMoreContainer}
      container
      direction="column"
      item
      justify="center"
      onClick={handleSeeMore}
      spacing={2}
      wrap="nowrap"
      xs={12}
    >
      <Grid item>
        <Fab className={classes.fab}>
          <ArrowForward />
        </Fab>
      </Grid>
      <Grid item>
        <Typography variant="body1" align="center" noWrap>
          Show all
        </Typography>
      </Grid>
    </Grid>
  );
};

SeeMoreIconButton.propTypes = {
  handleSeeMore: PropTypes.func.isRequired,
};

export default SeeMoreIconButton;

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Tooltip, Typography } from '@material-ui/core';
import { HelpTwoTone } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  icon: {
    marginLeft: theme.spacing(1),
    fontSize: theme.typography.overline.fontSize,
  },
  divider: {
    height: theme.spacing(4),
  },
}));

const CrewCount = ({ count, col, label, isTotal, divider }) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={col - 1} container justify="center" alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h4">{count}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="overline">
            {label}
            {isTotal && (
              <Tooltip
                enterTouchDelay={0}
                leaveTouchDelay={2500}
                title="Crew count is wholly based on the efforts of the TMDb community. It may or may not reflect the exact head count."
              >
                <HelpTwoTone className={classes.icon} />
              </Tooltip>
            )}
          </Typography>
        </Grid>
      </Grid>
      {divider && (
        <Grid item>
          <Divider orientation="vertical" className={classes.divider} />
        </Grid>
      )}
    </>
  );
};

export default CrewCount;

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Tooltip } from '@material-ui/core';
import { HelpOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  icon: {
    marginLeft: theme.spacing(1),
    fontSize: theme.typography.overline.fontSize,
  },
}));

const CrewCount = ({ count, col, label, isTotal }) => {
  const classes = useStyles();

  return (
    <Grid item xs={col} container justify="center" alignItems="center" direction="column">
      <Grid item>
        <Typography variant="h4">{count}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="overline">
          { label }
          { isTotal && (
            <Tooltip
              interactive
              enterTouchDelay={0}
              leaveDelay={3000}
              leaveTouchDelay={3000}
              title="Crew count is wholly based on the efforts of the TMDb community. It may or may not reflect the exact head count."
            >
              <HelpOutlined className={classes.icon} />
            </Tooltip>
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CrewCount;

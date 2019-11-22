import React from 'react';

import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider, Grid, Tooltip, Typography, useMediaQuery } from '@material-ui/core';
import { HelpTwoTone } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  icon: {
    marginLeft: theme.spacing(1),
    fontSize: theme.typography.overline.fontSize,
  },
  divider: {
    height: theme.spacing(4),
  },
  cols3Adjustment: {
    maxWidth: '33%',
    flexBasis: '33%',
  },
}));

const Statistic = ({ count, col, label, isTotal, divider }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const xs = col - 1;
  return (
    <>
      <Grid
        item
        xs={xs}
        container
        justify="center"
        alignItems="center"
        direction="column"
        className={clsx(
          { [classes.cols3Adjustment]: xs === 3 },
        )}
      >
        <Grid item>
          <Typography variant={isMobile ? "h5" : "h4"}>{count}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="overline" color="textSecondary">
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

export default Statistic;

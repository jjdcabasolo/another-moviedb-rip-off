import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { HelpTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
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

const Statistic = ({
  col,
  count,
  divider,
  isTotal,
  label,
}) => {
  const classes = useStyles();

  const xs = col - 1;
  return (
    <>
      <Grid
        alignItems="center"
        className={clsx(
          { [classes.cols3Adjustment]: xs === 3 },
        )}
        container
        direction="column"
        item
        justify="center"
        xs={xs}
      >
        <Grid item>
          <Typography variant="h5">{count}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="overline" color="textSecondary">
            {label}
            {isTotal && (
              <Tooltip
                enterTouchDelay={0}
                leaveTouchDelay={1500}
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

Statistic.defaultProps = {
  divider: false,
  isTotal: false,
};

Statistic.propTypes = {
  col: PropTypes.number.isRequired,
  count: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  divider: PropTypes.bool,
  isTotal: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default Statistic;

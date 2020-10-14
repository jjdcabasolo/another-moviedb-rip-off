import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Chip,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
  chip: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
}));

const Section = ({
  anchorId,
  children,
  chipContent,
  col = 12,
  divider = true,
  title,
  visible = true,
}) => {
  const classes = useStyles();

  return (
    visible
      ? (
        <>
          <Grid item xs={col} id={anchorId}>
            {title && (
              <Typography variant="h5" className={classes.title}>
                {title}
                {chipContent && (
                  <Chip
                    className={classes.chip}
                    color="default"
                    label={chipContent}
                    size="small"
                    variant="outlined"
                  />
                )}
              </Typography>
            )}
            {children}
          </Grid>
          {divider
            ? (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )
            : null}
        </>
      )
      : null
  );
};

Section.propTypes = {
  anchorId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  chipContent: PropTypes.string.isRequired,
  col: PropTypes.number.isRequired,
  divider: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Section;

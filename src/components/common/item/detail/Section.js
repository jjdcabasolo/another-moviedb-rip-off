import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Typography, Chip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(2),
  },
  chip: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
}));

const Section = ({
  title,
  children,
  visible = true,
  col = 12,
  divider = true,
  anchorId,
  chipContent,
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
                    variant="outlined"
                    label={chipContent}
                    color="default"
                    size="small"
                    className={classes.chip}
                  />
                )}
              </Typography>
            )}
            {children}
          </Grid>
          {divider
            ? (
              <Grid item xs={12}>
                <Divider/>
              </Grid>
            )
            : null
          }      
        </>
      )
      : null
  );
};

export default Section;

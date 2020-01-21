import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const Section = ({
  title,
  children,
  visible = true,
  col = 12,
  divider = true,
}) => {
  const classes = useStyles();

  return (
    visible 
      ? (
        <>
          <Grid item xs={col}>
            {title && (
              <Typography variant="h5" className={classes.title}>{title}</Typography>
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

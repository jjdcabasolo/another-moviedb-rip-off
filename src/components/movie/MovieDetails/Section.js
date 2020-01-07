import React from 'react';

import { Divider, Grid, Typography } from '@material-ui/core';

const Section = ({
  title,
  children,
  visible = true,
  col = 12,
  divider = true,
}) => (
  visible 
    ? (
      <>
        <Grid item xs={col}>
          {title && (
            <Typography variant="h5" gutterBottom>{title}</Typography>
          )}
          {children}
        </Grid>
        {divider
          ? (
            <Grid item xs={col}>
              <Divider/>
            </Grid>
          )
          : null
        }      
      </>
    )
    : null
);

export default Section;

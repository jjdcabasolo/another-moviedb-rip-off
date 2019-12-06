import React from 'react';

import { Grid, Typography } from '@material-ui/core';

const Section = ({ title, children, visible = true }) => (
  visible 
    ? (
      <Grid item xs={12}>
        { title && (
          <Typography variant="h5" gutterBottom>{title}</Typography>
        )}
        {children}
      </Grid>
    )
    : null
);

export default Section;

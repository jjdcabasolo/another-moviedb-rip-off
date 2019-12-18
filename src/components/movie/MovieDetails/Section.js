import React from 'react';

import { Grid, Typography } from '@material-ui/core';

const Section = ({ title, children, visible = true, col = 12 }) => (
  visible 
    ? (
      <Grid item xs={col}>
        { title && (
          <Typography variant="h5" gutterBottom>{title}</Typography>
        )}
        {children}
      </Grid>
    )
    : null
);

export default Section;

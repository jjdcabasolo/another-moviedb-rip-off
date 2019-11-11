import React from 'react';

import { useTheme } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

const Section = ({ title, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item xs={12}>
      <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>{title}</Typography>
      {children}
    </Grid>
  );
};

export default Section;

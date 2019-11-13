import React from 'react';

import { Typography, Grid, Tooltip } from '@material-ui/core';

const CrewCount = ({ count, label }) => (
  <Grid item xs={12} container justify="center" alignItems="center" direction="column">
    <Grid item>
      <Typography variant="h3">{count}</Typography>
    </Grid>
    <Grid item>
      <Tooltip title="Crew count is wholly based on the efforts of the TMDb community. It may or may not reflect the exact head count.">
        <Typography variant="button">
          {label}
        </Typography>
      </Tooltip>
    </Grid>
  </Grid>
);

export default CrewCount;

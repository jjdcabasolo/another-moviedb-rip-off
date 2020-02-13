import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: theme.typography.h3.fontSize,
    margin: theme.spacing(2, 0),
  },
}));

const Note = ({details}) => {
  const classes = useStyles();

  return (
    <>
      {details.icon(classes.icon)}
      <Typography variant="h6" gutterBottom>{details.header}</Typography>
      {details.content.map(e => <Typography variant="body2">{e}</Typography>)}
    </>
  );
};

export default Note;

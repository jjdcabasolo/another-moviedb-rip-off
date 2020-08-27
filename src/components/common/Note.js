import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: theme.typography.h3.fontSize,
    margin: theme.spacing(2, 0),
  },
}));

const Note = ({ details }) => {
  const classes = useStyles();

  const {
    content,
    header,
    icon,
  } = details;

  return (
    <>
      {icon(classes.icon)}
      <Typography variant="h6" gutterBottom>{header}</Typography>
      {content.map((e) => <Typography variant="body2">{e}</Typography>)}
    </>
  );
};

Note.propTypes = {
  details: PropTypes.shape({
    content: PropTypes.arrayOf(PropTypes.string).isRequired,
    header: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
  }).isRequired,
};

export default Note;

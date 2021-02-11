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
    id,
  } = details;

  return (
    <>
      {icon(classes.icon)}
      <Typography variant="h6" gutterBottom>{header}</Typography>
      {content.map((e, i) => (
        <Typography
          // eslint-disable-next-line react/no-array-index-key
          key={`${id}-${i}`}
          variant="body2"
        >
          {e}
        </Typography>
      ))}
    </>
  );
};

Note.propTypes = {
  details: PropTypes.shape({
    content: PropTypes.arrayOf(PropTypes.string).isRequired,
    header: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Note;

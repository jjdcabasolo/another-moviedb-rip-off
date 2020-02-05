import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  hashLink: {
    color: 'unset',
    cursor: 'unset',
    textDecoration: 'unset',
  },
});

const HashLink = ({ children, to }) => {
  const classes = useStyles();

  return (
    <Link smooth to={to} className={classes.hashLink}>
      {children}
    </Link>
  );
};

export default HashLink;

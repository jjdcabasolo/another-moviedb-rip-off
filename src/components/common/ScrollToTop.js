import React from 'react';

import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Fab, useMediaQuery } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(6),
  },
  fabMobile: {
    right: theme.spacing(2),
  },
}));

const ScrollToTop = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  const handleClick = () => {
    const anchor = document.querySelector('#scroll-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Fab
      aria-label="scroll back to top"
      className={clsx(
        classes.fab,
        { [classes.fabMobile]: isMobile },
      )}
      onClick={handleClick}
      size={isMobile ? 'medium' : 'large'}
    >
      <KeyboardArrowUp />
    </Fab>
  );
};

export default ScrollToTop;

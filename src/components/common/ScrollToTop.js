import React from 'react';

import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Fab, useMediaQuery } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';

import { scrollToID } from '../../utils/functions';

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
    scrollToID('scroll-to-top-anchor');
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

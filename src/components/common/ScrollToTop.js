import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Tooltip, useMediaQuery } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';

import Fab from '../overrides/Fab';

import { scrollToID } from '../../utils/functions';

const useStyles = makeStyles((theme) => ({
  fab: {
    bottom: theme.spacing(6),
    position: 'fixed',
    right: theme.spacing(6),
    [theme.breakpoints.only('xs')]: {
      right: theme.spacing(2),
    },
  },
}));

const ScrollToTop = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const handleClick = () => {
    scrollToID('scroll-to-top-anchor');
  };

  return (
    <Tooltip title="Scroll to top">
      <Fab
        aria-label="scroll back to top"
        className={classes.fab}
        onClick={handleClick}
        size={isMobile ? 'medium' : 'large'}
      >
        <KeyboardArrowUp />
      </Fab>
    </Tooltip>
  );
};

export default ScrollToTop;

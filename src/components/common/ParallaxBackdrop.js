import React from 'react';

import clsx from 'clsx';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  parallax: {
    width: `${theme.browserSize.width}px !important`,
    height: '40vh !important',
  },
  parallaxTabletBelow: {
    marginTop: theme.spacing(6),
  },
}));

const Sidebar = ({ src }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTabletBelow = useMediaQuery(theme.breakpoints.down('lg'));



  return (
    <ParallaxProvider>
      <ParallaxBanner
        layers={[{ image: src, amount: 0.6 }]}
        className={clsx(
          classes.parallax,
          { [classes.parallaxTabletBelow]: isTabletBelow }
        )}
      />
    </ParallaxProvider>
  );
};

export default Sidebar;

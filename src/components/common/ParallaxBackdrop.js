import React from 'react';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  parallax: {
    width: `${theme.browserSize.width}px !important`,
    height: '40vh !important',
    marginTop: theme.spacing(6),
  },
}));

const Sidebar = ({ src }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



  return (
    <ParallaxProvider>
      <ParallaxBanner
        layers={[{ image: src, amount: 0.6 }]}
        className={classes.parallax}
      />
    </ParallaxProvider>
  );
};

export default Sidebar;

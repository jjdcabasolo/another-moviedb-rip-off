import React from 'react';

import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  img: {
    maskImage: 'linear-gradient(to top, #0000 0%, #000 25%)',
    objectFit: 'cover',
  },
  imgMobile: {
    height: theme.spacing(80),
    width: '100%',
  },
}));

const GradientBackground = ({ src }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <img
      src={src}
      className={clsx(
        classes.img,
        { [classes.imgMobile]: isMobile },
      )}
    />
  );
};

export default GradientBackground;

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  img: {
    maskImage: 'linear-gradient(to top, #0000 0%, #000 30%)',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(6),
      height: '70vh',
      width: '100%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginTop: theme.spacing(6),
      height: '35vh',
      width: theme.browserSize.width - theme.spacing(7),
    },
    [`${theme.breakpoints.between('md', 'lg')} and (orientation: landscape)`]: {
      marginTop: theme.spacing(6),
      height: '50vh',
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      height: '40vh',
      width: '100%',
    },
  },
}));

const GradientBackground = ({ src }) => {
  const classes = useStyles();

  return <img src={src} alt={`Poster not loading? Visit ${src} to view.`} className={classes.img} />;
};

export default GradientBackground;

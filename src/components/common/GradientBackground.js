import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../constants';

const useStyles = makeStyles((theme) => ({
  img: {
    maskImage: 'linear-gradient(to top, #0000 0%, #000 30%)',
    objectFit: 'cover',
    objectPosition: '50% 0%',
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
    [`${theme.breakpoints.only('md')} and (orientation: landscape)`]: {
      marginTop: theme.spacing(6),
      height: '50vh',
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      height: '40vh',
      width: '100%',
    },
  },
  noImgPadding: {
    marginTop: theme.spacing(5),
  },
}));

const GradientBackground = ({
  image,
  isItemSelected,
  isLoading,
  isVisible,
}) => {
  const classes = useStyles();

  const src = `${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}/w1280${image}`;

  if (isLoading) return null;
  if (!image && isItemSelected) return <div className={classes.noImgPadding} />;
  if (isVisible) return <img src={src} alt={src} className={classes.img} />;
  return null;
};

GradientBackground.propTypes = {
  image: PropTypes.string.isRequired,
  isItemSelected: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default GradientBackground;

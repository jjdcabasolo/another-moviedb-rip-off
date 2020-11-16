import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../constants';

const useStyles = makeStyles((theme) => ({
  img: {
    maskImage: `linear-gradient(
      rgba(0,0,0,1) 0%,
      rgba(255,255,255,0.5) 70%,
      rgba(255,255,255,0.4) 80%,
      rgba(255,255,255,0.3) 85%,
      rgba(255,255,255,0.2) 90%,
      rgba(255,255,255,0.1) 95%,
      rgba(255,255,255,0) 100%
    )`,
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
    marginTop: theme.spacing(15),
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

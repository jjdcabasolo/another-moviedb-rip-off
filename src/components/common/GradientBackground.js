import React from 'react';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import { MOVIE_DRAWER_TMDB_IMAGE_PREFIX } from '../../constants';

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

const GradientBackground = ({ isVisible }) => {
  const classes = useStyles();

  const activeTab = useSelector(state => state.sidebar.activeTab);
  const movie = useSelector(state => state.movies.movie);

  const src = activeTab === 'movies'
    ? `${MOVIE_DRAWER_TMDB_IMAGE_PREFIX}/w1280${movie.backdrop_path}`
    : '';

  if (isVisible) return <img src={src} alt={src} className={classes.img} />;
  return <></>;
};

export default GradientBackground;

import React, { useEffect, useState } from 'react';

import ReactPlayer from 'react-player'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import ComponentLoader from '../components/common/ComponentLoader';
import Note from '../components/common/Note';
import MovieHeader from '../components/movie/MovieDetails/MovieHeader';
import MovieCast from '../components/movie/MovieDetails/MovieCast';
import MovieCrew from '../components/movie/MovieDetails/MovieCrew';
import MovieLinks from '../components/movie/MovieDetails/MovieLinks';
import Section from '../components/movie/MovieDetails/Section';

import { getMovieDetails } from '../api';

import { moviesActions } from '../reducers/ducks';

import { decryptKey } from '../utils/functions';

import { NOTE_NO_SELECTED_MOVIE, NOTE_MOVIE_NOT_FOUND } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 2),
  },
  trailer: {
    [theme.breakpoints.down('sm')]: {
      height: `${theme.spacing(30)}px !important`,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      height: `${theme.spacing(40)}px !important`,
    },
    [theme.breakpoints.up('md')]: {
      height: `${theme.spacing(50)}px !important`,
    },
  },
}));

const Movies = () => {
  const classes = useStyles();

  const movie = useSelector(state => state.movies.movie);
  const isMovieLoading = useSelector(state => state.movies.isMovieLoading);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(true);

  const { movieId } = useParams();

  useEffect(() => {
    getMovieDetails(decryptKey(), movieId, response => {
      dispatch(moviesActions.setActiveMovie(response));
      dispatch(moviesActions.setDetailsLoading(false));
      setIsLoaded(true);
    }, error => {
      dispatch(moviesActions.setActiveMovie({}));
      setIsLoaded(error.response.data.status_code);
    });
    // setTimeout(() => window.scrollTo(0, 0), 100);    
  }, [movieId, dispatch]);

  if (movieId === undefined) return <Note details={NOTE_NO_SELECTED_MOVIE} />;

  if (isMovieLoading) return <ComponentLoader />;

  if (isLoaded === 34) return <Note details={NOTE_MOVIE_NOT_FOUND} />;

  if (Object.keys(movie).length === 0 && movie.constructor === Object) return <ComponentLoader />;
    
  return (
    <Grid container spacing={4} className={classes.root}>
      <MovieHeader />

      <Section title="Trailer">
        <ReactPlayer
          className={classes.trailer}
          controls
          light
          pip
          url={movie.youtube}
          width="100%"
        />
      </Section>

      <Section title="Cast">
        <MovieCast />
      </Section>

      <Section title="Crew">
        <MovieCrew />
      </Section>

      <Section>
        <MovieLinks />
      </Section>
    </Grid>
  );
};

export default Movies;

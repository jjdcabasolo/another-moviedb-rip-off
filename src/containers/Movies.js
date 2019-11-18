import React, { useEffect, useState } from 'react';

import ReactPlayer from 'react-player'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

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
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(true);

  const isMovieSelected = 'id' in movie;

  const { movieId } = useParams();
  useEffect(() => {
    getMovieDetails(decryptKey(), movieId, response => {
      dispatch(moviesActions.setActiveMovie(response));
      setTimeout(() => window.scrollTo(0, 0), 100);
      setIsLoaded(true);
    }, error => {
      setIsLoaded(false);
    });
  }, [movieId]);

  if (!isMovieSelected) {
    if (isLoaded) return <Note details={NOTE_NO_SELECTED_MOVIE} />;
    return <Note details={NOTE_MOVIE_NOT_FOUND} />;
  }

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

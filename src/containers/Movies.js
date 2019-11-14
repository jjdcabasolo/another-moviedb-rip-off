import React, { useEffect } from 'react';

import ReactPlayer from 'react-player'
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Note from '../components/common/Note';
import ComponentLoader from '../components/common/ComponentLoader';
import MovieHeader from '../components/movie/MovieDetails/MovieHeader';
import MovieCast from '../components/movie/MovieDetails/MovieCast';
import MovieCrew from '../components/movie/MovieDetails/MovieCrew';
import MovieLinks from '../components/movie/MovieDetails/MovieLinks';
import Section from '../components/movie/MovieDetails/Section';

import { moviesActions } from '../reducers/ducks';

import { NOTE_NO_SELECTED_MOVIE } from '../constants';

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

  const isMovieSelected = 'id' in movie;

  useEffect(() => {
    dispatch(moviesActions.setDetailsLoading(false));
  }, [dispatch, isMovieLoading]);

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 100);
    // setTimeout(() => window.scrollTo(0, window.innerHeight * 10000), 100);
  }, []);

  if (isMovieLoading) return <ComponentLoader />;

  if (!isMovieSelected) return <Note details={NOTE_NO_SELECTED_MOVIE} />;

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

      <Section title="External Links">
        <MovieLinks />
      </Section>
    </Grid>
  );
};

export default Movies;

import React from 'react';

import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Note from '../components/common/Note';
import MovieHeader from '../components/movie/MovieDetails/MovieHeader';
import MovieCast from '../components/movie/MovieDetails/MovieCast';
import MovieCrew from '../components/movie/MovieDetails/MovieCrew';
import Section from '../components/movie/MovieDetails/Section';

import { NOTE_NO_SELECTED_MOVIE } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 2),
  },
  trailer: {
    [theme.breakpoints.down('sm')]: {
      height: `${theme.spacing(30)}px !important`,
    },
  },
}));

const Movies = () => {
  const classes = useStyles();

  const movie = useSelector(state => state.movies.movie);

  const isMovieSelected = 'id' in movie;

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
        Under construction
        {/* <MovieCrew /> */}
      </Section>
    </Grid>
  );
};

export default Movies;

import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@material-ui/core';

import Note from '../components/common/Note';
import MovieHeader from '../components/movie/MovieDetails/MovieHeader';

import { NOTE_NO_SELECTED_MOVIE } from '../constants';

const Movies = () => {
  const movie = useSelector(state => state.movies.movie);

  const isMovieSelected = 'id' in movie;

  if (!isMovieSelected) return <Note details={NOTE_NO_SELECTED_MOVIE} />;

  return (
    <Container>
      <MovieHeader />
    </Container>
  );
};

export default Movies;

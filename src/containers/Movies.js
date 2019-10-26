import React from 'react';
import { useSelector } from 'react-redux';

import Note from '../components/common/Note';

import { NOTE_NO_SELECTED_MOVIE } from '../constants';

const Movies = () => {
  const movie = useSelector(state => state.movies.movie);

  return (
    <>
      { JSON.stringify(movie) }
      <Note details={NOTE_NO_SELECTED_MOVIE} />
    </>
  );
};

export default Movies;

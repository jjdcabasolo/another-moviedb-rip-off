import React from 'react';

import Note from '../components/common/Note';

import { NOTE_NO_SELECTED_MOVIE } from '../constants';

const Movies = () => {

  return (
    <>
      <Note details={NOTE_NO_SELECTED_MOVIE} />
    </>
  );
};

export default Movies;

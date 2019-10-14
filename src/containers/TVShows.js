import React from 'react';

import Note from '../components/common/Note';

import { NOTE_NO_SELECTED_TV_SHOW } from '../constants';

const TVShows = () => {

  return (
    <>
      <Note details={NOTE_NO_SELECTED_TV_SHOW} />
    </>
  );
};

export default TVShows;

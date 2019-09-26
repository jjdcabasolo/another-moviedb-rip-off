import React from 'react';

import { getPopularMovies } from '../api/movie';

const DummyComponent = () => {
  getPopularMovies();

  return (
    <div>
      asdf
    </div>
  )
}

export default DummyComponent;

import React, { useState } from 'react';

import { getPopularMovies } from '../api/movie';

const DummyComponent = () => {
  const [movies, setMovies] = useState('');

  getPopularMovies((data) => {
    setMovies(JSON.stringify(data.results));
  }, (error) => {
    setMovies(error.status_message);
  });

  return (
    <div>
      {movies}
    </div>
  );
};

export default DummyComponent;

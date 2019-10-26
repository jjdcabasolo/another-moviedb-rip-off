import React from 'react';
import { useSelector } from 'react-redux';

const MovieDetails = () => {
  const movie = useSelector(state => state.movies.movie);

  return (
    <>
      { JSON.stringify(movie) }
      Movie deets go here
    </>
  );
};

export default MovieDetails;

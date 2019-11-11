import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { useTheme } from '@material-ui/core/styles';
import { Grid, Button, useMediaQuery } from '@material-ui/core';

import MovieCastCard from './MovieCastCard';

const MovieCast = () => {
  const theme = useTheme();
  const highResolutionDesktop = useMediaQuery(theme.breakpoints.up('xl'));
  const isMidTabletDesktop = useMediaQuery(theme.breakpoints.between('md', 'xl'));
  const isMidTabletBelow = useMediaQuery(theme.breakpoints.down('md'));

  const movie = useSelector(state => state.movies.movie);

  const [showMore, setShowMore] = useState(false);

  const getCardCol = () => {
    if (highResolutionDesktop) return 4;
    if (isMidTabletDesktop) return 3;
    if (isMidTabletBelow) return 2;
  };

  const cardCol = getCardCol();
  const maxVisibleCards = cardCol * 2;

  return (
    <>
      <Grid container spacing={2}>
        {movie.cast.slice(0, maxVisibleCards).map(cast => (
          <MovieCastCard content={cast} col={12 / cardCol} />
        ))}
        { showMore && (
          movie.cast.slice(maxVisibleCards, movie.cast.length).map(cast => (
            <MovieCastCard content={cast} col={12 / cardCol} />
          ))
        )}
        <Grid item xs={12} container justify="flex-end">
          <Button onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show less' : 'Show all'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default MovieCast;

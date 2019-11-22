import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useTheme } from '@material-ui/core/styles';
import { Grid, Button, useMediaQuery } from '@material-ui/core';

import CastAvatar from './CastAvatar';

const getCardCol = (isMobile, isTablet, isDesktop) => {
  if (isMobile) return 2;
  if (isTablet) return 3;
  if (isDesktop) return 4;
};

const MovieCast = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const movie = useSelector(state => state.movies.movie);

  const [showMore, setShowMore] = useState(false);
  const [cardCol, setCardCol] = useState(0);

  const maxVisibleCards = cardCol * 2;

  useEffect(() => {
    setCardCol(getCardCol(isMobile, isTablet, isDesktop));
  }, [isDesktop, isTablet, isMobile]);

  return (
    <>
      <Grid container spacing={2}>
        {movie.cast.slice(0, maxVisibleCards).map(cast => (
          <CastAvatar content={cast} col={12 / cardCol} />
        ))}
        { showMore && (
          movie.cast.slice(maxVisibleCards, movie.cast.length).map(cast => (
            <CastAvatar content={cast} col={12 / cardCol} />
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

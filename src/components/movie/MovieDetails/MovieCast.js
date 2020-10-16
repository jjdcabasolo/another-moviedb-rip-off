import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useTheme } from '@material-ui/core/styles';
import { Grid, Button, useMediaQuery } from '@material-ui/core';

import PersonAvatar from '../../common/item/detail/PersonAvatar';

import { moviesActions } from '../../../reducers/ducks';

import { getCastCol } from '../../../utils/functions';

const MovieCast = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isLowerTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isUpperTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const movie = useSelector((state) => state.movies.movie);
  const castShowMore = useSelector((state) => state.movies.castShowMore);
  const dispatch = useDispatch();

  const { cast } = movie;

  const [cardCol, setCardCol] = useState(0);

  const maxVisibleCards = cardCol * 2;

  useEffect(() => {
    setCardCol(getCastCol(isMobile, isLowerTablet));
  }, [isMobile, isLowerTablet, isUpperTablet, isDesktop]);

  return (
    <>
      <Grid container spacing={2}>
        {cast.slice(0, maxVisibleCards).map((castBasic) => (
          <PersonAvatar
            character={castBasic.character}
            col={12 / cardCol}
            image={castBasic.profile_path}
            name={castBasic.name}
          />
        ))}
        { castShowMore && (
          cast.slice(maxVisibleCards, cast.length).map((castMore) => (
            <PersonAvatar
              character={castMore.character}
              col={12 / cardCol}
              image={castMore.profile_path}
              name={castMore.name}
            />
          ))
        )}
        <Grid item xs={12} container justify="flex-end">
          <Button
            onClick={() => dispatch(moviesActions.setCastShowMore(!castShowMore))}
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
          >
            {castShowMore ? 'Show less' : 'Show all'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default MovieCast;

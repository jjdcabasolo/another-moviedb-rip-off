import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Button, useMediaQuery } from '@material-ui/core';

import PersonAvatar from '../../common/item/detail/PersonAvatar';

import { moviesActions } from '../../../reducers/ducks';

import { getCastCol } from '../../../utils/functions';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

const MovieCast = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isLowerTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isUpperTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();

  const movie = useSelector((state) => state.movies.movie);
  const castShowMore = useSelector((state) => state.movies.castShowMore);
  const dispatch = useDispatch();

  const { cast } = movie;

  const [cardCol, setCardCol] = useState(0);

  const maxVisibleCards = cardCol * 2;

  useEffect(() => {
    setCardCol(getCastCol(isMobile, isLowerTablet));
  }, [isMobile, isLowerTablet, isUpperTablet, isDesktop]);

  const handleButtonClick = () => {
    if (!castShowMore) {
      const anchor = document.querySelector('#movie-cast');
      if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
    }

    dispatch(moviesActions.setCastShowMore(!castShowMore));
  };

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
        <Grid
          className={classes.button}
          container
          item
          justify="flex-end"
          xs={12}
        >
          <Button
            onClick={handleButtonClick}
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

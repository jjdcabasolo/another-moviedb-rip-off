import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';

import PersonAvatar from '../../common/item/detail/PersonAvatar';

import { getCastCol } from '../../../utils/functions';

const TVShowCast = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmallTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isBigTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const tvShow = useSelector((state) => state.tvShows.tvShow);

  const [cardCol, setCardCol] = useState(0);

  const { cast } = tvShow;

  useEffect(() => {
    setCardCol(getCastCol(isMobile, isSmallTablet));
  }, [isMobile, isSmallTablet, isBigTablet, isDesktop]);

  return (
    <Grid container spacing={2}>
      {cast.map((person) => (
        <PersonAvatar
          character={person.character}
          col={12 / cardCol}
          image={person.profile_path}
          name={person.name}
        />
      ))}
    </Grid>
  );
};

export default TVShowCast;

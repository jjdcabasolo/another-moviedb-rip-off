import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';

import PersonAvatar from '../../common/item/detail/PersonAvatar';

import { getCastCol } from '../../../utils/functions';

const TVShowCast = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isLowerTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isUpperTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const tvShow = useSelector(state => state.tvShows.tvShow);

  const [cardCol, setCardCol] = useState(0);
  
  const { cast } = tvShow;
  
  useEffect(() => {
    setCardCol(getCastCol(isMobile, isLowerTablet));
  }, [isMobile, isLowerTablet, isUpperTablet, isDesktop]);

  return (
    <Grid container spacing={2}>
      {cast.map(cast => (
        <PersonAvatar
          image={cast.profile_path}
          character={cast.character}
          col={12 / cardCol}
          name={cast.name}
        />
      ))}
    </Grid>
  );
};

export default TVShowCast;

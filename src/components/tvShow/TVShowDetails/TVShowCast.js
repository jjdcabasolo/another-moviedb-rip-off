import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

import PersonAvatar from '../../common/item/detail/PersonAvatar';

import { getCastCol } from '../../../utils/functions';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.h6.fontWeight,
  },
}));

const TVShowCast = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isLowerTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isUpperTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const episodes = useSelector((state) => state.tvShows.episodes);
  const selectedEpisode = useSelector((state) => state.tvShows.selectedEpisode);

  const [cardCol, setCardCol] = useState(0);

  const { cast } = tvShow;

  const hasEpisode = selectedEpisode > 0;
  let guests = [];
  let hasGuestStars = false;
  if (hasEpisode) {
    const { guest_stars: guestStars } = episodes[selectedEpisode - 1];
    if (guestStars) {
      guests = [...guestStars];
      hasGuestStars = hasEpisode && (guestStars.length > 0);
    }
  }

  useEffect(() => {
    setCardCol(getCastCol(isMobile, isLowerTablet));
  }, [isMobile, isLowerTablet, isUpperTablet, isDesktop]);

  return (
    <Grid container spacing={2}>
      {hasEpisode && (
        <Grid item xs={12}>
          <Typography variant="body1" className={classes.title}>
            Main Cast
          </Typography>
        </Grid>
      )}
      {cast.map((person) => (
        <PersonAvatar
          image={person.profile_path}
          character={person.character}
          col={12 / cardCol}
          name={person.name}
        />
      ))}
      {hasGuestStars && (
        <Grid item xs={12}>
          <Typography variant="body1" className={classes.title}>
            Guest Cast
          </Typography>
        </Grid>
      )}
      {hasGuestStars && (
        guests.map((person) => (
          <PersonAvatar
            image={person.profile_path}
            character={person.character}
            col={12 / cardCol}
            name={person.name}
          />
        ))
      )}
    </Grid>
  );
};

export default TVShowCast;

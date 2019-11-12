import React, { useState } from 'react';

import moment from 'moment';
import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Grid, Button, useMediaQuery } from '@material-ui/core';

import MovieCastCard from './MovieCastCard';

const useStyles = makeStyles(theme => ({

}));

// CREW PLAN
// // default
// department: "Directing",
//   job: "Director",
// department: "Writing",
// department: "Production",
//   job: "Producer",
//   job: "Co-Producer",
//   job: "Executive Producer",
//   job: "Casting",
// // see more
// department: "Sound",
//   job: "Original Music Composer",
// department: "Camera",
//   job: "Director of Photography",
// department: "Editing",
//   job: "Editor",
// department: "Art",
//   job: "Production Design",
//   job: "Art Direction",
// department: "Costume & Make-Up",
//   job: "Costume Design",
//   job: "Makeup Artist",
// department: "Crew", // count
// department: "Lighting", // count
// department: "Visual Effects", // count
// // total count of crew at the end

const MovieCrew = () => {
  const classes = useStyles();
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
        {/* {movie.cast.slice(0, maxVisibleCards).map(cast => (
          <MovieCastCard content={cast} col={12 / cardCol} />
        ))}
        { showMore && (
          movie.cast.slice(maxVisibleCards, movie.cast.length).map(cast => (
            <MovieCastCard content={cast} col={12 / cardCol} />
          ))
        )} */}
        <Grid item xs={12} container justify="center" alignItems="center" direction="column">
          <Grid item>
            <Typography variant="h2">{movie.crew.length}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="button">Crew Members</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container justify="flex-end">
          <Button onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show less' : 'Show all'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default MovieCrew;

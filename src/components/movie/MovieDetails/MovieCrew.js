import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Grid, Button, useMediaQuery } from '@material-ui/core';

import CrewAvatarList from './CrewAvatarList';

import { getCrewMembers, getCrewCount } from '../../../utils/functions';

// const useStyles = makeStyles(theme => ({
// }));

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
  // const classes = useStyles();
  const theme = useTheme();
  // const highResolutionDesktop = useMediaQuery(theme.breakpoints.up('xl'));
  // const isMidTabletDesktop = useMediaQuery(theme.breakpoints.between('md', 'xl'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const movie = useSelector(state => state.movies.movie);

  const { crew } = movie;
  const [director] = getCrewMembers(crew, 'directing', ['director']);
  const [writer] = getCrewMembers(crew, 'writing');
  // const [producer, coProducer, executiveProducer, casting] = getCrewMembers(crew, 'production', ['producer', 'co-producer', 'executive producer', 'casting']);
  // const [composer] = getCrewMembers(crew, 'sound', ['original music composer']);
  // const [cinematography] = getCrewMembers(crew, 'camera', ['director of photography']);
  // const [editor] = getCrewMembers(crew, 'editing', ['editor']);
  // const [costume, makeup] = getCrewMembers(crew, 'costume & make-up', ['costume design', 'makeup artist']);
  // const [mainCrew] = getCrewMembers(crew, 'crew');
  // const [lighting] = getCrewMembers(crew, 'lighting');
  // const [visualEffects] = getCrewMembers(crew, 'visual effects');

  // console.log('director', director)
  // console.log('writer', writer)
  // console.log('producer', producer)
  // console.log('coProducer', coProducer)
  // console.log('executiveProducer', executiveProducer)
  // console.log('casting', casting)
  // console.log('composer', composer)
  // console.log('cinematography', cinematography)
  // console.log('editor', editor)
  // console.log('costume', costume)
  // console.log('makeup', makeup)
  // console.log('mainCrew', mainCrew)
  // console.log('lighting', lighting)
  // console.log('visualEffects', visualEffects)

  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <Grid container spacing={2}>
        <CrewAvatarList title={`Director${director.length > 1 ? 's' : ''}`} content={director} />
        <CrewAvatarList title={`Writer${writer.length > 1 ? 's' : ''}`} content={writer} />
        {/* { showMore && (
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

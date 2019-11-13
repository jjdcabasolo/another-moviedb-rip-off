import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useTheme } from '@material-ui/core/styles';
import { Grid, Button, useMediaQuery } from '@material-ui/core';

import CrewAvatarList from './CrewAvatarList';
import CrewCount from './CrewCount';

import { getCrewMembers } from '../../../utils/functions';
import ComponentLoader from '../../common/ComponentLoader';

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

const CREW_TO_DISPLAY = [
  {
    identifier: 'director',
    label: a => `Director${a > 1 ? 's' : ''}`,
  },
  {
    identifier: 'writer',
    label: a => `Writer${a > 1 ? 's' : ''}`,
  },
  {
    identifier: 'producer',
    label: a => `Producer${a > 1 ? 's' : ''}`,
  },
  {
    identifier: 'coProducer',
    label: a => `Co-Producer${a > 1 ? 's' : ''}`,
  },
  {
    identifier: 'executiveProducer',
    label: a => `Executive Producer${a > 1 ? 's' : ''}`,
  },
  {
    identifier: 'casting',
    label: () => 'Casting',
  },
  {
    identifier: 'composer',
    label: a => `Original Music Composer${a > 1 ? 's' : ''}`,
  },
  {
    identifier: 'cinematography',
    label: () => 'Cinematography',
  },
  {
    identifier: 'editor',
    label: a => `Editor${a > 1 ? 's' : ''}`,
  },
  {
    identifier: 'costume',
    label: () => 'Costume Design',
  },
  {
    identifier: 'makeup',
    label: a => `Makeup Artist${a > 1 ? 's' : ''}`,
  },
];

const MovieCrew = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const movie = useSelector(state => state.movies.movie);

  const [crewMembers, setCrewMembers] = useState({});
  const [masonryConfig, setMasonryConfig] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [crewCol] = useState(() => {
    if (isDesktop) return 3;
    if (isTablet) return 2;
    if (isMobile) return 1;
  });

  const {lighting, visualEffects} = crewMembers;

  useEffect(() => {
    const { crew } = movie;
    const [director] = getCrewMembers(crew, 'directing', ['director']);
    const [writer] = getCrewMembers(crew, 'writing');
    const [producer, coProducer, executiveProducer, casting] = getCrewMembers(crew, 'production', ['producer', 'co-producer', 'executive producer', 'casting']);
    const [composer] = getCrewMembers(crew, 'sound', ['original music composer']);
    const [cinematography] = getCrewMembers(crew, 'camera', ['director of photography']);
    const [editor] = getCrewMembers(crew, 'editing', ['editor']);
    const [costume, makeup] = getCrewMembers(crew, 'costume & make-up', ['costume design', 'makeup artist']);
    const [lighting] = getCrewMembers(crew, 'lighting');
    const [visualEffects] = getCrewMembers(crew, 'visual effects');
    const finalCrew = {director, writer, producer, coProducer, executiveProducer, casting, composer, cinematography, editor, costume, makeup, lighting, visualEffects};
    setCrewMembers(finalCrew);

    setMasonryConfig([]);
    CREW_TO_DISPLAY.forEach(e => {
      if (finalCrew[e.identifier].length > 0) setMasonryConfig(a => [...a, e.identifier]);
    });
  }, [movie]);

  const constructMasonryGrid = () => {
    const col = [];
    for (let i = 0; i < crewCol; ++i) {
      const colItem = [];
      for (let a = i; a < masonryConfig.length; a += crewCol) {
        if (!showMore) {
          if (masonryConfig[a] === 'executiveProducer'
          || masonryConfig[a] === 'casting'
          || masonryConfig[a] === 'composer'
          || masonryConfig[a] === 'cinematography'
          || masonryConfig[a] === 'editor'
          || masonryConfig[a] === 'costume'
          || masonryConfig[a] === 'makeup') break;
        }
        const members = crewMembers[masonryConfig[a]];
        const title = CREW_TO_DISPLAY.filter(c => c.identifier === masonryConfig[a])[0];
        colItem.push(<CrewAvatarList title={title.label(members.length)} content={members} />);
      }
      col.push(<Grid item xs={12 / crewCol}>{colItem}</Grid>);
    }
    return col;
  };

  const renderCrewCount = () => {
    const hasLighting = lighting.length > 0;
    const hasVE = visualEffects.length > 0;
    let count = 0;
    if (hasLighting) count++;
    if (hasVE) count++;
    return [
      (hasLighting && <CrewCount col={12 / count} count={lighting.length} label="Lighting" />),
      (hasVE && <CrewCount col={12 / count} count={visualEffects.length} label="Visual Effects" /> ),
    ];
  };

  if (!('director' in crewMembers)) return <ComponentLoader />

  return (
    <>
      <Grid container spacing={2}>
        { constructMasonryGrid() }
        { showMore && renderCrewCount() }
        <CrewCount count={movie.crew.length} label="Total Crew Members" isTotal />
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

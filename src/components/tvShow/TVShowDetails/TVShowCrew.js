import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';

import PersonAvatarList from '../../common/item/detail/PersonAvatarList';
import Statistic from '../../common/item/detail/Statistic';
import ComponentLoader from '../../common/ComponentLoader';

import { getCrewMembers, getCrewCol, selectEpisode } from '../../../utils/functions';

import { CREW_TO_DISPLAY } from '../../../constants';

const TVShowCrew = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isLowerTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isUpperTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const episodes = useSelector((state) => state.tvShows.episodes);
  const selectedEpisode = useSelector((state) => state.tvShows.selectedEpisode);

  const [crewMembers, setCrewMembers] = useState({});
  const [masonryConfig, setMasonryConfig] = useState([]);
  const [crewCol, setCrewCol] = useState(getCrewCol());

  const { crew } = selectEpisode(episodes, selectedEpisode);

  useEffect(() => {
    setCrewCol(getCrewCol(isMobile, isLowerTablet));
  }, [isMobile, isLowerTablet, isUpperTablet, isDesktop]);

  useEffect(() => {
    if (crew && crew.length > 0) {
      const [director] = getCrewMembers(crew, 'directing', ['director']);
      const [writer] = getCrewMembers(crew, 'writing');
      const [producer, executiveProducer] = getCrewMembers(crew, 'production', ['producer', 'executive producer']);
      const [composer] = getCrewMembers(crew, 'sound', ['original music composer']);
      const [cinematography] = getCrewMembers(crew, 'camera', ['director of photography']);
      const [editor] = getCrewMembers(crew, 'editing', ['editor']);
      const [costume, makeup] = getCrewMembers(crew, 'costume & make-up', ['costume design', 'makeup artist']);
      const [lighting] = getCrewMembers(crew, 'lighting');
      const [visualEffects] = getCrewMembers(crew, 'visual effects');
      const production = [...producer, ...executiveProducer];
      const finalCrew = {
        director,
        writer,
        production,
        composer,
        cinematography,
        editor,
        costume,
        makeup,
        lighting,
        visualEffects,
      };
      setCrewMembers(finalCrew);

      setMasonryConfig([]);
      CREW_TO_DISPLAY.forEach((e) => {
        if (finalCrew[e.identifier].length > 0) setMasonryConfig((a) => [...a, e.identifier]);
      });
    }
  }, [tvShow, crew]);

  const renderMasonryGrid = () => {
    const col = [];
    for (let i = 0; i < crewCol; i += 1) {
      const colItem = [];
      for (let a = i; a < masonryConfig.length; a += crewCol) {
        const members = crewMembers[masonryConfig[a]];
        const title = CREW_TO_DISPLAY.filter((c) => c.identifier === masonryConfig[a])[0];
        colItem.push(<PersonAvatarList title={title.label(members.length)} content={members} />);
      }
      col.push(<Grid item xs={12 / crewCol}>{colItem}</Grid>);
    }
    return col;
  };

  const renderStatistic = () => {
    const { lighting, visualEffects } = crewMembers;
    const hasLighting = lighting.length > 0;
    const hasVE = visualEffects.length > 0;
    let count = 1;
    if (hasLighting) count += 1;
    if (hasVE) count += 1;
    const col = 12 / count;
    return [
      (hasLighting && <Statistic col={col} count={lighting.length} label="Lighting" divider />),
      (hasVE && <Statistic col={col} count={visualEffects.length} label="VFX" divider />),
      <Statistic col={col} count={crew ? crew.length : 0} label="Total Crew" isTotal />,
    ];
  };

  if (!('director' in crewMembers)) return <ComponentLoader />;

  return (
    <>
      <Grid container spacing={2}>
        { renderMasonryGrid() }
        <Grid item container justify="center" alignItems="center">
          {renderStatistic()}
        </Grid>
      </Grid>
    </>
  );
};

export default TVShowCrew;

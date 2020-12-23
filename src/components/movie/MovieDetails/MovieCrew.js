import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Button, useMediaQuery } from '@material-ui/core';

import PersonAvatarList from '../../common/item/detail/PersonAvatarList';
import Statistic from '../../common/item/detail/Statistic';
import ComponentLoader from '../../common/ComponentLoader';

import { moviesActions } from '../../../reducers/ducks';

import { getCrewMembers, getCrewCol, scrollToID } from '../../../utils/functions';

import { CREW_TO_DISPLAY } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

const MovieCrew = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmallTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isBigTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();

  const movie = useSelector((state) => state.movies.movie);
  const crewShowMore = useSelector((state) => state.movies.crewShowMore);
  const dispatch = useDispatch();

  const { crew } = movie;

  const [crewMembers, setCrewMembers] = useState({});
  const [masonryConfig, setMasonryConfig] = useState([]);
  const [crewCol, setCrewCol] = useState(getCrewCol());

  useEffect(() => {
    setCrewCol(getCrewCol(isMobile, isSmallTablet));
  }, [isMobile, isSmallTablet, isBigTablet, isDesktop]);

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
  }, [movie, crew]);

  const handleButtonClick = () => {
    if (!crewShowMore) scrollToID('movie-crew');
    dispatch(moviesActions.setCrewShowMore(!crewShowMore));
  };

  const renderMasonryGrid = () => {
    const col = [];
    for (let i = 0; i < crewCol; i += 1) {
      const colItem = [];
      for (let a = i; a < masonryConfig.length; a += crewCol) {
        if (!crewShowMore) {
          if (masonryConfig[a] === 'production'
            || masonryConfig[a] === 'composer'
            || masonryConfig[a] === 'cinematography'
            || masonryConfig[a] === 'editor'
            || masonryConfig[a] === 'costume'
            || masonryConfig[a] === 'makeup') break;
        }
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
      <Statistic col={col} count={crew.length} label="Total Crew" isTotal />,
    ];
  };

  if (!('director' in crewMembers)) return <ComponentLoader />;

  return (
    <>
      <Grid container spacing={2}>
        {renderMasonryGrid()}
        {crewShowMore
          ? <Grid item container justify="center" alignItems="center">{renderStatistic()}</Grid>
          : <Statistic count={crew.length} label="Total Crew" isTotal />}
        <Grid
          className={classes.button}
          container
          item
          justify="flex-end"
          xs={12}
        >
          <Button
            onClick={handleButtonClick}
            size={isMobile ? 'small' : 'medium'}
            variant="outlined"
          >
            {crewShowMore ? 'Show less' : 'Show all'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default MovieCrew;

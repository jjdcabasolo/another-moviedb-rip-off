import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

import ItemSeeMore from '../../common/item/ItemSeeMore';
import PersonAvatarList from '../../common/item/detail/PersonAvatarList';
import Statistic from '../../common/item/detail/Statistic';

import { getCrewMembers, getCrewCol, scrollToID } from '../../../utils/functions';

import { CREW_TO_DISPLAY, MAX_CREW_ON_SHOW_LESS } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  moreCrew: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(-2),
    paddingLeft: theme.spacing(9),
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

  const {
    crew,
    original_title: originalTitle,
    title,
  } = movie;

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

  const renderMasonryGrid = (crewShowMore) => {
    const col = [];
    let colItemCount = Array(3).fill(0);

    for (let i = 0; i < crewCol; i += 1) {
      const colItem = [];
      let memberCount = 0;

      for (let a = i; a < masonryConfig.length; a += crewCol) {
        if (!crewShowMore) {
          if (masonryConfig[a] === 'composer'
            || masonryConfig[a] === 'cinematography'
            || masonryConfig[a] === 'editor'
            || masonryConfig[a] === 'costume'
            || masonryConfig[a] === 'makeup'
            || masonryConfig[a] === 'lighting'
            || masonryConfig[a] === 'visualEffects') break;
        }

        const members = [...crewMembers[masonryConfig[a]]];
        memberCount = members.length;
        const membersToDisplay = crewShowMore ? members : [...members.splice(0, MAX_CREW_ON_SHOW_LESS)];
        const crewTitle = CREW_TO_DISPLAY.filter((c) => c.identifier === masonryConfig[a])[0];
        const crewLabel = crewTitle.label(members.length);

        colItem.push(
          <PersonAvatarList
            key={`movie-crew-person-avatar-list-${crewTitle.identifier}`}
            content={membersToDisplay}
            title={crewLabel}
          />,
        );

        if (!crewShowMore && members.length > MAX_CREW_ON_SHOW_LESS) {
          colItem.push(
            <Grid item xs={col} className={classes.moreCrew}>
              <Typography variant="caption" color="textSecondary">
                {`...and ${members.length} more`}
              </Typography>
            </Grid>,
          );
        }
      }

      const updatedColItemCount = [...colItemCount];
      updatedColItemCount[i] += memberCount;
      colItemCount = [...updatedColItemCount];

      col.push(<Grid item xs={12 / crewCol} key={`movie-crew-masonry-grid-${i}`}>{colItem}</Grid>);
    }

    if (crewShowMore) console.log('col', colItemCount);

    return col;
  };

  const renderStatistic = () => (
    <Statistic
      col={12 / crew.length}
      count={crew.length}
      isTotal
      label="Total Crew"
    />
  );

  if (!('director' in crewMembers)) return null;

  return (
    <Grid container>
      <ItemSeeMore
        appbarTitle={[title || originalTitle, 'Crew']}
        collapsedClickEvent={() => scrollToID('movie-crew')}
        collapsedContent={(
          <Grid container>
            {renderMasonryGrid()}
          </Grid>
        )}
        expandedContent={(
          <Grid container spacing={2}>
            {renderMasonryGrid(true)}
            <Grid item container justify="center" alignItems="center">{renderStatistic()}</Grid>
          </Grid>
        )}
        sectionId="crew"
        seeMoreText={`Show all ${crew.length} crew`}
      />
    </Grid>
  );
};

export default MovieCrew;

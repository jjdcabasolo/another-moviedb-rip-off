import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  progressBar: {
    position: 'sticky',
    zIndex: 1,
    [theme.breakpoints.between('xs', 'lg')]: {
      bottom: 0,
      position: 'fixed',
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      top: 0,
      bottom: 'unset',
    },
  },
}));

/*
  reading progress bar taken from:
  https://nehalist.io/creating-a-reading-progress-bar-in-react/
*/
const ReadingProgress = ({ target, isVisible, isLoading }) => {
  const classes = useStyles();

  const castShowMore = useSelector((state) => state.movies.castShowMore);
  const crewShowMore = useSelector((state) => state.movies.crewShowMore);
  const drawerOpen = useSelector((state) => state.sidebar.drawerOpen);
  const isMovieLoading = useSelector((state) => state.movies.isMovieLoading);
  const isTVShowLoading = useSelector((state) => state.tvShows.isTVShowLoading);
  const movie = useSelector((state) => state.movies.movie);
  const seeMore = useSelector((state) => state.sidebar.seeMore);

  const [readingProgress, setReadingProgress] = useState(0);

  const isMovieSelected = 'id' in movie;

  const handleScroll = useCallback(() => {
    if (!target.current) return;

    const element = target.current;

    const elementBottomPos = element.offsetHeight;
    const elementHeight = element.scrollHeight;
    const elementTopPos = element.scrollTop;

    const maxProgress = elementHeight - elementBottomPos;
    const totalProgress = Math.floor((elementTopPos / maxProgress) * 100);

    if (elementBottomPos - elementTopPos === 0) {
      setReadingProgress(0);
      return;
    }

    if (elementTopPos + elementBottomPos === elementHeight) {
      setReadingProgress(100);
      return;
    }

    setReadingProgress(totalProgress);
  }, [target.current]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  useEffect(() => handleScroll(), [
    castShowMore,
    crewShowMore,
    drawerOpen,
    handleScroll,
    isMovieLoading,
    isMovieSelected,
    isTVShowLoading,
    seeMore,
    target.current,
  ]);

  if (!isVisible || isLoading) return null;

  return (
    <div className={classes.progressBar}>
      <LinearProgress variant="determinate" value={readingProgress} />
    </div>
  );
};

ReadingProgress.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  target: PropTypes.node.isRequired,
};

export default ReadingProgress;

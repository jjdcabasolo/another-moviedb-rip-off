import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  progressBar: {
    position: 'sticky',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      top: theme.spacing(6),
      position: 'fixed',
      width: '100%',
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      top: theme.spacing(6),
    },
    [theme.breakpoints.up('lg')]: {
      top: 0,
    },
  },
}));

/*
  reading progress bar taken from: 
  https://nehalist.io/creating-a-reading-progress-bar-in-react/
*/

const ReadingProgress = ({ target, isVisible }) => {
  const classes = useStyles();

  const crewShowMore = useSelector(state => state.movies.crewShowMore);
  const castShowMore = useSelector(state => state.movies.castShowMore);
  const isMovieLoading = useSelector(state => state.movies.isMovieLoading);

  const [readingProgress, setReadingProgress] = useState(0);

  const handleScroll = () => {
    if (!target.current) return;

    const element = target.current;

    const elementHeight = element.scrollHeight;
    const elementTopPos = element.scrollTop;
    const elementBottomPos = element.offsetHeight;
    
    const maxProgress = elementHeight - elementBottomPos;
    const totalProgress = Math.floor((elementTopPos / maxProgress) * 100);

    if (elementBottomPos - elementTopPos === 0) return setReadingProgress(0);    
    if (elementTopPos + elementBottomPos === elementHeight) return setReadingProgress(100);

    setReadingProgress(totalProgress);
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => handleScroll(), [target, crewShowMore, castShowMore, isMovieLoading]);

  if (!isVisible) return null;

  return (
    <div className={classes.progressBar}>
      <LinearProgress variant="determinate" value={readingProgress}/>
    </div>
  );
};

export default ReadingProgress;

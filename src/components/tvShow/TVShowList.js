import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import TVShowCard from './TVShowCard';
import TVShowCategory from './TVShowCategory';
import Note from '../common/Note';

import { NOTE_NO_API_KEY } from '../../constants';

const useStyles = makeStyles(theme => ({
  note: {
    padding: theme.spacing(8, 2),
  },
}));

const TVShowList = () => {
  const classes = useStyles();

  const category = useSelector(state => state.tvShows.category);
  const list = useSelector(state => state.tvShows.list);

  const tvShowsToDisplay = list[category];

  if (tvShowsToDisplay.length <= 0) return (
    <div className={classes.note}>
      <Note details={NOTE_NO_API_KEY} />
    </div>
  );

  return (
    <>
      <TVShowCategory isList />
      <Grid item container justify="center" spacing={2}>
        {tvShowsToDisplay.slice(0, 10).map((tvShow, rank) => <TVShowCard tvShow={tvShow} tvShowDrawerOpen col={12} rank={rank + 1} />)}
      </Grid>
    </>
  );
};

export default TVShowList;

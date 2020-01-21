import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';

import TVShowHeader from '../components/tvShow/TVShowDetails/TVShowHeader';
import TVShowStatistics from '../components/tvShow/TVShowDetails/TVShowStatistics';
import TVShowProduction from '../components/tvShow/TVShowDetails/TVShowProduction';
import ComponentLoader from '../components/common/ComponentLoader';
import Note from '../components/common/Note';
import Section from '../components/common/item/detail/Section';
import ImageCard from '../components/common/item/detail/ImageCard';

import { getTVShowDetails } from '../api';

import { tvShowsActions } from '../reducers/ducks';

import { decryptKey } from '../utils/functions';

import { NOTE_NO_SELECTED_TV_SHOW, NOTE_TV_SHOW_NOT_FOUND } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 2),
  },
  note: {
    padding: theme.spacing(8, 2),
  },
}));

const TVShows = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isTabletAbove = useMediaQuery(theme.breakpoints.up('md'));

  const tvShow = useSelector(state => state.tvShows.tvShow);
  const isTVShowLoading = useSelector(state => state.tvShows.isTVShowLoading);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(true);

  const { tvShowId } = useParams();

  const { backdrop_path, name, original_name } = tvShow;

  useEffect(() => {
    if (tvShowId) {
      getTVShowDetails(decryptKey(), tvShowId, response => {
        dispatch(tvShowsActions.setActiveTVShow(response));
        dispatch(tvShowsActions.setDetailsLoading(false));
        setIsLoaded(true);
      }, error => {
        if (error.response) {
          dispatch(tvShowsActions.setActiveTVShow({}));
          setIsLoaded(error.response.data.status_code);
        }
      });
    }
    // setTimeout(() => window.scrollTo(0, 0), 100);
  }, [tvShowId, dispatch]);

  if (tvShowId === undefined) return (
    <div className={classes.note}>
      <Note details={NOTE_NO_SELECTED_TV_SHOW} />
    </div>
  );

  if (isTVShowLoading) return <ComponentLoader />;

  if (isLoaded === 34) return (
    <div className={classes.note}>
      <Note details={NOTE_TV_SHOW_NOT_FOUND} />
    </div>
  );

  if (Object.keys(tvShow).length === 0 && tvShow.constructor === Object) return <ComponentLoader />;

  return (
    <Grid container spacing={8} className={classes.root}>
      <Section divider={false} >
        <TVShowHeader />
      </Section>
      
      <Section>
        <TVShowStatistics />
      </Section>

      <Section title="Production" col={isTabletAbove ? 6 : 12} divider={false}>
        <TVShowProduction />
      </Section>
      
      <Section title="Season list" col={isTabletAbove ? 6 : 12}>
        <ImageCard content={{
          backdrop_path,
          name: `${name || original_name} season list`,
        }} />
      </Section>
    </Grid>
  );
};

export default TVShows;

import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';

import TVShowHeader from '../components/tvShow/TVShowDetails/TVShowHeader';
import TVShowStatistics from '../components/tvShow/TVShowDetails/TVShowStatistics';
import TVShowProduction from '../components/tvShow/TVShowDetails/TVShowProduction';
import TVShowCast from '../components/tvShow/TVShowDetails/TVShowCast';
import TVShowSeasonDetails from '../components/tvShow/TVShowDetails/TVShowSeasonDetails';
import ComponentLoader from '../components/common/ComponentLoader';
import Note from '../components/common/Note';
import Section from '../components/common/item/detail/Section';
import ImageCard from '../components/common/item/detail/ImageCard';
import ItemLinks from '../components/common/item/detail/ItemLinks';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const selectedSeason = useSelector(state => state.tvShows.selectedSeason);
  const tvShow = useSelector(state => state.tvShows.tvShow);
  const seasonDrawerOpen = useSelector(state => state.tvShows.seasonDrawerOpen);
  const isTVShowLoading = useSelector(state => state.tvShows.isTVShowLoading);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(true);

  const { tvShowId } = useParams();

  const {
    backdrop_path,
    name,
    original_name,
    facebook,
    instagram,
    twitter,
    youtube,
    imdb,
    tmdb,
    number_of_seasons,
  } = tvShow;

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

  const handleSeasonListClick = () => {
    dispatch(tvShowsActions.setSeasonDrawer(!seasonDrawerOpen));
  };

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
      <Section divider={false} anchorId="tvshow-budget">
        <TVShowHeader />
      </Section>
      
      <Section anchorId="tvshow-statistics">
        <TVShowStatistics />
      </Section>
      
      <Section
        title="Season list"
        col={isTabletAbove ? 6 : 12}
        divider={isMobile}
        anchorId="tvshow-season-list"
      >
        <ImageCard
          content={{
            backdrop_path,
            name: `${name || original_name} season list`,
          }}
          onClick={handleSeasonListClick}
        />
      </Section>

      <Section
        title="Production"
        col={isTabletAbove ? 6 : 12}
        anchorId="tvshow-production"
      >
        <TVShowProduction />
      </Section>

      <Section
        title={`Season ${selectedSeason}`}
        anchorId="tvshow-season-details"
        visible={selectedSeason !== 0}
        chipContent={number_of_seasons === selectedSeason ? "Latest" : "Finished"}
      >
        <TVShowSeasonDetails />
      </Section>

      <Section title="Main cast" anchorId="tvshow-cast">
        <TVShowCast />
      </Section>

      <Section divider={false} anchorId="tvshow-links">
        <ItemLinks
          facebook={facebook}
          instagram={instagram}
          twitter={twitter}
          youtube={youtube}
          imdb={imdb}
          tmdb={tmdb}
        />
      </Section>
    </Grid>
  );
};

export default TVShows;

import React, { useEffect, useState, useRef } from 'react';

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
import SeasonDrawer from '../components/tvShow/SeasonDrawer';

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

  const selectedSeason = useSelector(state => state.tvShows.selectedSeason);
  const tvShow = useSelector(state => state.tvShows.tvShow);
  const seasonDrawerOpen = useSelector(state => state.tvShows.seasonDrawerOpen);
  const isTVShowLoading = useSelector(state => state.tvShows.isTVShowLoading);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(true);

  const seasonDetailRef = useRef(null);

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
    created_by,
    production_companies,
    cast,
  } = tvShow;

  const hasProduction = created_by
    && created_by.length > 0
    && production_companies
    && production_companies.length > 0;

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
        title="Production"
        anchorId="tvshow-production"
        visible={hasProduction}
      >
        <TVShowProduction />
      </Section>
      
      <Section
        title="Season list"
        anchorId="tvshow-season-list"
        visible={selectedSeason === 0}
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
        title={`Season ${selectedSeason}`}
        anchorId="tvshow-season-details"
        visible={selectedSeason !== 0}
        chipContent={number_of_seasons === selectedSeason ? "Latest" : "Finished"}
      >
        <div ref={seasonDetailRef}>
          <TVShowSeasonDetails />
        </div>
      </Section>

      <Section
        anchorId="tvshow-cast"
        title="Main cast"
        visible={cast.length > 0}
      >
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

      <SeasonDrawer
        seasonDetailRef={seasonDetailRef}
      />
    </Grid>
  );
};

export default TVShows;

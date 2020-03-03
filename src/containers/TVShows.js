import React, { useEffect, useState, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import ComponentLoader from '../components/common/ComponentLoader';
import ImageCard from '../components/common/item/detail/ImageCard';
import ItemLinks from '../components/common/item/detail/ItemLinks';
import Note from '../components/common/Note';
import SeasonDrawer from '../components/tvShow/SeasonDrawer';
import Section from '../components/common/item/detail/Section';
import TVShowCast from '../components/tvShow/TVShowDetails/TVShowCast';
import TVShowHeader from '../components/tvShow/TVShowDetails/TVShowHeader';
import TVShowProduction from '../components/tvShow/TVShowDetails/TVShowProduction';
import TVShowSeasonDetails from '../components/tvShow/TVShowDetails/TVShowSeasonDetails';
import TVShowStatistics from '../components/tvShow/TVShowDetails/TVShowStatistics';

import { getTVShowDetails } from '../api';

import { tvShowsActions } from '../reducers/ducks';

import { decryptKey } from '../utils/functions';

import { NOTE_NO_SELECTED_TV_SHOW, NOTE_TV_SHOW_NOT_FOUND } from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2),
  },
  note: {
    padding: theme.spacing(8, 2),
  },
}));

const TVShows = () => {
  const classes = useStyles();

  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);
  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const seasonDrawerOpen = useSelector((state) => state.tvShows.seasonDrawerOpen);
  const isTVShowLoading = useSelector((state) => state.tvShows.isTVShowLoading);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(true);

  const seasonDetailRef = useRef(null);

  const { tvShowId } = useParams();

  const {
    backdrop_path: backdropPath,
    cast,
    created_by: createdBy,
    facebook,
    imdb,
    instagram,
    name,
    number_of_seasons: seasonNumber,
    original_name: originalName,
    production_companies: companies,
    tmdb,
    twitter,
    youtube,
  } = tvShow;

  const hasProduction = createdBy
    && createdBy.length > 0
    && companies
    && companies.length > 0;

  useEffect(() => {
    if (tvShowId) {
      getTVShowDetails(decryptKey(), tvShowId, (response) => {
        dispatch(tvShowsActions.setActiveTVShow(response));
        dispatch(tvShowsActions.setDetailsLoading(false));
        setIsLoaded(true);
      }, (error) => {
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

  if (tvShowId === undefined) {
    return (
      <div className={classes.note}>
        <Note details={NOTE_NO_SELECTED_TV_SHOW} />
      </div>
    );
  }

  if (isTVShowLoading) return <ComponentLoader />;

  if (isLoaded === 34) {
    return (
      <div className={classes.note}>
        <Note details={NOTE_TV_SHOW_NOT_FOUND} />
      </div>
    );
  }

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
        anchorId="tvshow-production"
        title="Production"
        visible={hasProduction}
      >
        <TVShowProduction />
      </Section>

      <Section
        anchorId="tvshow-season-list"
        title="Season list"
        visible={selectedSeason === 0}
      >
        <ImageCard
          content={{
            backdropPath,
            name: `${name || originalName} season list`,
          }}
          col={6}
          onClick={handleSeasonListClick}
        />
      </Section>

      <Section
        anchorId="tvshow-season-details"
        chipContent={seasonNumber === selectedSeason ? 'Latest' : 'Finished'}
        title={`Season ${selectedSeason}`}
        visible={selectedSeason !== 0}
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
          imdb={imdb}
          instagram={instagram}
          tmdb={tmdb}
          twitter={twitter}
          youtube={youtube}
        />
      </Section>

      <SeasonDrawer
        seasonDetailRef={seasonDetailRef}
      />
    </Grid>
  );
};

export default TVShows;

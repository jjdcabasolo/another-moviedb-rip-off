import React, { useEffect, useState, useRef } from 'react';

import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';

import ComponentLoader from '../components/common/ComponentLoader';
import ItemFooter from '../components/common/item/ItemFooter';
import Note from '../components/common/Note';
import ScrollToTop from '../components/common/ScrollToTop';
import SeasonDrawer from '../components/tvShow/SeasonDrawer';
import Section from '../components/common/item/detail/Section';
import TVShowCast from '../components/tvShow/TVShowDetails/TVShowCast';
import TVShowEpisodeDetails from '../components/tvShow/TVShowDetails/TVShowEpisodeDetails';
import TVShowHeader from '../components/tvShow/TVShowDetails/TVShowHeader';
import TVShowProduction from '../components/tvShow/TVShowDetails/TVShowProduction';
import TVShowScreenshots from '../components/tvShow/TVShowDetails/TVShowScreenshots';
import TVShowSeasonDetails from '../components/tvShow/TVShowDetails/TVShowSeasonDetails';
import TVShowStatistics from '../components/tvShow/TVShowDetails/TVShowStatistics';
import TVShowCrew from '../components/tvShow/TVShowDetails/TVShowCrew';

import { getTVShowDetails } from '../api';

import { tvShowsActions } from '../reducers/ducks';

import { decryptKey, selectEpisode, selectSeason } from '../utils/functions';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const episodes = useSelector((state) => state.tvShows.episodes);
  const itemDrawerOpen = useSelector((state) => state.sidebar.itemDrawerOpen);
  const isTVShowLoading = useSelector((state) => state.tvShows.isTVShowLoading);
  const selectedEpisode = useSelector((state) => state.tvShows.selectedEpisode);
  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);
  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(true);

  const seasonDetailRef = useRef(null);

  const { tvShowId } = useParams();

  const {
    cast,
    created_by: createdBy,
    number_of_episodes: numberOfEpisodes,
    number_of_seasons: numberOfSeasons,
    last_episode_to_air: lastEpisodeToAir,
    production_companies: productionCompanies,
    seasons,
    tmdb,
    name,
    original_name: originalName,
    first_air_date: firstAirDate,
  } = tvShow;

  const currentSeason = seasons && selectSeason(seasons, selectedSeason);
  const currentEpisode = selectEpisode(episodes, selectedEpisode);
  const latestEpisode = lastEpisodeToAir ? lastEpisodeToAir.episode_number : -1;
  const hasProduction = (createdBy && createdBy.length > 0)
    || (productionCompanies && productionCompanies.length > 0);
  const hasEpisode = selectedEpisode > 0;
  const hasEpisodeList = episodes.length > 0
    && episodes.length >= selectedEpisode
    && selectedEpisode !== 0;

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
    <>
      <Grid container spacing={isMobile ? 4 : 8} className={classes.root}>
        <Section
          anchorId="tvshow-budget"
          divider={false}
          isCollapsible={false}
          visible={tvShow}
        >
          <TVShowHeader />
        </Section>

        <Section
          anchorId="tvshow-statistics"
          isCollapsible={false}
          visible={numberOfEpisodes || numberOfSeasons}
        >
          <TVShowStatistics />
        </Section>

        <Section
          anchorId="tvshow-season-details"
          chipContent={numberOfSeasons === selectedSeason ? 'Latest' : 'Finished'}
          title={`Season ${selectedSeason}`}
          visible={currentSeason.air_date}
        >
          <div ref={seasonDetailRef}>
            <TVShowSeasonDetails />
          </div>
        </Section>

        <Section visible={currentSeason.poster_path}>
          <TVShowScreenshots />
        </Section>

        <Section
          anchorId="tvshow-episode-details"
          chipContent={numberOfSeasons === selectedSeason && latestEpisode === selectedEpisode ? 'Latest' : 'Finished'}
          title={hasEpisodeList ? `Episode ${selectedEpisode}: ${currentEpisode.name}` : ''}
          visible={hasEpisodeList}
        >
          <TVShowEpisodeDetails />
        </Section>

        <Section
          anchorId="tvshow-cast"
          title={hasEpisode ? 'Cast' : 'Main cast'}
          visible={cast.length > 0}
        >
          <TVShowCast />
        </Section>

        <Section
          anchorId="tvshow-crew"
          title="Crew"
          visible={currentEpisode.crew && currentEpisode.crew.length > 0}
        >
          <TVShowCrew />
        </Section>

        <Section
          anchorId="tvshow-production"
          title="Production"
          visible={hasProduction}
        >
          <TVShowProduction />
        </Section>

        <Section
          anchorId="tvshow-end-credits"
          divider={false}
        >
          <ItemFooter
            companies={productionCompanies.map((e) => e.name)}
            link={tmdb}
            title={name || originalName}
            year={moment(firstAirDate).format('YYYY')}
          />
        </Section>
      </Grid>
      <SeasonDrawer
        seasonDetailRef={seasonDetailRef}
      />
      {!itemDrawerOpen && <ScrollToTop />}
    </>
  );
};

export default TVShows;

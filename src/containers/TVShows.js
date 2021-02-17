import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';

import ComponentLoader from '../components/common/ComponentLoader';
import ItemFooter from '../components/common/item/ItemFooter';
import Note from '../components/common/Note';
import ScrollToTop from '../components/common/ScrollToTop';
import Section from '../components/common/item/detail/Section';
import TVShowCast from '../components/tvShow/TVShowDetails/TVShowCast';
import TVShowEpisodes from '../components/tvShow/TVShowDetails/TVShowEpisodes';
import TVShowHeader from '../components/tvShow/TVShowDetails/TVShowHeader';
import TVShowProduction from '../components/tvShow/TVShowDetails/TVShowProduction';
import TVShowRecommendations from '../components/tvShow/TVShowDetails/TVShowRecommendations';
import TVShowSeasonDetails from '../components/tvShow/TVShowDetails/TVShowSeasonDetails';
import TVShowSeasonList from '../components/tvShow/TVShowDetails/TVShowSeasonList';
import TVShowStatistics from '../components/tvShow/TVShowDetails/TVShowStatistics';

import { getTVShowDetails, getTVShowSeasonDetails } from '../api';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const episodes = useSelector((state) => state.tvShows.episodes);
  const itemDrawerOpen = useSelector((state) => state.sidebar.itemDrawerOpen);
  const isTVShowLoading = useSelector((state) => state.tvShows.isTVShowLoading);
  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(true);

  const { tvShowId } = useParams();

  const {
    cast,
    created_by: createdBy,
    first_air_date: firstAirDate,
    name,
    number_of_episodes: numberOfEpisodes,
    number_of_seasons: numberOfSeasons,
    original_name: originalName,
    production_companies: productionCompanies,
    recommendations,
    seasons,
    tmdb,
  } = tvShow;

  const sectionVisibility = {
    cast: cast && cast.length > 0,
    episodes: episodes.filter((e) => (!e.air_date && e.air_date.length > 0)
      || moment(e.air_date).diff(moment()) < 0).length > 0,
    production: (createdBy && createdBy.length > 0)
      || (productionCompanies && productionCompanies.length > 0),
    recommendations: recommendations && recommendations.length > 0,
    seasonList: seasons && seasons.length > 0,
  };
  const hasStatistics = !Number.isNaN(numberOfEpisodes)
    && !Number.isNaN(numberOfSeasons)
    && (numberOfEpisodes !== 0 && numberOfSeasons !== 0);

  useEffect(() => {
    if (tvShowId) {
      getTVShowDetails(decryptKey(), tvShowId, (tvShowResponse) => {
        const { seasons: fetchedSeason } = tvShowResponse;

        if (fetchedSeason) {
          const { season_number: latestSeason } = fetchedSeason
            .sort((a, b) => b.season_number - a.season_number)
            .find((e) => e.season_number > 0 && e.air_date);

          getTVShowSeasonDetails(decryptKey(), tvShowId, latestSeason, (episodeResponse) => {
            dispatch(tvShowsActions.setActiveTVShow(tvShowResponse, episodeResponse, latestSeason));
            dispatch(tvShowsActions.setDetailsLoading(false));
            setIsLoaded(true);
          }, (error) => {
            dispatch(tvShowsActions.setActiveTVShow({}));
            setIsLoaded(error.response.data.status_code);
          });
        }
      }, (error) => {
        if (error.response) {
          dispatch(tvShowsActions.setActiveTVShow({}));
          setIsLoaded(error.response.data.status_code);
        }
      });
    }
  }, [tvShowId, dispatch]);

  if (tvShowId === undefined) {
    return (
      <div className={classes.note}>
        <Note details={NOTE_NO_SELECTED_TV_SHOW} />
      </div>
    );
  }

  if (isTVShowLoading) {
    return <ComponentLoader location="itemcontainer" />;
  }

  if (isLoaded === 34) {
    return (
      <div className={classes.note}>
        <Note details={NOTE_TV_SHOW_NOT_FOUND} />
      </div>
    );
  }

  if (Object.keys(tvShow).length === 0 && tvShow.constructor === Object) {
    return <ComponentLoader location="itemcontainer" />;
  }

  return (
    <>
      <Grid container spacing={isMobile ? 4 : 8} className={classes.root}>
        <Section
          anchorId="tvshow-budget"
          divider={!hasStatistics}
          isCollapsible={false}
          visible={Object.keys(tvShow).length !== 0 && tvShow.constructor === Object}
        >
          <TVShowHeader sectionVisibility={sectionVisibility} />
        </Section>

        <Section
          anchorId="tvshow-statistics"
          isCollapsible={false}
          visible={hasStatistics}
        >
          <TVShowStatistics />
        </Section>

        <Section
          anchorId="tvshow-seasons"
          divider={false}
          title="Seasons"
          visible={sectionVisibility.seasonList}
        >
          <TVShowSeasonList />
        </Section>

        <Section
          anchorId="tvshow-season-details"
          divider={!sectionVisibility.episodes}
          isCollapsible={false}
          visible={sectionVisibility.seasonList}
        >
          <TVShowSeasonDetails />
        </Section>

        <Section
          anchorId="tvshow-episodes"
          isCollapsible={false}
          title="Episodes"
          visible={sectionVisibility.episodes}
        >
          <TVShowEpisodes />
        </Section>

        <Section
          anchorId="tvshow-cast"
          title="Cast"
          visible={sectionVisibility.cast}
        >
          <TVShowCast />
        </Section>

        <Section
          anchorId="tvshow-production"
          title="Production"
          visible={sectionVisibility.production}
        >
          <TVShowProduction />
        </Section>

        <Section
          anchorId="tvshow-recommendations"
          title="Recommendations"
          visible={sectionVisibility.recommendations}
        >
          <TVShowRecommendations anchorId="tvshow-recommendations" />
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
      {!itemDrawerOpen && <ScrollToTop />}
    </>
  );
};

export default TVShows;

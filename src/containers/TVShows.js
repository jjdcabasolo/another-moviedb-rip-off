import React, { useEffect, useState } from "react";

import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { usePath } from "../hooks";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, useMediaQuery } from "@material-ui/core";

import ComponentLoader from "../components/common/ComponentLoader";
import ErrorBoundary from "../components/navigation/ErrorBoundary";
import ItemFooter from "../components/common/item/ItemFooter";
import Note from "../components/common/Note";
import ScrollToTop from "../components/common/ScrollToTop";
import Section from "../components/common/item/detail/Section";
import TVShowCast from "../components/tvShow/TVShowDetails/TVShowCast";
import TVShowEpisodes from "../components/tvShow/TVShowDetails/TVShowEpisodes";
import TVShowHeader from "../components/tvShow/TVShowDetails/TVShowHeader";
import TVShowProduction from "../components/tvShow/TVShowDetails/TVShowProduction";
import TVShowRecommendations from "../components/tvShow/TVShowDetails/TVShowRecommendations";
import TVShowReviews from "../components/tvShow/TVShowDetails/TVShowReviews";
import TVShowSeasonDetails from "../components/tvShow/TVShowDetails/TVShowSeasonDetails";
import TVShowSeasonList from "../components/tvShow/TVShowDetails/TVShowSeasonList";

import { getTVShowDetails, getTVShowSeasonDetails } from "../api";

import { tvShowsActions } from "../reducers/ducks";

import {
  NOTE_NO_SELECTED_TV_SHOW,
  NOTE_TV_SHOW_NOT_FOUND,
  NOTE_SEARCH,
} from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2),
  },
  note: {
    padding: theme.spacing(16, 2),
  },
}));

const TVShows = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const classes = useStyles();

  const episodes = useSelector((state) => state.tvShows.episodes);
  const itemDrawerOpen = useSelector((state) => state.sidebar.itemDrawerOpen);
  const isSearchOpen = useSelector((state) => state.sidebar.isSearchOpen);
  const isTVShowLoading = useSelector((state) => state.tvShows.isTVShowLoading);
  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(true);

  const [, tvShowId] = usePath();

  const {
    cast,
    created_by: createdBy,
    first_air_date: firstAirDate,
    name,
    original_name: originalName,
    production_companies: productionCompanies,
    recommendations,
    reviews,
    seasons,
    tmdb,
  } = tvShow;

  const filteredEpisodes = episodes.filter(
    (e) =>
      (e.air_date !== null && e.air_date.length > 0) ||
      moment(e.air_date).diff(moment()) < 0
  );
  const sectionVisibility = {
    cast: cast && cast.length > 0,
    episodes: filteredEpisodes && filteredEpisodes.length > 0,
    production:
      (createdBy && createdBy.length > 0) ||
      (productionCompanies && productionCompanies.length > 0),
    recommendations: recommendations && recommendations.length > 0,
    reviews: reviews && reviews.length > 0,
    seasonList: seasons && seasons.length > 0,
  };

  useEffect(() => {
    if (tvShowId === "search") return;

    if (tvShowId) {
      const parmesanio = process.env.REACT_APP_TMDB_PARMESANIO;

      getTVShowDetails(
        parmesanio,
        tvShowId,
        (tvShowResponse) => {
          const { seasons: fetchedSeason } = tvShowResponse;

          if (fetchedSeason && fetchedSeason.length > 0) {
            const { season_number: latestSeason } = fetchedSeason
              .sort((a, b) => b.season_number - a.season_number)
              .find((e) => e.season_number > 0 && e.air_date);

            getTVShowSeasonDetails(
              parmesanio,
              tvShowId,
              latestSeason,
              (episodeResponse) => {
                dispatch(
                  tvShowsActions.setActiveTVShow(
                    tvShowResponse,
                    episodeResponse,
                    latestSeason
                  )
                );
                setIsLoaded(true);
              },
              (error) => {
                if (error.response) {
                  dispatch(tvShowsActions.setActiveTVShow({}));
                  setIsLoaded(error.response.data.status_code);
                }
              },
              () => {
                dispatch(tvShowsActions.setDetailsLoading(false));
              }
            );
          } else {
            // no seasons/episodes
            dispatch(tvShowsActions.setActiveTVShow(tvShowResponse, {}, 0));
          }
        },
        (error) => {
          if (error.response) {
            dispatch(tvShowsActions.setActiveTVShow({}));
            setIsLoaded(error.response.data.status_code);
          }
        },
        () => {
          setIsLoaded(true);
          dispatch(tvShowsActions.setDetailsLoading(false));
        }
      );
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
    if (isSearchOpen) {
      return (
        <div className={classes.note}>
          <Note details={NOTE_SEARCH} />
        </div>
      );
    }

    return <ComponentLoader location="itemcontainer" />;
  }

  return (
    <ErrorBoundary>
      <Grid container spacing={isMobile ? 4 : 8} className={classes.root}>
        <Section
          anchorId="tvshow-budget"
          isCollapsible={false}
          visible={
            Object.keys(tvShow).length !== 0 && tvShow.constructor === Object
          }
        >
          <TVShowHeader sectionVisibility={sectionVisibility} />
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
          anchorId="tvshow-reviews"
          divider
          title="Reviews"
          visible={sectionVisibility.reviews}
        >
          <TVShowReviews />
        </Section>

        <Section
          anchorId="tvshow-recommendations"
          title="Recommendations"
          visible={sectionVisibility.recommendations}
        >
          <TVShowRecommendations anchorId="tvshow-recommendations" />
        </Section>

        <Section anchorId="tvshow-end-credits" divider={false}>
          <ItemFooter
            companies={productionCompanies.map((e) => e.name)}
            link={tmdb}
            title={name || originalName}
            year={firstAirDate ? moment(firstAirDate).format("YYYY") : ""}
          />
        </Section>
      </Grid>
      {!itemDrawerOpen && <ScrollToTop />}
    </ErrorBoundary>
  );
};

export default TVShows;

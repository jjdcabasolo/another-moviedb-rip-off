import React from "react";

import moment from "moment";
import { useSelector } from "react-redux";

import { useTheme } from "@material-ui/core/styles";
import { Grid, useMediaQuery } from "@material-ui/core";

import ComponentLoader from "../../common/ComponentLoader";
import ItemLazyLoad from "../../common/item/ItemLazyLoad";
import ItemSeeMore from "../../common/item/ItemSeeMore";

import { scrollToID } from "../../../utils/functions";

import TVShowEpisode from "./TVShowEpisode";

const TVShowEpisodes = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const episodes = useSelector((state) => state.tvShows.episodes);
  const isSeasonLoading = useSelector((state) => state.tvShows.isSeasonLoading);
  const isTVShowLoading = useSelector((state) => state.tvShows.isTVShowLoading);
  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);
  const tvShow = useSelector((state) => state.tvShows.tvShow);

  const { name, original_name: originalName } = tvShow;

  const maxEpisodesToShow = isMobile ? 1 : 2;
  const filteredEpisodes = episodes.filter(
    (e) =>
      (e.air_date !== null && e.air_date.length > 0) ||
      moment(e.air_date).diff(moment()) < 0
  );

  const renderEpisodeList = (episodesToDisplay, isCollapsed) => (
    <Grid container spacing={isMobile ? 3 : 2}>
      <ItemLazyLoad
        contents={episodesToDisplay}
        hideLoader={isCollapsed}
        node={<TVShowEpisode />}
        otherProps={{ isCollapsed }}
        type="tvShowEpisode"
      />
    </Grid>
  );

  if (isSeasonLoading || isTVShowLoading) {
    return (
      <ComponentLoader
        label={`Getting episodes from Season ${selectedSeason}...`}
      />
    );
  }

  return (
    <ItemSeeMore
      appbarTitle={[name || originalName, `Season ${selectedSeason} Episodes`]}
      collapsedClickEvent={() => scrollToID("tvshow-episodes")}
      collapsedContent={renderEpisodeList(
        filteredEpisodes.slice(0, maxEpisodesToShow),
        true
      )}
      expandedContent={renderEpisodeList(filteredEpisodes, false)}
      isButtonShown={filteredEpisodes.length > maxEpisodesToShow}
      isEpisode
      maxWidth="sm"
      sectionId="episodes"
      seeMoreText={`Show all ${filteredEpisodes.length} episodes`}
    />
  );
};

export default TVShowEpisodes;

export const getTVShowStatus = (status) => {
  switch (status) {
    case "Ended":
      return "Finished";
    case "Returning Series":
      return "Ongoing";
    default:
      return status;
  }
};

export const selectSeason = (seasons, seasonNumber) => {
  const filteredSeason = seasons.filter(
    (season) => season.season_number === seasonNumber
  );

  if (filteredSeason.length > 0) return filteredSeason[0];

  return {};
};

export const selectEpisode = (episodes, episodeNumber) => {
  const filteredEpisode = episodes.filter(
    (episode) => episode.episode_number === episodeNumber
  );

  if (filteredEpisode.length > 0) return filteredEpisode[0];

  return {};
};

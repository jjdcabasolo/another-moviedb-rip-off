export const getTVShowStatus = (status) => {
  if (status === 'Ended') return 'Finished';
  if (status === 'Returning Series') return 'Ongoing';
  return 'New undefined status!';
};

export const selectSeason = (seasons, seasonNumber) => {
  const filterSeason = seasons.filter((season) => season.season_number === seasonNumber);
  console.log('@utils preselection', filterSeason, seasonNumber);
  if (filterSeason.length > 0) return filterSeason[0];
  console.log('@utils notfound');
  return {};
};

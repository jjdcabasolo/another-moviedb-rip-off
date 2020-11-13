export const TV_SHOW_DRAWER_CATEGORY_CHIPS = [
  {
    label: 'Airing Today',
    identifier: 'airingToday',
    isActive: (e) => e === 'airingToday',
  },
  {
    label: 'On The Air',
    identifier: 'onTheAir',
    isActive: (e) => e === 'onTheAir',
  },
  {
    label: 'Popular',
    identifier: 'popular',
    isActive: (e) => e === 'popular',
  },
  {
    label: 'Top Rated',
    identifier: 'topRated',
    isActive: (e) => e === 'topRated',
  },
];

export const TV_SHOW_BREADCRUMBS_CONFIG = [
  {
    label: 'Seasons',
    link: '#tvshow-season-details',
  },
  {
    label: 'Episodes',
    link: '#tvshow-episode-details',
  },
  {
    label: 'Cast',
    link: '#tvshow-cast',
  },
  {
    label: 'Crew',
    link: '#tvshow-crew',
  },
  {
    label: 'Production',
    link: '#tvshow-production',
  },
];

export const TV_SHOW_OVERVIEW_MAX_WORDS = 30;

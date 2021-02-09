import { MOVIE_OVERVIEW_MAX_WORDS } from './movies';

export const TV_SHOW_DRAWER_CATEGORY_CHIPS = [
  {
    label: 'Trending',
    identifier: 'trending',
    isActive: (e) => e === 'trending',
  },
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
    link: '#tvshow-seasons',
    visibilityId: 'seasons',
  },
  {
    label: 'Episodes',
    link: '#tvshow-episodes',
    visibilityId: 'episodes',
  },
  {
    label: 'Cast',
    link: '#tvshow-cast',
    visibilityId: 'cast',
  },
  {
    label: 'Production',
    link: '#tvshow-production',
    visibilityId: 'production',
  },
  {
    label: 'Recommendations',
    link: '#tvshow-recommendations',
    visibilityId: 'recommendations',
  },
];

export const TV_SHOW_OVERVIEW_MAX_WORDS = MOVIE_OVERVIEW_MAX_WORDS;

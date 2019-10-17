import { SIDEBAR_WIDTH } from './sidebar';

export const API_KEY_DIALOG_TITLE = 'Enter TMDb API key';

export const API_KEY_DIALOG_SUBTITLE =  'To view the contents of this application, you need to enter your own API key. ';

export const API_KEY_DIALOG_TMDB_API_LINK = 'https://developers.themoviedb.org/3/getting-started/introduction';

export const API_KEY_DIALOG_TMDB_LINK = 'https://www.themoviedb.org';

export const API_KEY_DIALOG_NOTE =  'Your API key will be encrypted throughout your session. ';

export const API_KEY_DIALOG_MISSING_USERNAME = 'Username is missing!';

export const API_KEY_DIALOG_MISSING_API_KEY = 'API key is missing!';

export const API_KEY_DIALOG_HAS_KEY = 'You had already entered your API key. You can view the app with data live from ';

export const MOVIE_DRAWER_TMDB_IMAGE_PREFIX = 'http://image.tmdb.org/t/p/w780';

export const MOVIE_DRAWER_CATEGORY_CHIPS = [
  {
    label: 'Now Playing',
    identifier: 'nowPlaying',
    isActive: e => e === 'nowPlaying',
  },
  {
    label: 'Upcoming',
    identifier: 'upcoming',
    isActive: e => e === 'upcoming',
  },
  {
    label: 'Popular',
    identifier: 'popular',
    isActive: e => e === 'popular',
  },
  {
    label: 'Top Rated',
    identifier: 'topRated',
    isActive: e => e === 'topRated',
  },
];

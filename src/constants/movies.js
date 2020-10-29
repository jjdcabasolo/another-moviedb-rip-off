export const API_KEY_DIALOG_TITLE = 'Enter TMDb API key';

export const API_KEY_DIALOG_SUBTITLE = 'To view the contents of this application, you need to enter your own API key. ';

export const API_KEY_DIALOG_TMDB_API_LINK = 'https://developers.themoviedb.org/3/getting-started/introduction';

export const API_KEY_DIALOG_TMDB_LINK = 'https://www.themoviedb.org';

export const API_KEY_DIALOG_NOTE = 'Your API key will be encrypted throughout your session. ';

export const API_KEY_DIALOG_MISSING_USERNAME = 'Username is missing!';

export const API_KEY_DIALOG_MISSING_API_KEY = 'API key is missing!';

export const API_KEY_DIALOG_HAS_KEY = 'You had already entered your API key. You can view the app with data live from ';

export const MOVIE_DRAWER_TMDB_IMAGE_PREFIX = 'http://image.tmdb.org/t/p/';

export const MOVIE_DRAWER_CATEGORY_CHIPS = [
  {
    label: 'Now Playing',
    identifier: 'nowPlaying',
    isActive: (e) => e === 'nowPlaying',
  },
  {
    label: 'Upcoming',
    identifier: 'upcoming',
    isActive: (e) => e === 'upcoming',
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
  {
    label: 'Highest Grossing',
    identifier: 'highestGrossing',
    isActive: (e) => e === 'highestGrossing',
  },
];

// CREW PLAN
// // default
// department: "Directing",
//   job: "Director",
// department: "Writing",
// department: "Production",
//   job: "Producer",
//   job: "Co-Producer",
//   job: "Executive Producer",
//   job: "Casting",
// // see more
// department: "Sound",
//   job: "Original Music Composer",
// department: "Camera",
//   job: "Director of Photography",
// department: "Editing",
//   job: "Editor",
// department: "Art",
//   job: "Production Design",
//   job: "Art Direction",
// department: "Costume & Make-Up",
//   job: "Costume Design",
//   job: "Makeup Artist",
// department: "Crew", // count
// department: "Lighting", // count
// department: "Visual Effects", // count
// // total count of crew at the end

export const CREW_TO_DISPLAY = [
  {
    identifier: 'director',
    label: () => 'Film Direction',
  },
  {
    identifier: 'writer',
    label: (a) => `Screenwriter${a > 1 ? 's' : ''}`,
  },
  {
    identifier: 'production',
    label: () => 'Key Production',
  },
  {
    identifier: 'composer',
    label: () => 'Music',
  },
  {
    identifier: 'cinematography',
    label: () => 'Cinematography',
  },
  {
    identifier: 'editor',
    label: (a) => `Film Editor${a > 1 ? 's' : ''}`,
  },
  {
    identifier: 'costume',
    label: () => 'Art',
  },
  {
    identifier: 'makeup',
    label: () => 'Hair and Make-up',
  },
];

export const MOVIE_BREADCRUMBS_CONFIG = [
  {
    label: 'Trailer',
    link: '#movie-trailer',
  },
  {
    label: 'Cast',
    link: '#movie-cast',
  },
  {
    label: 'Crew',
    link: '#movie-crew',
  },
  {
    label: 'Production',
    link: '#movie-production',
  },
];

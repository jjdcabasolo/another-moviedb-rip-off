import React from 'react';
import {
  MovieTwoTone,
  LiveTvTwoTone,
  VpnKeyTwoTone,
  CloudOffTwoTone,
} from '@material-ui/icons';

export const NOTE_NO_API_KEY = {
  icon: className => <VpnKeyTwoTone className={className} />,
  header: 'Set your TMDb API key.',
  content: [
    'It seems you have not yet set a TMDb API key.',
    'Set it now on the sidebar to fetch contents from The Movie Database.',
  ],
};

export const NOTE_NO_SELECTED_MOVIE = {
  icon: className => <MovieTwoTone className={className} />,
  header: 'No movie selected yet.',
  content: [
    'To view a movie detail, select one from the left panel.',
  ],
};

export const NOTE_NO_SELECTED_TV_SHOW = {
  icon: className => <LiveTvTwoTone className={className} />,
  header: 'No TV Show selected yet.',
  content: [
    'To view a TV Show detail, select one from the left panel.',
  ],
};

export const NOTE_OFFLINE = {
  icon: className => <CloudOffTwoTone className={className} />,
  header: 'You are offline.',
  content: [
    'Check your device\'s internet connection.',
    'Contents will load once you go online.',
  ],
};

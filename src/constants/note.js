import React from 'react';

import { IconButton } from '@material-ui/core';
import {
  CloudOffTwoTone,
  ErrorTwoTone,
  LiveTvTwoTone,
  MovieTwoTone,
  NaturePeopleTwoTone,
  PlayCircleFilledTwoTone,
  VpnKeyTwoTone,
} from '@material-ui/icons';

export const NOTE_NO_API_KEY = {
  icon: (className) => <VpnKeyTwoTone className={className} />,
  header: 'Set your TMDb API key.',
  content: [
    'It seems you have not yet set a TMDb API key.',
    'Set it now on the sidebar to fetch contents from The Movie Database.',
  ],
};

export const NOTE_NO_SELECTED_MOVIE = {
  icon: (className) => <MovieTwoTone className={className} />,
  header: 'No movie selected yet.',
  content: [
    'To view a movie detail, select one from the left panel.',
  ],
};

export const NOTE_NO_SELECTED_TV_SHOW = {
  icon: (className) => <LiveTvTwoTone className={className} />,
  header: 'No TV Show selected yet.',
  content: [
    'To view a TV Show detail, select one from the left panel.',
  ],
};

export const NOTE_OFFLINE = {
  icon: (className) => <CloudOffTwoTone className={className} />,
  header: 'You are offline.',
  content: [
    'Check your device\'s internet connection.',
    'Contents will load once you go online.',
  ],
};

const awaken = new Audio('https://gamepedia.cursecdn.com/dota2_gamepedia/4/4c/Treant_happy_09.mp3');
const areYouLost = new Audio('https://gamepedia.cursecdn.com/dota2_gamepedia/1/12/Treant_attack_07.mp3');
const beCareful = new Audio('https://gamepedia.cursecdn.com/dota2_gamepedia/2/20/Treant_attack_06.mp3');

export const NOTE_PAGE_NOT_FOUND = {
  icon: (className) => <NaturePeopleTwoTone className={className} />,
  header: (
    <span>
      Rooftrellen awakens.
      <IconButton aria-label="playAwaken" size="small" onClick={() => awaken.play()}>
        <PlayCircleFilledTwoTone fontSize="inherit" />
      </IconButton>
    </span>
  ),
  content: [
    (
      <span>
        <IconButton aria-label="playAreYouLost" size="small" onClick={() => areYouLost.play()}>
          <PlayCircleFilledTwoTone fontSize="inherit" />
        </IconButton>
        said the guised protector, as it emerges from invisibility.
      </span>
    ),
    (
      <span>
        <IconButton aria-label="playBeCareful" size="small" onClick={() => beCareful.play()}>
          <PlayCircleFilledTwoTone fontSize="inherit" />
        </IconButton>
        Indeed.
      </span>
    ),
  ],
};

export const NOTE_MOVIE_NOT_FOUND = {
  icon: (className) => <ErrorTwoTone className={className} />,
  header: 'Movie does not exist.',
  content: [
    'The movie is not found on the TMDb Database.',
    'Or, maybe the community is still working on it.',
    'Try again a bit later.',
  ],
};

export const NOTE_TV_SHOW_NOT_FOUND = {
  icon: (className) => <ErrorTwoTone className={className} />,
  header: 'TV Show does not exist.',
  content: [
    'The TV show is not found on the TMDb Database.',
    'Try searching for it on the search tab.',
  ],
};

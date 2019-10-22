import React from 'react';

import {
  MovieTwoTone,
  LiveTvTwoTone,
} from '@material-ui/icons';

import Movies from '../containers/Movies';
import TVShows from '../containers/TVShows';

export const routes = [
  {
    component: <Movies />,
    path: "/",
  },
  {
    component: <Movies />,
    icon: (<MovieTwoTone />),
    title: "Movies",
    path: "/movies",
    key: "movies",
  },
  {
    component: <TVShows />,
    icon: (<LiveTvTwoTone />),
    title: "TV Shows",
    path: "/tvshows",
    key: "tvShows",
  },
];

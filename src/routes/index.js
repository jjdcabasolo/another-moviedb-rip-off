import React from 'react';

import Movies from '../containers/Movies';
import TVShows from '../containers/TVShows';

export const routes = [
  {
    component: <Movies />,
    path: "/",
  },
  {
    component: <Movies />,
    path: "/movies",
  },
  {
    component: <TVShows />,
    path: "/tvshows",
  },
];

import React, { lazy } from 'react';

import {
  MovieTwoTone,
  LiveTvTwoTone,
} from '@material-ui/icons';

const Movies = lazy(() => import('../containers/Movies'));
const TVShows = lazy(() => import('../containers/TVShows'));

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
    child: {
      component: <Movies />,
      path: "/movies/:movieId",
    },
  },
  {
    component: <TVShows />,
    icon: (<LiveTvTwoTone />),
    title: "TV Shows",
    path: "/tvshows",
    key: "tvShows",
    child: {
      component: <TVShows />,
      path: "/tvshows/:tvshowId",
    },
  },
];

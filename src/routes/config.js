import React, { lazy } from "react";

import IconButton from "../components/custom/composed/IconButton";
import MovieIcon from "../assets/icons/movie";
import TVShowIcon from "../assets/icons/tv-show";

const Movies = lazy(() => import("../containers/Movies"));
const TVShows = lazy(() => import("../containers/TVShows"));

export const routes = [
  {
    component: <Movies />,
    path: "/",
  },
  {
    component: <Movies />,
    icon: <IconButton svgSrc={<MovieIcon />} />,
    svg: <MovieIcon />,
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
    icon: <IconButton svgSrc={<TVShowIcon />} />,
    svg: <TVShowIcon />,
    title: "TV Shows",
    path: "/tvshows",
    key: "tvShows",
    child: {
      component: <TVShows />,
      path: "/tvshows/:tvshowId",
    },
  },
];

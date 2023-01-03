export const TV_SHOW_DRAWER_CATEGORY_CHIPS = [
  {
    label: "Trending",
    identifier: "trending",
    isActive: (e) => e === "trending",
    description: "Trending TV shows on TMDb. Changes everyday.",
  },
  {
    label: "Popular",
    identifier: "popular",
    isActive: (e) => e === "popular",
    description:
      "Everyone's watching these shows, so should you, you peer-pressured binge-watcher.",
  },
  {
    label: "On The Air",
    identifier: "onTheAir",
    isActive: (e) => e === "onTheAir",
    description: "TV shows that are currently on the air.",
  },
  {
    label: "Airing Today",
    identifier: "airingToday",
    isActive: (e) => e === "airingToday",
    description: "Broadcasting starts today.",
  },
  {
    label: "Top Rated",
    identifier: "topRated",
    isActive: (e) => e === "topRated",
    description: "Shows with high ratings on TMDb.",
  },
];

export const TV_SHOW_BREADCRUMBS_CONFIG = [
  {
    label: "Seasons",
    link: "#tvshow-seasons",
    visibilityId: "seasonList",
  },
  {
    label: "Episodes",
    link: "#tvshow-episodes",
    visibilityId: "episodes",
  },
  {
    label: "Cast",
    link: "#tvshow-cast",
    visibilityId: "cast",
  },
  {
    label: "Production",
    link: "#tvshow-production",
    visibilityId: "production",
  },
  {
    label: "Reviews",
    link: "#tvshow-reviews",
    visibilityId: "reviews",
  },
  {
    label: "Recommendations",
    link: "#tvshow-recommendations",
    visibilityId: "recommendations",
  },
];

export const MOVIE_DRAWER_CATEGORY_CHIPS = [
  {
    label: "Trending",
    identifier: "trending",
    isActive: (e) => e === "trending",
    description: "Trending movies on TMDb. Changes everyday.",
  },
  {
    label: "Popular",
    identifier: "popular",
    isActive: (e) => e === "popular",
    description: "TMDB implements a voting system and these are the winners.",
  },
  {
    label: "Now Playing",
    identifier: "nowPlaying",
    isActive: (e) => e === "nowPlaying",
    description: "Movies in theaters right now.",
  },
  {
    label: "Top Rated",
    identifier: "topRated",
    isActive: (e) => e === "topRated",
    description:
      "Top rated movies on TMDb. And no, I will not implement the rating system of TMDb.",
  },
  {
    label: "Upcoming",
    identifier: "upcoming",
    isActive: (e) => e === "upcoming",
    description: "Upcoming movies in theatres.",
  },
  {
    label: "Highest Grossing",
    identifier: "highestGrossing",
    isActive: (e) => e === "highestGrossing",
    description:
      "Highest grossing movies of all time. Data may not be accurate, as TMDb users can modify the values.",
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
    identifier: "director",
    label: () => "Film Direction",
  },
  {
    identifier: "writer",
    label: (a) => `Screenwriter${a > 1 ? "s" : ""}`,
  },
  {
    identifier: "production",
    label: () => "Key Production",
  },
  {
    identifier: "composer",
    label: () => "Music",
  },
  {
    identifier: "cinematography",
    label: () => "Cinematography",
  },
  {
    identifier: "editor",
    label: (a) => `Film Editor${a > 1 ? "s" : ""}`,
  },
  {
    identifier: "costume",
    label: () => "Art",
  },
  {
    identifier: "makeup",
    label: () => "Hair and Make-up",
  },
  {
    identifier: "lighting",
    label: () => "Lighting",
  },
  {
    identifier: "visualEffects",
    label: () => "Visual Effects",
  },
];

export const MOVIE_BREADCRUMBS_CONFIG = [
  {
    label: "Trailer",
    link: "#movie-trailer",
    visibilityId: "trailer",
  },
  {
    label: "Cast",
    link: "#movie-cast",
    visibilityId: "cast",
  },
  {
    label: "Crew",
    link: "#movie-crew",
    visibilityId: "crew",
  },
  {
    label: "Production",
    link: "#movie-production",
    visibilityId: "production",
  },
  {
    label: "Reviews",
    link: "#movie-reviews",
    visibilityId: "reviews",
  },
  {
    label: "Collection",
    link: "#movie-collection",
    visibilityId: "collection",
  },
  {
    label: "Recommendations",
    link: "#movie-recommendations",
    visibilityId: "recommendations",
  },
];

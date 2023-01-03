import React from "react";

import MovieIcon from "../assets/icons/movie";
import TVShowIcon from "../assets/icons/tv-show";
import ErrorIcon from "../assets/icons/error";
import SearchIcon from "../assets/icons/search";

export const NOTE_NO_SELECTED_MOVIE = {
  icon: (className) => (
    <span className={className}>
      <MovieIcon />
    </span>
  ),
  id: "note-no-selected-movie",
  header: "No movie selected yet.",
  content: ["To view a movie detail, select one from the left panel."],
};

export const NOTE_NO_SELECTED_TV_SHOW = {
  icon: (className) => (
    <span className={className}>
      <TVShowIcon />
    </span>
  ),
  id: "note-no-selected-tv-show",
  header: "No TV Show selected yet.",
  content: ["To view a TV Show detail, select one from the left panel."],
};

export const NOTE_SEARCH = {
  icon: (className) => (
    <span className={className}>
      <SearchIcon />
    </span>
  ),
  id: "note-search",
  content: [
    "Results will appear beneath the search box.",
    "Details will appear on this panel when you open a result.",
  ],
};

export const NOTE_OFFLINE = {
  icon: (className) => (
    <span className={className}>
      <ErrorIcon />
    </span>
  ),
  id: "note-offline",
  header: "You are offline.",
  content: [
    "Check your device's internet connection.",
    "Contents will load once you go online.",
  ],
};

export const NOTE_PAGE_NOT_FOUND = {
  icon: (className) => (
    <span className={className}>
      <ErrorIcon />
    </span>
  ),
  id: "note-page-not-found",
  header: "Page not found.",
  content: [
    "You might have wandered off.",
    "Go back to the homepage using the button below.",
  ],
};

export const NOTE_MOVIE_NOT_FOUND = {
  icon: (className) => (
    <span className={className}>
      <ErrorIcon />
    </span>
  ),
  id: "note-movie-not-found",
  header: "Movie does not exist.",
  content: [
    "The movie is not found on the TMDb Database.",
    "Try searching for it on the search tab.",
  ],
};

export const NOTE_TV_SHOW_NOT_FOUND = {
  icon: (className) => (
    <span className={className}>
      <ErrorIcon />
    </span>
  ),
  id: "note-tv-show-not-found",
  header: "TV Show does not exist.",
  content: [
    "The TV show is not found on the TMDb Database.",
    "Try searching for it on the search tab.",
  ],
};

export const NOTE_ERROR_OCCURRED = {
  icon: (className) => (
    <span className={className}>
      <ErrorIcon />
    </span>
  ),
  id: "note-error-occurred",
  header: "Something went wrong.",
  content: [
    <span>
      Please send an email to{" "}
      <a href="mailto:abasolojohnjourish@gmail.com">
        abasolojohnjourish@gmail.com
      </a>{" "}
      and report what happened.
    </span>,
    "Help a dev out. Thanks :)",
  ],
};

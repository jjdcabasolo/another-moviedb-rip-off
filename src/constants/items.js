// ~Item~ refers to both Movie and TVShow components

/*
  Used in <TruncatedOverview /> to limit the maximum
  number of words the overview will contain before
  collapsing the overview into a 'read more' state.
  - ~Item~Header
  - TVShowSeasonDetails
*/
export const OVERVIEW_MAX_WORDS = 32;

/*
  Used in <~Item~Cast /> to limit the number of casts
  to show on <ItemHorizontalContainer /> in its
  collapsed state.
  - ~Item~Cast
*/
export const MAX_CAST_HORIZONTAL_ITEMS = 8;

/*
  Used in <ItemCardHorizontalList /> to limit the
  <TruncatedOverview />'s maximum number of words
  the overview will contain before collapsing the
  overview into a 'read more' state.
  - MovieCollection
  - ~Item~Recommendation
*/
export const MAX_WORD_COUNT = 20;

/*
  Used in <ItemCardHorizontalList /> to limit the
  <ItemSeeMore />'s maximum number of item cards
  to show before collapsing the overview into a
  - MovieCollection
  - ~Item~Recommendation
*/
export const MAX_ITEMS_BEFORE_COLLAPSING = 3;

/*
  Used in <ItemLazyLoad /> to limit the number of items
  to load before truncating it. This will indicate the
  number of items to show per 'page' on the lazy load
  component.
*/
export const MAX_ITEM_PER_LOAD = 10;

/*
  Used in utils/text.js for truncating words. Indicated
  the number of remaining words/allowance before fully
  truncating the text.
*/
export const TRUNCATION_ALLOWANCE = 3;

/*
  Used on <MovieCrew /> to limit the number of crew to
  display when it is truncated. Shows the rest in an
  ellipsis together with the remaining count.
*/
export const MAX_CREW_ON_SHOW_LESS = 2;

export const NO_DATE_TEXT = 'No release date.';

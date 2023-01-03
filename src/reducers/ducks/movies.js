// ACTION TYPE
const moviesActionType = {
  SET_ACTIVE_MOVIE: "@movies/SET_ACTIVE_MOVIE",
  SET_CATEGORY: "@movies/SET_CATEGORY",
  SET_DETAILS_LOADING: "@movies/SET_DETAILS_LOADING",
  SET_MOVIE_LIST: "@movies/SET_MOVIE_LIST",
  SET_SEARCH_LOADING: "@movies/SET_SEARCH_LOADING",
  SET_SEARCH_RESULTS: "@movies/SET_SEARCH_RESULTS",
};

// ACTIONS
export const moviesActions = {
  setCategory: (category) => ({
    type: moviesActionType.SET_CATEGORY,
    payload: { category },
  }),
  setMovieList: (category, list) => ({
    type: moviesActionType.SET_MOVIE_LIST,
    payload: { category, list },
  }),
  setActiveMovie: (movie) => ({
    type: moviesActionType.SET_ACTIVE_MOVIE,
    payload: { movie },
  }),
  setDetailsLoading: (isMovieLoading) => ({
    type: moviesActionType.SET_DETAILS_LOADING,
    payload: { isMovieLoading },
  }),
  setSearchResults: (searchResults) => ({
    type: moviesActionType.SET_SEARCH_RESULTS,
    payload: { searchResults },
  }),
  setSearchLoading: (isSearchLoading) => ({
    type: moviesActionType.SET_SEARCH_LOADING,
    payload: { isSearchLoading },
  }),
};

// REDUCER
const initialState = {
  category: "trending",
  isMovieLoading: false,
  isSearchLoading: false,
  list: {
    highestGrossing: [],
    nowPlaying: [],
    popular: [],
    topRated: [],
    trending: [],
    upcoming: [],
  },
  loadedContent: 0,
  searchResults: [],
  movie: {},
};

const setCategory = (state, action) => ({
  ...state,
  category: action.payload.category,
});

const setMovieList = (state, action) => ({
  ...state,
  list: {
    ...state.list,
    [action.payload.category]: action.payload.list,
  },
  loadedContent: state.loadedContent + 1,
});

const setActiveMovie = (state, action) => ({
  ...state,
  movie: action.payload.movie,
  castShowMore: false,
  crewShowMore: false,
});

const setDetailsLoading = (state, action) => ({
  ...state,
  isMovieLoading: action.payload.isMovieLoading,
});

const setSearchResults = (state, action) => ({
  ...state,
  searchResults: action.payload.searchResults,
});

const setSearchLoading = (state, action) => ({
  ...state,
  isSearchLoading: action.payload.isSearchLoading,
});

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case moviesActionType.SET_ACTIVE_MOVIE:
      return setActiveMovie(state, action);
    case moviesActionType.SET_CATEGORY:
      return setCategory(state, action);
    case moviesActionType.SET_DETAILS_LOADING:
      return setDetailsLoading(state, action);
    case moviesActionType.SET_MOVIE_LIST:
      return setMovieList(state, action);
    case moviesActionType.SET_SEARCH_LOADING:
      return setSearchLoading(state, action);
    case moviesActionType.SET_SEARCH_RESULTS:
      return setSearchResults(state, action);
    default:
      return state;
  }
};

// ACTION TYPE
const moviesActionType = {
  SET_ACTIVE_MOVIE: '@movies/SET_ACTIVE_MOVIE',
  SET_CATEGORY: '@movies/SET_CATEGORY',
  SET_MOVIE_LIST: '@movies/SET_MOVIE_LIST',
  SET_DETAILS_LOADING: '@movies/SET_DETAILS_LOADING',
  SET_CAST_SHOW_MORE: '@movies/SET_CAST_SHOW_MORE',
  SET_CREW_SHOW_MORE: '@movies/SET_CREW_SHOW_MORE',
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
  setCastShowMore: (castShowMore) => ({
    type: moviesActionType.SET_CAST_SHOW_MORE,
    payload: { castShowMore },
  }),
  setCrewShowMore: (crewShowMore) => ({
    type: moviesActionType.SET_CREW_SHOW_MORE,
    payload: { crewShowMore },
  }),
};

// REDUCER
const initialState = {
  category: 'nowPlaying',
  list: {
    nowPlaying: [],
    upcoming: [],
    popular: [],
    topRated: [],
    highestGrossing: [],
  },
  movie: {},
  loadedContent: 0,
  isMovieLoading: false,
  castShowMore: false,
  crewShowMore: false,
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

const setCastShowMore = (state, action) => ({
  ...state,
  castShowMore: action.payload.castShowMore,
});

const setCrewShowMore = (state, action) => ({
  ...state,
  crewShowMore: action.payload.crewShowMore,
});

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case moviesActionType.SET_CATEGORY: return setCategory(state, action);
    case moviesActionType.SET_MOVIE_LIST: return setMovieList(state, action);
    case moviesActionType.SET_ACTIVE_MOVIE: return setActiveMovie(state, action);
    case moviesActionType.SET_DETAILS_LOADING: return setDetailsLoading(state, action);
    case moviesActionType.SET_CAST_SHOW_MORE: return setCastShowMore(state, action);
    case moviesActionType.SET_CREW_SHOW_MORE: return setCrewShowMore(state, action);
    default: return state;
  }
};

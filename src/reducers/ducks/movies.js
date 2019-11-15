// ACTION TYPE
const moviesActionType = {
  SET_ACTIVE_MOVIE: '@movies/SET_ACTIVE_MOVIE',
  SET_CATEGORY: '@movies/SET_CATEGORY',
  SET_MOVIE_LIST: '@movies/SET_MOVIE_LIST',
  SET_DETAILS_LOADING: '@movies/SET_DETAILS_LOADING',
};

// ACTIONS
export const moviesActions = {
  setCategory: category => ({
    type: moviesActionType.SET_CATEGORY,
    payload: { category },
  }),
  setMovieList: (category, list) => ({
    type: moviesActionType.SET_MOVIE_LIST,
    payload: { category, list },
  }),
  setActiveMovie: movie => ({
    type: moviesActionType.SET_ACTIVE_MOVIE,
    payload: { movie },
  }),
  // setDetailsLoading: isMovieLoading => ({
  //   type: moviesActionType.SET_DETAILS_LOADING,
  //   payload: { isMovieLoading },
  // }),
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
  // isMovieLoading: false,
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
});

// const setDetailsLoading = (state, action) => ({
//   ...state,
//   isMovieLoading: action.payload.isMovieLoading,
// });

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case moviesActionType.SET_CATEGORY: return setCategory(state, action);
    case moviesActionType.SET_MOVIE_LIST: return setMovieList(state, action);
    case moviesActionType.SET_ACTIVE_MOVIE: return setActiveMovie(state, action);
    // case moviesActionType.SET_DETAILS_LOADING: return setDetailsLoading(state, action);
    default: return state;
  }
};

// ACTION TYPE
const moviesActionType = {
  SET_CATEGORY: '@movies/SET_CATEGORY',
  SET_MOVIE_LIST: '@movies/SET_MOVIE_LIST',
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
};

// REDUCER
const initialState = {
  category: 'nowPlaying',
  list: {
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
    highestGrossing: [],
  },
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
});

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case moviesActionType.SET_CATEGORY: return setCategory(state, action);
    case moviesActionType.SET_MOVIE_LIST: return setMovieList(state, action);
    default: return state;
  }
};

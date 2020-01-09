// ACTION TYPE
const tvShowsActionType = {
  SET_ACTIVE_TV_SHOW: '@tvShows/SET_ACTIVE_TV_SHOW',
  SET_DETAILS_LOADING: '@tvShows/SET_DETAILS_LOADING',
  SET_CATEGORY: '@tvShows/SET_CATEGORY',
  SET_TV_SHOWS_LIST: '@tvShows/SET_TV_SHOWS_LIST',
};

// ACTIONS
export const tvShowsActions = {
  setCategory: category => ({
    type: tvShowsActionType.SET_CATEGORY,
    payload: { category },
  }),
  setTVShowsList: (category, list) => ({
    type: tvShowsActionType.SET_TV_SHOWS_LIST,
    payload: { category, list },
  }),
  setActiveTVShow: tvShow => ({
    type: tvShowsActionType.SET_ACTIVE_TV_SHOW,
    payload: { tvShow },
  }),
  setDetailsLoading: isTVShowLoading => ({
    type: tvShowsActionType.SET_DETAILS_LOADING,
    payload: { isTVShowLoading },
  }),
};

// REDUCER
const initialState = {
  category: 'airingToday',
  list: {
    airingToday: [],
    onTheAir: [],
    popular: [],
    topRated: [],
  },
  tvShow: {},
  loadedContent: 0,
  isTVShowLoading: false,
};

const setCategory = (state, action) => ({
  ...state,
  category: action.payload.category,
});

const setTVShowsList = (state, action) => ({
  ...state,
  list: {
    ...state.list,
    [action.payload.category]: action.payload.list,
  },
  loadedContent: state.loadedContent + 1,
});

const setActiveTVShow = (state, action) => ({
  ...state,
  tvShow: action.payload.tvShow,
});

const setDetailsLoading = (state, action) => ({
  ...state,
  isTVShowLoading: action.payload.isTVShowLoading,
});

export const tvShowsReducer = (state = initialState, action) => {
  switch (action.type) {
    case tvShowsActionType.SET_ACTIVE_TV_SHOW: return setActiveTVShow(state, action);
    case tvShowsActionType.SET_DETAILS_LOADING: return setDetailsLoading(state, action);
    case tvShowsActionType.SET_CATEGORY: return setCategory(state, action);
    case tvShowsActionType.SET_TV_SHOWS_LIST: return setTVShowsList(state, action);
    default: return state;
  }
};

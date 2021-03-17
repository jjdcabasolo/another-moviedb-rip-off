// ACTION TYPE
const tvShowsActionType = {
  SET_ACTIVE_TV_SHOW: '@tvShows/SET_ACTIVE_TV_SHOW',
  SET_CATEGORY: '@tvShows/SET_CATEGORY',
  SET_DETAILS_LOADING: '@tvShows/SET_DETAILS_LOADING',
  SET_EPISODE: '@tvShows/SET_EPISODE',
  SET_SEARCH_LOADING: '@tvShows/SET_SEARCH_LOADING',
  SET_SEARCH_RESULTS: '@tvShows/SET_SEARCH_RESULTS',
  SET_SELECTED_SEASON: '@tvShows/SET_SELECTED_SEASON',
  SET_TV_SHOWS_LIST: '@tvShows/SET_TV_SHOWS_LIST',
};

// ACTIONS
export const tvShowsActions = {
  setCategory: (category) => ({
    type: tvShowsActionType.SET_CATEGORY,
    payload: { category },
  }),
  setTVShowsList: (category, list) => ({
    type: tvShowsActionType.SET_TV_SHOWS_LIST,
    payload: { category, list },
  }),
  setActiveTVShow: (tvShow, episodes, selectedSeason) => ({
    type: tvShowsActionType.SET_ACTIVE_TV_SHOW,
    payload: { tvShow, episodes, selectedSeason },
  }),
  setDetailsLoading: (isTVShowLoading) => ({
    type: tvShowsActionType.SET_DETAILS_LOADING,
    payload: { isTVShowLoading },
  }),
  setEpisode: (episodes) => ({
    type: tvShowsActionType.SET_EPISODE,
    payload: { episodes },
  }),
  setSelectedSeason: (selectedSeason) => ({
    type: tvShowsActionType.SET_SELECTED_SEASON,
    payload: { selectedSeason },
  }),
  setSearchResults: (searchResults) => ({
    type: tvShowsActionType.SET_SEARCH_RESULTS,
    payload: { searchResults },
  }),
  setSearchLoading: (isSearchLoading) => ({
    type: tvShowsActionType.SET_SEARCH_LOADING,
    payload: { isSearchLoading },
  }),
};

// REDUCER
const initialState = {
  category: 'trending',
  episodes: [],
  isSearchLoading: false,
  isSeasonLoading: false,
  isTVShowLoading: false,
  list: {
    airingToday: [],
    onTheAir: [],
    popular: [],
    topRated: [],
    trending: [],
  },
  loadedContent: 0,
  searchResults: [],
  selectedSeason: 0,
  tvShow: {},
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

const setActiveTVShow = (state, action) => {
  const descendingEpisodes = action.payload.episodes && action.payload.episodes.length > 0
    ? action.payload.episodes.sort((a, b) => b.episode_number - a.episode_number)
    : [];

  return {
    ...state,
    episodes: descendingEpisodes,
    selectedSeason: action.payload.selectedSeason,
    tvShow: action.payload.tvShow,
  };
};

const setDetailsLoading = (state, action) => ({
  ...state,
  isTVShowLoading: action.payload.isTVShowLoading,
});

const setEpisode = (state, action) => ({
  ...state,
  episodes: action.payload.episodes.sort((a, b) => b.episode_number - a.episode_number),
  isSeasonLoading: false,
});

const setSelectedSeason = (state, action) => ({
  ...state,
  isSeasonLoading: true,
  selectedSeason: action.payload.selectedSeason,
});

const setSearchResults = (state, action) => ({
  ...state,
  searchResults: action.payload.searchResults,
});

const setSearchLoading = (state, action) => ({
  ...state,
  isSearchLoading: action.payload.isSearchLoading,
});

export const tvShowsReducer = (state = initialState, action) => {
  switch (action.type) {
    case tvShowsActionType.SET_ACTIVE_TV_SHOW: return setActiveTVShow(state, action);
    case tvShowsActionType.SET_CATEGORY: return setCategory(state, action);
    case tvShowsActionType.SET_DETAILS_LOADING: return setDetailsLoading(state, action);
    case tvShowsActionType.SET_EPISODE: return setEpisode(state, action);
    case tvShowsActionType.SET_SEARCH_LOADING: return setSearchLoading(state, action);
    case tvShowsActionType.SET_SEARCH_RESULTS: return setSearchResults(state, action);
    case tvShowsActionType.SET_SELECTED_SEASON: return setSelectedSeason(state, action);
    case tvShowsActionType.SET_TV_SHOWS_LIST: return setTVShowsList(state, action);
    default: return state;
  }
};

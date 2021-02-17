// ACTION TYPE
const tvShowsActionType = {
  SET_ACTIVE_TV_SHOW: '@tvShows/SET_ACTIVE_TV_SHOW',
  SET_CATEGORY: '@tvShows/SET_CATEGORY',
  SET_DETAILS_LOADING: '@tvShows/SET_DETAILS_LOADING',
  SET_EPISODE: '@tvShows/SET_EPISODE',
  SET_SEASON_DRAWER: '@tvShows/SET_SEASON_DRAWER',
  SET_SEASON_DRAWER_SELECTED_SEASON: '@tvShows/SET_SEASON_DRAWER_SELECTED_SEASON',
  SET_SELECTED_EPISODE: '@tvShows/SET_SELECTED_EPISODE',
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
};

// REDUCER
const initialState = {
  category: 'trending',
  episodes: [],
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

export const tvShowsReducer = (state = initialState, action) => {
  switch (action.type) {
    case tvShowsActionType.SET_ACTIVE_TV_SHOW: return setActiveTVShow(state, action);
    case tvShowsActionType.SET_CATEGORY: return setCategory(state, action);
    case tvShowsActionType.SET_DETAILS_LOADING: return setDetailsLoading(state, action);
    case tvShowsActionType.SET_EPISODE: return setEpisode(state, action);
    case tvShowsActionType.SET_SELECTED_SEASON: return setSelectedSeason(state, action);
    case tvShowsActionType.SET_TV_SHOWS_LIST: return setTVShowsList(state, action);
    default: return state;
  }
};
